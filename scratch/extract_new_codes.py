import json

codes = ['UMA-21', 'UMA-22', 'UMA-27', 'UMA-30', 'UMA-33', 'UMA-41', 'UMA-70']
data = json.load(open('frontend/src/data/products.json', encoding='utf-8'))

for p in data:
    if p['id'] in codes:
        print(f"[{p['id']}] {p['name']} | MAT: {p.get('materials', [])} | DESC: {p.get('description', '')}")
