// 导航配置 v1 — 由 admin.html 导航管理模块读写
window.ZOC_NAV = JSON.parse(localStorage.getItem('zoc_nav_v1') || 'null') || [
  {id:"home", label:"首页", url:"index.html", active:false},
  {id:"about", label:"医院概况", url:"about.html", active:false, children:[
    {label:"医院简介", url:"about-intro.html"},
    {label:"发展历程", url:"about-history.html"},
    {label:"领导团队", url:"about-leader.html"},
    {label:"荣誉资质", url:"about-honor.html"},
    {label:"组织架构", url:"about-org.html"}
  ]},
  {id:"departments", label:"科室导航", url:"departments.html", active:false},
  {id:"doctors", label:"专家介绍", url:"doctors.html", active:false},
  {id:"guide", label:"就医指南", url:"guide.html", active:false},
  {id:"appointment", label:"预约挂号", url:"appointment.html", active:false},
  {id:"consultation", label:"在线问诊", url:"consultation.html", active:false},
  {id:"news", label:"新闻中心", url:"index.html#news", active:false},
  {id:"contact", label:"联系我们", url:"contact.html", active:false, children:[
    {label:"联系我们", url:"contact.html"},
    {label:"加入我们", url:"join.html"}
  ]}
];
