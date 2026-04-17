import fitz  # PyMuPDF
import re

pdf_path = r"C:\Users\user\Downloads\UMA_outdoor_catalogue_revised_v2.pdf"

try:
    doc = fitz.open(pdf_path)
    print(f"PDF Opened: {doc.page_count} pages.")
    
    code_pattern = re.compile(r'UMA-\d{2}')
    
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        text = page.get_text("text")
        
        # Find UMA codes on the page
        codes_found = code_pattern.findall(text)
        codes_found = list(set(codes_found))
        
        # Get images on the page
        image_list = page.get_images(full=True)
        
        if codes_found:
            print(f"Page {page_num + 1}: Found codes {codes_found} - Images count: {len(image_list)}")
            for img in image_list:
                xref = img[0]
                img_info = doc.extract_image(xref)
                print(f"   -> Image format: {img_info['ext']} | XREF: {xref}")
        else:
            print(f"Page {page_num + 1}: No codes found. Images count: {len(image_list)}")

    doc.close()
except Exception as e:
    print(f"Error: {e}")
