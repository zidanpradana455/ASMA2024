---
name: ASMA 2024
description: Visual system of the ASMA 2024 website, member archive, and teaching-material directory.
colors:
  paper: "#fcfcf7"
  primary: "#a20613"
  primary-dark: "#3c0207"
  secondary: "#b80065"
  secondary-dark: "#52002d"
  tertiary: "#ffc005"
  tertiary-dark: "#997303"
  pink: "#cd00b8"
  ink: "#34191c"
  muted: "#69585c"
  line: "#a2061324"
  white: "#ffffff"
  card: "#ffffff9e"
  archive-surface: "#f4ece9"
  archive-muted: "#715960"
typography:
  display:
    fontFamily: "Lato, sans-serif"
    fontSize: "clamp(42px,5vw,74px)"
    fontWeight: 900
    lineHeight: 1.16
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Lato, sans-serif"
    fontSize: "clamp(30px,3.3vw,46px)"
    fontWeight: 900
    lineHeight: 1.16
    letterSpacing: "-.03em"
  title:
    fontFamily: "Lato, sans-serif"
    fontSize: "23px"
    lineHeight: 1.16
    letterSpacing: "-.025em"
  body:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: ".12em"
  serif:
    fontFamily: "Playfair Display, Georgia, serif"
    fontWeight: 400
rounded:
  pill: "99px"
  search: "12px"
  photo: "14px"
  card: "22px"
  calendar: "24px"
spacing:
  control-gap: "8px"
  small: "12px"
  medium: "20px"
  control-inline: "24px"
  panel: "28px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  button-outline:
    backgroundColor: "#ffffff65"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-glass:
    backgroundColor: "#ffffff17"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  material-search:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.search}"
    padding: "6px 17px"
  cohort-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  member-card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"
    padding: "10px"
---

# Design System: ASMA 2024

## Overview

This is a scan of the implemented website, not a new identity. ASMA red, warm off-white surfaces, bold Lato headings, Montserrat reading text, and italic Playfair Display accents connect the homepage, member directory, calendar, and teaching-material archive. The homepage gives the existing group portrait and moving background the largest visual role; reading surfaces use quieter backgrounds and clear divisions.

The material directory extends that vocabulary with left-aligned headings, search, wrapping cohort controls, and a phase → stase → topic → resource hierarchy. Small burgundy-and-ivory illustrations identify stase beside their topic lists; document links and native video disclosures keep related resources together. Member archives reuse the incumbent portrait-card grid while preserving the original square photographs. No new creative metaphor or brand commitment is established by this documentation.

**Key Characteristics:**

- Warm paper surfaces with red actions and deep red text.
- Bold sans-serif headings paired with italic serif accents.
- Rounded controls and portrait cards; illustrated stase groups with flat topic and resource lists.
- Photographic identity on the homepage and member pages.

Evidence: the original scan used `src/styles.css` (including later overrides), `src/pages/materials.css`, `src/App.tsx`, `src/pages/Members.tsx`, `src/pages/Materials.tsx`, `src/main.tsx`, `index.html`, and `README.md`, with desktop materials/home and mobile member/material-detail captures in `.impeccable/review/`. The 22 October 2026 station refinement is reconciled against `src/components/StationDirectory.tsx`, `src/pages/Materials.tsx`, `src/pages/materials.css`, `src/lib/stations.ts`, `src/data/material-stations.json`, `docs/station-image-prompts.json`, and the updated direction contract in `docs/workflow-integrasi-arsip-asma.md`. The Impeccable context/detector engine was unavailable; this is a manual extraction, not an engine validation. PRODUCT.md remains absent; this narrow refinement preserves the incumbent design system. CSS remains the implementation authority; existing frontmatter tokens are preserved.

## Colors

### Primary

ASMA red (`primary`) marks primary actions, links, icons, selected cohort and material-type controls, and active phase underlines. Deep red (`primary-dark`) supplies the primary button hover and the dark end of the footer. The low-alpha `line` token divides content without creating heavy boxes.

### Secondary

Magenta (`secondary`) accompanies red in active main-navigation gradients and provides the shared keyboard focus outline. Deep magenta (`secondary-dark`) appears in the footer gradient. Pink remains a declared token in the original hero gradient; the later `HeroGradient.css` replaces that background with the supplied video and poster. It is not a material-category coding system.

### Tertiary

Golden yellow (`tertiary`) appears in hero accents and the calendar's existing cohort mapping. Keep the existing event mapping in `README.md`; do not derive resource-type colors from it. `tertiary-dark` is retained as a declared incumbent primitive, not a new action style.

### Neutral

Paper is the page background, ink is the primary reading color, and muted is the final shared secondary-text override. The material extension also uses archive-muted for metadata and archive-surface for its aside and square photo backdrops. Semi-transparent white cards and tinted page-header backgrounds keep the warm palette visible.

