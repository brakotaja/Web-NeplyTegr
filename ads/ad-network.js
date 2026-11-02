(()=>{
  'use strict';
  const destinations=[
    '/kasino/?offer=kingsbet#jackpot','/kasino/?offer=grandwin#jackpot','/kasino/?offer=1win#jackpot','/kasino/?offer=musor-drop#jackpot','/kasino/?offer=crypto#wallet','/kasino/?offer=free-spins#jackpot','/pronajem/?campaign=casino','/detektor/?campaign=royal','/gojtastrike/?campaign=loot','/info?campaign=vip'
  ];
  let fallbackIndex=-1;
  const nextDestination=()=>{
    const key='nt_ad_destination_index';
    try{
      let index=Number.parseInt(localStorage.getItem(key)||'-1',10);
      index=Number.isFinite(index)?(index+1)%destinations.length:0;
      localStorage.setItem(key,String(index));
      return destinations[index];
    }catch{
      fallbackIndex=(fallbackIndex+1)%destinations.length;
      return destinations[fallbackIndex];
    }
  };
  const go=()=>window.location.assign(nextDestination());
  const close=id=>{const node=document.getElementById(id);if(node)node.classList.remove('show');};
  const hideTakeover=()=>{const node=document.getElementById('ntAdTakeover');if(node)node.hidden=true;document.documentElement.style.overflow=''};
  function mount(){
    if(document.getElementById('ntAdTakeover'))return;
    document.body.insertAdjacentHTML('beforeend',`
      <div class="nt-ad-layer nt-ad-takeover" id="ntAdTakeover" hidden role="dialog" aria-modal="true" aria-labelledby="ntAdTitle">
        <div class="nt-ad-card"><button class="nt-ad-close" data-nt-close="takeover" aria-label="Zavřít reklamu">×</button><div class="nt-ad-content"><div class="nt-ad-kicker">Právě aktivní jackpot nabídka</div><div class="nt-ad-title" id="ntAdTitle">Kings<span>Bet</span> Royal Bonus</div><p class="nt-ad-copy">Kliknutím otevřete jednu z deseti rotujících demo nabídek. Každý další proklik vede na jinou část webu.</p><div class="nt-ad-actions"><button class="nt-ad-go" data-nt-go>Získat 250% bonus</button><button class="nt-ad-later" data-nt-close="takeover">Pokračovat na web</button></div></div></div>
      </div>
      <aside class="nt-ad-layer nt-ad-side" id="ntAdSide" aria-label="GrandWin popup reklama"><button class="nt-ad-close" data-nt-close="side" aria-label="Zavřít reklamu">×</button><div class="nt-ad-side-media"></div><div class="nt-ad-side-body"><strong>GrandWin Drop</strong><span>Diamantový jackpot čeká. Další klik otevře jinou nabídku.</span><button class="nt-ad-go" data-nt-go>Otevřít drop</button></div></aside>
      <aside class="nt-ad-layer nt-ad-bottom" id="ntAdBottom" aria-label="1WIN spodní reklama"><div class="nt-ad-bottom-icon">🎰</div><div class="nt-ad-bottom-copy"><b>1WIN: 100 free spinů právě teď</b><span>Rotující reklamní proklik bez opakování předchozího cíle</span></div><button class="nt-ad-go" data-nt-go>Zkusit nabídku</button><button class="nt-ad-close" data-nt-close="bottom" aria-label="Zavřít reklamu">×</button></aside>
      <button class="nt-ad-layer nt-ad-bubble" id="ntAdBubble" data-nt-go aria-label="Otevřít další bonusovou nabídku">🎁</button>
      <aside class="nt-ad-layer nt-ad-flash" id="ntAdFlash" aria-label="Časově omezená reklamní nabídka"><b>⚡ MUSOR DROP</b><span>Tajná odměna končí za chvíli</span><button data-nt-go>Odemknout</button></aside>`);
    const takeover=document.getElementById('ntAdTakeover');
    window.setTimeout(()=>{takeover.hidden=false;document.documentElement.style.overflow='hidden';},850);
    window.setTimeout(()=>document.getElementById('ntAdSide').classList.add('show'),4700);
    window.setTimeout(()=>document.getElementById('ntAdBottom').classList.add('show'),8200);
    window.setTimeout(()=>document.getElementById('ntAdFlash').classList.add('show'),12500);
    window.setTimeout(()=>document.getElementById('ntAdFlash').classList.remove('show'),19000);
    let exitShown=false;
    document.addEventListener('mouseout',event=>{if(!exitShown&&event.clientY<=0&&!event.relatedTarget){exitShown=true;takeover.querySelector('.nt-ad-card').classList.add('crypto');takeover.querySelector('.nt-ad-kicker').textContent='Neodcházejte bez bonusu';takeover.querySelector('.nt-ad-title').innerHTML='Grand<span>Win</span> Last Chance';takeover.hidden=false;document.documentElement.style.overflow='hidden';}});
  }
  document.addEventListener('click',event=>{
    if(!(event.target instanceof Element))return;
    const target=event.target.closest('[data-nt-go],[data-ad]');
    if(target){event.preventDefault();event.stopPropagation();go();return;}
    const closer=event.target.closest('[data-nt-close]');
    if(!closer)return;
    event.preventDefault();
    const kind=closer.dataset.ntClose;
    if(kind==='takeover')hideTakeover();else close('ntAd'+kind[0].toUpperCase()+kind.slice(1));
  },true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
