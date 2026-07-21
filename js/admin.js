var PWD='zoc2026';
var SAVE_KEY='zoc-site-edits';
var AUTH_KEY='zoc-admin-auth';
var DATA_VERSION='v3';

var EDITABLE_SELECTOR = ['h1','h2','h3','h4','h5','h6','p','span','a','li','td','th','label','strong','em','b','i','u','small','blockquote','code','pre','cite','div.card','div.ni','div.df','div.dg','.dept-name','.dept-floor','.dept-li','.dept-h4','.doc-name','.doc-title','.doc-exp','.doc-sched','.floor-num','.floor-title','.floor-desc','.step-h4','.step-p','.faq-q','.faq-a','.cdt h4','.cdt p','.api strong','.api p','.awt strong','.awt p','.aft strong','.aft p','.adtags span','.finfo p','.flgo span','.logo-nm','.logo-en','.dft','.ds','.dt','.de','.ahero h1','.ahero p','.date-card text','.date-card p','.motto-box .motto-text','.motto-box p','.form-label','.cc .cdt h4','.cc .cdt p'].join(',');

// ====== Assign IDs ======
function assignAllIds(){
  var page=(location.pathname.split('/').pop()||'index.html').split('?')[0];
  document.querySelectorAll(EDITABLE_SELECTOR).forEach(function(el,i){
    if(el.closest&&(el.closest('#amo')||el.closest('#adminSaveBtn')||el.closest('#adminExportBtn')||el.closest('#adminResetBtn')||el.closest('#adminToast')||el.closest('#adminToggle')||el.closest('.apanel')||el.closest('.afab')||el.closest('.aov')))return;
    if(!el.dataset.editId)el.dataset.editId=page+'-'+i;
  });
}

// ====== Check login status (DON'T auto-enter edit mode) ======
function isLoggedIn(){
  try{var a=JSON.parse(localStorage.getItem(AUTH_KEY)||'{}');return a.t&&Date.now()-a.t<86400000}catch(e){return false}
}

// ====== Init admin ======
function initAdmin(){
  var o=document.createElement('div');o.className='amodal-o';o.id='amo';
  o.innerHTML='<div class="amodal"><h3>管理员登录</h3><input type=password id=ap class="ainput-pwd" placeholder=密码 autocomplete=off><p id=ae class=aerr>密码错误</p><div class=abtns><button class=abtn-cancel id=ac>取消</button><button class=abtn-confirm id=afc>确认</button></div></div>';
  document.body.appendChild(o);
  document.getElementById('afc').onclick=doLogin;
  document.getElementById('ac').onclick=function(){o.classList.remove('show')};
  document.getElementById('ap').onkeydown=function(e){if(e.key==='Enter')doLogin()};

  var t=document.getElementById('adminToggle');
  if(t){
    t.onclick=function(){
      if(document.body.classList.contains('admin-mode')){
        // In edit mode -> exit
        exitEdit();
      }else if(isLoggedIn()){
        // Logged in but not editing -> enter edit mode
        enableEdit();
      }else{
        // Not logged in -> show login
        o.classList.add('show');
        document.getElementById('ap').value='';
        document.getElementById('ae').style.display='none';
      }
    };
    // Update icon based on state
    if(isLoggedIn())t.textContent='\u2699\uFE0F';
  }
}

function doLogin(){
  var p=document.getElementById('ap'),e=document.getElementById('ae');
  if(p.value===PWD){
    localStorage.setItem(AUTH_KEY,JSON.stringify({t:Date.now()}));
    document.getElementById('amo').classList.remove('show');
    var t=document.getElementById('adminToggle');if(t)t.textContent='\u2699\uFE0F';
    // Enter edit mode after login
    enableEdit();
  }else{e.style.display='block'}
}

// ====== Exit ======
function exitEdit(){
  document.body.classList.remove('admin-mode');
  document.querySelectorAll('.aed').forEach(function(el){
    el.contentEditable='false';el.classList.remove('aed');el.style.background='';
  });
  var b=document.getElementById('adminSaveBtn');if(b)b.style.display='none';
  var ex=document.getElementById('adminExportBtn');if(ex)ex.style.display='none';
  var re=document.getElementById('adminResetBtn');if(re)re.style.display='none';
  var t=document.getElementById('adminToggle');if(t)t.textContent='\u2699\uFE0F';
}

