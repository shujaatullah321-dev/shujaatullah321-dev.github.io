(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
// scroll reveal
const els=document.querySelectorAll('section h2,.card,.ba figure,.projects,.vt,.founder>*');
if(!rm&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});els.forEach(el=>{if(!el.closest('.hero')){el.classList.add('rv');io.observe(el)}})}
if(rm)return;
const fine=matchMedia('(hover: hover) and (pointer: fine)').matches,D=document,H=D.documentElement,hero=D.querySelector('.hero');
const TEAL=[15,118,110],GOLD=[251,191,36],TEAL2=[45,212,191];
// ---- shared particle canvas ----
const cv=D.createElement('canvas');cv.className='fx-canvas';cv.setAttribute('aria-hidden','true');D.body.append(cv);const cx=cv.getContext('2d');
let dpr=Math.min(devicePixelRatio||1,2);function size(){cv.width=innerWidth*dpr;cv.height=innerHeight*dpr;cx.setTransform(dpr,0,0,dpr,0,0)}size();addEventListener('resize',size,{passive:true});
const MAX=fine?140:70,P=[];let run=0;
function add(x,y,vx,vy,r,c,life){if(P.length>=MAX)P.shift();P.push({x,y,vx,vy,r,c,l:life,t:life})}
function burst(x,y,n){for(let i=0;i<n;i++){const a=Math.random()*6.283,s=1.5+Math.random()*4;add(x,y,Math.cos(a)*s,Math.sin(a)*s,2+Math.random()*3,Math.random()<.5?GOLD:TEAL2,40+Math.random()*20)}kick()}
function ripple(x,y){const r=D.createElement('span');r.className='fx-ripple';r.style.left=x+'px';r.style.top=y+'px';D.body.append(r);setTimeout(()=>r.remove(),700)}
function kick(){if(!run&&!D.hidden)run=requestAnimationFrame(tick)}
const hooks=[];
function tick(){run=0;cx.clearRect(0,0,innerWidth,innerHeight);cx.globalCompositeOperation='lighter';
 for(let i=P.length-1;i>=0;i--){const p=P[i];p.x+=p.vx;p.y+=p.vy;p.vx*=.94;p.vy*=.94;p.vy+=.03;if(--p.l<=0){P.splice(i,1);continue}
  const a=p.l/p.t,r=p.r*(.4+a*.6);cx.fillStyle=`rgba(${p.c},${a*.9})`;cx.shadowColor=`rgba(${p.c},${a})`;cx.shadowBlur=12;cx.beginPath();cx.arc(p.x,p.y,r,0,6.283);cx.fill()}
 cx.shadowBlur=0;let more=P.length>0;for(const h of hooks)if(h())more=true;if(more)kick()}
