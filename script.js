'use strict';
const sections = [...document.querySelectorAll('.page')];
const links = [...document.querySelectorAll('nav [data-page]')];
function showPage() {
  const requested = window.location.hash.slice(1);
  const id = sections.some(section => section.id === requested) ? requested : 'about';
  sections.forEach(section => section.classList.toggle('active', section.id === id));
  links.forEach(link => {
    const active = link.dataset.page === id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', showPage);
showPage();
document.querySelector('#year').textContent = new Date().getFullYear();
// Existing image filenames are reused: three photos per section.
const photos = {
  about: ['Forest ecosystems', 'Biodiversity', 'Healthy landscapes'],
  slovenia: ['Slovenian forests', 'Wildlife in Slovenia', 'Protected landscapes'],
  world: ['Forests around the world', 'Threatened habitats', 'Land and ecosystems'],
  solutions: ['Habitat protection', 'Restoring nature', 'Sustainable land use']
};
const viewer = document.querySelector('#viewer');
const viewerImage = document.querySelector('#viewer-image');
const viewerCaption = document.querySelector('#viewer-caption');
let imageNumber = 0;
Object.entries(photos).forEach(([section, captions]) => {
  const gallery = document.querySelector(`[data-gallery="${section}"]`);
  captions.forEach(caption => {
    imageNumber += 1;
    const src = `slike/slika${imageNumber}.jpg`;
    const button = document.createElement('button');
    button.className = 'photo-card';
    button.type = 'button';
    const img = document.createElement('img');
    img.src = src;
    img.alt = caption;
    img.loading = 'lazy';
    const label = document.createElement('span');
    label.textContent = caption;
    button.append(img, label);
    button.addEventListener('click', () => {
      viewerImage.src = src;
      viewerImage.alt = caption;
      viewerCaption.textContent = caption;
      viewer.showModal();
    });
    gallery.append(button);
  });
});
document.querySelector('#close-viewer').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });

// Interactive knowledge quiz
const quizItems = [
 {q:'How many Sustainable Development Goals are there?',a:['15','17','20'],correct:1,why:'The United Nations adopted 17 Sustainable Development Goals in 2015.'},
 {q:'What is the main focus of SDG 15?',a:['Life below water','Affordable energy','Life on land'],correct:2,why:'SDG 15 focuses on terrestrial ecosystems, forests, land and biodiversity.'},
 {q:'Which of these is a protected area in Slovenia?',a:['Triglav National Park','Sahara Desert','Great Barrier Reef'],correct:0,why:'Triglav National Park protects important natural landscapes in Slovenia.'},
 {q:'Which activity can contribute to biodiversity loss?',a:['Restoring native habitats','Destroying natural habitats','Protecting wildlife corridors'],correct:1,why:'Habitat destruction is a major driver of biodiversity loss.'},
 {q:'Which action helps protect life on land?',a:['Dumping waste in forests','Introducing invasive species','Restoring damaged ecosystems'],correct:2,why:'Thoughtful restoration can help ecosystems recover over time.'}
];
let quizIndex=0,quizScore=0;
const qProgress=document.querySelector('#quiz-progress'),qQuestion=document.querySelector('#quiz-question'),qAnswers=document.querySelector('#quiz-answers'),qFeedback=document.querySelector('#quiz-feedback'),qNext=document.querySelector('#quiz-next'),qRestart=document.querySelector('#quiz-restart');
function renderQuiz(){const item=quizItems[quizIndex];qProgress.textContent=`Question ${quizIndex+1} of ${quizItems.length} · Score: ${quizScore}`;qQuestion.textContent=item.q;qAnswers.replaceChildren();qFeedback.textContent='';qNext.hidden=true;qRestart.hidden=true;item.a.forEach((answer,i)=>{const b=document.createElement('button');b.type='button';b.textContent=answer;b.addEventListener('click',()=>{const correct=i===item.correct;if(correct)quizScore++;[...qAnswers.children].forEach((btn,j)=>{btn.disabled=true;if(j===item.correct)btn.classList.add('correct');else if(j===i)btn.classList.add('incorrect')});qFeedback.textContent=(correct?'Correct. ':'Not quite. ')+item.why;qProgress.textContent=`Question ${quizIndex+1} of ${quizItems.length} · Score: ${quizScore}`;if(quizIndex===quizItems.length-1){qNext.hidden=true;qRestart.hidden=false;qFeedback.textContent+=` Final score: ${quizScore}/${quizItems.length}.`;}else qNext.hidden=false;});qAnswers.append(b)});}
qNext.addEventListener('click',()=>{quizIndex++;renderQuiz()});qRestart.addEventListener('click',()=>{quizIndex=0;quizScore=0;renderQuiz()});renderQuiz();
// Conceptual restoration comparison slider
const slider=document.querySelector('#restore-slider'),restored=document.querySelector('#restored-scene'),divider=document.querySelector('#compare-divider'),output=document.querySelector('#restore-value');
function updateComparison(){const n=Number(slider.value);restored.style.clipPath=`inset(0 ${100-n}% 0 0)`;divider.style.left=`${n}%`;output.textContent=`${n}%`;}slider.addEventListener('input',updateComparison);updateComparison();
