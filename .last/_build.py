"""
Build script for 中山大学中山眼科中心茂名医院官网
All files written with UTF-8 encoding via Python open()
"""
import os

BASE = r"C:\Users\Jacky\.openclaw-autoclaw\workspace\maoming_eye_hospital_design"

def w(path, content):
    full = os.path.join(BASE, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  OK {path} ({len(content)} bytes)")

# ============================================================
# 1. CSS
# ============================================================
w("css/style.css", r"""/* ============================================
   中山大学中山眼科中心茂名医院 - 主样式表
   VI规范: 主色#1b4d89 辅色#fc802f
   ============================================ */

/* CSS Variables */
:root {
  --primary: #1b4d89;
  --primary-light: #6995c4;
  --primary-dark: #143a6b;
  --accent: #fc802f;
  --accent-light: #fdbf97;
  --accent-dark: #e06a1a;
  --bg: #f5f7fa;
  --white: #ffffff;
  --text: #333333;
  --text-light: #666666;
  --text-muted: #999999;
  --border: #e8ecf0;
  --shadow: rgba(27,77,137,0.08);
  --shadow-strong: rgba(27,77,137,0.15);
  --radius: 12px;
  --radius-sm: 8px;
  --radius-lg: 16px;
  --transition: all 0.3s ease;
  --header-height: 56px;
  --safe-bottom: env(safe-area-inset-bottom, 0px);
}

/* Reset & Base */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  font-size: 15px;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
  min-height: 100vh;
  padding-bottom: calc(70px + var(--safe-bottom));
}
a { color: var(--primary); text-decoration: none; transition: var(--transition); }
a:hover { color: var(--accent); }
img { max-width: 100%; height: auto; }
ul, ol { list-style: none; }

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: "Songti SC", "Noto Serif SC", "Source Han Serif CN", serif;
  color: var(--primary);
  line-height: 1.4;
}
h1 { font-size: 24px; margin-bottom: 12px; }
h2 { font-size: 20px; margin-bottom: 10px; }
h3 { font-size: 17px; margin-bottom: 8px; }

/* ============ Header / Navigation ============ */
.site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--header-height);
  background: var(--white);
  box-shadow: 0 2px 12px var(--shadow);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
.header-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}
.header-logo .logo-icon {
  width: 36px; height: 36px;
  flex-shrink: 0;
}
.header-logo .logo-text-group {
  display: flex;
  flex-direction: column;
}
.header-logo .logo-main {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 1px;
  white-space: nowrap;
  font-family: "Songti SC", "Noto Serif SC", serif;
}
.header-logo .logo-sub {
  font-size: 9px;
  color: var(--text-muted);
  letter-spacing: 2px;
}

.nav-toggle {
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 8px;
  background: none;
  border: none;
  z-index: 1001;
}
.nav-toggle span {
  width: 22px; height: 2px;
  background: var(--primary);
  transition: var(--transition);
  border-radius: 1px;
}
.nav-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.nav-toggle.active span:nth-child(2) { opacity: 0; }
.nav-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

.nav-menu {
  position: fixed;
  top: var(--header-height);
  left: 0; right: 0;
  bottom: 0;
  background: var(--white);
  z-index: 999;
  transform: translateX(100%);
  transition: transform 0.35s ease;
  overflow-y: auto;
  padding: 20px 0;
}
.nav-menu.open { transform: translateX(0); }
.nav-menu a {
  display: block;
  padding: 14px 24px;
  font-size: 16px;
  color: var(--text);
  border-bottom: 1px solid var(--border);
  transition: var(--transition);
}
.nav-menu a:hover,
.nav-menu a.active {
  background: linear-gradient(90deg, rgba(252,128,47,0.08), transparent);
  color: var(--accent);
  padding-left: 32px;
}

.admin-btn {
  display: none;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  color: var(--text-muted);
  transition: var(--transition);
}
.admin-btn:hover { color: var(--accent); }

/* Desktop nav (768px+) */
@media (min-width: 769px) {
  .nav-toggle { display: none; }
  .nav-menu {
    position: static;
    transform: none;
    display: flex;
    gap: 4px;
    padding: 0;
    background: transparent;
    overflow: visible;
  }
  .nav-menu a {
    display: inline-block;
    padding: 8px 14px;
    font-size: 14px;
    border-bottom: none;
    border-radius: var(--radius-sm);
    color: var(--text);
  }
  .nav-menu a:hover,
  .nav-menu a.active {
    background: rgba(252,128,47,0.1);
    color: var(--accent);
    padding-left: 14px;
  }
  .admin-btn { display: block; }
}

/* ============ Main Content ============ */
.main-content {
  margin-top: var(--header-height);
  min-height: calc(100vh - var(--header-height));
}

.page-banner {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 50%, #8ab4e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.page-banner::before {
  content: "";
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 60%);
}
.page-banner h1 {
  color: var(--white);
  font-size: 26px;
  text-align: center;
  text-shadow: 0 2px 8px rgba(0,0,0,0.15);
  position: relative;
  z-index: 1;
}
.page-banner .banner-subtitle {
  color: rgba(255,255,255,0.85);
  font-size: 14px;
  text-align: center;
  margin-top: 6px;
  position: relative;
  z-index: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 16px;
}
.section {
  margin-bottom: 28px;
}
.section-title {
  font-size: 19px;
  color: var(--primary);
  padding: 12px 0 12px 14px;
  border-left: 4px solid var(--accent);
  margin-bottom: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.section-title .more-link {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: normal;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ============ Carousel ============ */
.carousel {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  border-radius: 0;
}
.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
}
.carousel-slide {
  min-width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel-slide .slide-bg {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
}
.carousel-slide.slide-1 .slide-bg {
  background: linear-gradient(135deg, #1b4d89 0%, #6995c4 100%);
}
.carousel-slide.slide-2 .slide-bg {
  background: linear-gradient(135deg, #fc802f 0%, #fdbf97 100%);
}
.carousel-slide.slide-3 .slide-bg {
  background: linear-gradient(135deg, #2a7bc4 0%, #a8d4f7 100%);
}
.carousel-slide .slide-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  padding: 20px;
}
.carousel-slide .slide-motto {
  font-family: "STXingkai", "Kaiti SC", "KaiTi", cursive;
  font-size: 22px;
  letter-spacing: 8px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  margin-top: 10px;
}
.carousel-slide .slide-desc {
  font-size: 14px;
  opacity: 0.9;
  margin-top: 8px;
}
.carousel-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 3;
}
.carousel-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: var(--transition);
}
.carousel-dot.active {
  background: var(--white);
  width: 20px;
  border-radius: 4px;
}
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px; height: 32px;
  background: rgba(0,0,0,0.3);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  z-index: 3;
  display: none;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}
@media (min-width: 769px) { .carousel-arrow { display: flex; } }
.carousel-arrow:hover { background: rgba(0,0,0,0.5); }
.carousel-arrow.prev { left: 12px; }
.carousel-arrow.next { right: 12px; }

/* ============ Quick Service Cards ============ */
.quick-services {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 16px;
  background: var(--white);
  border-radius: 0 0 var(--radius) var(--radius);
  margin: -10px 16px 0;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 16px var(--shadow);
}
.quick-service-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 8px;
  border-radius: var(--radius-sm);
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
  color: var(--text);
}
.quick-service-card:hover {
  background: rgba(252,128,47,0.06);
  transform: translateY(-2px);
}
.quick-service-card .qs-icon {
  width: 44px; height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 8px;
  flex-shrink: 0;
}
.quick-service-card .qs-label {
  font-size: 12px;
  line-height: 1.3;
  color: var(--text);
}
@media (max-width: 480px) {
  .quick-services { grid-template-columns: repeat(3, 1fr); gap: 8px; padding: 12px 8px; }
  .quick-service-card .qs-icon { width: 40px; height: 40px; font-size: 20px; }
  .quick-service-card .qs-label { font-size: 11px; }
}

/* ============ Department Scroll Cards ============ */
.dept-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 4px 0 16px;
  scrollbar-width: none;
}
.dept-scroll::-webkit-scrollbar { display: none; }
.dept-card-mini {
  min-width: 160px;
  max-width: 180px;
  background: var(--white);
  border-radius: var(--radius);
  padding: 16px;
  scroll-snap-align: start;
  box-shadow: 0 2px 8px var(--shadow);
  transition: var(--transition);
  flex-shrink: 0;
}
.dept-card-mini:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px var(--shadow-strong);
}
.dept-card-mini .dept-icon-circle {
  width: 48px; height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 10px;
}
.dept-card-mini h4 {
  font-size: 15px;
  margin-bottom: 4px;
}
.dept-card-mini p {
  font-size: 12px;
  color: var(--text-light);
  line-height: 1.4;
}

/* ============ News List ============ */
.news-list { display: flex; flex-direction: column; gap: 12px; }
.news-item {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: var(--white);
  border-radius: var(--radius-sm);
  transition: var(--transition);
  text-decoration: none;
  color: inherit;
}
.news-item:hover { box-shadow: 0 4px 12px var(--shadow); }
.news-item .news-date {
  flex-shrink: 0;
  width: 52px;
  text-align: center;
  padding: 8px 4px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  border-radius: var(--radius-sm);
  color: #fff;
}
.news-item .news-date .day { font-size: 20px; font-weight: 700; line-height: 1; }
.news-item .news-date .month { font-size: 11px; opacity: 0.85; }
.news-item .news-info h4 {
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--text);
  margin-bottom: 4px;
  line-height: 1.4;
}
.news-item .news-info p {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ============ Department Full Page ============ */
.dept-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
.dept-full-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: 0 2px 10px var(--shadow);
  transition: var(--transition);
  border-left: 4px solid var(--primary);
}
.dept-full-card:hover {
  box-shadow: 0 6px 20px var(--shadow-strong);
  transform: translateY(-2px);
}
.dept-full-card .dept-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}
.dept-full-card .dept-header .dept-badge {
  width: 48px; height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}
.dept-full-card .dept-header h3 {
  font-size: 17px;
  margin: 0;
}
.dept-full-card .dept-header .dept-floor {
  font-size: 12px;
  color: var(--accent);
  background: var(--accent-light);
  padding: 2px 10px;
  border-radius: 10px;
  font-family: -apple-system, sans-serif;
}
.dept-full-card .dept-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.dept-full-card .dept-detail dt {
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 4px;
}
.dept-full-card .dept-detail dd {
  font-size: 13px;
  color: var(--text-light);
  margin-bottom: 8px;
  padding-left: 12px;
  border-left: 2px solid var(--border);
}
@media (max-width: 480px) {
  .dept-full-card .dept-detail { grid-template-columns: 1fr; }
}

/* ============ Doctor Cards ============ */
.doctor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.doctor-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: 0 2px 10px var(--shadow);
  transition: var(--transition);
  text-align: center;
}
.doctor-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px var(--shadow-strong);
}
.doctor-avatar {
  width: 80px; height: 80px;
  border-radius: 50%;
  margin: 0 auto 12px;
  background: linear-gradient(135deg, var(--primary-light), var(--primary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 32px;
  font-family: "Songti SC", serif;
}
.doctor-card h3 { font-size: 17px; margin-bottom: 2px; }
.doctor-card .doctor-title {
  font-size: 13px;
  color: var(--accent);
  margin-bottom: 8px;
}
.doctor-card .doctor-specialty {
  font-size: 13px;
  color: var(--text-light);
  line-height: 1.5;
  margin-bottom: 8px;
}
.doctor-card .doctor-schedule {
  font-size: 12px;
  color: var(--primary);
  background: rgba(27,77,137,0.06);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  display: inline-block;
}

/* ============ Floor Navigation ============ */
.floor-nav {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}
.floor-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: 0 2px 8px var(--shadow);
  transition: var(--transition);
  border-top: 4px solid var(--primary);
  position: relative;
  overflow: hidden;
}
.floor-card:hover { transform: translateY(-2px); box-shadow: 0 6px 16px var(--shadow-strong); }
.floor-card .floor-number {
  font-size: 28px;
  font-weight: 800;
  font-family: -apple-system, sans-serif;
  line-height: 1;
  margin-bottom: 6px;
}
.floor-card .floor-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 6px;
}
.floor-card .floor-depts {
  font-size: 12px;
  color: var(--text-light);
  line-height: 1.6;
}
.floor-card .floor-tag {
  display: inline-block;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  margin-top: 6px;
  font-weight: 500;
}

/* Floor zone colors */
.floor-card.zone-clinic { border-top-color: #2196F3; }
.floor-card.zone-clinic .floor-number { color: #2196F3; }
.floor-card.zone-check { border-top-color: #4CAF50; }
.floor-card.zone-check .floor-number { color: #4CAF50; }
.floor-card.zone-logistics { border-top-color: #9E9E9E; }
.floor-card.zone-logistics .floor-number { color: #757575; }
.floor-card.zone-surgery { border-top-color: #ff9800; }
.floor-card.zone-surgery .floor-number { color: #ff9800; }
.floor-card.zone-inpatient { border-top-color: #FFC107; }
.floor-card.zone-inpatient .floor-number { color: #f57c00; }

/* Special floor highlights */
.floor-card.highlight-laser {
  border: 2px solid var(--accent);
  background: linear-gradient(135deg, #fff 0%, #fff8f0 100%);
}
.floor-card.highlight-laser::after {
  content: "\2605 \u91cd\u70b9\u79d1\u5ba4";
  position: absolute;
  top: 10px; right: -24px;
  background: var(--accent);
  color: #fff;
  font-size: 10px;
  padding: 2px 24px;
  transform: rotate(45deg);
}
.floor-card.tag-negative {
  border-left: 3px solid #e53935;
}
.floor-card.tag-vip {
  background: linear-gradient(135deg, #fff 0%, #fef9e7 100%);
  border: 2px solid #ffd54f;
}

/* ============ Process Steps ============ */
.process-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  padding-left: 30px;
}
.process-steps::before {
  content: "";
  position: absolute;
  left: 14px; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--primary), var(--accent));
}
.process-step {
  position: relative;
  padding: 14px 18px;
  margin-bottom: 12px;
  background: var(--white);
  border-radius: var(--radius-sm);
  box-shadow: 0 2px 6px var(--shadow);
}
.process-step::before {
  content: attr(data-step);
  position: absolute;
  left: -26px; top: 14px;
  width: 26px; height: 26px;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.process-step h4 {
  font-size: 15px;
  font-family: -apple-system, sans-serif;
  color: var(--primary);
  margin-bottom: 4px;
}
.process-step p {
  font-size: 13px;
  color: var(--text-light);
  line-height: 1.5;
}

/* ============ Fee Tables ============ */
.fee-table-wrapper {
  overflow-x: auto;
  border-radius: var(--radius);
  box-shadow: 0 2px 8px var(--shadow);
}
.fee-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--white);
  font-size: 14px;
}
.fee-table th {
  background: var(--primary);
  color: #fff;
  padding: 12px 14px;
  text-align: left;
  font-weight: 600;
  white-space: nowrap;
}
.fee-table td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  color: var(--text);
}
.fee-table tr:hover td { background: rgba(252,128,47,0.04); }
.fee-table tr:last-child td { border-bottom: none; }
.fee-table .fee-price {
  color: var(--accent);
  font-weight: 700;
  text-align: right;
}

/* ============ FAQ Accordion ============ */
.faq-category { margin-bottom: 20px; }
.faq-category-title {
  font-size: 16px;
  color: var(--white);
  background: linear-gradient(90deg, var(--primary), var(--primary-light));
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  margin-bottom: 10px;
}
.faq-item {
  background: var(--white);
  border-radius: var(--radius-sm);
  margin-bottom: 8px;
  box-shadow: 0 1px 4px var(--shadow);
  overflow: hidden;
}
.faq-question {
  padding: 14px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  transition: var(--transition);
  user-select: none;
}
.faq-question:hover { background: rgba(252,128,47,0.04); }
.faq-question .faq-arrow {
  transition: transform 0.3s ease;
  color: var(--accent);
  font-size: 12px;
}
.faq-item.open .faq-question .faq-arrow { transform: rotate(180deg); }
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease;
}
.faq-answer-inner {
  padding: 0 16px 14px;
  font-size: 13px;
  color: var(--text-light);
  line-height: 1.7;
}
.faq-item.open .faq-answer { max-height: 300px; }

/* ============ Booking Form ============ */
.booking-form {
  background: var(--white);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: 0 2px 12px var(--shadow);
}
.form-group { margin-bottom: 18px; }
.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 6px;
}
.form-control {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--text);
  background: var(--white);
  transition: var(--transition);
  outline: none;
  font-family: inherit;
}
.form-control:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(252,128,47,0.12);
}
select.form-control { appearance: auto; }
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 28px;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
  font-family: inherit;
}
.btn-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-dark));
  color: #fff;
  box-shadow: 0 4px 12px rgba(252,128,47,0.3);
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(252,128,47,0.4);
}
.btn-primary:active { transform: translateY(0); }
.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 1.5px solid var(--primary);
}
.btn-outline:hover {
  background: var(--primary);
  color: #fff;
}
.btn-block { width: 100%; }

/* ============ About Page ============ */
.about-hero {
  background: linear-gradient(135deg, var(--primary) 0%, #2a7bc4 50%, var(--primary-light) 100%);
  padding: 40px 20px;
  text-align: center;
  color: #fff;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
}
.about-motto {
  font-family: "STXingkai", "Kaiti SC", "KaiTi", cursive;
  font-size: 32px;
  letter-spacing: 12px;
  margin: 16px 0;
  text-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 20px 0;
}
.stat-item {
  text-align: center;
  padding: 20px 12px;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: 0 2px 8px var(--shadow);
}
.stat-item .stat-num {
  font-size: 32px;
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
}
.stat-item .stat-label {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 6px;
}
.equipment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}
.equip-card {
  background: var(--white);
  border-radius: var(--radius-sm);
  padding: 16px;
  text-align: center;
  box-shadow: 0 2px 6px var(--shadow);
}
.equip-card .equip-icon { font-size: 36px; margin-bottom: 8px; }
.equip-card h4 { font-size: 14px; margin-bottom: 4px; }
.equip-card p { font-size: 12px; color: var(--text-muted); }

/* ============ Contact Page ============ */
.contact-info-list { display: flex; flex-direction: column; gap: 12px; }
.contact-item {
  display: flex;
  gap: 14px;
  padding: 16px;
  background: var(--white);
  border-radius: var(--radius-sm);
  box-shadow: 0 2px 6px var(--shadow);
  align-items: flex-start;
}
.contact-item .ci-icon {
  width: 44px; height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}
.contact-item .ci-body h4 { font-size: 15px; margin-bottom: 2px; }
.contact-item .ci-body p { font-size: 13px; color: var(--text-light); }

.map-placeholder {
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, #e8f0fe, #d4e4f7);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 14px;
  margin-top: 16px;
}

/* ============ Footer ============ */
.site-footer {
  background: var(--primary-dark);
  color: rgba(255,255,255,0.85);
  padding: 28px 16px 20px;
  margin-top: 30px;
}
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 769px) {
  .footer-content { grid-template-columns: 2fr 1fr 1fr; }
}
.footer-section h4 {
  color: #fff;
  font-size: 15px;
  margin-bottom: 10px;
  font-family: -apple-system, sans-serif;
}
.footer-section p, .footer-section li {
  font-size: 13px;
  line-height: 1.8;
  color: rgba(255,255,255,0.7);
}
.footer-section ul li { padding-left: 0; }
.footer-bottom {
  text-align: center;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 12px;
  color: rgba(255,255,255,0.5);
}
.qr-placeholder {
  width: 100px; height: 100px;
  background: rgba(255,255,255,0.1);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: rgba(255,255,255,0.5);
}

/* ============ AI Assistant Float Button & Panel ============ */
.ai-float-btn {
  position: fixed;
  bottom: 24px;
  right: 20px;
  width: 54px; height: 54px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-dark));
  color: #fff;
  border: none;
  box-shadow: 0 4px 16px rgba(252,128,47,0.4);
  cursor: pointer;
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: var(--transition);
  animation: ai-pulse 2s infinite ease-in-out;
}
.ai-float-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 22px rgba(252,128,47,0.5);
}
@keyframes ai-pulse {
  0%, 100% { box-shadow: 0 4px 16px rgba(252,128,47,0.4); }
  50% { box-shadow: 0 4px 24px rgba(252,128,47,0.6), 0 0 0 8px rgba(252,128,47,0.1); }
}

.ai-panel-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 9001;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
}
.ai-panel-overlay.show { opacity: 1; visibility: visible; }

.ai-panel {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 80vh;
  max-height: 600px;
  background: var(--white);
  border-radius: 20px 20px 0 0;
  z-index: 9002;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.ai-panel.show { transform: translateY(0); }
.ai-panel-handle {
  width: 40px; height: 4px;
  background: var(--border);
  border-radius: 2px;
  margin: 10px auto 8px;
  cursor: pointer;
}
.ai-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px 12px;
  border-bottom: 1px solid var(--border);
}
.ai-panel-header h3 {
  font-size: 16px;
  font-family: -apple-system, sans-serif;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}
.ai-panel-close {
  width: 28px; height: 28px;
  border-radius: 50%;
  border: none;
  background: var(--bg);
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.ai-tabs {
  display: flex;
  gap: 4px;
  padding: 8px 12px;
  overflow-x: auto;
  border-bottom: 1px solid var(--border);
  scrollbar-width: none;
}
.ai-tabs::-webkit-scrollbar { display: none; }
.ai-tab {
  padding: 8px 14px;
  border: none;
  background: transparent;
  border-radius: 20px;
  font-size: 13px;
  color: var(--text-light);
  cursor: pointer;
  white-space: nowrap;
  transition: var(--transition);
  font-family: inherit;
  flex-shrink: 0;
}
.ai-tab.active {
  background: var(--primary);
  color: #fff;
}
.ai-tab:hover:not(.active) { background: var(--bg); }

.ai-tab-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: none;
}
.ai-tab-content.active { display: block; }

.ai-symptom-input {
  width: 100%;
  padding: 12px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  resize: none;
  min-height: 80px;
  outline: none;
  font-family: inherit;
  margin-bottom: 10px;
}
.ai-symptom-input:focus { border-color: var(--accent); }
.ai-recommend-btn {
  width: 100%;
  padding: 10px;
  background: linear-gradient(135deg, var(--accent), var(--accent-dark));
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
}
.ai-result-box {
  margin-top: 12px;
  padding: 12px;
  background: var(--bg);
  border-radius: var(--radius-sm);
  font-size: 13px;
  line-height: 1.6;
  display: none;
}
.ai-result-box.show { display: block; }

.ai-floor-buttons {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
}
.ai-floor-btn {
  padding: 8px 4px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--white);
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  transition: var(--transition);
}
.ai-floor-btn:hover { border-color: var(--accent); color: var(--accent); }

.ai-info-list {
  font-size: 13px;
  line-height: 1.8;
  color: var(--text-light);
}
.ai-info-list li {
  padding: 6px 0;
  border-bottom: 1px dashed var(--border);
}
.ai-info-list li:last-child { border-bottom: none; }

/* ============ Admin Styles ============ */
.admin-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 9999;
  display: none;
  align-items: center;
  justify-content: center;
}
.admin-modal.show { display: flex; }
.admin-login-box {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 32px;
  width: 90%;
  max-width: 360px;
  text-align: center;
}
.admin-login-box h3 { margin-bottom: 16px; }
.admin-login-box input {
  width: 100%;
  padding: 12px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  margin-bottom: 12px;
  font-size: 14px;
  outline: none;
}
.admin-login-box input:focus { border-color: var(--accent); }

.editable[contenteditable="true"] {
  outline: 2px dashed var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
  cursor: text;
}
.admin-toolbar {
  position: fixed;
  top: var(--header-height);
  left: 0; right: 0;
  background: var(--primary-dark);
  color: #fff;
  padding: 8px 16px;
  display: none;
  align-items: center;
  gap: 12px;
  z-index: 998;
  font-size: 13px;
}
.admin-toolbar.show { display: flex; }
.admin-toolbar button {
  padding: 6px 14px;
  border: 1px solid rgba(255,255,255,0.3);
  background: transparent;
  color: #fff;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 12px;
}
.admin-toolbar button:hover { background: rgba(255,255,255,0.15); }

/* ============ Utility Classes ============ */
.text-center { text-align: center; }
.text-accent { color: var(--accent); }
.text-primary { color: var(--primary); }
.mt-10 { margin-top: 10px; }
.mt-16 { margin-top: 16px; }
.mb-10 { margin-bottom: 10px; }
.mb-16 { margin-bottom: 16px; }
.p-16 { padding: 16px; }
.bg-white { background: var(--white); }
.rounded { border-radius: var(--radius); }
.shadow { box-shadow: 0 2px 8px var(--shadow); }

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in-up { animation: fadeInUp 0.5s ease forwards; }

/* Responsive tweaks */
@media (max-width: 480px) {
  .page-banner { height: 160px; }
  .page-banner h1 { font-size: 22px; }
  .carousel { height: 190px; }
  .about-motto { font-size: 24px; letter-spacing: 6px; }
  .stat-item .stat-num { font-size: 26px; }
  .floor-nav { grid-template-columns: 1fr; }
  .doctor-grid { grid-template-columns: 1fr; }
  .ai-panel { height: 85vh; }
  .ai-floor-buttons { grid-template-columns: repeat(5, 1fr); }
}
""")

print("CSS done")
