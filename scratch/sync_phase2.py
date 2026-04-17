import os
import shutil
import json
import openpyxl

brain = r"C:\Users\user\.gemini\antigravity\brain\7c594f67-95aa-4eb8-94df-73d3c6e0db8e"
dest_dir = r"C:\Users\user\Documents\PROJECTS\UMA BALI CZ\frontend\public\images\products\catalog"
products_json_path = r"C:\Users\user\Documents\PROJECTS\UMA BALI CZ\frontend\src\data\products.json"
master_xlsm_path = r"C:\Users\user\Documents\PROJECTS\UMA BALI CZ\MASTER FFE Frontend.xlsm"

files_to_copy = {
    'UMA-21': 'uma_21_opta_new_1776316976135.png',
    'UMA-22': 'uma_22_opta_1776308009452.png',
    'UMA-27': 'uma_27_opta_1776308041278.png',
    'UMA-30': 'uma_30_optb_1776308083372.png',
    'UMA-33': 'uma_33_opta_1776308099644.png',
    'UMA-41': 'uma_41_opta_1776308129597.png',
    'UMA-70': 'uma_70_opta_1776308161677.png'
}

# 1. Copy files
print("Copying image artifacts...")
for code, filename in files_to_copy.items():
    src_path = os.path.join(brain, filename)
    target_name = f"{code.lower().replace('-', '_')}_premium.png" # e.g. uma_21_premium.png
    dest_path = os.path.join(dest_dir, target_name)
    shutil.copy2(src_path, dest_path)
    print(f"Copied {filename} -> {target_name}")

# 2. Update products.json
print("\nUpdating products.json...")
with open(products_json_path, 'r', encoding='utf-8') as f:
    products_db = json.load(f)

for p in products_db:
    if p['id'] in files_to_copy:
        new_path = f"/images/products/catalog/{p['id'].lower().replace('-', '_')}_premium.png"
        p['image'] = new_path
        print(f"JSON db updated for {p['id']} -> {new_path}")

with open(products_json_path, 'w', encoding='utf-8') as f:
    json.dump(products_db, f, indent=2, ensure_ascii=False)

# 3. Update MASTER XLSM
print("\nUpdating MASTER FFE Frontend.xlsm...")
wb = openpyxl.load_workbook(master_xlsm_path, keep_vba=True)
sheet = wb.active # Taking first active sheet

for row in range(2, sheet.max_row + 1):
    code_cell = sheet[f"A{row}"].value
    if code_cell and isinstance(code_cell, str):
        # clean spaces
        code_clean = code_cell.strip()
        if code_clean in files_to_copy:
            new_path = f"/images/products/catalog/{code_clean.lower().replace('-', '_')}_premium.png"
            sheet[f"I{row}"].value = new_path
            print(f"Excel updated for {code_clean} on row {row}")

wb.save(master_xlsm_path)
print("Excel saved successfully.")
