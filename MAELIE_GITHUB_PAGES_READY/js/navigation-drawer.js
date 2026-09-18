/* MAELIE — navigation latérale, sans modifier la navigation existante */
(()=>{
  'use strict';
  const init=()=>{
    const button=document.querySelector('[data-menu]');
    const source=document.querySelector('.nav-links');
    if(!button||!source||document.querySelector('.ma-nav-drawer')) return;

    const overlay=document.createElement('div');
    overlay.className='ma-nav-overlay';
    overlay.setAttribute('aria-hidden','true');

    const drawer=document.createElement('aside');
    drawer.className='ma-nav-drawer';
    drawer.setAttribute('aria-hidden','true');
    drawer.setAttribute('aria-label','Menu de navigation');
    drawer.innerHTML=`
      <header class="ma-nav-header">
        <div><span class="ma-nav-eyebrow">MAELIE</span><h2 class="ma-nav-title">Navigation</h2></div>
        <button type="button" class="ma-nav-close" data-nav-close aria-label="Fermer le menu">×</button>
      </header>
      <div class="ma-nav-content"><nav class="ma-nav-links" aria-label="Navigation principale"></nav></div>
      <footer class="ma-nav-footer"><p class="ma-nav-footer-note">L'univers MAELIE</p><a class="ma-nav-footer-link" href="boutique.html">Découvrir la boutique →</a></footer>`;

    const nav=drawer.querySelector('.ma-nav-links');
    [...source.querySelectorAll('a')].forEach(link=>{
      const clone=link.cloneNode(true);
      clone.className='ma-nav-link';
      nav.appendChild(clone);
    });
    document.body.append(overlay,drawer);

    let lastFocus=null;
    const setOpen=open=>{
      drawer.classList.toggle('is-open',open);
      overlay.classList.toggle('is-open',open);
      drawer.setAttribute('aria-hidden',String(!open));
      overlay.setAttribute('aria-hidden',String(!open));
      button.setAttribute('aria-expanded',String(open));
      document.body.classList.toggle('ma-nav-lock',open);
      if(open){
        lastFocus=document.activeElement;
        setTimeout(()=>drawer.querySelector('.ma-nav-close')?.focus(),120);
      }else if(lastFocus&&typeof lastFocus.focus==='function'){
        setTimeout(()=>lastFocus.focus(),120);
      }
    };

    button.setAttribute('aria-expanded','false');
    button.addEventListener('click',e=>{e.preventDefault();setOpen(!drawer.classList.contains('is-open'));});
    overlay.addEventListener('click',()=>setOpen(false));
    drawer.addEventListener('click',e=>{
      if(e.target.closest('[data-nav-close]')){e.preventDefault();setOpen(false);return;}
      if(e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer.classList.contains('is-open'))setOpen(false);});
    window.MAELIE_NAV={open:()=>setOpen(true),close:()=>setOpen(false)};
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
