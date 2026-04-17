import json
codes = ['UMA-04', 'UMA-05', 'UMA-07', 'UMA-26', 'UMA-28', 'UMA-29', 'UMA-32', 'UMA-33', 'UMA-36', 'UMA-40', 'UMA-46', 'UMA-47', 'UMA-52', 'UMA-68', 'UMA-71', 'UMA-81']
with open('c:/Users/user/Documents/PROJECTS/UMA BALI CZ/frontend/src/data/products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for p in data:
    if p['id'] in codes:
        print(f"[{p['id']}] {p.get('name')} | IMG: {p.get('images', [''])[0]}")
        print(f"DESC: {p.get('description','')} \nMATS: {p.get('materials',[])}\n")
