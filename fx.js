(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,D=document,H=D.documentElement;
// scroll reveal (cheap: opacity/transform, one observer)
const els=D.querySelectorAll('section h2,.card,.ba figure,.projects,.vt,.founder>*');
if(!rm&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});els.forEach(el=>{if(!el.closest('.hero')){el.classList.add('rv');io.observe(el)}})}
if(rm)return;
const start=()=>{
const fine=matchMedia('(hover: hover) and (pointer: fine)').matches,hero=D.querySelector('.hero'),nav=navigator;
if(!fine){ // touch: lite only - one pooled ripple via WAAPI, nothing else
 const rp=D.createElement('span');rp.className='fx-ripple';rp.setAttribute('aria-hidden','true');D.body.append(rp);let an=null;
 addEventListener('pointerdown',e=>{if(an)an.cancel();rp.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
  an=rp.animate([{transform:`translate(${e.clientX}px,${e.clientY}px) scale(.15)`,opacity:1},{transform:`translate(${e.clientX}px,${e.clientY}px) scale(1)`,opacity:0}],{duration:400,easing:'ease-out'})},{passive:true});
 return}
let lite=(nav.hardwareConcurrency||8)<=4||(nav.deviceMemory||8)<=4||!!(nav.connection&&nav.connection.saveData);
H.classList.toggle('fx-lite',lite);
// ---------- single rAF loop that sleeps when idle ----------
const tasks=new Set();let raf=0;
const wake=()=>{if(!raf&&!D.hidden&&tasks.size)raf=requestAnimationFrame(frame)};
function frame(t){raf=0;for(const f of tasks)if(!f(t))tasks.delete(f);wake()}
const run=f=>{tasks.add(f);wake()};
D.addEventListener('visibilitychange',()=>{if(D.hidden){cancelAnimationFrame(raf);raf=0}else wake()});
// FPS probe for the first 2s -> lite mode if slow
{let n=0,t0=0;run(t=>{if(!t0)t0=t;n++;if(t-t0<2000)return true;if(n*1000/(t-t0)<50){lite=true;H.classList.add('fx-lite');P.length=0}return false})}
// ---------- particles on a canvas with pre-rendered glow sprites ----------
const DPR=Math.min(devicePixelRatio||1,1.5),cv=D.createElement('canvas');cv.className='fx-canvas';cv.setAttribute('aria-hidden','true');D.body.append(cv);const cx=cv.getContext('2d');
const size=()=>{cv.width=innerWidth*DPR;cv.height=innerHeight*DPR;cx.setTransform(DPR,0,0,DPR,0,0)};size();addEventListener('resize',size,{passive:true});
const sprite=c=>{const s=D.createElement('canvas');s.width=s.height=32;const g=s.getContext('2d'),gr=g.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,`rgba(${c},1)`);gr.addColorStop(.35,`rgba(${c},.7)`);gr.addColorStop(1,`rgba(${c},0)`);g.fillStyle=gr;g.fillRect(0,0,32,32);return s};
const SP=[sprite('251,191,36'),sprite('45,212,191')],MAX=fine?40:25,P=[];let box=null;
const add=(x,y,vx,vy,r,s,l)=>{if(P.length>=MAX)P.shift();P.push({x,y,vx,vy,r,s,l,t:l});run(draw)};
const burst=(x,y,n)=>{for(let i=0;i<n;i++){const a=Math.random()*6.283,v=1.5+Math.random()*3.5;add(x,y,Math.cos(a)*v,Math.sin(a)*v,8+Math.random()*8,i&1,30+Math.random()*15)}};
function draw(){if(box)cx.clearRect(box[0],box[1],box[2]-box[0],box[3]-box[1]);if(!P.length){box=null;return false}
 let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;cx.globalCompositeOperation='lighter';
 for(let i=P.length-1;i>=0;i--){const p=P[i];p.x+=p.vx;p.y+=p.vy;p.vx*=.93;p.vy*=.93;if(--p.l<=0){P.splice(i,1);continue}
  const a=p.l/p.t,r=p.r*(.5+a*.5);cx.globalAlpha=a;cx.drawImage(SP[p.s],p.x-r,p.y-r,r*2,r*2);
  if(p.x-r<x0)x0=p.x-r;if(p.y-r<y0)y0=p.y-r;if(p.x+r>x1)x1=p.x+r;if(p.y+r>y1)y1=p.y+r}
 cx.globalAlpha=1;box=[x0-2,y0-2,x1+2,y1+2];return true}
