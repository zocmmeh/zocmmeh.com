import glob, os

base = r'C:\Users\Jacky\.openclaw-autoclaw\workspace\maoming_eye_hospital_design'
old = '<span class="sub">中山大学中山眼科中心</span>'
new = '<span class="sub">maoming eye hospital</span>'

for fpath in glob.glob(os.path.join(base, '*.html')):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {os.path.basename(fpath)}')
    else:
        print(f'Skip: {os.path.basename(fpath)}')
