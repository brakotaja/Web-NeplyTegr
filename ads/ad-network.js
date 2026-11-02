(()=>{
  'use strict';
  const operators=[
    {name:'Tipsport',url:'https://www.tipsport.cz/'},
    {name:'Chance',url:'https://www.chance.cz/'},
    {name:'Fortuna',url:'https://www.ifortuna.cz/'},
    {name:'Betano',url:'https://www.betano.cz/'},
    {name:'KingsBet',url:'https://www.kingsbet.cz/'},
    {name:'Synot Tip',url:'https://www.synottip.cz/'},
    {name:'MerkurXtip',url:'https://www.merkurxtip.cz/'},
    {name:'SazkaBet',url:'https://www.allwyn.cz/kurzove-sazky'}
  ];
  let fallbackIndex=-1,currentPopup=null,autoCloseTimer=0;
  const randomIndex=maximum=>{try{return crypto.getRandomValues(new Uint32Array(1))[0]%maximum}catch{return Math.floor(Math.random()*maximum)}};
  const normalize=value=>(value||'').toLowerCase().replace(/[^a-z0-9]/g,'');
  function nextOperator(){
    const key='nt_ad_operator_index';
    try{
      const previous=Number.parseInt(localStorage.getItem(key)||'-1',10);let index=randomIndex(operators.length);
      while(index===previous)index=randomIndex(operators.length);
      localStorage.setItem(key,String(index));return operators[index];
    }catch{
      const previous=fallbackIndex;do{fallbackIndex=randomIndex(operators.length)}while(fallbackIndex===previous);return operators[fallbackIndex];
    }
  }
  function openOperator(requested){
    const exact=operators.find(item=>normalize(item.name)===normalize(requested));
    window.open((exact||nextOperator()).url,'_blank','noopener,noreferrer');
  }
  function closePopup(){
    window.clearTimeout(autoCloseTimer);
    if(!currentPopup)return;
    currentPopup.classList.remove('show');
    const closing=currentPopup;currentPopup=null;
    window.setTimeout(()=>closing.remove(),260);
  }
  function showPopup(){
    closePopup();
    const operator=nextOperator();
    currentPopup=document.createElement('aside');
    currentPopup.className='nt-ad-calm';
    currentPopup.setAttribute('aria-label',`Reklama ${operator.name}`);
    currentPopup.innerHTML=`<div class="nt-ad-calm-art" aria-hidden="true"></div><div class="nt-ad-calm-body"><span class="nt-ad-calm-label">REKLAMA • 18+</span><strong>${operator.name}</strong><p>Oficiální web licencovaného provozovatele.</p><button data-nt-go data-ad="${operator.name}">Otevřít v novém okně ↗</button><small>Účastí na hazardní hře může vzniknout závislost.</small></div><button class="nt-ad-calm-close" data-nt-close-popup aria-label="Zavřít reklamu">×</button>`;
    document.body.appendChild(currentPopup);
    requestAnimationFrame(()=>currentPopup?.classList.add('show'));
    autoCloseTimer=window.setTimeout(closePopup,10000);
  }
  function start(){
    window.setTimeout(showPopup,4000);
    window.setInterval(showPopup,15000);
  }
  document.addEventListener('click',event=>{
    if(!(event.target instanceof Element))return;
    const outbound=event.target.closest('[data-nt-go],[data-ad]');
    if(outbound){event.preventDefault();event.stopPropagation();openOperator(outbound.dataset.ad);return;}
    if(event.target.closest('[data-nt-close-popup]')){event.preventDefault();closePopup();}
  },true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
