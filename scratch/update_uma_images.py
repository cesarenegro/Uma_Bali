import json
import shutil
import os

images = {
    "UMA-86": r"C:\Users\user\.gemini\antigravity\brain\7c594f67-95aa-4eb8-94df-73d3c6e0db8e\uma_86_round_twin_table_1776293897611.png",
    "UMA-87": r"C:\Users\user\.gemini\antigravity\brain\7c594f67-95aa-4eb8-94df-73d3c6e0db8e\uma_87_long_bench_1776293915682.png",
    "UMA-88": r"C:\Users\user\.gemini\antigravity\brain\7c594f67-95aa-4eb8-94df-73d3c6e0db8e\uma_88_rectangular_table_1776293934341.png",
    "UMA-89": r"C:\Users\user\.gemini\antigravity\brain\7c594f67-95aa-4eb8-94df-73d3c6e0db8e\uma_89_round_dining_table_1776293955024.png",
    "UMA-90": r"C:\Users\user\.gemini\antigravity\brain\7c594f67-95aa-4eb8-94df-73d3c6e0db8e\uma_90_console_table_1776293975476.png"
}

dest_dir = r"c:\Users\user\Documents\PROJECTS\UMA BALI CZ\frontend\public\images\products"

for item_id, src_path in images.items():
    new_filename = os.path.basename(src_path)
    dest_path = os.path.join(dest_dir, new_filename)
    shutil.copy2(src_path, dest_path)
    print(f"Copied {src_path} to {dest_path}")

json_path = r"c:\Users\user\Documents\PROJECTS\UMA BALI CZ\frontend\src\data\products.json"
with open(json_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

for item in products:
    if item['id'] in images:
        item['images'] = [f"/images/products/{os.path.basename(images[item['id']])}"]
        
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print("Updated products.json")
