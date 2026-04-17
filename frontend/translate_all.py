import json, os, time
try:
    from deep_translator import GoogleTranslator
except ImportError:
    print('Installing deep-translator...')
    os.system('pip install deep-translator')
    from deep_translator import GoogleTranslator

base = r'c:\Users\user\Documents\PROJECTS\UMA BALI CZ\frontend'
langs = ['cs', 'de', 'pl', 'it', 'fr', 'hr']

en_path = os.path.join(base, 'src', 'i18n', 'locales', 'en', 'common.json')
prod_path = os.path.join(base, 'src', 'data', 'products.json')

def safe_trans(t, l):
    if not isinstance(t, str) or not t.strip() or t == 'nan': return t
    try: return GoogleTranslator('en', l).translate(t)
    except: return t

def rec_trans(d, l):
    if isinstance(d, dict): return {k: rec_trans(v, l) for k,v in d.items()}
    if isinstance(d, list): return [rec_trans(v, l) for v in d]
    if isinstance(d, str): return safe_trans(d, l)
    return d

if os.path.exists(en_path):
    with open(en_path, 'r', encoding='utf8') as f:
        en_data = json.load(f)
    for l in langs:
        out = os.path.join(base, 'src', 'i18n', 'locales', l, 'common.json')
        print(f'Writing common.json for {l}...')
        with open(out, 'w', encoding='utf8') as f:
            json.dump(rec_trans(en_data, l), f, indent=2, ensure_ascii=False)

if os.path.exists(prod_path):
    with open(prod_path, 'r', encoding='utf8') as f:
        prods = json.load(f)
    print(f'Translating {len(prods)} products...')
    for p in prods:
        if 'translations' not in p: p['translations'] = {}
        for l in langs:
            if l not in p['translations']: p['translations'][l] = {}
            for f in ['name', 'description', 'longDescription', 'upholstery']:
                if p.get(f) and p[f] != 'nan' and not p['translations'][l].get(f):
                    p['translations'][l][f] = safe_trans(p[f], l)
            if isinstance(p.get('materials'), list) and not p['translations'][l].get('materials'):
                p['translations'][l]['materials'] = [safe_trans(m, l) for m in p['materials']]
            time.sleep(0.01)
    
    with open(prod_path, 'w', encoding='utf8') as f:
        json.dump(prods, f, indent=2, ensure_ascii=False)
    print('Products translated.')
