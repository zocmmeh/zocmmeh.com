import fitz, os, sys
sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r'C:\Users\Jacky\.openclaw-autoclaw\workspace\.autoclaw-attachments\20260521-124919-5b0bef0a-c00-C--Users-Jacky-Desktop-zoc中大眼科文档-4#楼各层平面图-套精装后发甲方-2026.2.9.pdf'
out_dir = r'C:\Users\Jacky\.openclaw-autoclaw\workspace\maoming_eye_hospital_design\images\floorplans'
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f'Total pages: {len(doc)}')

for i, page in enumerate(doc):
    # Extract text
    text = page.get_text()
    print(f'\n=== Page {i+1} ===')
    print(text[:2000] if text.strip() else '(no text)')
    
    # Render as image
    mat = fitz.Matrix(2, 2)  # 2x zoom for better quality
    pix = page.get_pixmap(matrix=mat)
    img_path = os.path.join(out_dir, f'floor_{i+1}.png')
    pix.save(img_path)
    print(f'Saved image: {img_path} ({pix.width}x{pix.height})')

doc.close()
