from PIL import Image
import math
import sys

def remove_background(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        # Get background color from top-left pixel
        bg_color = datas[0]
        
        new_data = []
        # Calculate luminance of background to decide if it's black or white
        bg_lum = 0.299*bg_color[0] + 0.587*bg_color[1] + 0.114*bg_color[2]
        is_dark_bg = bg_lum < 128
        
        for item in datas:
            # item is (r, g, b, a)
            r, g, b = item[:3]
            
            if is_dark_bg:
                # If background is dark/black, make dark pixels transparent
                # Using max color channel as alpha or Euclidean distance
                lum = max(r, g, b)
                if lum < 30: # very dark
                    new_data.append((r, g, b, 0))
                else:
                    # Scale alpha based on luminance for smooth edges
                    alpha = min(255, int((lum / 255.0) * 255 * 1.5))
                    new_data.append((r, g, b, alpha))
            else:
                # If background is light/white, make light pixels transparent
                # Distance from white
                dist_from_white = math.sqrt((255-r)**2 + (255-g)**2 + (255-b)**2)
                if dist_from_white < 50: # close to white
                    new_data.append((r, g, b, 0))
                else:
                    # Calculate alpha based on distance from white
                    alpha = min(255, int(dist_from_white))
                    new_data.append((r, g, b, alpha))
                    
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print("Success")
    except Exception as e:
        print("Error:", e)

remove_background("Team 360 fav pic/logo.jpg", "Team 360 fav pic/logo.png")
