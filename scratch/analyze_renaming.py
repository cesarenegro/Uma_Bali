import json

products_json_path = r"C:\Users\user\Documents\PROJECTS\UMA BALI CZ\frontend\src\data\products.json"

try:
    with open(products_json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    print(f"Total products in JSON: {len(data)}")
    
    # Analyze categories and materials
    categories_set = set()
    materials_set = set()
    
    for p in data:
        code = p.get('id', '')
        
        cats = p.get('categories', [])
        # categories might be a list
        if not isinstance(cats, list):
            cats = [cats]
        for c in cats:
            if c: categories_set.add(c)
            
        mats = p.get('materials', [])
        if not isinstance(mats, list):
            mats = [mats]
        for m in mats:
            if m and m != 'nan':
                materials_set.add(str(m))
                
    print("\n--- Categories found ---")
    print(categories_set)
    
    print("\n--- Materials found ---")
    for m in sorted(list(materials_set)):
        print(m)
        
except Exception as e:
    print(f"Error: {e}")
