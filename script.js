'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const pages=['about','slovenia','world','solutions'];
function navigate(){const id=location.hash.slice(1);const page=pages.includes(id)?id:'about';$$('.page').forEach(e=>e.classList.toggle('active',e.id===page));$$('nav a').forEach(a=>{const active=a.hash==='#'+page;a.classList.toggle('active',active);active?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});window.scrollTo({top:0,behavior:'instant'})}window.addEventListener('hashchange',navigate);navigate();
// Exactly three photographs per tab; external photographs load when connected to the internet.
const galleries={about:[['Old-growth forest','photo-1448375240586-882707db888b'],['Forest biodiversity','photo-1473448912268-2022ce9509d8'],['Natural woodland','photo-1441974231531-c6227db76b6e']],slovenia:[['Forested mountains','photo-1464822759023-fed622ff2c3b'],['Woodland wildlife','photo-1484406566174-9da000fda645'],['Protected landscapes','photo-1500534623283-312aade485b7']],world:[['Tropical rainforest','photo-1441974231531-c6227db76b6e'],['Forest habitats','photo-1473448912268-2022ce9509d8'],['Mountain ecosystems','photo-1464822759023-fed622ff2c3b']],solutions:[['Healthy forests','photo-1448375240586-882707db888b'],['Restoration landscapes','photo-1500534623283-312aade485b7'],['Nature conservation','photo-1441974231531-c6227db76b6e']]};
for(const [name,items] of Object.entries(galleries)){const gallery=document.querySelector(`[data-gallery="${name}"]`);items.forEach(([caption,id])=>{const b=document.createElement('button');b.type='button';b.className='photo';const img=document.createElement('img');img.src=`https://images.unsplash.com/${id}?w=720&q=80`;img.alt=caption;img.loading='lazy';const span=document.createElement('span');span.textContent=caption;b.append(img,span);b.onclick=()=>{$('#lightbox-img').src=img.src;$('#lightbox-img').alt=caption;$('#lightbox-caption').textContent=caption;$('#lightbox').showModal()};gallery.append(b)})}$('#close-lightbox').onclick=()=>$('#lightbox').close();$('#lightbox').onclick=e=>{if(e.target===$('#lightbox'))$('#lightbox').close()};
const locations=[{name:'Amazon Rainforest',country:'Brazil',x:28,y:57,issue:'Deforestation',animal:'Jaguar',fact:'Large connected forest areas support jaguars and their prey.',desc:'Restore native vegetation in a fragmented forest clearing.',tools:[['Native trees',2],['Soil recovery',2],['Protect regrowth',2]],budget:7},{name:'Borneo Rainforest',country:'Indonesia · Borneo',x:77,y:56,issue:'Habitat fragmentation',animal:'Bornean orangutan',fact:'Orangutans depend on connected forest habitat for food, shelter and movement.',desc:'Reconnect forest canopy and improve the habitat for orangutans.',tools:[['Canopy bridge',3],['Native trees',2],['Safe corridor',2]],budget:8},{name:'Congo Basin',country:'Central Africa',x:52,y:55,issue:'Wildlife protection',animal:'Forest elephant',fact:'Forest elephants disperse seeds and help shape rainforest ecosystems.',desc:'Protect important forest habitat and reduce wildlife disturbance.',tools:[['Protected zone',3],['Wildlife corridor',2],['Habitat monitoring',2]],budget:8},{name:'Madagascar Forests',country:'Madagascar',x:59,y:70,issue:'Forest degradation',animal:'Lemur',fact:'Many lemur species occur only in Madagascar and depend on healthy native habitats.',desc:'Restore degraded forest and improve habitat for endemic wildlife.',tools:[['Native seedlings',2],['Soil protection',2],['Habitat shelter',2]],budget:7},{name:'Sumatra Rainforest',country:'Indonesia · Sumatra',x:72,y:59,issue:'Multiple forest threats',animal:'Sumatran tiger',fact:'Sumatran tigers need protected habitat and enough prey to survive.',desc:'Combine habitat restoration, protection and wildlife corridors.',tools:[['Forest recovery',3],['Wildlife corridor',3],['Protected zone',3]],budget:10}];
// Simplified vector world map with region markers (educational locator, not a political boundary map).
function mapMarkup(kind){const mapId=kind==='info'?'info':'missions';return `<svg viewBox="0 0 1000 480" role="img" aria-label="World map with five selectable forest regions"><defs><pattern id="grid-${mapId}" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="#ffffff" stroke-opacity=".09"/></pattern></defs><rect width="1000" height="480" fill="url(#grid-${mapId})"/><g fill="#426d58" stroke="#719c7d" stroke-width="2" opacity=".93"><path d="M82 89L155 51 241 60 294 101 270 144 220 163 204 212 174 196 139 151 104 151Z"/><path d="M220 221L275 238 298 294 271 353 253 423 216 378 193 306Z"/><path d="M410 99L468 75 511 92 537 129 511 156 466 147 433 170 411 142Z"/><path d="M455 183L524 180 561 231 552 311 514 365 473 328 451 258Z"/><path d="M529 94L614 65 733 72 829 104 893 159 846 206 785 196 749 241 705 223 661 178 612 185 569 151Z"/><path d="M789 320L856 314 908 353 877 396 814 392 783 353Z"/><path d="M568 326L586 343 580 390 563 365Z"/><path d="M714 270L746 278 735 291Z"/><path d="M763 288L808 298 815 309 767 303Z"/></g><g font-size="12" fill="#c9ded3" letter-spacing="2"><text x="155" y="108">N. AMERICA</text><text x="213" y="290">S. AMERICA</text><text x="465" y="124">EUROPE</text><text x="483" y="259">AFRICA</text><text x="672" y="128">ASIA</text><text x="802" y="358">AUSTRALIA</text></g>${locations.map((l,i)=>`<g class="map-marker" role="button" tabindex="0" data-map="${kind}" data-id="${i}" aria-label="${l.name}, ${l.country}"><circle cx="${l.x*10}" cy="${l.y*4.8}" r="12"/><text x="${l.x*10+18}" y="${l.y*4.8+4}">${i+1}</text></g>`).join('')}</svg>`}
$('#info-map').innerHTML=mapMarkup('info');$('#mission-map').innerHTML=mapMarkup('mission');
// The informational comparison map is independent of the restoration missions.
const worldStories=[
 {lat:-3.5,lng:-62.5,problem:'Deforestation',description:'Agricultural expansion and illegal clearing can remove large areas of Amazon rainforest, destroying habitats and disrupting the water cycle.',action:'Protect existing rainforest, support Indigenous stewardship and restore native forest vegetation.',before:'amazon-before',after:'amazon-after'},
 {lat:0.7,lng:114.2,problem:'Habitat fragmentation',description:'Roads and land conversion divide Borneo’s rainforest into isolated patches, making it harder for orangutans and other animals to move safely.',action:'Protect connected forest corridors and reconnect fragmented habitats.',before:'borneo-before',after:'borneo-after'},
 {lat:-0.8,lng:21.5,problem:'River pollution',description:'Sediment and pollution associated with mining and land disturbance can damage waterways in the Congo Basin and affect freshwater wildlife.',action:'Prevent harmful runoff, improve mining practices and restore riverbanks.',before:'congo-before',after:'congo-after'},
 {lat:-18.8,lng:46.7,problem:'Soil erosion',description:'In Madagascar, vegetation loss can expose fragile soils to heavy rainfall, causing erosion and reducing the land’s ability to support life.',action:'Restore native plants, stabilize slopes and protect remaining vegetation.',before:'madagascar-before',after:'madagascar-after'},
 {lat:0.5,lng:101.2,problem:'Endangered wildlife',description:'In Sumatra, conversion of diverse rainforest into plantations reduces the habitat available to threatened wildlife such as Sumatran tigers.',action:'Conserve tiger habitat, protect wildlife corridors and prevent further forest conversion.',before:'sumatra-before',after:'sumatra-after'}
];
function showWorldStory(i){
 const l=locations[i],s=worldStories[i],detail=$('#info-detail');
 detail.replaceChildren();
 const eyebrow=document.createElement('span');eyebrow.className='eyebrow';eyebrow.textContent=l.country;
 const title=document.createElement('h3');title.textContent=l.name;
 const issue=document.createElement('p');const strong=document.createElement('strong');strong.textContent='The problem: '+s.problem;issue.append(strong);
 const desc=document.createElement('p');desc.textContent=s.description;
 const compare=document.createElement('div');compare.className='world-compare';compare.style.setProperty('--reveal','50%');
 const imageUrl=id=>'images/'+id+'.jpg';
 const after=document.createElement('img');after.src=imageUrl(s.after);after.alt='Illustration of a healthier ecosystem in '+l.name;after.loading='lazy';after.className='compare-after';
 const before=document.createElement('img');before.src=imageUrl(s.before);before.alt='Illustration of '+s.problem.toLowerCase()+' in '+l.name;before.loading='lazy';before.className='compare-before';
 const line=document.createElement('div');line.className='compare-line';line.setAttribute('aria-hidden','true');
 const bad=document.createElement('span');bad.className='compare-label compare-label-before';bad.textContent='DAMAGED';
 const good=document.createElement('span');good.className='compare-label compare-label-after';good.textContent='HEALTHY';
 const slider=document.createElement('input');slider.type='range';slider.min='0';slider.max='100';slider.value='50';slider.className='compare-range';slider.setAttribute('aria-label','Drag to compare damaged and restored forest');slider.addEventListener('input',()=>compare.style.setProperty('--reveal',slider.value+'%'));
 compare.append(after,before,line,bad,good,slider);
 const solution=document.createElement('p');const solutionTitle=document.createElement('strong');solutionTitle.textContent='What helps: ';solution.append(solutionTitle,document.createTextNode(s.action));
 const note=document.createElement('small');note.className='compare-note';note.textContent='Illustrative digital scenes showing environmental damage and a possible healthier state, not actual before-and-after photographs.';
 detail.append(eyebrow,title,compare,issue,desc,solution,note);
}
function mapEvents(){
 $$('.map-marker').forEach(el=>{const activate=()=>{const i=+el.dataset.id;if(el.dataset.map==='info')showWorldStory(i);else chooseMission(i)};el.addEventListener('click',activate);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate()}})});
}
mapEvents();
// Offline-friendly satellite-style world map: a single bundled NASA Blue Marble image.
// No third-party map tiles are needed; map markers and stories remain independent of the missions.
{
 const mapContainer=$('#info-map');
 mapContainer.replaceChildren();
 mapContainer.classList.add('static-earth-map');
 const label=document.createElement('span');label.className='earth-map-label';label.textContent='SELECT A REGION';mapContainer.append(label);
 worldStories.forEach((s,i)=>{
  const button=document.createElement('button');button.type='button';button.className='earth-marker';
  button.style.left=((s.lng+180)/360*100)+'%';
  button.style.top=((85-s.lat)/145*100)+'%';
  button.textContent=String(i+1);button.title=locations[i].name;
  button.setAttribute('aria-label','Explore '+locations[i].name);
  button.addEventListener('click',()=>{mapContainer.querySelectorAll('.earth-marker').forEach(x=>x.classList.remove('selected'));button.classList.add('selected');showWorldStory(i)});
  mapContainer.append(button);
  if(i===0)button.classList.add('selected');
 });
 showWorldStory(0);
}

