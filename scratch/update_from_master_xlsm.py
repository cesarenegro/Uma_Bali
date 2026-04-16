import pandas as pd
import json
import math

excel_path = r'C:\Users\user\Documents\PROJECTS\UMA BALI CZ\MASTER FFE Frontend.xlsm'
json_path = r'c:\Users\user\Documents\PROJECTS\UMA BALI CZ\frontend\src\data\products.json'

# Mappings (ignoring Q, R, S, T)
df = pd.read_excel(excel_path)
df = df.where(pd.notnull(df), None)

with open(json_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

# build a dictionary by item code
excel_data = {}
for index, row in df.iterrows():
    code = row['item code']
    if not code:
        continue
    
    # columns by name or index
    material = row['material']
    upholstery = row['upholstery material']
    metal = row['metal material']
    marble = row['marble type']
    czk_price = row['CZK']
    
    excel_data[str(code).strip()] = {
        'material': material,
        'upholstery': upholstery,
        'metal': metal,
        'marble': marble,
        'price': czk_price
    }

updates_count = 0

for p in products:
    pid = p.get('id', '')
    if pid in excel_data:
        data = excel_data[pid]
        
        # update price if exists
        price_val = data['price']
        if price_val is not None and not math.isnan(float(price_val)):
            p['price'] = float(price_val)
            
        # extract finishes
        mats = []
        if data['material']:
            mats.append(str(data['material']).strip())
        if data['metal']:
            mats.append(str(data['metal']).strip())
        if data['marble']:
            mats.append(str(data['marble']).strip())
            
        if len(mats) > 0:
            p['materials'] = mats
            
        if data['upholstery']:
            p['upholstery'] = str(data['upholstery']).strip()
            
        updates_count += 1

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Successfully updated {updates_count} products.")
