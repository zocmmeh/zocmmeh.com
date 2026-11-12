/* content-sync.js — 全站数据同步层
 * 职责：
 *  1. 为可编辑元素分配稳定 ID（与 admin.js 同算法）
 *  2. 普通浏览模式下应用后台保存的文本修改（localStorage）
 *  3. 应用后台"医院概况内容管理"的结构化数据（简介/历程/领导/荣誉/架构）
 *  4. 按后台配置渲染全站导航（index.html 有自己的渲染器，此处跳过）
 * 依赖：js/nav.js（定义 window.ZOC_NAV）；被 js/admin.js 依赖。
 */
(function(){
  var KEYS = window.ZOC_KEYS = {
    SAVE: 'zoc_site_edits_v3',
    AUTH: 'zoc_admin_auth_v2',
    ADMINS: 'zoc_admins_v4',
    PWD_OVR: 'zoc_admin_pwd_override',
    CONTENT: 'zoc_content_v1',
    NAV: 'zoc_nav_v1',
    LEGACY_SAVE: '***',
    LEGACY_ADMINS: 'zoc_a\u2026_v4'
  };

  window.ZOC_EDITABLE = ['h1','h2','h3','h4','h5','h6','p','span','a','li','td','th','label','strong','em','b','i','u','small','blockquote','code','pre','cite','div.card','div.ni','div.df','div.dg','.dept-name','.dept-floor','.dept-li','.dept-h4','.doc-name','.doc-title','.doc-exp','.doc-sched','.floor-num','.floor-title','.floor-desc','.step-h4','.step-p','.faq-q','.faq-a','.cdt h4','.cdt p','.api strong','.api p','.awt strong','.awt p','.aft strong','.aft p','.adtags span','.finfo p','.flgo span','.logo-nm','.logo-en','.dft','.ds','.dt','.de','.ahero h1','.ahero p','.date-card text','.date-card p','.motto-box .motto-text','.motto-box p','.form-label','.cc .cdt h4','.cc .cdt p'].join(',');

  function pageName(){
    return (location.pathname.split('/').pop() || 'index.html').split('?')[0];
  }
  function isExcluded(el){
    return el.closest && (el.closest('#amo') || el.closest('#adminSaveBtn') || el.closest('#adminExportBtn') ||
      el.closest('#adminImportBtn') || el.closest('#adminResetBtn') || el.closest('#adminToast') ||
      el.closest('#adminToggle') || el.closest('.apanel') || el.closest('.afab') || el.closest('.aov') ||
      el.closest('.zoc-pub'));
  }

  // ====== ID 分配（与旧版 admin.js 算法一致：page-索引） ======
  function assignAllIds(){
    var page = pageName();
    var i = 0;
    document.querySelectorAll(window.ZOC_EDITABLE).forEach(function(el){
      if (isExcluded(el)) return;
      if (!el.dataset.editId) el.dataset.editId = page + '-' + i;
      i++;
    });
  }

  // ====== 旧键数据迁移 ======
  function migrate(){
    try {
      if (!localStorage.getItem(KEYS.SAVE) && localStorage.getItem(KEYS.LEGACY_SAVE)) {
        localStorage.setItem(KEYS.SAVE, localStorage.getItem(KEYS.LEGACY_SAVE));
      }
      if (!localStorage.getItem(KEYS.ADMINS) && localStorage.getItem(KEYS.LEGACY_ADMINS)) {
        localStorage.setItem(KEYS.ADMINS, localStorage.getItem(KEYS.LEGACY_ADMINS));
      }
    } catch(e){}
  }

  // ====== 应用已保存的文本修改（普通模式也生效） ======
  function applyEdits(){
    var data;
    try { data = JSON.parse(localStorage.getItem(KEYS.SAVE) || '{}'); } catch(e){ return; }
    if (!data || !data.pages) return;
    var page = pageName();
    var edits = data.pages[page];
    if (!edits) return;
    document.querySelectorAll(window.ZOC_EDITABLE).forEach(function(el){
      if (isExcluded(el)) return;
      if (el.dataset.editId && edits[el.dataset.editId]) el.innerHTML = edits[el.dataset.editId];
    });
  }

  // ====== 应用内容管理结构化数据 ======
  function esc(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function applyContent(){
    var d;
    try { d = JSON.parse(localStorage.getItem(KEYS.CONTENT) || 'null'); } catch(e){ return; }
    if (!d) return;
    var page = pageName();
    var mc = document.querySelector('.main-content');
    if (!mc) return;

    // 医院简介：标题 + 正文（body 空行分段）
    if (page === 'about-intro.html' && d.intro && (d.intro.title || d.intro.body)) {
      var h2 = mc.querySelector('h2');
      if (d.intro.title && h2) h2.textContent = d.intro.title;
      if (d.intro.body) {
        var old = mc.querySelector('p.zoc-intro-sync');
        if (old) old.remove();
        var firstP = mc.querySelector(':scope > p');
        if (firstP) {
          var frag = document.createDocumentFragment();
          d.intro.body.split(/\n\s*\n/).forEach(function(para){
            if (!para.trim()) return;
            var p = document.createElement('p');
            p.className = 'zoc-intro-sync';
            p.innerHTML = para.trim().replace(/\n/g,'<br>');
            frag.appendChild(p);
          });
          firstP.parentNode.insertBefore(frag, firstP);
          firstP.style.display = 'none';
        }
      }
    }

    // 发展历程：里程碑重建
    if (page === 'about-history.html' && Array.isArray(d.history) && d.history.length) {
      var ml = mc.querySelector('.milestone-list');
      if (ml) {
        ml.innerHTML = d.history.map(function(m){
          return '<div class="milestone-item"><div class="milestone-date">' + esc(m.date) +
                 '</div><div class="milestone-desc">' + esc(m.desc) + '</div></div>';
        }).join('');
      }
    }

    // 荣誉资质：荣誉重建
    if (page === 'about-honor.html' && Array.isArray(d.honors) && d.honors.length) {
      var icons = ['\u{1F3C6}','\u2B50','\u{1F4DC}','\u{1F393}','\u{1F3AF}','\u{1F31F}','\u{1F947}','\u{1F396}'];
      var anchor = mc.querySelector('.highlight-box');
      var oldSync = mc.querySelectorAll('.honor-item.zoc-sync');
      oldSync.forEach(function(x){ x.remove(); });
      var frag = document.createDocumentFragment();
      d.honors.forEach(function(h, i){
        var div = document.createElement('div');
        div.className = 'honor-item zoc-sync';
        div.innerHTML = '<div class="honor-icon">' + icons[i % icons.length] + '</div>' +
          '<div class="honor-text"><h5>' + esc(h.title) + '</h5><span>' + esc(h.desc || '') + '</span></div>';
        frag.appendChild(div);
      });
      if (anchor) anchor.parentNode.insertBefore(frag, anchor); else mc.appendChild(frag);
    }

    // 领导团队：简介文本
    if (page === 'about-leader.html' && d.leader) {
      var lp = mc.querySelector('p.zoc-leader-sync');
      if (lp) lp.remove();
      var grid = mc.querySelector('.info-card-grid');
      var np = document.createElement('p');
      np.className = 'zoc-leader-sync';
      np.style.fontWeight = '600';
      np.innerHTML = d.leader.replace(/\n/g,'<br>');
      if (grid) grid.parentNode.insertBefore(np, grid); else mc.appendChild(np);
    }

    // 组织架构：分组重建
    if (page === 'about-org.html' && d.org) {
      var og = mc.querySelector('.org-grid');
      if (og) {
        var html = '';
        Object.keys(d.org).forEach(function(group){
          var depts = d.org[group] || [];
          html += '<div class="org-section"><h3>' + esc(group) + '</h3><div class="org-list">';
          depts.forEach(function(name){
            html += '<div class="org-chip">' + esc(name) + '</div>';
          });
          html += '</div></div>';
        });
        og.innerHTML = html;
      }
    }
  }

  // ====== 全站动态导航渲染 ======
  function getNav(){
    var nav = null;
    try { nav = JSON.parse(localStorage.getItem(KEYS.NAV) || 'null'); } catch(e){}
    if (!nav && window.ZOC_NAV) nav = window.ZOC_NAV;
    return nav || [];
  }

  function renderNav(){
    if (pageName() === 'index.html') return; // 首页有自己的渲染器
    var nav = getNav();
    if (!nav.length) return;
    var cur = pageName();

    // 形态一：手机风 <nav id="mainNav">（faq 等页面，链接带 .nl 类）
    var mnav = document.querySelector('nav#mainNav');
    if (mnav) {
      var toggleBtn = mnav.querySelector('#adminToggle');
      var html = '';
      nav.forEach(function(item){
        var url = item.url || '#';
        var base = url.split('#')[0].split('?')[0] || cur;
        var act = base === cur ? ' active' : '';
        html += '<a href="' + esc(url) + '" class="nl' + act + '">' + esc(item.label) + '</a>';
      });
      if (toggleBtn) html += toggleBtn.outerHTML;
      mnav.innerHTML = html;
      return;
    }

    // 形态二：PC 子页 .main-nav .container（无 id）
    var pc = document.querySelector('.main-nav .container:not(#mainNav)');
    if (pc) {
      var html2 = '';
      nav.forEach(function(item){
        var url = item.url || '#';
        var base = url.split('#')[0].split('?')[0] || cur;
        var act = base === cur ? ' class="active"' : '';
        html2 += '<a href="' + esc(url) + '"' + act + '>' + esc(item.label) + '</a>';
      });
      pc.innerHTML = html2;
    }
  }

  // ====== 启动 ======
  migrate();
  document.addEventListener('DOMContentLoaded', function(){
    assignAllIds();
    applyEdits();
    applyContent();
    renderNav();
    window.ZOC_CONTENT_SYNC_READY = true;
  });
})();