## Typography

Headings use Lato; body, controls, counts, and metadata use Montserrat. Playfair Display is italic and reserved for the existing subtitle/motto role. The family fallbacks are normative in the frontmatter. Fonts are requested through Google Fonts in `index.html`; fallback fonts must remain usable.

The shared display and headline roles are fluid. The material index overrides display with `clamp(38px,5vw,64px)`, weight 900, and tracking `-.035em`; below 640px it uses 40px. Phase-detail headings are more compact: `clamp(34px,4vw,48px)`, becoming 34px below 640px, with a 24px serif cohort subtitle becoming 21px. Member-page headings use the existing centered page-header treatment and become 43px on mobile. Material source titles are 20px/1.4, weight 700, changing to 18px/1.45 on mobile; the cross-stase list uses 16px on larger screens and inherits the later 18px mobile override. Phase-index titles use 23px. These are component-specific differences, not a uniform new scale.

Stase titles use Lato at 23px/1.2 with `-.02em` tracking, changing to 21px at 1100px and below, returning to 23px at 760px and below, then 21px at 480px and below. Topic headings use Montserrat at 13px/1.6, weight 600, with wrapping allowed anywhere for long titles. Checklist/PPT links and video summaries use 12px; expanded video links use 11px/1.7. The decorative stase numeral uses Lato at 35px/1, weight 900, with tabular numerals and a soft paper-colored text shadow; it becomes 29px at 480px and below. These compact styles describe this directory only.

Reading text defaults to 15px/1.7. Library introductions use a maximum measure of 65ch; explanatory aside text uses 14px/1.8. Metadata and source notes are smaller (11–13px) and remain secondary to titles. Preserve the later readability overrides in the shared stylesheet rather than copying its superseded smaller declarations. Long resource titles and member names wrap instead of being clipped.

## Layout

The shared centered container is `min(1240px, calc(100% - 96px))`. At 1100px and below it uses 32px side gutters; below 640px it uses 18px, then 14px below 360px. General homepage sections use 94px vertical padding, reduced to 64px at 800px and 52px below 640px.

The material index uses a fluid main column, a 280px aside, and a 70px gap. At 900px and below the aside moves under the list with a 32px gap. Its search is at most 640px wide, its body uses 38px/80px top/bottom padding, and cohort controls wrap. Mobile body padding becomes 26px/50px; the tools wrap, and the search spans the available width. Phase status moves onto its own row when needed. Resource rows keep icons narrow and give the wrapping title the remaining width.

Phase detail places its compact heading, phase navigation, search, type filters, result count, and stase jump selector before the directory. Stase groups use two columns with a 56px column gap and 36px row gap. Each group pairs a 116px square image with a flexible topic column and a 22px gap. At 1100px and below these become a 32px grid gap, 88px image, and 18px inner gap. At 760px and below the directory becomes one column with a 28px row gap, 112px image, and 24px inner gap; at 480px and below the image becomes 80px and the inner gap 18px. Cross-stase resources also move from two columns to one at 760px. Below 640px the detail header, filter spacing, and result heading tighten and filter counts are hidden; at 480px and below document links and video summaries increase from 36px to 44px minimum height. Stase jump targets retain a 110px scroll margin and receive focus.

Member cards use three columns, two at 800px and below, and one below 360px. An odd final item is centered at the two-column widths. On mobile, member search precedes the result count. Desktop navigation switches to the menu button at 800px and below; the sticky bar is 88px tall, becoming 76px below 640px.

## Elevation & Depth

The system combines pale tonal layers with soft shadows. Member and event cards use `0 8px 36px #5c071008`; calendar surfaces use `0 12px 60px #52002d08`. Floating navigation and dialogs have stronger shadows and blurred backdrops. The shared sticky navigation uses a translucent paper background and 22px backdrop blur, with an opaque fallback when blur is unsupported.

Material phase and source lists and stase groups are flat, separated by thin lines; the material aside relies on a tinted fill rather than elevation. The station artwork carries its own soft lighting, while its containing group has no card shadow. Hover-capable pointers lift buttons by 2px with `0 8px 25px #3c020715`; primary buttons darken. Preserve the existing reduced-motion rules, which remove transitions and animations. Motion and shadow details belong in `.impeccable/design.json`, not extra frontmatter token groups.

## Shapes

Pill controls, circular icon buttons, and rounded cards are established patterns. Shared buttons and cohort filters use the pill radius. Desktop member cards have a 22px outer corner and a 14px photo corner, reduced to 15px and 10px on mobile. The material search uses a 12px corner and the aside a 14px corner. Material rows remain open horizontal divisions rather than individual rounded containers.

Current-member images use a 4:5 window with `object-fit: cover`; archive images use square windows with `object-fit: contain` and no zoom or overlay. Preserve the complete archived compositions. The homepage's existing photographic ring is its own component, not the directory layout.

