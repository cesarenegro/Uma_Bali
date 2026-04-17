import json
import os
import re

with open('simulate_rename.txt', encoding='utf-16') as f:
    text = f.read()

mappings = re.findall(r'(\S+\.png)\s+-> old:\s+(\S+\.png)\s+-> finish:\s+(\w+)', text)

curr_to_new = {}
db_path = 'frontend/src/data/products.json'
with open(db_path, encoding='utf-8') as f:
    products = json.load(f)

product_used_finishes = {}

def get_suffix(code, finish):
    if code not in product_used_finishes:
        product_used_finishes[code] = {}
        
    finishes = product_used_finishes[code]
    count = finishes.get(finish, 0)
    finishes[finish] = count + 1
    
    if count == 0: return ''
    return f'_alt{count}'

image_dir = 'frontend/public/images/products'

renamed_count = 0
for p in products:
    images = p.get('images', [])
    new_images = []
    for img_path in images:
        filename = os.path.basename(img_path)
        match = next((m for m in mappings if m[0] == filename), None)
        if match:
            curr, old, finish = match
            cat = p['category'].lower().replace(' ', '')
            if cat.endswith('s'): cat = cat[:-1]
            if cat == 'sofachair': cat = 'chair'
            c_clean = p['id'].lower().replace('-', '')
            suffix = get_suffix(p['id'], finish)
            new_filename = f"{cat}_{c_clean}_{finish}{suffix}.png"
            
            old_phys = os.path.join(image_dir, curr)
            new_phys = os.path.join(image_dir, new_filename)
            if os.path.exists(old_phys) and not os.path.exists(new_phys):
                os.rename(old_phys, new_phys)
                renamed_count += 1
            elif os.path.exists(old_phys) and os.path.exists(new_phys):
                if old_phys != new_phys:
                    os.remove(old_phys)
            
            new_images.append(f"/images/products/{new_filename}")
        else:
            new_images.append(img_path)
    
    p['images'] = new_images
    if p.get('image'):
        preferred = next((i for i in new_images if 'natural' in i or 'honey' in i), new_images[0] if new_images else p['image'])
        p['image'] = preferred

with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Renamed {renamed_count} files and updated products.json!")
