const ICONS={instagram:'<path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5-9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3z"/>',facebook:'<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"/>',linkedin:'<path d="M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm5 6h4v2c.6-1 2-2.2 4-2.2 4 0 5 2.6 5 6V21h-4v-5.5c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H11z"/>',tiktok:'<path d="M16 3c.3 2.3 1.8 3.8 4 4v3.2c-1.5 0-2.8-.4-4-1.2v6.5A6 6 0 1 1 10 9.6v3.3a2.7 2.7 0 1 0 2.7 2.6V3z"/>',x:'<path d="M3 3h5l4.5 6L18 3h3l-7 8 7.5 10h-5l-5-6.6L6 21H3l7.6-8.6z"/>',youtube:'<path d="M23 7.5a3 3 0 0 0-2-2C19 5 12 5 12 5s-7 0-9 .5a3 3 0 0 0-2 2A31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2 2c2 .5 9 .5 9 .5s7 0 9-.5a3 3 0 0 0 2-2 31 31 0 0 0 .5-4.5 31 31 0 0 0-.5-4.5zM9.7 15V9l5.3 3z"/>'};
const s=document.getElementById('socials');
for(const[k,u]of Object.entries(SOCIALS)){if(!u)continue;s.insertAdjacentHTML('beforeend',`<a href="${u}" target="_blank" rel="noopener" aria-label="${k}"><svg viewBox="0 0 24 24">${ICONS[k]}</svg></a>`)}
const wa=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
document.getElementById('waFloat').href=wa;const wt=document.getElementById('waText');wt.href=wa;wt.target='_blank';
document.getElementById('yr').textContent=new Date().getFullYear();
// Calendly: lazy-load widget
let calLoaded=false;function loadCal(cb){if(calLoaded){cb&&cb();return}const l=document.createElement('link');l.rel='stylesheet';l.href='https://assets.calendly.com/assets/external/widget.css';document.head.appendChild(l);const sc=document.createElement('script');sc.src='https://assets.calendly.com/assets/external/widget.js';sc.onload=()=>{calLoaded=true;cb&&cb()};document.body.appendChild(sc)}
const inline=document.getElementById('calendly-inline');
new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){o.disconnect();loadCal(()=>Calendly.initInlineWidget({url:CALENDLY_URL+'?hide_gdpr_banner=1',parentElement:inline}))}},{rootMargin:'400px'}).observe(inline);
document.querySelectorAll('[data-cal]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();loadCal(()=>Calendly.initPopupWidget({url:CALENDLY_URL}))}));
// Hide video if missing
// Hero story: empty shop -> busy shop
(function(){const hero=document.querySelector('.hero'),v=document.getElementById('heroVid'),rb=document.getElementById('replay');
const light=()=>hero.classList.add('lit');
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,sd=navigator.connection&&navigator.connection.saveData;
if(rm||sd||!v){light();return}
hero.classList.add('js-story');setTimeout(light,6000); // fallback: never hide content
v.src=matchMedia('(max-width: 860px)').matches?'assets/hero-720.mp4':'assets/hero.mp4';
v.addEventListener('timeupdate',()=>{if(v.currentTime>=4)light()});
v.addEventListener('error',light);
v.addEventListener('ended',()=>{light();rb.hidden=false}); // holds last frame (no loop)
rb.addEventListener('click',()=>{hero.classList.remove('lit');rb.hidden=true;v.currentTime=0;v.play().catch(light);setTimeout(light,6000)});
v.play().catch(light);})();
// Contact form: Formspree or mailto fallback
const f=document.getElementById('contactForm'),msg=document.getElementById('formMsg');
f.addEventListener('submit',async e=>{e.preventDefault();const d=new FormData(f);
if(FORM_ENDPOINT.includes('YOUR-FORM-ID')){location.href=`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Enquiry: '+d.get('service'))}&body=${encodeURIComponent(`Name: ${d.get('name')}\nEmail: ${d.get('email')}\n\n${d.get('message')}`)}`;return}
try{const r=await fetch(FORM_ENDPOINT,{method:'POST',body:d,headers:{Accept:'application/json'}});msg.textContent=r.ok?'JazakAllah — message sent! We will reply soon.':'Something went wrong. Please email us directly.';if(r.ok)f.reset()}catch{msg.textContent='Network error. Please email '+CONTACT_EMAIL}});