D.addEventListener('visibilitychange',()=>{if(D.hidden){cancelAnimationFrame(run);run=0}else kick()});
const setXY=(el,x,y)=>{const r=el.getBoundingClientRect(),lx=x-r.left,ly=y-r.top;el.style.setProperty('--x',lx+'px');el.style.setProperty('--y',ly+'px');return[lx/r.width,ly/r.height]};
const TILT='.card,.res,.ba figure';
if(fine){
 H.classList.add('fx-cursor');
 const dot=D.createElement('div'),ring=D.createElement('div');dot.className='cur-dot';ring.className='cur-ring';ring.innerHTML='<span></span>';D.body.append(dot,ring);const lab=ring.firstChild;
 let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,vx=0,vy=0,lx=mx,ly=my;
 addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px)`;
  const d=Math.hypot(mx-lx,my-ly);if(d>4){const n=Math.min(3,d/12|0)+1;for(let i=0;i<n;i++){const t=i/n;add(lx+(mx-lx)*t,ly+(my-ly)*t,(Math.random()-.5)*.6,(Math.random()-.5)*.6,2+Math.random()*2.5,(i+P.length)%3?TEAL2:GOLD,26+Math.random()*14)}lx=mx;ly=my}kick()},{passive:true});
 hooks.push(()=>{const ax=(mx-rx)*.09,ay=(my-ry)*.09;vx=(vx+ax)*.72;vy=(vy+ay)*.72;rx+=vx;ry+=vy;const sp=Math.min(Math.hypot(vx,vy),40),ang=Math.atan2(vy,vx);
  ring.style.transform=`translate(${rx}px,${ry}px) rotate(${ang}rad) scale(${1+sp/45},${1-sp/90}) rotate(${-ang}rad)`;return sp>.05||Math.abs(mx-rx)+Math.abs(my-ry)>.3});
 const label=t=>t.closest('video,.vt')?'Play':t.closest('[data-cal],a[href="#book"],#calendly-inline')?'Book':t.closest('.wa,#waText,a[href*="wa.me"]')?'Chat':'';
 D.addEventListener('mouseover',e=>{const t=e.target,l=label(t),inp=!!t.closest('input,textarea,select');lab.textContent=l;
  ring.classList.toggle('lbl',!!l);ring.classList.toggle('play',l==='Play');ring.classList.toggle('hov',!l&&!!t.closest('a,button,summary,.card'));ring.classList.toggle('txt',inp);dot.style.opacity=inp?0:1});
 D.addEventListener('mouseleave',()=>{dot.style.opacity=ring.style.opacity=0});D.addEventListener('mouseenter',()=>{dot.style.opacity=ring.style.opacity=1});
 addEventListener('mousedown',e=>{ring.classList.add('down');ripple(e.clientX,e.clientY);burst(e.clientX,e.clientY,18)},{passive:true});addEventListener('mouseup',()=>ring.classList.remove('down'),{passive:true});
 D.querySelectorAll('.btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.4}px,${(e.clientY-r.top-r.height/2)*.5}px) scale(1.04)`});b.addEventListener('mouseleave',()=>b.style.transform='')});
 D.querySelectorAll(TILT).forEach(c=>{let p=0;c.addEventListener('mousemove',e=>{if(p)return;p=requestAnimationFrame(()=>{p=0;const[x,y]=setXY(c,e.clientX,e.clientY);c.style.transform=`perspective(800px) rotateX(${(.5-y)*22}deg) rotateY(${(x-.5)*22}deg) translateY(-4px)`})});c.addEventListener('mouseleave',()=>{c.style.transform=''})});
 hero&&hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;hero.style.setProperty('--mx',x+'px');hero.style.setProperty('--my',y+'px');hero.style.setProperty('--px',(x/r.width-.5).toFixed(3));hero.style.setProperty('--py',(y/r.height-.5).toFixed(3))},{passive:true});
}else{
 // ---- touch: tap ripple + burst, press glow/tilt ----
 addEventListener('pointerdown',e=>{ripple(e.clientX,e.clientY);burst(e.clientX,e.clientY,14);
  const c=e.target.closest&&e.target.closest(TILT+',.btn');if(!c)return;const[x,y]=setXY(c,e.clientX,e.clientY);c.classList.add('press');
  if(!c.classList.contains('btn'))c.style.transform=`perspective(800px) rotateX(${(.5-y)*10}deg) rotateY(${(x-.5)*10}deg) scale(.985)`;
  const end=()=>{c.classList.remove('press');c.style.transform='';removeEventListener('pointerup',end);removeEventListener('pointercancel',end)};addEventListener('pointerup',end,{passive:true});addEventListener('pointercancel',end,{passive:true})},{passive:true});
 // ---- hero: gyro or ambient drift ----
 if(hero){let gx=0,gy=0,gyro=false,vis=true;
  const io=new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis)kick()});io.observe(hero);
  const on=e=>{if(e.gamma==null)return;gyro=true;gx=Math.max(-1,Math.min(1,e.gamma/30));gy=Math.max(-1,Math.min(1,(e.beta-45)/30));kick()};
  const DO=window.DeviceOrientationEvent;
  if(DO&&typeof DO.requestPermission==='function'){const ask=()=>{DO.requestPermission().then(s=>{if(s==='granted')addEventListener('deviceorientation',on,{passive:true})}).catch(()=>{})};addEventListener('touchend',ask,{once:true,passive:true})}
  else if(DO)addEventListener('deviceorientation',on,{passive:true});
  let cx2=0,cy2=0;
  hooks.push(()=>{if(!vis||D.hidden)return false;const t=performance.now()/1000,tx=gyro?gx*.5:Math.sin(t*.35)*.35,ty=gyro?gy*.5:Math.cos(t*.27)*.3;cx2+=(tx-cx2)*.08;cy2+=(ty-cy2)*.08;
   const w=hero.clientWidth,h=hero.clientHeight;hero.style.setProperty('--mx',(w*(.5+cx2))+'px');hero.style.setProperty('--my',(h*(.45+cy2))+'px');hero.style.setProperty('--px',cx2.toFixed(3));hero.style.setProperty('--py',cy2.toFixed(3));return true});
  kick()}
}})();
