import glob, os

base = r'C:\Users\Jacky\.openclaw-autoclaw\workspace\maoming_eye_hospital_design'

# The admin banner to remove
banner_start = '<div style="\n  position:fixed;bottom:0;left:0;right:0;\n  background:linear-gradient(90deg,#1a5cb0,#2d7dd2);'
banner_end = '关闭</button>\n</div>'

for fpath in glob.glob(os.path.join(base, '*.html')):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '🔧 网站管理' in content:
        # Remove the banner div
        import re
        # Match the entire banner div
        pattern = r'<div style="\s*position:fixed;bottom:0;.*?关闭</button>\s*</div>'
        new_content = re.sub(pattern, '', content, flags=re.DOTALL)
        
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Removed banner: {os.path.basename(fpath)}')
    else:
        print(f'No banner: {os.path.basename(fpath)}')

print('Done!')
