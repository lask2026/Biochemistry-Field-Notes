import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {projectPath} from '../../project-layout.mjs';import {chapters,blindCases} from '../../review/scripts/packets.mjs';import {validateAnswer} from '../../dev/src/validation.mjs';
const all=chapters(),catalog=JSON.parse(fs.readFileSync(projectPath('content','catalog.json'))),assets=JSON.parse(fs.readFileSync(projectPath('content','assets.json'))),byId=Object.fromEntries(assets.assets.map(a=>[a.id,a]));
const ids=new Set();for(const ch of all)test(ch.id+': coverage, unique assessment identity, valid highlights, keys and blind packet',()=>{const outline=catalog.chapters.find(c=>c.id===ch.id);assert(outline);assert.equal(ch.title,outline.title);assert.deepEqual(new Set(ch.lessons.map(l=>l.section)),new Set(outline.sections.map(s=>s.id)));assert(ch.lessons.length>=outline.sections.length);const lessonIds=new Set();for(const l of ch.lessons){assert(!lessonIds.has(l.id));lessonIds.add(l.id);assert(byId[l.asset]);assert(l.steps.length>=3);for(const step of l.steps)for(const id of step.focus)assert(byId[l.asset].nodes.some(n=>n.id===id));for(const key of ['coreRule','memoryCue','traps','application']){const card=l[key];assert(card.title.length>=8);assert(card.paragraphs.length>=2);assert(card.paragraphs.every(p=>p.length>=20));}assert(ch.exercises.some(ex=>ex.asset===l.asset),'Each lesson must map to a practice concept');}
for(const ex of ch.exercises){assert(!ids.has(ex.id),'Cross-chapter collision: '+ex.id);ids.add(ex.id);const stageIds=new Set();assert(byId[ex.asset]);assert(ex.stages.length>=3);for(const s of ex.stages){assert(!stageIds.has(s.id));stageIds.add(s.id);assert(validateAnswer(s,s.answer));assert(!validateAnswer(s,s.type==='choice'?-1:s.type==='selection'?[]:'garbage'));assert.equal(s.hints.length,2);assert(s.hints[0]!==s.hints[1]);assert(s.explanation.length>25);const a=byId[s.asset||ex.asset];assert(a);if(s.type==='selection')for(const id of s.answer)assert(a.nodes.some(n=>n.id===id));}}
const blind=blindCases(ch,assets);assert.equal(blind.length,ch.exercises.reduce((n,e)=>n+e.stages.length,0));for(const row of blind){assert(!Object.hasOwn(row,'answer'));assert(!Object.hasOwn(row,'hints'));assert(!Object.hasOwn(row,'explanation'));}});
test('independent biochemical arithmetic spot checks',()=>{
 const lookup=(chapter,section)=>all[chapter-1].exercises[section-1];
 const key=(ex,n)=>ex.stages[n].answer;
 assert.equal(key(lookup(1,2),2),(2+10)/2);
 assert.equal(key(lookup(1,3),1),5-1);
 assert.equal(key(lookup(2,3),1),80/2);
 assert.equal(key(lookup(6,5),1),2**4);
 assert.equal(key(lookup(9,2),1),4-2);
 assert.equal(key(lookup(9,6),2),4+2);
 assert.equal(key(lookup(10,2),1),3);
 assert.equal(key(lookup(11,5),1),16/2-1);
});
