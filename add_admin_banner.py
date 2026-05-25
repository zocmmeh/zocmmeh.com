import os, glob

base_dir = r'C:\Users\Jacky\.openclaw-autoclaw\workspace\maoming_eye_hospital_design'

admin_banner = '''<div style="
  position:fixed;bottom:0;left:0;right:0;
  background:linear-gradient(90deg,#1a5cb0,#2d7dd2);
  color:#fff;padding:8px 16px;font-size:12px;
  display:flex;align-items:center;justify-content:center;gap:16px;
  z-index:99999;box-shadow:0 -2px 8px rgba(0,0,0,0.15);
  font-family:'Microsoft YaHei',sans-serif;
">
  <span>🔧 网站管理：源文件位于 <code style="background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:3px;">maoming_eye_hospital_design/</code> 文件夹</span>
  <span style="opacity:0.6">|</span>
  <a href="README_ADMIN.md" style="color:#ffd700;text-decoration:underline;" target="_blank">📋 编辑指南</a>
  <span style="opacity:0.6">|</span>
  <a href="services.html" style="color:#ffd700;text-decoration:underline;">🏥 在线预约管理</a>
  <span style="opacity:0.6">|</span>
  <span style="opacity:0.8;">如需修改内容，请编辑对应 HTML 文件</span>
  <button onclick="this.parentElement.style.display='none'" style="background:none;border:1px solid rgba(255,255,255,0.5);color:#fff;padding:2px 8px;border-radius:3px;cursor:pointer;font-size:11px;margin-left:8px;">关闭</button>
</div>'''

html_files = glob.glob(os.path.join(base_dir, '*.html'))
for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    if '🔧 网站管理' in content:
        print(f'Skip: {os.path.basename(fpath)}')
        continue
    # Insert before </body>
    if '</body>' in content:
        content = content.replace('</body>', admin_banner + '\n</body>')
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Added: {os.path.basename(fpath)}')
    else:
        print(f'No </body>: {os.path.basename(fpath)}')

print('Done!')