// Forest Guardians: nine real animal photographs hidden inside a moving flashlight beam.
const animals=[
 {name:'Eurasian lynx',wiki:'Eurasian_lynx',fact:'The Eurasian lynx is a shy wild cat. Its tufted ears help it detect sounds in the forest.',x:12,y:37},
 {name:'Brown bear',wiki:'Brown_bear',fact:'Brown bears are omnivores: they eat berries, insects, plants and sometimes other animals.',x:35,y:77},
 {name:'Grey wolf',wiki:'Wolf',fact:'Wolves live in family groups and communicate through calls, body language and scent.',x:58,y:52},
 {name:'Red fox',wiki:'Red_fox',fact:'Red foxes use their excellent hearing to find small animals hiding in grass or snow.',x:83,y:80},
 {name:'Red deer',wiki:'Red_deer',fact:'Male red deer grow new antlers each year, which they shed after the breeding season.',x:78,y:34},
 {name:'Eagle owl',wiki:'Eurasian_eagle-owl',fact:'The Eurasian eagle-owl is one of Europe’s largest owls and hunts mainly at night.',x:47,y:19},
 {name:'European badger',wiki:'European_badger',fact:'Badgers live in underground tunnel systems called setts.',x:22,y:85},
 {name:'Red squirrel',wiki:'Red_squirrel',fact:'Red squirrels bury seeds and nuts; forgotten stores can help new trees grow.',x:91,y:17},
 {name:'Roe deer',wiki:'Roe_deer',fact:'Roe deer are often active at dawn and dusk, browsing on leaves, shoots and herbs.',x:28,y:49}
];
const animalFallback=(name)=>'https://loremflickr.com/360/260/'+encodeURIComponent(name.replace(/ /g,','))+'/all';
const fgSaved=(()=>{try{return JSON.parse(localStorage.getItem('sdg15-guardians-v3')||'{}')}catch{return {}}})();
const discovered=new Set((fgSaved.animalCount===9 && Array.isArray(fgSaved.discovered) ? fgSaved.discovered : []).filter(i=>Number.isInteger(i)&&i>=0&&i<animals.length));
function saveFG(){localStorage.setItem('sdg15-guardians-v3',JSON.stringify({animalCount:9,discovered:[...discovered]}))}
const layer=$('#animal-layer');
const animalButtons=[];
animals.forEach((a,i)=>{
 const b=document.createElement('button');b.className='animal-spot';b.style.left=a.x+'%';b.style.top=a.y+'%';b.type='button';b.setAttribute('aria-label','Hidden forest animal');
 const img=document.createElement('img');img.alt='';img.loading='eager';img.src=animalFallback(a.name);b.append(img);
 b.addEventListener('click',()=>discoverAnimal(i));layer.append(b);animalButtons.push(b)
});
// Wikipedia page thumbnails supply recognizable wildlife photographs; fallback remains a photo.
(async()=>{try{
 const titles=animals.map(a=>a.wiki.replaceAll('_',' ')).join('|');
 const url='https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages&pithumbsize=420&titles='+encodeURIComponent(titles);
 const response=await fetch(url);if(!response.ok)return;
 const data=await response.json();const pages=Object.values(data.query?.pages||{});
 animals.forEach((a,i)=>{const page=pages.find(p=>p.title.toLowerCase().replaceAll(' ','_')===a.wiki.toLowerCase());if(page?.thumbnail?.source){animalButtons[i].querySelector('img').src=page.thumbnail.source}})
 }catch(e){/* The photographic fallback is retained when offline. */}})();
