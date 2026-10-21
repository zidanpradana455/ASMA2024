import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {materialPages, materialPath, materialRouteTitle, matchesResource, availableCount, type Resource} from '../src/lib/materials';
import members from '../src/data/legacy-members.json';

test('all four historical member cohorts have the source counts and local portraits', () => {
  for (const [year, count] of Object.entries({'2020':20, '2021':21, '2022':20, '2023':21})) {
    const cohort = members.filter(m => m.cohort === year);
    assert.equal(cohort.length, count);
    assert.equal(new Set(cohort.map(m => m.id)).size, count);
    for (const member of cohort) assert.ok(existsSync('public'+member.image), member.image);
  }
  assert.equal(members.find(m => m.cohort === '2020' && m.id === 1)?.name, 'Alifta Faramesty K');
  assert.equal(members.find(m => m.cohort === '2023' && m.id === 21)?.name, 'Ruth Aiko Siswanta');
});

test('source phase structure is complete and empty phases stay empty', () => {
  assert.equal(materialPages.length, 16);
  assert.equal(new Set(materialPages.map(materialPath)).size, 16);
  for (const page of materialPages.filter(p => (p.cohort !== '2020' && p.phase !== 'fase-1') || p.phase === 'komprehensif')) {
    assert.equal(availableCount(page), 0, materialPath(page));
  }
  const p2023 = materialPages.find(p => p.cohort === '2023' && p.phase === 'fase-1')!;
  assert.equal(p2023.resources.filter(r => r.url && r.type === 'video').length, 34);
  assert.equal(p2023.resources.filter(r => r.url && r.type !== 'video').length, 0);
});

test('generic Checklist and PPT links retain the source topic and document identity', () => {
  const phase = materialPages.find(p => p.cohort === '2024' && p.phase === 'fase-1')!;
  const resources = phase.resources.filter(r => r.title === 'Antropometri');
  assert.equal(resources.length, 2);
  assert.match(resources.find(r => r.type === 'checklist')!.url, /1lMiQ4ZrOGoZ1wpB-hJdPI7XtMGg8BFCr/);
  assert.match(resources.find(r => r.type === 'slides')!.url, /1wUZ-4ooNfLKMnoY0iPKFHWAgf_JmNm9lPyZulA26HRw/);
  for (const page of materialPages) {
    assert.equal(new Set(page.resources.map(r => r.id)).size, page.resources.length);
    for (const resource of page.resources) {
      assert.ok(resource.title.trim());
      if (resource.url) {
        const url = new URL(resource.url);
        assert.equal(url.protocol, 'https:');
        assert.ok(['drive.google.com', 'docs.google.com', 'www.youtube.com', 'ugm365-my.sharepoint.com'].includes(url.hostname));
      }
    }
  }
});

test('material search supports combined topic, type and cohort without punctuation sensitivity', () => {
  const resource: Resource = {id:'example', title:'Pemeriksaan Anemia & Kelenjar Limfe', type:'checklist', url:''};
  assert.ok(matchesResource(resource, ' LIMFE checklist 2024 ', 'Kedokteran 2024'));
  assert.ok(matchesResource(resource, 'anemia & kelenjar'));
  assert.ok(!matchesResource(resource, '2023', 'Kedokteran 2024'));
  assert.ok(!matchesResource(resource, 'jantung'));
  assert.equal(materialRouteTitle('/materi/2024/fase-1'), 'OSCE Fase I · Kedokteran 2024');
  assert.equal(materialRouteTitle('/materi/2024/fase-9'), 'Halaman tidak ditemukan');
});
