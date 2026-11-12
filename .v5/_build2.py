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
w("css/style.css", open(os.path.join(BASE, "css", "style.css"), "r", encoding="utf-8").read())
print("CSS loaded from existing file")

# Actually let me just rewrite everything fresh
