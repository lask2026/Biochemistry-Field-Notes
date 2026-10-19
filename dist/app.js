(()=>{const __modules={};
__modules.validation=(()=>{
function validateAnswer(stage,value){
 if(stage.type==='choice')return Number.isInteger(value)&&value>=0&&value<stage.options.length&&value===stage.answer;
 if(stage.type==='selection')return Array.isArray(value)&&value.every(x=>typeof x==='string')&&new Set(value).size===value.length&&value.length===stage.answer.length&&stage.answer.every(x=>value.includes(x));
 if(stage.type==='text')return typeof value==='string'&&[stage.answer,...(stage.aliases||[])].some(x=>stage.caseSensitive===false?x.toLowerCase()===value.trim().toLowerCase():x===value.trim());
 if(stage.type==='number'){if(typeof value!=='string'&&typeof value!=='number')return false;const s=String(value).trim();return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(s)&&Number.isFinite(Number(s))&&Math.abs(Number(s)-stage.answer)<=(stage.tolerance||0);}
 return false;
}

return {validateAnswer};})();
__modules.progress=(()=>{
const storageKey='biochemistry-field-notes-v1';
function fresh(){return {version:1,subject:'biochemistry',theme:'light',reduced:false,stages:{}};}
function sanitize(value,validIds){
 if(!value||value.version!==1||value.subject!=='biochemistry'||!value.stages||typeof value.stages!=='object'||Array.isArray(value.stages))throw Error('Not a Biochemistry progress file.');
 const out=fresh();out.theme=value.theme==='dark'?'dark':'light';out.reduced=value.reduced===true;
 for(const [key,state] of Object.entries(value.stages)){if(!validIds.has(key)||!state||typeof state!=='object')continue;
 if(!Number.isInteger(state.hints)||state.hints<0||state.hints>2||typeof state.done!=='boolean'||typeof state.assisted!=='boolean')continue;
 const hints=state.hints;
 const assisted=state.assisted===true||hints>0;
 out.stages[key]={done:state.done===true,assisted,hints};}
 return out;
}
function readProgress(storage,ids){try{const raw=storage.getItem(storageKey);return {state:raw?sanitize(JSON.parse(raw),ids):fresh(),warning:''};}catch{return {state:fresh(),warning:'Saved progress could not be read. The application remains usable.'};}}
function writeProgress(storage,state){try{storage.setItem(storageKey,JSON.stringify(state));return '';}catch{return 'Progress could not be saved on this device. Keep an exported copy.';}}

return {storageKey,fresh,sanitize,readProgress,writeProgress};})();
__modules.visuals=(()=>{

// Original vector concept illustrations. Icons are schematic, not molecular graphs.
const colors=['blue','purple','green','gold'];
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ink=i=>`var(--v-${colors[i%4]})`;
function path(d,i=0,w=4){return `<path class="outline" d="${d}" fill="none" stroke="${ink(i)}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;}
function circle(x,y,r,i=0){return `<circle class="outline" cx="${x}" cy="${y}" r="${r}" fill="${ink(i)}" fill-opacity=".12" stroke="${ink(i)}" stroke-width="3"/>`;}
function beads(i){return path('M-48 0 Q-25 -42 0 0 T48 0',i)+[-40,-20,0,20,40].map((x,k)=>circle(x,Math.sin(k*Math.PI/2)*18,6,i)).join('');}
function helix(i){return path('M-45 -25 Q0 55 45 -25 M-45 25 Q0 -55 45 25',i)+[-30,-15,0,15,30].map(x=>path(`M${x} ${22*Math.cos(x/25)} V${-22*Math.cos(x/25)}`,i,2)).join('');}
function lipid(i){return [-32,-16,0,16,32].map(x=>circle(x,-18,5,i)+path(`M${x-2} -12 v32 M${x+3} -12 v10 l5 7 v11`,i,2)).join('');}
function icon(type,i){
 switch(type){
 case 'protein':return i===0||i===2?beads(i):i===1?path('M-40 20 q12 -70 24 0 t24 0 t24 0',i):circle(-20,0,22,i)+circle(20,0,22,i);
 case 'dna':return i===1?circle(0,0,24,i)+helix(i):helix(i);
 case 'rna':return i===1?circle(0,0,30,i)+path('M-42 15 H42',i):beads(i)+path('M-40 32 H40',i,2);
 case 'membrane':return i===3?circle(0,0,28,i)+lipid(i):lipid(i)+`<g transform="rotate(180)">${lipid(i)}</g>`;
 case 'lipid':return i===0?circle(0,0,32,i)+circle(0,0,14,i):path('M-30 -25 v50 M-30 -20 h15 l10 12 10 -12 10 12 10 -12 M-30 0 h15 l10 12 10 -12 10 12 10 -12 M-30 20 h15 l10 12 10 -12 10 12 10 -12',i,3);
 case 'enzyme':return path('M-35 -25 Q-50 0 -28 25 Q0 45 35 20 L10 0 L35 -25 Q0 -45 -35 -25 Z',i)+path('M15 -8 l15 -17 16 17 -16 17Z',i,3);
 case 'kinetics':return path('M-40 -30 V30 H45',i,2)+path(i===0?'M-35 25 L35 -20':i===1?'M-35 25 Q0 -10 35 -18':i===2?'M-35 25 Q-20 -25 35 -25':'M-35 25 Q-20 0 35 -5',i);
 case 'experiment':return i===0||i===2?path('M-25 -35 H25 V15 Q0 45 -25 15Z M-25 -20 H25 M-20 -5 H20',i):path('M-40 -30 H40 V30 H-40Z M-25 -5 H-5 M5 12 H27 M-20 22 H0',i);
 case 'carbohydrate':return path('M-30 -15 L0 -32 L30 -15 V18 L0 34 L-30 18Z',i)+circle(0,0,5,i);
 case 'balance':return path('M0 -28 V30 M-40 30 H40 M-40 -12 H40 M-30 -12 l-14 22 h28Z M30 -12 l-14 22 h28Z',i,3);
 case 'energy':return path('M-40 -30 V30 H45',i,2)+path(i===1||i===3?'M-35 20 Q-5 -55 20 0 T42 15':'M-35 5 H-5 L10 20 H40',i);
 case 'signal':return i===0?circle(0,0,18,i):i===1?path('M-40 15 H-12 V-10 H12 V15 H40',i)+circle(0,-22,10,i):path('M-35 0 H-15 M-5 0 H15 M25 0 H42',i)+[-25,5,35].map(x=>circle(x,0,8,i)).join('');
 case 'transport':return path('M-40 -12 H-12 M12 -12 H40 M-40 12 H-12 M12 12 H40 M-12 -22 V22 M12 -22 V22',i)+circle(0,0,5,i);
 case 'respiration':return path('M-45 -15 H-16 M16 -15 H45 M-45 15 H-16 M16 15 H45',i)+path('M-16 -27 H16 V27 H-16Z',i)+circle(0,0,7,i);
 case 'cycle':return path('M-30 -15 Q0 -45 30 -15 Q50 10 20 30 Q-10 45 -30 15 Q-45 0 -30 -15',i)+circle(0,0,7,i);
 default:return circle(0,0,29,i)+path('M-18 0 H18 M0 -18 V18',i);
 }
}
// Explicit directed relationships only; no universal ordering inferred from node arrays.
function biochemicalSvg(asset,focus=[],chosen=[],standalone=false,interactive=false){
 const positions=[[155,105],[485,105],[155,295],[485,295]],edges=asset.edges.map(edge=>[asset.nodes.findIndex(n=>n.id===edge.from),asset.nodes.findIndex(n=>n.id===edge.to)]);
 const connectors=edges.map(([a,b],j)=>{const [x,y]=positions[a],[u,v]=positions[b],dx=u-x,dy=v-y,d=Math.hypot(dx,dy),sx=x+dx/d*80,sy=y+dy/d*66,tx=u-dx/d*80,ty=v-dy/d*66;return `<path class="flow" d="M${sx} ${sy} Q${(sx+tx)/2+(a>b?25:0)} ${(sy+ty)/2+(a>b?25:0)} ${tx} ${ty}" fill="none" stroke="${ink(j)}" stroke-width="4" marker-end="url(#bio-flow-arrow)"/>`;}).join('');
 const parts=asset.nodes.map((n,i)=>{const [x,y]=positions[i];return `<g data-part="${e(n.id)}" ${interactive?`role="button" tabindex="0" data-${interactive==='explore'?'explore':'select'}-part="${e(n.id)}" aria-label="${e(n.label)}" aria-pressed="${(interactive==='explore'?focus:chosen).includes(n.id)}"`:''} class="entity bio-part ${focus.includes(n.id)?'focus':''} ${chosen.includes(n.id)?'selected':''}"><g transform="translate(${x} ${y})">${icon(asset.visual.type,i)}</g><text class="part-label" x="${x}" y="${y+64}" text-anchor="middle">${e(n.label)}</text></g>`;}).join('');
 let svg=`<svg class="biochemistry-illustration" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" role="${interactive?'group':'img'}" aria-label="${e(asset.title)} — original biochemical concept schematic"><defs><marker id="bio-flow-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6" fill="var(--v-gold)"/></marker></defs><text class="anatomy-note" x="320" y="28" text-anchor="middle">${edges.length?'Qualitative process relationships':'Concept symbols · not molecular structures'}</text>${connectors}${parts}</svg>`;
 if(standalone)svg=svg.replace('<svg ','<svg style="--v-blue:#2563eb;--v-red:#be123c;--v-gold:#a16207;--v-green:#047857;--v-purple:#7c3aed;--card:#fff;--ink:#0f172a;--sec:#334155;background:#fff" ').replace('><defs>','><style>.part-label{font:750 17px system-ui,sans-serif;fill:#0f172a;paint-order:stroke;stroke:#fff;stroke-width:4px}.anatomy-note{font:600 16px system-ui,sans-serif;fill:#334155}.flow{stroke-dasharray:2 19;stroke-linecap:round}</style><defs>');
 return svg;
}

return {biochemicalSvg};})();
__modules.diagram=(()=>{
const {biochemicalSvg}=__modules.visuals;
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function diagram(asset,focus=[],selection=false,chosen=[],teaching=false,motion=true){
 const e=escapeHtml;const illustration=biochemicalSvg(asset,focus,chosen,false,teaching?'explore':selection?'select':false);if(illustration){const animated=/class="[^"]*\b(flow|breath|diaphragm-motion|separate-left|thin-left)\b/.test(illustration);const legend=`<ul class="diagram-key">${asset.nodes.map(n=>`<li class="${focus.includes(n.id)?'key-active':''}">${e(n.label)}</li>`).join('')}</ul>`;return `<figure class="biochemistry-figure" data-playing="${teaching&&motion&&animated}" data-visual="${e(asset.visual.type)}">${illustration}${legend}<figcaption>${e(asset.context)}</figcaption>${teaching&&animated?`<div class="visual-controls"><button data-action="playVisual" ${motion?'':'disabled'} aria-pressed="${motion}">${motion?'Pause process':'Motion reduced'}</button><button data-action="replayVisual" ${motion?'':'disabled'}>Replay process</button><span>Process overview · Select a structure or use lesson steps.</span></div>`:''}</figure>${selection?`<div class="choices" role="group" aria-label="Select diagram entities">${asset.nodes.map(n=>`<button data-node="${e(n.id)}" aria-pressed="${chosen.includes(n.id)}">${e(n.label)}</button>`).join('')}</div>`:''}`;}const nodes=Object.fromEntries(asset.nodes.map(n=>[n.id,n]));
 const lines=asset.edges.map(edge=>{const a=nodes[edge.from],b=nodes[edge.to],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy),offset=Math.min(92/Math.abs(dx),31/Math.abs(dy))*d;return `<line x1="${a.x+dx/d*offset}" y1="${a.y+dy/d*offset}" x2="${b.x-dx/d*offset}" y2="${b.y-dy/d*offset}" marker-end="url(#arrow)"/>`;}).join('');
 return `<figure><svg viewBox="0 0 400 230" role="img" aria-label="${e(asset.title)}"><defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6"/></marker></defs>${lines}${asset.nodes.map(n=>`<g class="entity ${focus.includes(n.id)?'focus':''} ${chosen.includes(n.id)?'selected':''}"><rect x="${n.x-86}" y="${n.y-25}" width="172" height="50" rx="9"/><text x="${n.x}" y="${n.y+5}" text-anchor="middle">${e(n.label)}</text></g>`).join('')}</svg><figcaption>${e(asset.context)}</figcaption></figure>${selection?`<div class="choices" role="group" aria-label="Select diagram entities">${asset.nodes.map(n=>`<button data-node="${e(n.id)}" aria-pressed="${chosen.includes(n.id)}">${e(n.label)}</button>`).join('')}</div>`:''}`;
}

return {escapeHtml,diagram};})();
__modules.learn=(()=>{
const {diagram,escapeHtml:e}=__modules.diagram;
function teachingCards(lesson){return `<aside class="tstack teaching-cards" aria-label="Concept teaching cards">${[['coreRule','Core Rules','rule'],['memoryCue','Memory Cues','cue'],['traps','Common Mistakes / MCAT Traps','trap'],['application','MCAT Applications','app']].map(([key,label,type])=>{const card=lesson[key];return `<details class="tcard tc-${type}" data-card="${key}" ${type==='rule'?'open':''}><summary><span class="card-heading"><h3>${label}</h3><span class="card-hook">${e(card.title)}</span></span></summary><div class="card-body">${card.paragraphs.map(p=>`<p>${e(p)}</p>`).join('')}</div></details>`;}).join('')}<button class="practice-concept" data-action="practiceConcept">Practice this concept →</button></aside>`;}
function learnView(chapter,assets,index,step,options={}){const l=chapter.lessons[index];return `<nav class="cnav" aria-label="Concepts">${chapter.lessons.map((x,i)=>`<button class="cbtn" data-lesson="${i}" aria-pressed="${i===index}">${e(x.title)}</button>`).join('')}</nav><div class="grid2"><section class="card"><h2>${e(l.title)}</h2><p>Outline section ${e(l.section)} · Step ${step+1} of ${l.steps.length}</p>${diagram(assets[l.asset],l.steps[step].focus,false,[],true,options.motion!==false)}<p class="step" aria-live="polite">${e(l.steps[step].text)}</p><div class="actions"><button data-action="previous" ${step===0?'disabled':''}>Previous step</button><button data-action="next" ${step===l.steps.length-1?'disabled':''}>Next step</button></div></section>${teachingCards(l)}</div>`;}

return {teachingCards,learnView};})();
__modules.practice=(()=>{
const {diagram,escapeHtml:e}=__modules.diagram;
function stageKey(exercise,stage){return exercise.id+'/'+stage.id;}
function practiceView(chapter,assets,index,stageIndex,state,chosen,feedback){
 const ex=chapter.exercises[index],s=ex.stages[stageIndex],key=stageKey(ex,s),record=state.stages[key]||{},done=record.done===true;
 const options=s.type==='choice'?`<fieldset><legend>Choose one answer</legend>${s.options.map((o,i)=>`<label class="option"><input type="radio" name="answer" value="${i}" ${done?'disabled':''}> ${e(o)}</label>`).join('')}</fieldset>`:s.type==='selection'?'':`<label for="answer">Answer${s.unit?' ('+e(s.unit)+')':''}</label><input id="answer" name="answer" autocomplete="off" ${s.type==='number'?'inputmode="decimal"':''} ${done?'disabled':''}>`;
 const answer=s.type==='choice'?s.options[s.answer]:s.type==='selection'?s.answer.map(id=>assets[s.asset||ex.asset].nodes.find(n=>n.id===id).label).join(', '):s.answer+(s.unit&&s.unit!=='dimensionless'?' '+s.unit:'');
 return `<nav class="cnav" aria-label="Workshops">${chapter.exercises.map((x,i)=>`<button class="cbtn" data-exercise="${i}" aria-pressed="${i===index}">${e(x.title)}</button>`).join('')}</nav><section class="card practice"><h2>${e(ex.title)}</h2><p>Stage ${stageIndex+1} of ${ex.stages.length}</p><h3 id="question">${e(s.prompt)}</h3>${diagram(assets[s.asset||ex.asset],[],s.type==='selection'&&!done,chosen)}<form id="answer-form" aria-labelledby="question">${options}${done?'':`<button type="submit">Check answer</button>`}</form><p id="feedback" role="status" class="${done?'completed':''}">${e(done?(record.assisted?'Completed with assistance.':'Independently solved.') : feedback)}</p>${Array.from({length:record.hints||0},(_,i)=>`<p class="hint">Hint ${i+1}: ${e(s.hints[i])}</p>`).join('')}${done?`<div class="solution"><p><strong>Answer: ${e(answer)}</strong></p><p>${e(s.explanation)}</p></div><button data-action="advance">${stageIndex+1<ex.stages.length?'Next stage':'Restart workshop'}</button>`:`<div class="actions"><button data-action="hint" ${(record.hints||0)>=s.hints.length?'disabled':''}>Progressive hint</button><button data-action="reveal">Reveal answer (assisted)</button></div>`}</section>`;
}

return {stageKey,practiceView};})();
__modules.app=(()=>{
const {validateAnswer}=__modules.validation;
const {fresh,readProgress,writeProgress,sanitize}=__modules.progress;
const {escapeHtml:e}=__modules.diagram;
const {learnView}=__modules.learn;
const {practiceView,stageKey}=__modules.practice;
const data=JSON.parse(document.getElementById('biochemistry-data').textContent),assets=Object.fromEntries(data.assets.assets.map(a=>[a.id,a]));
let chapter=data.chapters[0];
const ids=new Set(data.chapters.flatMap(c=>c.exercises.flatMap(ex=>ex.stages.map(s=>stageKey(ex,s)))));
let storage;try{storage=window.localStorage;}catch{storage={getItem(){throw Error();},setItem(){throw Error();}};}
let loaded=readProgress(storage,ids),state=loaded.state,warning=loaded.warning,mode='learn',lesson=0,step=0,exercise=0,stage=0,chosen=[],feedback='';
const view=document.getElementById('view');
function current(){const ex=chapter.exercises[exercise],s=ex.stages[stage];return {ex,s,key:stageKey(ex,s)};}
function save(){warning=writeProgress(storage,state)||warning;}
function render(){const active=document.activeElement;const action=active?.closest('#view')?active.dataset.action:undefined;document.documentElement.dataset.theme=state.theme;document.documentElement.classList.toggle('no-motion',state.reduced);document.body.classList.toggle('dark',state.theme==='dark');
 document.getElementById('warning').textContent=warning;
 document.getElementById('theme').setAttribute('aria-pressed',state.theme==='dark');document.getElementById('motion').setAttribute('aria-pressed',state.reduced);
 document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-current',b.dataset.mode===mode?'page':'false'));
 const chapterIds=new Set(chapter.exercises.flatMap(ex=>ex.stages.map(s=>stageKey(ex,s))));const records=Object.entries(state.stages).filter(([id])=>chapterIds.has(id)).map(([,r])=>r);document.getElementById('progress').textContent=`${records.filter(r=>r.done&&!r.assisted).length} independent · ${records.filter(r=>r.done&&r.assisted).length} assisted / ${chapterIds.size} stages · ${chapter.title}`;
 document.getElementById('scope').textContent=chapter.scopeNote;
 view.innerHTML=mode==='learn'?learnView(chapter,assets,lesson,step,{motion:!state.reduced&&!matchMedia('(prefers-reduced-motion: reduce)').matches}):practiceView(chapter,assets,exercise,stage,state,chosen,feedback);
 if(action){const target=view.querySelector(`[data-action="${action}"]:not(:disabled)`);const fallback=view.querySelector(mode==='learn'?'.step':action==='practiceConcept'?'#question':'#feedback');const focus=target||fallback;if(focus){if(!target)focus.tabIndex=-1;focus.focus({preventScroll:true});}}
}
function download(name,content,type){const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
document.addEventListener('click',async event=>{const b=event.target.closest('button,[data-explore-part],[data-select-part]');if(!b||b.disabled)return;
 if(b.dataset.explorePart){const next=chapter.lessons[lesson].steps.findIndex(s=>s.focus.includes(b.dataset.explorePart));if(next>=0){step=next;render();const part=view.querySelector(`[data-explore-part="${b.dataset.explorePart}"]`);part?.focus({preventScroll:true});}return;}
 if(b.dataset.action==='playVisual'||b.dataset.action==='replayVisual'){const figure=b.closest('.biochemistry-figure');if(state.reduced||matchMedia('(prefers-reduced-motion: reduce)').matches)return;if(b.dataset.action==='replayVisual'){figure.dataset.playing='true';void figure.offsetWidth;figure.getAnimations({subtree:true}).forEach(animation=>{animation.currentTime=0;});}else figure.dataset.playing=figure.dataset.playing==='true'?'false':'true';const control=figure.querySelector('[data-action=playVisual]');control.textContent=figure.dataset.playing==='true'?'Pause process':'Play process';control.setAttribute('aria-pressed',figure.dataset.playing);return;}
 if(b.dataset.mode){mode=b.dataset.mode;feedback='';chosen=[];}
 else if(b.dataset.lesson!==undefined){lesson=Number(b.dataset.lesson);step=0;}
 else if(b.dataset.exercise!==undefined){exercise=Number(b.dataset.exercise);stage=0;chosen=[];feedback='';}
 else if(b.dataset.node||b.dataset.selectPart){const id=b.dataset.node||b.dataset.selectPart;chosen=chosen.includes(id)?chosen.filter(n=>n!==id):[...chosen,id];const pressed=chosen.includes(id);b.setAttribute('aria-pressed',pressed);view.querySelectorAll('[data-node],[data-select-part]').forEach(el=>el.setAttribute('aria-pressed',chosen.includes(el.dataset.node||el.dataset.selectPart)));view.querySelectorAll('.entity').forEach((g,i)=>g.classList.toggle('selected',chosen.includes(assets[current().s.asset||current().ex.asset].nodes[i].id)));return;}
 else {const action=b.dataset.action;
 if(action==='practiceConcept'){const target=chapter.exercises.findIndex(ex=>ex.asset===chapter.lessons[lesson].asset);if(target<0)return;mode='practice';exercise=target;stage=0;chosen=[];feedback='';}
 else if(action==='next')step++;else if(action==='previous')step--;
 else if(action==='theme'){state.theme=state.theme==='dark'?'light':'dark';save();}
 else if(action==='motion'){state.reduced=!state.reduced;save();}
 else if(action==='hint'||action==='reveal'){const {key}=current(),r=state.stages[key]||{done:false,assisted:false,hints:0};r.assisted=true;if(action==='hint')r.hints=Math.min(r.hints+1,2);else r.done=true;state.stages[key]=r;save();}
 else if(action==='advance'){if(stage+1<current().ex.stages.length)stage++;else{const ex=current().ex;ex.stages.forEach(s=>delete state.stages[stageKey(ex,s)]);stage=0;save();}chosen=[];feedback='';}
 else if(action==='export'){download('biochemistry-progress.json',JSON.stringify(state,null,2),'application/json');return;}
 else if(action==='reset'){if(!confirm('Reset all Biochemistry progress and preferences?'))return;state=fresh();stage=0;chosen=[];feedback='';save();}
 else if(action==='save-app'){try{let html;if(location.protocol==='file:'){const root=document.documentElement.cloneNode(true);root.querySelector('#view').innerHTML='';html='<!doctype html>\n'+root.outerHTML;}else{const r=await fetch('Biochemistry-Field-Notes-offline.html');if(!r.ok)throw Error();html=await r.text();}download('Biochemistry-Field-Notes-offline.html',html,'text/html');}catch{warning='Download unavailable. Use the standalone HTML supplied with this build.';} }
 else return;}
 render();
});
document.addEventListener('submit',event=>{if(event.target.id!=='answer-form')return;event.preventDefault();const {s,key}=current(),form=event.target;
 const value=s.type==='selection'?chosen:s.type==='choice'?(form.querySelector(':checked')?Number(form.querySelector(':checked').value):null):form.elements.answer.value;
 if(validateAnswer(s,value)){state.stages[key]={done:true,assisted:state.stages[key]?.assisted===true,hints:state.stages[key]?.hints||0};save();feedback='';}else feedback='Not correct yet. Reconsider the mechanism, or use a hint.';render();const message=document.getElementById('feedback');message.tabIndex=-1;message.focus({preventScroll:true});
});
document.getElementById('import').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{if(file.size>200000)throw Error('Progress file exceeds 200 KB.');state=sanitize(JSON.parse(await file.text()),ids);stage=0;chosen=[];feedback='';save();warning='Progress imported.';}catch(error){warning='Import rejected: '+error.message;}event.target.value='';render();});
document.getElementById('catalog').addEventListener('change',event=>{const next=data.chapters.find(c=>c.id===event.target.value);if(!next)return;chapter=next;lesson=0;step=0;exercise=0;stage=0;chosen=[];feedback='';render();view.focus({preventScroll:true});});
document.getElementById('catalog').innerHTML=data.catalog.chapters.map(c=>`<option value="${c.id}" ${c.status==='planned'?'disabled':''}>${c.number}. ${e(c.title)}${c.status==='planned'?' — planned':c.status==='pilot'?' — pilot':''}</option>`).join('');
render();

document.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.matches('[data-explore-part],[data-select-part]')){event.preventDefault();event.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});

return {};})();
})();