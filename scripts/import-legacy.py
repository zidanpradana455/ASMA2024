"""Import saved public Google Sites HTML. Usage: python scripts/import-legacy.py SNAPSHOT_DIR [--download-images].

Only member images are downloaded; teaching documents remain links to their owners.
Requires Pillow only for --download-images. Outputs deterministic data and provenance.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, parse_qs, urljoin
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor
import hashlib
import io
import json
import re
import sys

SITE = "https://sites.google.com/view/asmafkkmkugm/"
PROJECT = Path(__file__).resolve().parents[1]
SNAPSHOTS = Path(sys.argv[1])

class Node:
    def __init__(self, tag="", attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def text(self):
        if self.tag in ("script", "style", "noscript"):
            return ""
        return " ".join(c.text() if isinstance(c, Node) else c for c in self.children)
    def all(self):
        yield self
        for c in self.children:
            if isinstance(c, Node):
                yield from c.all()

class Parser(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.stack = [self.root]
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs)
        self.stack[-1].children.append(n)
        if tag not in ("area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"):
            self.stack.append(n)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                self.stack = self.stack[:i]
                break
    def handle_data(self, data):
        self.stack[-1].children.append(data)

def text(n):
    return re.sub(r"\s+", " ", n.text()).strip()

def url(value):
    value = urljoin("https://sites.google.com", value)
    p = urlparse(value)
    if p.hostname in ("www.google.com", "google.com") and p.path == "/url":
        value = parse_qs(p.query).get("q", [value])[0]
        p = urlparse(value)
    if p.hostname == "youtu.be":
        return "https://www.youtube.com/watch?v="+p.path.strip("/")
    if p.hostname in ("www.youtube.com", "youtube.com"):
        video = p.path.split("/")[-1] if p.path.startswith("/embed/") else parse_qs(p.query).get("v", [""])[0]
        if video:
            return "https://www.youtube.com/watch?v="+video
    return value

def allowed(value):
    host=urlparse(value).hostname or ""
    return host in ("drive.google.com","docs.google.com","www.youtube.com") or host.endswith(".sharepoint.com")

def write(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")

members=[]
provenance=[]
material_pages=[]
categories={"Skills Lab Book":"book","Skillslab Book":"book","Block Book":"book","Checklist":"checklist","PPT Tentir":"slides","Studi Kasus":"case","Video":"video"}
for file in sorted(SNAPSHOTS.glob("*.html")):
    path=file.stem.replace("__","/")
    source=SITE+path
    doc=Parser(file.read_text(encoding="utf-8")).root
    sections=[n for n in doc.all() if n.tag=="section" and not text(n).startswith("Kontak")]
    if path.startswith("asma/"):
        year=path[-4:]
        index=0
        for section in sections:
            names=[text(n) for n in section.all() if n.tag in ("p","small") and text(n) and text(n)!="Meet Our Team"]
            images=[n.attrs["src"] for n in section.all() if n.tag=="img"]
            if not names:
                continue
            assert len(names)==len(images), (year,names,len(images))
            for name,image in zip(names,images):
                index+=1
                target=f"/feeds/arsip/{year}/{index:02}.webp"
                members.append({"id":index,"cohort":year,"name":name,"fullName":name,"image":target})
                provenance.append({"cohort":year,"name":name,"image":target,"sourcePage":source,"originalImage":image})
        assert index=={"2020":20,"2021":21,"2022":20,"2023":21}[year]
    if not path.startswith("materi-ajar/") or path.count("/")!=2:
        continue
    year=path.split("/")[1][-4:]
    phase_name=path.split("/")[-1]
    phase="komprehensif" if phase_name.endswith("komprehensif") else {"i":"fase-1","ii":"fase-2","iii":"fase-3"}[phase_name.split("-")[-1]]
    title="OSCE Komprehensif" if phase=="komprehensif" else "OSCE Fase "+{"fase-1":"I","fase-2":"II","fase-3":"III"}[phase]
    records=[]
    seen=set()
    category="checklist"
    topic=""
    mixed=False

    def add(label, href, kind):
        label=re.sub(r"\s+", " ", label).strip()
        if not label: return
        signature=(kind,label,href)
        if signature in seen: return
        seen.add(signature)
        rid=hashlib.sha256(("|".join((year,phase,*signature))).encode()).hexdigest()[:14]
        records.append({"id":rid,"title":label,"type":kind,"url":href})

    for section in sections:
        for n in section.all():
            label=text(n)
            if n.tag in ("h1","h2","h3","h4","p","small"):
                if label in categories and n.tag.startswith("h"):
                    category=categories[label]
                    mixed=False
                    topic=""
                elif label.startswith("Checklist & Bahan Ajar"):
                    mixed=True
                    category="checklist"
                    topic=""
                elif not any(c.tag=="a" for c in n.all()) and label and not label.startswith(("OSCE","Coming Soon","Unavailable")):
                    if mixed and re.fullmatch(r"Checklist(?:\s*\|\s*PPT)?|PPT",label):
                        for part in label.split("|"):
                            add(topic, "", "slides" if part.strip()=="PPT" else "checklist")
                    elif label not in categories:
                        topic=label
            if n.tag=="a" and n.attrs.get("href"):
                href=url(n.attrs["href"])
                if not allowed(href): continue
                kind="video" if "youtube.com" in href else category
                if mixed:
                    kind="slides" if label=="PPT" else "checklist"
                    label=topic if label in ("Checklist","PPT") else f"{topic} — {label}"
                add(label,href,kind)
            if n.attrs.get("data-embed-open-url"):
                add(label,url(n.attrs["data-embed-open-url"]),"book")
            if n.tag=="iframe" and "youtube.com/embed/" in n.attrs.get("src",""):
                add(n.attrs.get("aria-label","Video").removeprefix("YouTube Video, "),url(n.attrs["src"]),"video")
    material_pages.append({"cohort":year,"phase":phase,"title":title,"sourceUrl":source,"resources":records})

write(PROJECT/"src/data/legacy-members.json",members)
write(PROJECT/"src/data/materials.json",material_pages)
manifest_path=SNAPSHOTS/"member-originals/manifest.json"
if manifest_path.exists():
    captures={item["image"]:item for item in json.loads(manifest_path.read_text(encoding="utf-8"))}
    for item in provenance:
        if item["image"] in captures:
            item["downloadedFrom"]=captures[item["image"]]["downloadedFrom"]
write(PROJECT/"docs/legacy-image-sources.json",provenance)

if "--download-images" in sys.argv:
    from PIL import Image
    def download(item):
        target=PROJECT/"public"/item["image"].lstrip("/")
        if target.exists():
            return {"path":str(target),"cached":True}
        # Only fetch the public image URL already present on the source page.
        local=SNAPSHOTS/"member-originals"/(item["cohort"]+"-"+Path(item["image"]).stem+".img")
        if local.exists():
            raw=local.read_bytes()
        else:
            with urlopen(Request(item["originalImage"],headers={"User-Agent":"Mozilla/5.0"}),timeout=60) as response:
                raw=response.read()
        image=Image.open(io.BytesIO(raw)).convert("RGB")
        image.thumbnail((800,1000))
        target.parent.mkdir(parents=True,exist_ok=True)
        image.save(target,"WEBP",quality=88)
        return {"path":item["image"],"size":image.size}
    with ThreadPoolExecutor(max_workers=5) as pool:
        for result in pool.map(download,provenance):
            print(json.dumps(result),flush=True)
print(json.dumps({"members":len(members),"pages":len(material_pages),"available":sum(bool(r["url"]) for p in material_pages for r in p["resources"]),"unavailable":sum(not bool(r["url"]) for p in material_pages for r in p["resources"])}))
