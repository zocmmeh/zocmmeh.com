/**
 * 智能导诊模块 - 纯前端关键词匹配
 */
document.addEventListener('DOMContentLoaded', () => {
  initTriage();
  initFeeTabs();
  initNewsTabs();
});

/* --- 智能导诊 --- */
function initTriage() {
  // 仅在有导诊输入框的页面初始化
  const input = document.getElementById('triageInput');
  if (!input) return;

  // 回车触发
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      doTriage();
    }
  });
}

function doTriage() {
  const input = document.getElementById('triageInput');
  const resultEl = document.getElementById('triageResult');
  if (!input || !resultEl) return;

  const text = input.value.trim();
  if (!text) {
    showResult(resultEl, 'warning', '请先描述您的症状哦~', '');
    return;
  }

  // 关键词匹配规则（按优先级排列）
  const rules = [
    {
      keywords: ['视力模糊', '看东西模糊', '看不清', '雾蒙蒙', '像有雾', '朦胧'],
      dept: '白内障科',
      advice: '建议您前往10F内眼手术区·白内障科就诊。白内障是常见的致盲性眼病，早期通过手术治疗效果良好。',
      link: 'departments.html'
    },
    {
      keywords: ['眼压高', '头痛', '眼胀', '眼痛伴头痛', '恶心呕吐', '虹视', '灯光彩虹'],
      dept: '青光眼科',
      advice: '建议您前往10F内眼手术区·青光眼科就诊。青光眼需尽早控制眼压，避免视神经损伤。如症状剧烈请立即前往急诊。',
      link: 'departments.html'
    },
    {
      keywords: ['飞蚊症', '黑影飘动', '闪光感', '眼底出血', '糖尿病眼底', '糖网', '黄斑病变', '视网膜脱落', '视网膜脱离', '视力突然下降'],
      dept: '眼底病科',
      advice: '建议您前往9F外伤急诊感染+眼底手术·眼底病科就诊。眼底疾病需专业检查确诊，切勿拖延。',
      link: 'departments.html'
    },
    {
      keywords: ['近视', '散光', '想摘眼镜', '想做激光', 'LASIK', 'SMILE', '飞秒', '戴眼镜不舒服', '隐形眼镜', '角膜塑形'],
      dept: '近视眼激光治疗科',
      advice: '建议您前往8F日间手术中心·近视眼激光治疗科咨询。我们有全飞秒SMILE、半飞秒等多种近视矫正方案可选。',
      link: 'departments.html'
    },
    {
      keywords: ['斜视', '弱视', '小孩视力差', '孩子眼睛', '儿童视力', '斗鸡眼', '歪头看东西', '眯眼', '小朋友'],
      dept: '小儿眼病科',
      advice: '建议您前往2F-4F门诊诊室·小儿眼病科就诊。儿童眼病需及早干预，治疗效果更好。',
      link: 'departments.html'
    },
    {
      keywords: ['眼皮松弛', '流泪', '泪道阻塞', '眼泪汪汪', '眼袋', '眼皮耷拉', '眼睑下垂', '眼部美容'],
      dept: '眼整形与泪道科',
      advice: '建议您前往11F外眼手术区·眼整形与泪道科就诊。我们的专家可以为您提供专业的诊疗和美容方案。',
      link: 'departments.html'
    },
    {
      keywords: ['红', '疼痛', '外伤', '异物进眼', '化学烧伤', '酸碱', '被东西打到', '突发失明', '紧急'],
      dept: '急诊',
      advice: '⚠️ 您描述的症状可能需要紧急处理！建议您立即前往首层门诊大厅或拨打急诊电话 0668-XXXXXXX（24小时）。如为化学烧伤，请立即用清水冲洗至少15分钟。',
      link: ''
    }
  ];

  let matched = null;
  for (const rule of rules) {
    for (const kw of rule.keywords) {
      if (text.includes(kw)) {
        matched = rule;
        break;
      }
    }
    if (matched) break;
  }

  if (matched) {
    const isEmergency = matched.dept === '急诊';
    const resultClass = isEmergency ? 'warning' : 'success';
    let html = '<div class="result-dept">🏥 推荐科室：' + matched.dept + '</div>';
    html += '<div>' + matched.advice + '</div>';
    if (matched.link) {
      html += '<div class="result-advice"><a href="' + matched.link + '" style="color:var(--primary);font-weight:600;">→ 查看科室详情</a></div>';
    }
    showResult(resultEl, resultClass, '', html);
  } else {
    showResult(resultEl, 'warning',
      '🏥 建议到首层门诊大厅挂号就诊',
      '未能精确匹配您的症状描述，建议您到首层门诊大厅挂号，由分诊护士为您安排合适的科室。<br><br>您也可以尝试更换关键词描述，如："视力模糊"、"眼睛红痛"、"小孩斜视"等。');
  }
}

function showResult(el, type, title, html) {
  el.className = 'triage-result show ' + type;
  if (title && !html) {
    el.innerHTML = '<div class="result-dept">' + title + '</div>';
  } else if (html) {
    el.innerHTML = html;
  }
}


/* --- 费用查询 Tabs --- */
function initFeeTabs() {
  const tabs = document.querySelectorAll('.fee-tab');
  const panels = document.querySelectorAll('.fee-panel');
  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.feetab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('feepanel-' + target);
      if (panel) panel.classList.add('active');
    });
  });
}


/* --- 新闻 Tabs --- */
function initNewsTabs() {
  const tabs = document.querySelectorAll('.news-tab');
  const panels = document.querySelectorAll('.news-tab-panel');
  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.newstab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('newspanel-' + target);
      if (panel) panel.classList.add('active');
    });
  });
}
