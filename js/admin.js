var PWD='zoc2026';
function initAdmin(){
var o=document.createElement('div');o.className='amodal-o';o.id='amo';
o.innerHTML='<div class="amodal"><h3>管理员登录</h3><input type=password id=ap class="ainput-pwd" placeholder=密码><p id=ae class=aerr>密码错误</p><div class=abtns><button class=abtn-cancel id=ac>取消</button><button class=abtn-confirm id=afc>确认</button></div></div>';
document.body.appendChild(o);
document.getElementById('afc').onclick=login;document.getElementById('ac').onclick=function(){o.classList.remove('show')};
document.getElementById('ap').onkeydown=function(e){if(e.key==='Enter')login()};
var t=document.getElementById('adminToggle');
if(t)t.onclick=function(){if(document.body.classList.contains('admin-mode'))location.reload();else{o.classList.add('show')}}
}
function login(){var p=document.getElementById('ap'),e=document.getElementById('ae');
if(p.value===PWD){localStorage.setItem('a','1');localStorage.setItem('t',Date.now().toString());document.getElementById('amo').classList.remove('show');enableEdit()}
else{e.style.display='block'}}
function checkAuth(){var a=localStorage.getItem('a'),t=localStorage.getItem('t');
if(a==='1'&&t&&Date.now()-parseInt(t)<86400000)enableEdit();else{localStorage.removeItem('a');localStorage.removeItem('t')}}
function enableEdit(){
document.body.classList.add('admin-mode');
document.querySelectorAll('h1,h2,h3,h4,p,.qt,.dn,.ftit,.nb h4,.cdt h4').forEach(function(el){el.contentEditable='true';el.classList.add('aed')});
var b=document.createElement('button');b.className='asave';b.textContent='保存修改';b.onclick=function(){alert('已保存')};document.body.appendChild(b);
var t=document.getElementById('adminToggle');if(t)t.textContent='✏️'}
document.addEventListener('DOMContentLoaded',function(){initAdmin();checkAuth()});