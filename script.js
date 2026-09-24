const menuButton=document.querySelector('.menuButton');const nav=document.querySelector('.navLinks');menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.textContent=open?'Close':'Menu'});document.querySelectorAll('.navLinks a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.textContent='Menu'}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view')}),{threshold:.08});document.querySelectorAll('.section,.project,.timelineItem,.researchCard,.highlight,.heroCopy,.heroVisual').forEach(el=>{el.classList.add('reveal');observer.observe(el)});


// Hero perspective switcher
const heroTabs=document.querySelectorAll('[data-hero-tab]');
const heroPanes=document.querySelectorAll('[data-hero-pane]');
const heroImages=document.querySelectorAll('[data-hero-image]');
const heroCurrent=document.querySelector('[data-hero-current]');
const heroKicker=document.querySelector('[data-hero-kicker]');
let activeHero=0;
let heroTimer;

function setHeroPerspective(index, userInitiated=false){
  activeHero=index;
  heroTabs.forEach(tab=>{
    const active=Number(tab.dataset.heroTab)===index;
    tab.classList.toggle('is-active',active);
    tab.setAttribute('aria-selected',String(active));
  });
  heroPanes.forEach(pane=>{
    const active=Number(pane.dataset.heroPane)===index;
    pane.classList.toggle('is-active',active);
    pane.setAttribute('aria-hidden',String(!active));
  });
  heroImages.forEach(image=>{
    const active=Number(image.dataset.heroImage)===index;
    image.classList.toggle('is-active',active);
    image.setAttribute('aria-hidden',String(!active));
  });
  if(heroCurrent) heroCurrent.textContent=String(index+1).padStart(2,'0');
  if(heroKicker) heroKicker.textContent=`${String(index+1).padStart(2,'0')} / PERSPECTIVE`;
  if(userInitiated) restartHeroTimer();
}

function restartHeroTimer(){
  window.clearInterval(heroTimer);
  heroTimer=window.setInterval(()=>setHeroPerspective((activeHero+1)%3),7000);
}

heroTabs.forEach(tab=>tab.addEventListener('click',()=>setHeroPerspective(Number(tab.dataset.heroTab),true)));
if(heroTabs.length) restartHeroTimer();
