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