Stase illustrations use square windows with `object-fit: cover` and 12px corners. Their containing groups remain open, divided sections; the image frame does not turn the whole topic list into a card. The native stase selector uses an 8px corner and a 44px minimum height.

## Components

### Buttons and links

Shared buttons use 14px, weight 600 text, a 48px minimum height, 12px/24px padding, and a 17px icon gap. Primary, outline, light, and glass variants already exist. Glass is used over the hero and includes a translucent border and blur. Icon buttons are 44px circles. Text links use red and a 44px minimum height, with an underline on hover. Shared keyboard focus is a 3px magenta outline offset by 5px. Arrow motion uses 240ms `cubic-bezier(.16,1,.3,1)` when motion is allowed.

### Search

Member search is a white pill, 340px wide on desktop and full width on mobile, with a 48px input. Its focus-within outline is 2px magenta with a 3px offset. Material search is a paper-filled rounded rectangle, minimum 56px high, with a 2px red focus-within outline and a 3px offset. Material search reveals a labeled clear button only when text is present. Both retain an accessible label and a visible focus treatment.

### Navigation and selectors

Main navigation uses a red-to-magenta gradient for the active route. The mobile menu is a rounded paper panel above a blurred backdrop, closes with Escape, restores focus, and traps focus while open. Cohort links use solid red when `aria-current` is set; material-type buttons do so when `aria-pressed` is true. Phase navigation uses a 3px red underline, not another pill row. Keep semantic states and visible states aligned.

### Portrait cards

Use the incumbent light card frame, photo window, Lato name, and smaller Montserrat supporting text. Archive names retain source spelling and abbreviations. Archive photos are local WebP derivatives with provenance recorded in `docs/legacy-image-sources.json`; they remain separate from the generated stase illustrations.

### Material phase, stase, and resource lists

Phase-index rows combine a title, available material types, stase/link counts when available, and a directional arrow. Phase detail preserves stase and topic groups when searching or filtering. Each stase has an illustration, a source-derived number where present, a heading, and a topic list. Checklist and PPT links sit together below the relevant topic; missing document URLs become plain availability text. Video links sit inside native disclosures, closed initially and opened when a search is active or the video filter is selected. Users can toggle them directly. Stase jumping focuses and scrolls to the matching group, with a visible red focus outline.

Keep group definitions tied to `src/data/material-stations.json` and the source contract: Fase I 2021–2024 has 14 stase, Fase I 2020 has 12, and Fase II 2020 has 9. Fase III 2020 uses unnumbered topic groups. Preserve the combined Stase 1–4 checklist and other source scope in the cross-stase section. These counts describe the archive, not a template to impose on other cohorts.

Sixteen GPT illustrations generated with the built-in image generator live in `public/images/stations/`; full prompts and provenance are in `docs/station-image-prompts.json` and WebP EXIF metadata. Their warm ivory, burgundy, and muted rose still-life treatment fits the incumbent palette. Reuse the same subject illustration across years. Numbers remain HTML overlays because source numbering varies; unnumbered groups omit the overlay. Images are lazy-loaded with empty alt text because the adjacent heading provides the identity. Treat them as decorative subject cues, not clinical instructions.

Global-search and cross-stase source rows retain a type icon, type/provider metadata, a wrapping linked title, and an external arrow when a URL exists. Global-search results also show their cohort and phase context. Unavailable entries retain a plain title and explanation without a fake link or external arrow. Source access opens in a new tab and includes assistive text describing that behavior. The source note explains ownership permissions.

Global-search and cross-stase source lists reveal 30 items at a time with a show-more button; stase topic groups are rendered together. A failed search offers reset; a genuinely empty archive phase offers another phase and the original source. These states preserve the same heading, spacing, and control vocabulary without substituting unrelated content.

### Calendar and homepage

Keep the existing calendar's cohort colors, month pills, tabular date numerals, and desktop event bars. Mobile presents compact colored date indicators with an agenda below. Keep the homepage's portrait-led hero, existing video/poster fallback, and draggable member ring. Reduced motion presents the static poster and a horizontal static member list; these existing behaviors are documented in README.md.

## Do's and Don'ts

### Do:

- Do reuse the ASMA palette, font roles, shared container, and existing controls.
- Do keep material titles and member names readable and able to wrap.
- Do preserve full square archive photographs and their source records.
- Do provide keyboard focus, semantic selection states, and reduced-motion behavior.
- Do keep material availability and external-source permissions visible.
- Do preserve stase and topic context while searching and filtering, and reuse subject artwork across cohorts.

### Don'ts:

- Don't replace the homepage identity while extending the archive.
- Don't crop or zoom archive photographs to imitate current-member portraits.
- Don't render unavailable material titles as active links.
- Don't replace grouped stase topics with standalone resource image cards or embed every video automatically.
- Don't promote page-specific layout decisions into universal brand rules.
