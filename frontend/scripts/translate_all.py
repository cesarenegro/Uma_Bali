import json
import os
import time
from deep_translator import GoogleTranslator

# Define paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, '..')
LOCALES_DIR = os.path.join(FRONTEND_DIR, 'src', 'i18n', 'locales')
PRODUCTS_FILE = os.path.join(FRONTEND_DIR, 'src', 'data', 'products.json')
CATEGORIES_FILE = os.path.join(FRONTEND_DIR, 'src', 'data', 'categories.json')

LANGUAGES = ['cs', 'de', 'pl', 'it', 'fr', 'hr']

def translate_text(text, target_lang):
    if not text or text == "nan" or str(text).strip() == "":
        return text
    try:
        translated = GoogleTranslator(source='en', target=target_lang).translate(text)
        return translated
    except Exception as e:
        print(f"Error translating '{text[:20]}...' to {target_lang}: {e}")
        return text

def translate_dict_recursive(d, target_lang):
    if isinstance(d, dict):
        result = {}
        for k, v in d.items():
            result[k] = translate_dict_recursive(v, target_lang)
        return result
    elif isinstance(d, list):
        return [translate_dict_recursive(item, target_lang) for item in d]
    elif isinstance(d, str):
        return translate_text(d, target_lang)
    else:
        return d

def process_common_json():
    en_common_path = os.path.join(LOCALES_DIR, 'en', 'common.json')
    if not os.path.exists(en_common_path):
        print("English common.json not found!")
        return

    with open(en_common_path, 'r', encoding='utf-8') as f:
        en_data = json.load(f)

    for lang in LANGUAGES:
        lang_dir = os.path.join(LOCALES_DIR, lang)
        os.makedirs(lang_dir, exist_ok=True)
        out_path = os.path.join(lang_dir, 'common.json')
        
        # We read if it exists to avoid translating again if already done (partially).
        # But here we assume a fresh start or full overwrite is desired for completeness.
        print(f"Translating common.json to {lang}...")
        translated_data = translate_dict_recursive(en_data, lang)
        time.sleep(1) # Prevent rate limiting

        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(translated_data, f, indent=2, ensure_ascii=False)
        print(f"Saved {out_path}")

def process_products_json():
    if not os.path.exists(PRODUCTS_FILE):
        print("Products.json not found!")
        return

    with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
        products = json.load(f)

    # We will enrich products with a 'translations' field
    print(f"Translating {len(products)} products...")
    for idx, prod in enumerate(products):
        print(f"Processing product {idx + 1}/{len(products)}: {prod.get('name')}")
        if 'translations' not in prod:
            prod['translations'] = {}

        for lang in LANGUAGES:
            if lang not in prod['translations']:
                prod['translations'][lang] = {}

            # Translate required fields if they exist and aren't translated yet
            for field in ['name', 'description', 'longDescription', 'upholstery']:
                if field in prod and prod[field] and prod[field] != 'nan':
                    if field not in prod['translations'][lang] or not prod['translations'][lang][field]:
                        t_val = translate_text(prod[field], lang)
                        prod['translations'][lang][field] = t_val

            # Translate materials arrays
            if 'materials' in prod and isinstance(prod['materials'], list):
                if 'materials' not in prod['translations'][lang] or not prod['translations'][lang]['materials']:
                    t_mats = []
                    for mat in prod['materials']:
                        t_mats.append(translate_text(mat, lang))
                    prod['translations'][lang]['materials'] = t_mats
            
            time.sleep(0.5)

    with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    print("Saved products.json")

if __name__ == "__main__":
    print("Starting translation process...")
    process_common_json()
    process_products_json()
    print("Done!")
