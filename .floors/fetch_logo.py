import urllib.request, re, os, sys
sys.stdout.reconfigure(encoding='utf-8')

url = 'https://www.gzzoc.org.cn'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
resp = urllib.request.urlopen(req, timeout=10)
html = resp.read().decode('utf-8', errors='ignore')

# Find all image URLs
all_imgs = re.findall(r'(?:src|href)="([^"]*\.(?:png|svg|ico|jpg|webp))"', html, re.I)
print(f'All images ({len(all_imgs)}):')
for u in all_imgs[:40]:
    print(f'  {u}')

logo_imgs = [u for u in all_imgs if 'logo' in u.lower()]
print(f'\nLogo images: {logo_imgs}')

bg_imgs = re.findall(r'url\(["\']?([^"\')]+\.(?:png|svg|ico|jpg|webp))["\']?\)', html, re.I)
print(f'\nBackground images:')
for u in bg_imgs[:20]:
    print(f'  {u}')

# Download first logo found
target_urls = logo_imgs + [u for u in bg_imgs if 'logo' in u.lower()]
base = 'https://www.gzzoc.org.cn'
out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images')
os.makedirs(out_dir, exist_ok=True)
out = os.path.join(out_dir, 'logo.png')

for target in target_urls[:5]:
    full = target if target.startswith('http') else base + target
    print(f'\nTrying: {full}')
    try:
        req2 = urllib.request.Request(full, headers={'User-Agent': 'Mozilla/5.0', 'Referer': base})
        r = urllib.request.urlopen(req2, timeout=10)
        data = r.read()
        if len(data) > 200:
            with open(out, 'wb') as f:
                f.write(data)
            print(f'Downloaded: {out} ({len(data)} bytes)')
            break
        else:
            print(f'Too small: {len(data)} bytes')
    except Exception as e:
        print(f'Error: {e}')