function renderFG(){
 const facts=$('#animal-facts');facts.replaceChildren();
 animals.forEach((a,i)=>{if(!discovered.has(i))return;
 const card=document.createElement('article');card.className='fact';const pic=document.createElement('img');pic.className='fact-photo';pic.alt=a.name;pic.src=animalButtons[i].querySelector('img').src;
 const content=document.createElement('div');const strong=document.createElement('b');strong.textContent=a.name;const desc=document.createElement('p');desc.textContent=a.fact;content.append(strong,desc);card.append(pic,content);facts.append(card)
 });
 animalButtons.forEach((b,i)=>b.classList.toggle('found',discovered.has(i)));
 $('#fg-progress').textContent=`Animals Found: ${discovered.size} / ${animals.length}`;
 $('#fg-status').textContent=discovered.size===animals.length?'ALL 9 FOUND':'ANIMAL SEARCH';
 if(discovered.size===animals.length)$('#fg-instruction').textContent='Congratulations! You discovered all nine forest animals. Read their facts below.'
}
function discoverAnimal(i){if(discovered.has(i)||!animalButtons[i].classList.contains('visible'))return;discovered.add(i);saveFG();renderFG()}
function flashlight(e){const r=$('#night-game').getBoundingClientRect();const x=Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100)),y=Math.max(0,Math.min(100,(e.clientY-r.top)/r.height*100));
 $('#night-game').style.setProperty('--x',x+'%');$('#night-game').style.setProperty('--y',y+'%');
 animalButtons.forEach((b,i)=>b.classList.toggle('visible',Math.hypot((x-animals[i].x)*r.width/100,(y-animals[i].y)*r.height/100)<105))
}
$('#night-game').addEventListener('pointermove',flashlight);
$('#night-game').addEventListener('pointerdown',e=>{flashlight(e);const r=$('#night-game').getBoundingClientRect();const x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;
 animals.forEach((a,i)=>{const dx=(x-a.x)*r.width/100,dy=(y-a.y)*r.height/100;if(Math.hypot(dx,dy)<22)discoverAnimal(i)})
});
renderFG();
$('#fg-replay').addEventListener('click',()=>{
 discovered.clear();
 localStorage.removeItem('sdg15-guardians'); // clear progress saved by older versions
 saveFG();
 $('#fg-instruction').textContent='Move your flashlight across the forest. Look carefully for nine hidden animals and tap each one to discover a fact.';
 $('#night-game').style.setProperty('--x','50%');
 $('#night-game').style.setProperty('--y','50%');
 animalButtons.forEach(b=>b.classList.remove('visible'));
 renderFG();
 $('#night-game').scrollIntoView({behavior:'smooth',block:'center'});
});
// Stop Deforestation: choose any mission, lock others until it is completed.
let progress;try{progress=JSON.parse(localStorage.getItem('sdg15-missions')||'{}')}catch{progress={}};if(!Array.isArray(progress.completed))progress.completed=[];if(!Number.isInteger(progress.active))progress.active=null;if(!progress.steps||typeof progress.steps!=='object')progress.steps={};let sector=0;let selectedTool=0;let inspected=new Set();const save=()=>localStorage.setItem('sdg15-missions',JSON.stringify(progress));
function renderMissionList(){const list=$('#mission-list');list.replaceChildren();locations.forEach((l,i)=>{const done=progress.completed.includes(i),active=progress.active===i,locked=progress.active!==null&&!active&&!done;const b=document.createElement('button');b.className='mission-btn'+(done?' complete':'')+(active?' active':'');b.disabled=locked||done;b.innerHTML=`<b>${done?'✓ ':active?'● ':locked?'Locked · ':''}${l.name}</b><span>${done?'100% Restored':active?'Continue mission':locked?'Finish active mission':l.issue}</span>`;b.onclick=()=>chooseMission(i);list.append(b)});const available=progress.active===null?5-progress.completed.length:1;$('#mission-status').textContent=progress.completed.length===5?'ALL RESTORED':progress.active!==null?'1 ACTIVE':available+' AVAILABLE';$('#mission-heading').textContent=progress.active===null?'Choose your forest':'Mission in progress'}
function chooseMission(i){if(progress.completed.includes(i))return;if(progress.active!==null&&progress.active!==i){$('#forest-feedback').textContent='Finish your active mission before choosing another forest.';return}if(progress.active===null){progress.active=i;progress.steps[i]=progress.steps[i]||[];save()}sector=0;selectedTool=0;inspected=new Set();$('#forest-game').hidden=false;$('#forest-location').textContent=locations[i].country;$('#forest-title').textContent=locations[i].name;$('#forest-description').textContent=locations[i].desc;$('#forest-feedback').textContent='Explore the forest, inspect wildlife and restore all three damaged areas.';renderMissionList();renderForest();$('#forest-game').scrollIntoView({behavior:'smooth',block:'start'})}
function renderForest(){const i=progress.active;if(i===null){$('#forest-game').hidden=true;return}const l=locations[i],done=progress.steps[i]||[],spent=done.reduce((s,j)=>s+l.tools[j][1],0);$('#forest-panorama').style.transform=`translateX(-${sector*100/3}%)`;$('#position-label').textContent=`Forest sector ${sector+1} / 3`;$('#move-left').disabled=sector===0;$('#move-right').disabled=sector===2;$('#forest-resources').textContent=`${l.budget-spent} / ${l.budget}`;$('#forest-percent').textContent=Math.round(done.length/3*100)+'%';$('#forest-animals').textContent=inspected.size;$('#forest-objects').replaceChildren();$('#forest-wildlife').replaceChildren();for(let j=0;j<3;j++){const obj=document.createElement('button');obj.className='forest-object'+(done.includes(j)?' fixed':'');obj.style.left=(j*33.333+10)+'%';obj.style.bottom=(15+(j%2)*11)+'%';obj.textContent=done.includes(j)?'✓ Restored area':'Damaged area '+(j+1);obj.setAttribute('aria-label',done.includes(j)?'Restored area':'Restore damaged area '+(j+1));obj.onclick=()=>{sector=j;restoreArea(j)};$('#forest-objects').append(obj);const animal=document.createElement('button');animal.className='forest-animal';animal.style.left=(j*33.333+21)+'%';animal.style.bottom=(28+(j%2)*10)+'%';animal.textContent=l.animal;animal.onclick=()=>{inspected.add(j);$('#wildlife-info').textContent=`${l.animal}: ${l.fact}`;$('#forest-animals').textContent=inspected.size};$('#forest-wildlife').append(animal)}const tools=$('#forest-tools');tools.replaceChildren();l.tools.forEach(([name,cost],j)=>{const b=document.createElement('button');b.textContent=`${name} · ${cost} points`;b.classList.toggle('selected',selectedTool===j);b.onclick=()=>{selectedTool=j;renderForest();$('#forest-feedback').textContent=`Selected ${name}. Click the damaged area in forest sector ${j+1} to apply it.`};tools.append(b)});$('#finish-mission').hidden=done.length!==3;$('#retry-mission').hidden=true}
function restoreArea(j){const i=progress.active;if(i===null)return;const l=locations[i],done=progress.steps[i];if(done.includes(j)){$('#forest-feedback').textContent='This area has already been restored.';return}if(selectedTool!==j){$('#forest-feedback').textContent=`This area needs ${l.tools[j][0].toLowerCase()}. Select that restoration tool first.`;return}const spent=done.reduce((s,k)=>s+l.tools[k][1],0);if(spent+l.tools[j][1]>l.budget){$('#forest-feedback').textContent='Not enough resources. Try another strategy.';$('#retry-mission').hidden=false;return}done.push(j);save();$('#forest-feedback').textContent=`Restored area ${j+1} with ${l.tools[j][0].toLowerCase()}. ${3-done.length} areas remaining.`;renderForest();if(done.length===3)$('#forest-feedback').textContent='All habitat areas restored. Complete the mission to unlock the other forests.'}
$('#move-left').onclick=()=>{sector=Math.max(0,sector-1);renderForest()};$('#move-right').onclick=()=>{sector=Math.min(2,sector+1);renderForest()};$('#forest-viewport').addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();sector=Math.max(0,Math.min(2,sector+(e.key==='ArrowRight'?1:-1)));renderForest()}});$('#back-map').onclick=()=>{$('#forest-game').hidden=true;$('#mission-map').scrollIntoView({behavior:'smooth',block:'center'})};$('#finish-mission').onclick=()=>{const i=progress.active;if(i===null||(progress.steps[i]||[]).length!==3)return;progress.completed.push(i);progress.active=null;save();$('#forest-game').hidden=true;renderMissionList();$('#mission-map').scrollIntoView({behavior:'smooth',block:'center'})};$('#retry-mission').onclick=()=>{if(progress.active===null)return;progress.steps[progress.active]=[];save();sector=0;renderForest();$('#forest-feedback').textContent='Mission reset. Your completed missions are still saved.'};renderMissionList();
