(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
// scroll reveal
const els=document.querySelectorAll('section h2,.card,.ba figure,.projects,.vt,.founder>*');
if(!rm&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});els.forEach(el=>{if(!el.closest('.hero')){el.classList.add('rv');io.observe(el)}})}
if(rm||!matchMedia('(hover: hover) and (pointer: fine)').matches)return;
document.documentElement.classList.add('fx-cursor');
const dot=document.createElement('div'),ring=document.createElement('div');dot.className='cur-dot';ring.className='cur-ring';ring.innerHTML='<span>Play</span>';document.body.append(dot,ring);
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,raf=0;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px)`;if(!raf)raf=requestAnimationFrame(loop)},{passive:true});
function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.transform=`translate(${rx}px,${ry}px)`;raf=(Math.abs(mx-rx)+Math.abs(my-ry)>.3)?requestAnimationFrame(loop):0}
document.addEventListener('mouseover',e=>{const t=e.target;ring.classList.toggle('play',!!t.closest('video'));ring.classList.toggle('hov',!!t.closest('a,button,summary')&&!t.closest('video'));ring.classList.toggle('txt',!!t.closest('input,textarea,select'));dot.style.opacity=t.closest('input,textarea,select')?0:1});
document.addEventListener('mouseleave',()=>{dot.style.opacity=ring.style.opacity=0});document.addEventListener('mouseenter',()=>{dot.style.opacity=ring.style.opacity=1});
// magnetic buttons
document.querySelectorAll('.btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});
// card spotlight + tilt
const tilt=new Set(document.querySelectorAll('#pricing .card,.res'));
document.querySelectorAll('.card').forEach(c=>{let p=0;c.addEventListener('mousemove',e=>{if(p)return;p=requestAnimationFrame(()=>{p=0;const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.style.setProperty('--x',x+'px');c.style.setProperty('--y',y+'px');if(tilt.has(c))c.style.transform=`perspective(800px) rotateX(${(.5-y/r.height)*8}deg) rotateY(${(x/r.width-.5)*8}deg) translateY(-4px)`})});c.addEventListener('mouseleave',()=>{c.style.transform=''})});
// hero glow
const hero=document.querySelector('.hero');hero&&hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-r.left)+'px');hero.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true});
})();
