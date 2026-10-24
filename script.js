const images=Array.from({length:12},(_,i)=>({src:`slike/slika${i+1}.jpg`,title:`Fotografija ${i+1}`}));
const gallery=document.querySelector('#gallery');
const viewer=document.querySelector('#viewer');
const large=document.querySelector('#large');
const caption=document.querySelector('#caption');
images.forEach(({src,title},i)=>{
 const card=document.createElement('article');card.className='photo-card';
 const open=document.createElement('button');open.className='photo-open';open.setAttribute('aria-label',`Povečaj ${title}`);
 const img=document.createElement('img');img.src=src;img.alt=title;img.loading=i<4?'eager':'lazy';
 const label=document.createElement('span');label.className='photo-title';label.textContent=title;
 open.append(img,label);open.addEventListener('click',()=>{large.src=src;large.alt=title;caption.textContent=title;viewer.showModal()});
 card.append(open);gallery.append(card);
});
document.querySelector('#close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});
document.querySelector('#year').textContent=new Date().getFullYear();
const board=document.querySelector('#memory');const movesEl=document.querySelector('#moves');const pairsEl=document.querySelector('#pairs');const message=document.querySelector('#game-message');
let deck=[],flipped=[],matched=0,moves=0,locked=false,round=0;
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function startGame(){round++;board.innerHTML='';flipped=[];matched=0;moves=0;locked=false;movesEl.textContent='0';pairsEl.textContent='0 / 6';message.textContent='Izberi dve kartici in poišči par! ✨';const chosen=shuffle([...images]).slice(0,6);deck=shuffle([...chosen,...chosen].map((photo,i)=>({...photo,uid:i})));deck.forEach((photo,i)=>{const btn=document.createElement('button');btn.className='memory-card';btn.textContent='?';btn.setAttribute('aria-label',`Obrni kartico ${i+1}`);btn.addEventListener('click',()=>flip(i));board.append(btn)})}
function showCard(i){const b=board.children[i];b.textContent='';const img=document.createElement('img');img.src=deck[i].src;img.alt=deck[i].title;b.append(img);b.setAttribute('aria-label',deck[i].title)}
function hideCard(i){const b=board.children[i];b.replaceChildren(document.createTextNode('?'));b.setAttribute('aria-label',`Obrni kartico ${i+1}`)}
function flip(i){if(locked||flipped.includes(i)||board.children[i].disabled)return;showCard(i);flipped.push(i);if(flipped.length<2)return;moves++;movesEl.textContent=moves;const [a,b]=flipped;if(deck[a].src===deck[b].src){board.children[a].disabled=true;board.children[b].disabled=true;board.children[a].classList.add('matched');board.children[b].classList.add('matched');matched++;pairsEl.textContent=`${matched} / 6`;flipped=[];message.textContent=matched===6?`Bravo! 🎉 Vseh 6 parov si našel/-la v ${moves} poskusih!`:'Odlično, našel/-la si par!'}else{locked=true;message.textContent='Poskusi znova! ';const thisRound=round;setTimeout(()=>{if(round!==thisRound)return;hideCard(a);hideCard(b);flipped=[];locked=false},900)}}
document.querySelector('#restart').addEventListener('click',startGame);startGame();
