import fitz  # PyMuPDF
import re
import os

pdf_path = r"C:\Users\user\Downloads\UMA_outdoor_catalogue_revised_v2.pdf"
output_path = r"C:\Users\user\Downloads\UMA_outdoor_catalogue_PREMIUM.pdf"
img_folder = r"C:\Users\user\Documents\PROJECTS\UMA BALI CZ\frontend\public\images\products\catalog"

# The 16 regenerated images
regen_codes = [
    'UMA-04', 'UMA-05', 'UMA-07', 'UMA-26', 'UMA-28', 'UMA-29', 'UMA-32', 
    'UMA-33', 'UMA-36', 'UMA-40', 'UMA-46', 'UMA-47', 'UMA-52', 'UMA-68', 
    'UMA-71', 'UMA-81'
]

def update_pdf():
    try:
        doc = fitz.open(pdf_path)
        print(f"Opening PDF: {pdf_path}")
        code_pattern = re.compile(r'UMA-\d{2}')
        updated_pages = 0

        for page_num in range(doc.page_count):
            page = doc.load_page(page_num)
            text = page.get_text("text")
            
            # Find UMA codes on the page
            codes_found = code_pattern.findall(text)
            codes_found = list(set(codes_found))
            
            if codes_found:
                # We expect exactly 1 code per page
                code = codes_found[0]
                
                if code in regen_codes:
                    print(f"Page {page_num + 1}: Match found for {code}! Updating image...")
                    # 1. Provide path to new image
                    filename_png = f"{code.lower().replace('-', '_')}_premium.png"
                    img_path = os.path.join(img_folder, filename_png)
                    
                    if not os.path.exists(img_path):
                        # For single/multiple variants handling in naming
                        # e.g., UMA-81 had `uma_81_premium_single_177...` wait, I named the final ones nicely in frontend.
                        # Wait, let's look at the filenames in frontend/public/images/products/catalog/
                        # If the exact name uma_81_premium.png doesn't exist, search for it.
                        print(f"Warning: {img_path} not found. Let's find the matching file.")
                        files_in_folder = os.listdir(img_folder)
                        matching_file = next((f for f in files_in_folder if f.startswith(f"uma_{code.split('-')[1]}_premium")), None)
                        if matching_file:
                            img_path = os.path.join(img_folder, matching_file)
                        else:
                            print(f"Error: No image found for {code}. Skipping.")
                            continue

                    # 2. Get current images on page
                    image_list = page.get_images(full=True)
                    if image_list:
                        # Assuming 1 main product image per page (as verified)
                        xref = image_list[0][0]
                        rects = page.get_image_rects(xref)
                        
                        if rects:
                            # It's possible there are multiple instances of the same image component, 
                            # we usually just take the first bounding box.
                            rect = rects[0]
                            
                            # 3. Whiten out the old image to hide it
                            shape = page.new_shape()
                            shape.draw_rect(rect)
                            shape.finish(color=(1, 1, 1), fill=(1, 1, 1))
                            shape.commit()
                            
                            # 4. Insert the new transparent/white PNG exactly into the same box
                            page.insert_image(rect, filename=img_path)
                            updated_pages += 1
                            print(f"    -> Replaced image for {code} successfully over {rect}.")
                        else:
                            print(f"    -> Could not find bounding rect for XREF {xref}.")
            
        print(f"\nTotal pages updated: {updated_pages}/{len(regen_codes)}")
        
        # Save output
        doc.save(output_path)
        doc.close()
        print(f"Success! Updated PDF saved at: {output_path}")

    except Exception as e:
        print(f"Fatal error updating PDF: {e}")

if __name__ == "__main__":
    update_pdf()
