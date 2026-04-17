import fitz
import re
import os

# We will apply updates on TOP of the already updated PREMIUM pdf so everything is in one file!
pdf_path = r"C:\Users\user\Downloads\UMA_outdoor_catalogue_PREMIUM.pdf"
img_folder = r"C:\Users\user\Documents\PROJECTS\UMA BALI CZ\frontend\public\images\products\catalog"

regen_codes = ['UMA-21', 'UMA-22', 'UMA-27', 'UMA-30', 'UMA-33', 'UMA-41', 'UMA-70']

def update_pdf():
    doc = fitz.open(pdf_path)
    code_pattern = re.compile(r'UMA-\d{2}')
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        text = page.get_text("text")
        codes_found = code_pattern.findall(text)
        if codes_found:
            code = codes_found[0]
            if code in regen_codes:
                print(f"Page {page_num + 1}: Match found for {code}!")
                filename_png = f"{code.lower().replace('-', '_')}_premium.png"
                img_path = os.path.join(img_folder, filename_png)
                
                image_list = page.get_images(full=True)
                if image_list:
                    # To be exact, we should clear all old bounding boxes if there's multiple pieces of an image
                    # but usually it's [0][0]
                    xref = image_list[-1][0] # Using -1 just in case there are multiple. Usually 0 is the base image.
                    # Wait, if we use image_list[0][0], it could pick up a previously inserted image if we run this twice.
                    # But these pages were NOT touched in Phase 1 (except UMA-33, which we want to override now anyway).
                    # Actually, for UMA-33 we overlaid a PNG in phase 1. The old image is still there underneath.
                    # PyMuPDF get_images() returns images in arbitrary or insertion order. 
                    # Let's just use the first one's rect which corresponds to the base layout box.
                    xref = image_list[0][0]
                    rects = page.get_image_rects(xref)
                    
                    if rects:
                        rect = rects[0]
                        # Whiten
                        shape = page.new_shape()
                        shape.draw_rect(rect)
                        shape.finish(color=(1, 1, 1), fill=(1, 1, 1))
                        shape.commit()
                        
                        # Insert
                        page.insert_image(rect, filename=img_path)
                        print(f" -> Replaced {code}.")
    
    doc.saveIncr() # Save incrementally to the same file
    doc.close()
    print("PDF Successfully Updated!")

update_pdf()
