import json

with open("frontend/src/data/products.json", "r") as f:
    products = json.load(f)

for p in products:
    if p["id"] == "UMA-74":
        p["category"] = "sunbeds"
        p["name"] = "Adjustable Teak Sunbed"
        p["description"] = "Single adjustable teak outdoor sunbed with premium cushioning"
        p["longDescription"] = "Experience the ultimate in outdoor luxury with our Adjustable Teak Sunbed. Crafted from premium teak wood and paired with weather-resistant outdoor fabric, this piece represents the pinnacle of Balinese craftsmanship and modern minimalist design. Every detail is meticulously created to withstand the elements while providing unparalleled comfort and style to your outdoor lounging spaces."
        p["dimensions"] = {"width": 75, "depth": 200, "height": 35, "rawString": "75 x 200 x 35"}
        p["weight"] = 28.5
        p["volume"] = 0.52
    elif p["id"] == "UMA-75":
        p["category"] = "sunbeds"
        p["name"] = "Double Teak Sunbed"
        p["description"] = "Double adjustable teak outdoor sunbed with premium cushioning"
        p["longDescription"] = "Experience the ultimate in outdoor luxury with our Double Teak Sunbed. Perfect for sharing, crafted from premium teak wood and paired with weather-resistant outdoor fabric. This piece represents the pinnacle of Balinese craftsmanship and modern minimalist design, created to withstand the elements while providing unparalleled comfort."
        p["dimensions"] = {"width": 150, "depth": 200, "height": 35, "rawString": "150 x 200 x 35"}
        p["weight"] = 45.0
        p["volume"] = 1.05
    elif p["id"] in ["UMA-09", "UMA-11", "UMA-16", "UMA-17"]:
        p["category"] = "chairs"
        if p["id"] == "UMA-09":
            p["name"] = "Outdoor Dining Chair - Upholstered"
            p["description"] = "Outdoor dining chair with timber frame and upholstered seat/back"
            p["weight"] = 12.5
            p["volume"] = 0.28
        elif p["id"] == "UMA-11":
            p["name"] = "Dining Chair - Box Frame"
            p["description"] = "Dining chair with box arms and deep upholstered cushions"
            p["weight"] = 14.0
            p["volume"] = 0.30
        elif p["id"] == "UMA-16":
            p["name"] = "Outdoor Dining Armchair"
            p["description"] = "Outdoor dining armchair with broad timber frame"
            p["weight"] = 13.5
            p["volume"] = 0.29
        elif p["id"] == "UMA-17":
            p["name"] = "Rope Panel Dining Chair"
            p["description"] = "Outdoor dining chair with rope side/back panels"
            p["weight"] = 11.0
            p["volume"] = 0.26
        
        # update dimensions for all these chairs to typical dining chair size
        p["dimensions"] = {"width": 55, "depth": 60, "height": 85, "rawString": "55 x 60 x 85"}
        p["longDescription"] = p["longDescription"].replace("armchair", "dining chair").replace("Lounge", "Dining").replace("lounge", "dining")

with open("frontend/src/data/products.json", "w") as f:
    json.dump(products, f, indent=2)
