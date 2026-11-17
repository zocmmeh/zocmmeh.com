var AUTH_KEY = (window.ZOC_KEYS && window.ZOC_KEYS.AUTH) || 'zoc_admin_auth_v2';
var SAVE_KEY = (window.ZOC_KEYS && window.ZOC_KEYS.SAVE) || 'zoc_site_edits_v3';
var PWD_OVR_KEY = (window.ZOC_KEYS && window.ZOC_KEYS.PWD_OVR) || 'zoc_admin_pwd_override';
var DATA_VERSION = 'v3';

var EDITABLE_SELECTOR = window.ZOC_EDITABLE || ['h1','h2','h3','h4','h5','h6','p','span','a','li','td','th','label','strong','em','b','i','u','small','blockquote','code','pre','cite'].join(',');

// ====== 密码：后台改密后前台同步（读取 override，兜底默认） ======
function currentPwd(){
  try { return localStorage.getItem(PWD_OVR_KEY) || 'zoc0001'; } catch(e){ return 'zoc0001'; }
}

// ====== 登录态 ======
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
        exitEdit();
      }else if(isLoggedIn()){
        enableEdit();
      }else{
        o.classList.add('show');
        document.getElementById('ap').value='';
        document.getElementById('ae').style.display='none';
      }
    };
    if(isLoggedIn())t.textContent='\u2699\uFE0F';
  }
}

function doLogin(){
  var p=document.getElementById('ap'),e=document.getElementById('ae');
  if(p.value===currentPwd()){
    localStorage.setItem(AUTH_KEY,JSON.stringify({t:Date.now()}));
    document.getElementById('amo').classList.remove('show');
    var t=document.getElementById('adminToggle');if(t)t.textContent='\u2699\uFE0F';
    enableEdit();
  }else{e.style.display='block'}
}

// ====== Exit ======
function exitEdit(){
  document.body.classList.remove('admin-mode');
  document.querySelectorAll('.aed').forEach(function(el){
    el.contentEditable='false';el.classList.remove('aed');el.style.background='';
  });
  ['adminSaveBtn','adminExportBtn','adminResetBtn'].forEach(function(id){
    var b=document.getElementById(id);if(b)b.style.display='none';
  });
  var t=document.getElementById('adminToggle');if(t)t.textContent='\u2699\uFE0F';
}

// ====== Enter edit mode ======
function enableEdit(){
  document.body.classList.add('admin-mode');
  var page=(location.pathname.split('/').pop()||'index.html').split('?')[0];

  // content-sync.js 已在普通模式分配 ID 并应用过修改；此处兜底补齐缺失 ID
  if(!(window.ZOC_CONTENT_SYNC_READY)){
    var i=0;
    document.querySelectorAll(EDITABLE_SELECTOR).forEach(function(el){
      if(el.closest&&(el.closest('#amo')||el.closest('#adminSaveBtn')||el.closest('#adminExportBtn')||el.closest('#adminResetBtn')||el.closest('#adminToast')||el.closest('#adminToggle')||el.closest('.apanel')||el.closest('.afab')||el.closest('.aov')))return;
      if(!el.dataset.editId)el.dataset.editId=page+'-'+i;
      i++;
    });
  }

  var count=0;
  document.querySelectorAll(EDITABLE_SELECTOR).forEach(function(el){
    if(el.closest&&(el.closest('#amo')||el.closest('#adminSaveBtn')||el.closest('#adminExportBtn')||el.closest('#adminResetBtn')||el.closest('#adminToast')||el.closest('#adminToggle')||el.closest('.apanel')||el.closest('.afab')||el.closest('.aov')))return;
    el.contentEditable='true';el.classList.add('aed');
    if(!el.dataset.editId)el.dataset.editId=page+'-x'+count;
    el.addEventListener('blur',function(e){saveOne(e.target);e.target.style.background=''});
    el.addEventListener('input',function(e){e.target.style.background='rgba(252,128,47,.12)'});
    count++;
  });

  // Save button
  var b=document.getElementById('adminSaveBtn');
  if(!b){b=document.createElement('button');b.id='adminSaveBtn';b.className='asave';b.textContent='\uD83D\uDCBE \u4FDD\u5B58\u4FEE\u6539';document.body.appendChild(b)}
  b.onclick=function(){var n=doSave();showToast('\u2705 \u5DF2\u4FDD\u5B58 '+n+' \u9879\uFF08\u672C\u673A\u7ACB\u5373\u751F\u6548\uFF0C\u5168\u7F51\u4E0A\u7EBF\u9700\u53D1\u5E03\u66F4\u65B0\uFF09');setTimeout(function(){exitEdit()},1600)};
  b.style.display='block';

  // Export（发布数据包：后台修改 + 内容管理 + 导航 三合一）
  var ex=document.getElementById('adminExportBtn');
  if(!ex){ex=document.createElement('button');ex.id='adminExportBtn';ex.className='asave';ex.textContent='\uD83D\uDCE4 \u5BFC\u51FA\u66F4\u65B0';ex.style.bottom='210px';document.body.appendChild(ex)}
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

// ====== 导出发布数据包（含全部修改，交给开发者合并上线） ======
function exportEdits(){
  var CK=(window.ZOC_KEYS&&window.ZOC_KEYS.CONTENT)||'zoc_content_v1';
  var NK=(window.ZOC_KEYS&&window.ZOC_KEYS.NAV)||'zoc_nav_v1';
  var pack={exportedAt:new Date().toISOString(),page:location.href,edits:null,content:null,nav:null};
  try{pack.edits=JSON.parse(localStorage.getItem(SAVE_KEY)||'null')}catch(e){}
  try{pack.content=JSON.parse(localStorage.getItem(CK)||'null')}catch(e){}
  try{pack.nav=JSON.parse(localStorage.getItem(NK)||'null')}catch(e){}
  var blob=new Blob([JSON.stringify(pack,null,1)],{type:'application/json'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download='zoc-update-'+new Date().toISOString().slice(0,10)+'.json';
  a.click();
  showToast('\u2705 \u66F4\u65B0\u5305\u5DF2\u4E0B\u8F7D\uFF0C\u53D1\u7ED9\u5F00\u53D1\u8005\u5373\u53EF\u5168\u7F51\u4E0A\u7EBF');
}

function showToast(msg){
  var t=document.getElementById('adminToast');
  if(!t){t=document.createElement('div');t.id='adminToast';t.style='position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:12px 24px;border-radius:25px;font-size:14px;z-index:99999;transition:all .3s;opacity:0;pointer-events:none;white-space:nowrap';document.body.appendChild(t)}
  t.textContent=msg;t.style.opacity='1';clearTimeout(t._timer);t._timer=setTimeout(function(){t.style.opacity='0'},2500);
}

document.addEventListener('DOMContentLoaded',initAdmin);
