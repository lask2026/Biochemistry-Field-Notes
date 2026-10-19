
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
export function biochemicalSvg(asset,focus=[],chosen=[],standalone=false,interactive=false){
 const positions=[[155,105],[485,105],[155,295],[485,295]],edges=asset.edges.map(edge=>[asset.nodes.findIndex(n=>n.id===edge.from),asset.nodes.findIndex(n=>n.id===edge.to)]);
 const connectors=edges.map(([a,b],j)=>{const [x,y]=positions[a],[u,v]=positions[b],dx=u-x,dy=v-y,d=Math.hypot(dx,dy),sx=x+dx/d*80,sy=y+dy/d*66,tx=u-dx/d*80,ty=v-dy/d*66;return `<path class="flow" d="M${sx} ${sy} Q${(sx+tx)/2+(a>b?25:0)} ${(sy+ty)/2+(a>b?25:0)} ${tx} ${ty}" fill="none" stroke="${ink(j)}" stroke-width="4" marker-end="url(#bio-flow-arrow)"/>`;}).join('');
 const parts=asset.nodes.map((n,i)=>{const [x,y]=positions[i];return `<g data-part="${e(n.id)}" ${interactive?`role="button" tabindex="0" data-${interactive==='explore'?'explore':'select'}-part="${e(n.id)}" aria-label="${e(n.label)}" aria-pressed="${(interactive==='explore'?focus:chosen).includes(n.id)}"`:''} class="entity bio-part ${focus.includes(n.id)?'focus':''} ${chosen.includes(n.id)?'selected':''}"><g transform="translate(${x} ${y})">${icon(asset.visual.type,i)}</g><text class="part-label" x="${x}" y="${y+64}" text-anchor="middle">${e(n.label)}</text></g>`;}).join('');
 let svg=`<svg class="biochemistry-illustration" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" role="${interactive?'group':'img'}" aria-label="${e(asset.title)} — original biochemical concept schematic"><defs><marker id="bio-flow-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6" fill="var(--v-gold)"/></marker></defs><text class="anatomy-note" x="320" y="28" text-anchor="middle">${edges.length?'Qualitative process relationships':'Concept symbols · not molecular structures'}</text>${connectors}${parts}</svg>`;
 if(standalone)svg=svg.replace('<svg ','<svg style="--v-blue:#2563eb;--v-red:#be123c;--v-gold:#a16207;--v-green:#047857;--v-purple:#7c3aed;--card:#fff;--ink:#0f172a;--sec:#334155;background:#fff" ').replace('><defs>','><style>.part-label{font:750 17px system-ui,sans-serif;fill:#0f172a;paint-order:stroke;stroke:#fff;stroke-width:4px}.anatomy-note{font:600 16px system-ui,sans-serif;fill:#334155}.flow{stroke-dasharray:2 19;stroke-linecap:round}</style><defs>');
 return svg;
}
