document.addEventListener('DOMContentLoaded',function(){
var f=document.getElementById('aiFab'),p=document.getElementById('aiPanel'),
o=document.getElementById('aiOverlay'),c=document.getElementById('aiClose'),
tabs=document.querySelectorAll('.atab'),contents=document.querySelectorAll('.acont');
function op(){p.classList.add('show');o.classList.add('show')}
function cl(){p.classList.remove('show');o.classList.remove('show')}
if(f)f.onclick=op;if(c)c.onclick=cl;if(o)o.onclick=cl;
var sy=0;p&&p.addEventListener('touchstart',function(e){sy=e.touches[0].clientY},false);
p&&p.addEventListener('touchmove',function(e){if(e.touches[0].clientY-sy>80)cl()},false);
tabs.forEach(function(t){t.addEventListener('click',function(){
tabs.forEach(function(x){x.classList.remove('active')});
contents.forEach(function(x){x.classList.remove('active')});
t.classList.add('active');
var x=document.getElementById('tab-'+t.dataset.tab);if(x)x.classList.add('active')
})})
});