// ====== Enter edit mode ======
function enableEdit(){
  document.body.classList.add('admin-mode');
  assignAllIds();
  var page=(location.pathname.split('/').pop()||'index.html').split('?')[0];

  // Restore saved edits
  try{
    var data=JSON.parse(localStorage.getItem(SAVE_KEY)||'{}');
    if(data.version===DATA_VERSION&&data.pages&&data.pages[page]){
      var edits=data.pages[page];
      document.querySelectorAll(EDITABLE_SELECTOR).forEach(function(el){
        if(el.dataset.editId&&edits[el.dataset.editId])el.innerHTML=edits[el.dataset.editId];
      });
    }
  }catch(e){}

  var count=0;
  document.querySelectorAll(EDITABLE_SELECTOR).forEach(function(el,i){
    if(el.closest&&(el.closest('#amo')||el.closest('#adminSaveBtn')||el.closest('#adminExportBtn')||el.closest('#adminResetBtn')||el.closest('#adminToast')||el.closest('#adminToggle')||el.closest('.apanel')||el.closest('.afab')||el.closest('.aov')))return;
    el.contentEditable='true';el.classList.add('aed');
    if(!el.dataset.editId)el.dataset.editId=page+'-'+i;
    el.addEventListener('blur',function(e){saveOne(e.target);e.target.style.background=''});
    el.addEventListener('input',function(e){e.target.style.background='rgba(252,128,47,.12)'});
    count++;
  });

  // Save button
  var b=document.getElementById('adminSaveBtn');
  if(!b){b=document.createElement('button');b.id='adminSaveBtn';b.className='asave';b.textContent='\uD83D\uDCBE \u4FDD\u5B58\u4FEE\u6539';document.body.appendChild(b)}
  b.onclick=function(){var n=doSave();showToast('\u2705 \u5DF2\u4FDD\u5B58 '+n+' \u9879\u4FEE\u6539\uFF0C\u6B63\u5728\u9000\u51FA\u7F16\u8F91\u6A21\u5F0F');setTimeout(function(){exitEdit()},1200)};
  b.style.display='block';

  // Export
  var ex=document.getElementById('adminExportBtn');
  if(!ex){ex=document.createElement('button');ex.id='adminExportBtn';ex.className='asave';ex.textContent='\uD83D\uDCE4 \u5BFC\u51FA\u4FEE\u6539';document.body.appendChild(ex)}
  ex.onclick=exportEdits;ex.style.display='block';

  // Reset
  var re=document.getElementById('adminResetBtn');
  if(!re){re=document.createElement('button');re.id='adminResetBtn';re.className='asave';re.textContent='\uD83D\uDD04 \u6062\u590D\u539F\u59CB';re.style.bottom='140px';re.style.background='#dc3545';document.body.appendChild(re)}
  re.onclick=function(){if(confirm('\u786E\u5B9A\u8981\u6E05\u9664\u672C\u9875\u6240\u6709\u4FEE\u6539\uFF0C\u6062\u590D\u4E3A\u539F\u59CB\u5185\u5BB9\u5417\uFF1F')){clearPageEdits();location.reload()}};
  re.style.display='block';

  var t=document.getElementById('adminToggle');if(t)t.textContent='\u270F\uFE0F';
  showToast('\u2705 \u7F16\u8F91\u6A21\u5F0F\uFF0C'+count+'\u4E2A\u5143\u7D20\u53EF\u7F16\u8F91');
}

// ====== Save ======
function saveOne(el){
  if(!el.dataset||!el.dataset.editId)return;
  var page=(location.pathname.split('/').pop()||'index.html').split('?')[0];
  var data={version:DATA_VERSION,pages:{}};
  try{data=JSON.parse(localStorage.getItem(SAVE_KEY)||'{}')}catch(e){}
  data.version=DATA_VERSION;if(!data.pages)data.pages={};
  if(!data.pages[page])data.pages[page]={};
  var html=el.innerHTML.trim();
  if(html)data.pages[page][el.dataset.editId]=html;
  else delete data.pages[page][el.dataset.editId];
  localStorage.setItem(SAVE_KEY,JSON.stringify(data));
}

function doSave(){
  var page=(location.pathname.split('/').pop()||'index.html').split('?')[0];
  var data={version:DATA_VERSION,pages:{}};
  try{data=JSON.parse(localStorage.getItem(SAVE_KEY)||'{}')}catch(e){}
  data.version=DATA_VERSION;if(!data.pages)data.pages={};
  if(!data.pages[page])data.pages[page]={};
  var n=0;
  document.querySelectorAll('.aed').forEach(function(el){
    var h=el.innerHTML.trim();el.style.background='';
    if(h&&el.dataset.editId){data.pages[page][el.dataset.editId]=h;n++}
  });
  localStorage.setItem(SAVE_KEY,JSON.stringify(data));
  return n;
}

function clearPageEdits(){
  var page=(location.pathname.split('/').pop()||'index.html').split('?')[0];
  var data={version:DATA_VERSION,pages:{}};
  try{data=JSON.parse(localStorage.getItem(SAVE_KEY)||'{}')}catch(e){}
  if(data.pages)delete data.pages[page];
  localStorage.setItem(SAVE_KEY,JSON.stringify(data));
}

function exportEdits(){
  var blob=new Blob([localStorage.getItem(SAVE_KEY)||'{}'],{type:'application/json'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download='zoc-edits-'+new Date().toISOString().slice(0,10)+'.json';
  a.click();showToast('\u2705 \u5DF2\u5BFC\u51FA\u7F16\u8F91\u6570\u636E');
}

function showToast(msg){
  var t=document.getElementById('adminToast');
  if(!t){t=document.createElement('div');t.id='adminToast';t.style='position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:12px 24px;border-radius:25px;font-size:14px;z-index:99999;transition:all .3s;opacity:0;pointer-events:none;white-space:nowrap';document.body.appendChild(t)}
  t.textContent=msg;t.style.opacity='1';clearTimeout(t._timer);t._timer=setTimeout(function(){t.style.opacity='0'},2500);
}

document.addEventListener('DOMContentLoaded',initAdmin);
