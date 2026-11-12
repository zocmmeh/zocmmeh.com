document.addEventListener('DOMContentLoaded',function(){
var h=document.getElementById('hamburger'),n=document.getElementById('mainNav');
if(h)h.addEventListener('click',function(){n.classList.toggle('open')});
var sl=document.querySelectorAll('.hslide'),dc=document.querySelector('.sdots'),cur=0,timer;
if(sl.length){sl.forEach(function(s,i){if(dc){var d=document.createElement('div');d.className='sdot'+(i?'':' active');d.onclick=function(){go(i)};dc.appendChild(d)}});function go(i){sl[cur].classList.remove('active');var ds=document.querySelectorAll('.sdot');if(ds[cur])ds[cur].classList.remove('active');cur=i;if(cur>=sl.length)cur=0;sl[cur].classList.add('active');if(ds[cur])ds[cur].classList.add('active')}function nxt(){go(cur+1)}timer=setInterval(nxt,4000);var pb=document.querySelector('.sbtn.prev'),nb=document.querySelector('.sbtn.next');if(pb)pb.onclick=function(){clearInterval(timer);nxt();timer=setInterval(nxt,4000)};if(nb)nb.onclick=function(){clearInterval(timer);go(cur+1);timer=setInterval(nxt,4000)}}
document.querySelectorAll('.fq').forEach(function(q){q.addEventListener('click',function(){this.parentElement.classList.toggle('open')})});
});