const ripple=(x,y)=>{const r=D.createElement('span');r.className='fx-ripple';r.style.transform=`translate(${x}px,${y}px)`;D.body.append(r);r.addEventListener('animationend',()=>r.remove(),{once:true})};
// ---------- rect cache (refreshed on enter, scroll and resize; never read during move) ----------
const RC=new WeakMap();let gen=0;addEventListener('scroll',()=>gen++,{passive:true});addEventListener('resize',()=>gen++,{passive:true});
const rect=el=>{let c=RC.get(el);if(!c||c.g!==gen){c={r:el.getBoundingClientRect(),g:gen};RC.set(el,c)}return c.r};
const TILT='.card,.res,.ba figure';
// hero glow element (moved with transform instead of repainting a gradient)
let glow=null,hv=true;if(hero){glow=D.createElement('div');glow.className='hero-glow';glow.setAttribute('aria-hidden','true');hero.insertBefore(glow,hero.firstChild);new IntersectionObserver(e=>{hv=e[0].isIntersecting;if(hv&&!fine)run(ambient)}).observe(hero)}
const setHero=(x,y,px,py)=>{glow.style.transform=`translate(${x}px,${y}px)`;if(!lite){hero.style.setProperty('--px',px.toFixed(3));hero.style.setProperty('--py',py.toFixed(3))}};
if(fine){
 H.classList.add('fx-cursor');
 const dot=D.createElement('div'),ring=D.createElement('div');dot.className='cur-dot';ring.className='cur-ring';ring.innerHTML='<span></span>';D.body.append(dot,ring);const lab=ring.firstChild;
 let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,vx=0,vy=0,lx=mx,ly=my,base=.52,cur=.52,ev=null,card=null,btn=null;
 const label=t=>t.closest('video,.vt')?'Play':t.closest('[data-cal],a[href="#book"],#calendly-inline')?'Book':t.closest('.wa,#waText,a[href*="wa.me"]')?'Chat':'';
 addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;ev=e;run(move)},{passive:true});
 function move(){if(!ev)return false;const e=ev;ev=null;mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px)`;
  if(!lite){const d=Math.hypot(mx-lx,my-ly);if(d>10){add(mx,my,(Math.random()-.5)*.5,(Math.random()-.5)*.5,7+Math.random()*6,P.length&1,24);lx=mx;ly=my}}
  if(card){const r=rect(card),x=(mx-r.left)/r.width,y=(my-r.top)/r.height;card.style.setProperty('--x',x*100+'%');card.style.setProperty('--y',y*100+'%');card.style.transform=`perspective(800px) rotateX(${(.5-y)*22}deg) rotateY(${(x-.5)*22}deg) translateY(-4px)`}
  if(btn){const r=rect(btn);btn.style.transform=`translate(${(mx-r.left-r.width/2)*.4}px,${(my-r.top-r.height/2)*.5}px) scale(1.04)`}
  if(glow&&hv&&my<innerHeight){const r=rect(hero);if(my>r.top&&my<r.bottom)setHero(mx-r.left,my-r.top,(mx-r.left)/r.width-.5,(my-r.top)/r.height-.5)}
  run(spring);return false}
 function spring(){const ax=(mx-rx)*.09,ay=(my-ry)*.09;vx=(vx+ax)*.72;vy=(vy+ay)*.72;rx+=vx;ry+=vy;cur+=(base-cur)*.25;
  const sp=Math.min(Math.hypot(vx,vy),40),ang=Math.atan2(vy,vx);
  ring.style.transform=`translate(${rx}px,${ry}px) rotate(${ang}rad) scale(${cur*(1+sp/45)},${cur*(1-sp/90)}) rotate(${-ang}rad)`;
  return sp>.05||Math.abs(mx-rx)+Math.abs(my-ry)>.3||Math.abs(base-cur)>.005}
 D.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse')return;const t=e.target,l=label(t),inp=!!t.closest('input,textarea,select'),h=!l&&!!t.closest('a,button,summary,.card');
  lab.textContent=l;ring.className='cur-ring'+(l?' lbl':'')+(l==='Play'?' play':'')+(h?' hov':'')+(inp?' txt':'');dot.style.opacity=inp?0:1;base=l?1:h?.83:.52;run(spring);
  const c=t.closest(TILT);if(c!==card){if(card){card.style.transform='';card.classList.remove('act')}card=c;if(c){rect(c);c.classList.add('act')}}
  const b=t.closest('.btn');if(b!==btn){if(btn){btn.style.transform='';btn.classList.remove('act')}btn=b;if(b){rect(b);b.classList.add('act')}}},{passive:true});
 D.addEventListener('mouseleave',()=>{dot.style.opacity=ring.style.opacity=0});D.addEventListener('mouseenter',()=>{dot.style.opacity=ring.style.opacity=1});
 addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;base=.37;run(spring);ripple(e.clientX,e.clientY);burst(e.clientX,e.clientY,lite?6:12)},{passive:true});
 addEventListener('pointerup',()=>{base=ring.classList.contains('lbl')?1:ring.classList.contains('hov')?.83:.52;run(spring)},{passive:true});
}else{
 addEventListener('pointerdown',e=>{ripple(e.clientX,e.clientY);burst(e.clientX,e.clientY,lite?5:10);
  const c=e.target.closest&&e.target.closest(TILT+',.btn');if(!c)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  c.style.setProperty('--x',x*100+'%');c.style.setProperty('--y',y*100+'%');c.classList.add('press','act');
  if(!c.classList.contains('btn'))c.style.transform=`perspective(800px) rotateX(${(.5-y)*10}deg) rotateY(${(x-.5)*10}deg) scale(.985)`;
  const end=()=>{c.classList.remove('press','act');c.style.transform='';removeEventListener('pointerup',end);removeEventListener('pointercancel',end)};addEventListener('pointerup',end,{passive:true});addEventListener('pointercancel',end,{passive:true})},{passive:true});
 var gx=0,gy=0,gyro=false,ax=0,ay=0;
 const on=e=>{if(e.gamma==null)return;gyro=true;gx=Math.max(-1,Math.min(1,e.gamma/30));gy=Math.max(-1,Math.min(1,(e.beta-45)/30));if(hv)run(ambient)};
 const DO=window.DeviceOrientationEvent;
 if(DO&&typeof DO.requestPermission==='function')addEventListener('touchend',()=>{DO.requestPermission().then(s=>{if(s==='granted')addEventListener('deviceorientation',on,{passive:true})}).catch(()=>{})},{once:true,passive:true});
 else if(DO)addEventListener('deviceorientation',on,{passive:true});
 var last=0;function ambient(t){if(!hv||!glow)return false;if(t-last<33)return true;last=t; // ~30fps is plenty for a slow drift
  const s=t/1000,tx=gyro?gx*.5:Math.sin(s*.35)*.35,ty=gyro?gy*.5:Math.cos(s*.27)*.3;ax+=(tx-ax)*.15;ay+=(ty-ay)*.15;
  const w=hero.clientWidth,h=hero.clientHeight;setHero(w*(.5+ax),h*(.45+ay),ax,ay);return true}
 if(hero)run(ambient);
}};
const go=()=>('requestIdleCallback'in window)?requestIdleCallback(start,{timeout:1500}):setTimeout(start,300);
D.readyState==='complete'?go():addEventListener('load',go,{once:true});
})();
