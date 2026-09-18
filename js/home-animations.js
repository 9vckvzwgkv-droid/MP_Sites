/* MAELIE — homepage animations only. No business logic touched. */
(()=>{
  'use strict';
  const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const hero=document.querySelector('.hero');
  if(!hero) return;
  const copy=hero.querySelector('.hero-grid > div:first-child');
  if(copy) copy.classList.add('hero-copy-motion');
  const card=hero.querySelector('.hero-card');
  if(card){
    ['home-float home-float--one','home-float home-float--two','home-float home-float--three'].forEach((cls,i)=>{
      const el=document.createElement('span'); el.className=cls;
      el.innerHTML=i===0?'<span class="home-float-dot"></span>Édition MAELIE':i===1?'<span class="home-float-dot"></span>Choisi avec soin':'<span class="home-float-dot"></span>Livraison dès 80 €';
      hero.appendChild(el);
    });
  }
  if(!reduce){
    document.querySelectorAll('[data-home-products] .product-card').forEach((el,i)=>el.style.setProperty('--home-index',i));
    const progress=document.createElement('div'); progress.className='home-progress'; document.body.appendChild(progress);
    const update=()=>{ const max=document.documentElement.scrollHeight-window.innerHeight; progress.style.width=(max>0?window.scrollY/max*100:0)+'%'; };
    window.addEventListener('scroll',update,{passive:true}); update();
  }
  const benefits=document.querySelector('.benefits');
  if(benefits&&!document.querySelector('.home-marquee')){
    const marquee=document.createElement('div'); marquee.className='home-marquee';
    marquee.innerHTML='<div class="home-marquee-track"><span>Douceur au quotidien</span><span>Pièces choisies avec soin</span><span>Idées cadeaux</span><span>MAELIE</span><span>Douceur au quotidien</span><span>Pièces choisies avec soin</span><span>Idées cadeaux</span><span>MAELIE</span></div>';
    benefits.insertAdjacentElement('afterend',marquee);
  }
  const cue=document.createElement('span'); cue.className='home-scroll-cue'; cue.textContent='Découvrir'; hero.appendChild(cue);
})();
