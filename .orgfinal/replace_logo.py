import os, re, glob

base_dir = r'C:\Users\Jacky\.openclaw-autoclaw\workspace\maoming_eye_hospital_design'

# The old SVG block to replace
old_svg = '''<svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="#1a5cb0"/>
        <circle cx="20" cy="20" r="8" stroke="#fff" stroke-width="2" fill="none"/>
        <circle cx="20" cy="20" r="3" fill="#fff"/>
      </svg>'''

new_logo = '<img src="images/logo.png" alt="中山大学中山眼科中心" style="height:40px;">'

# Find all HTML files
html_files = glob.glob(os.path.join(base_dir, '*.html'))
for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if old SVG exists
    if old_svg in content:
        content = content.replace(old_svg, new_logo)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {os.path.basename(fpath)}')
    else:
        print(f'No SVG match: {os.path.basename(fpath)}')

# Also copy favicon
import shutil
favicon_src = os.path.join(base_dir, 'images', 'favicon.ico')
favicon_dst = os.path.join(base_dir, 'favicon.ico')
if os.path.exists(favicon_src):
    shutil.copy2(favicon_src, favicon_dst)
    print(f'Copied favicon.ico')

print('Done!')
