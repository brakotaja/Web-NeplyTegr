(()=>{
  'use strict';
  const destinations=[
    {name:'Tipsport',url:'https://www.tipsport.cz/'},{name:'Chance',url:'https://www.chance.cz/'},{name:'Fortuna',url:'https://www.ifortuna.cz/'},{name:'Betano',url:'https://www.betano.cz/'},{name:'KingsBet',url:'https://www.kingsbet.cz/'},{name:'Synot Tip',url:'https://www.synottip.cz/'},{name:'MerkurXtip',url:'https://www.merkurxtip.cz/'},{name:'SazkaBet',url:'https://www.allwyn.cz/kurzove-sazky'}
  ];
  let fallbackIndex=-1;
  const randomIndex=maximum=>{try{return crypto.getRandomValues(new Uint32Array(1))[0]%maximum}catch{return Math.floor(Math.random()*maximum)}};
  const nextDestination=()=>{
    const key='nt_ad_destination_index';
    try{
      const previous=Number.parseInt(localStorage.getItem(key)||'-1',10);let index=randomIndex(destinations.length);
      while(index===previous)index=randomIndex(destinations.length);
      localStorage.setItem(key,String(index));
      return destinations[index];
    }catch{
      const previous=fallbackIndex;do{fallbackIndex=randomIndex(destinations.length)}while(fallbackIndex===previous);
      return destinations[fallbackIndex];
    }
  };
  const normalize=value=>(value||'').toLowerCase().replace(/[^a-z0-9]/g,'');
  const go=requested=>{const exact=destinations.find(item=>normalize(item.name)===normalize(requested));window.location.assign((exact||nextDestination()).url);};
  const close=id=>{const node=document.getElementById(id);if(node)node.classList.remove('show');};
  const hideTakeover=()=>{const node=document.getElementById('ntAdTakeover');if(node)node.hidden=true;document.documentElement.style.overflow=''};
  function mount(){
    if(document.getElementById('ntAdTakeover'))return;
    document.body.insertAdjacentHTML('beforeend',`
      <div class="nt-ad-layer nt-ad-takeover" id="ntAdTakeover" hidden role="dialog" aria-modal="true" aria-labelledby="ntAdTitle">
        <div class="nt-ad-card"><button class="nt-ad-close" data-nt-close="takeover" aria-label="Zavřít reklamu">×</button><div class="nt-ad-content"><div class="nt-ad-kicker">Reklamní odkaz na licencovaného provozovatele</div><div class="nt-ad-title" id="ntAdTitle">Kings<span>Bet</span></div><p class="nt-ad-copy">Kliknutím opustíte NeplyTegr a otevřete oficiální web provozovatele KingsBet.</p><div class="nt-ad-actions"><button class="nt-ad-go" data-nt-go data-ad="KingsBet">Přejít na oficiální web</button><button class="nt-ad-later" data-nt-close="takeover">Pokračovat na web</button></div><p class="nt-ad-warning">18+ • Ministerstvo financí varuje: Účastí na hazardní hře může vzniknout závislost!</p></div></div>
      </div>
      <aside class="nt-ad-layer nt-ad-side" id="ntAdSide" aria-label="Tipsport popup reklama"><button class="nt-ad-close" data-nt-close="side" aria-label="Zavřít reklamu">×</button><div class="nt-ad-side-media"></div><div class="nt-ad-side-body"><strong>Tipsport</strong><span>Oficiální web kurzového sázení a online kasina.</span><button class="nt-ad-go" data-nt-go data-ad="Tipsport">Navštívit Tipsport</button><small class="nt-ad-warning">18+ • Účastí na hazardní hře může vzniknout závislost!</small></div></aside>
      <aside class="nt-ad-layer nt-ad-bottom" id="ntAdBottom" aria-label="Fortuna spodní reklama"><div class="nt-ad-bottom-icon">🎰</div><div class="nt-ad-bottom-copy"><b>Fortuna — kurzové sázky a online casino</b><span>18+ • Reklamní odkaz na oficiální web</span></div><button class="nt-ad-go" data-nt-go data-ad="Fortuna">Navštívit Fortunu</button><button class="nt-ad-close" data-nt-close="bottom" aria-label="Zavřít reklamu">×</button></aside>
      <button class="nt-ad-layer nt-ad-bubble" id="ntAdBubble" data-nt-go aria-label="Otevřít další bonusovou nabídku">🎁</button>
      <aside class="nt-ad-layer nt-ad-flash" id="ntAdFlash" aria-label="Betano reklamní nabídka"><b>⚡ BETANO</b><span>Oficiální web • 18+</span><button data-nt-go data-ad="Betano">Otevřít Betano</button></aside>`);
    const takeover=document.getElementById('ntAdTakeover');
    window.setTimeout(()=>{takeover.hidden=false;document.documentElement.style.overflow='hidden';},850);
    window.setTimeout(()=>document.getElementById('ntAdSide').classList.add('show'),4700);
    window.setTimeout(()=>document.getElementById('ntAdBottom').classList.add('show'),8200);
    window.setTimeout(()=>document.getElementById('ntAdFlash').classList.add('show'),12500);
    window.setTimeout(()=>document.getElementById('ntAdFlash').classList.remove('show'),19000);
    let exitShown=false;
    document.addEventListener('mouseout',event=>{if(!exitShown&&event.clientY<=0&&!event.relatedTarget){exitShown=true;takeover.querySelector('.nt-ad-card').classList.add('crypto');takeover.querySelector('.nt-ad-kicker').textContent='Reklamní odkaz na licencovaného provozovatele';takeover.querySelector('.nt-ad-title').innerHTML='Kings<span>Bet</span>';takeover.hidden=false;document.documentElement.style.overflow='hidden';}});
  }
  document.addEventListener('click',event=>{
    if(!(event.target instanceof Element))return;
    const target=event.target.closest('[data-nt-go],[data-ad]');
    if(target){event.preventDefault();event.stopPropagation();go(target.dataset.ad);return;}
    const closer=event.target.closest('[data-nt-close]');
    if(!closer)return;
    event.preventDefault();
    const kind=closer.dataset.ntClose;
    if(kind==='takeover')hideTakeover();else close('ntAd'+kind[0].toUpperCase()+kind.slice(1));
  },true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
