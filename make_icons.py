import os
from PIL import Image

def create_square_icon(input_path, output_path, bg_color=(255, 255, 255, 255), size=(512, 512)):
    try:
        # Open the original image
        img = Image.open(input_path).convert("RGBA")
        
        # Calculate scaling to fit within square, leaving some padding
        padding = 40
        max_size = size[0] - padding * 2
        
        # Calculate aspect ratio
        ratio = min(max_size / img.width, max_size / img.height)
        new_size = (int(img.width * ratio), int(img.height * ratio))
        
        # Resize image cleanly
        img = img.resize(new_size, Image.Resampling.LANCZOS)
        
        # Create new square canvas with background color
        new_img = Image.new("RGBA", size, bg_color)
        
        # Calculate position to center the image
        position = ((size[0] - new_size[0]) // 2, (size[1] - new_size[1]) // 2)
        
        # Paste the resized image onto the canvas using alpha channel as mask
        new_img.paste(img, position, img)
        
        # Save the result
        new_img.save(output_path, "PNG")
        print(f"Successfully created {output_path}")
    except Exception as e:
        print(f"Error creating {output_path}: {e}")

def create_og_image(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        # OG image size usually 1200x630
        size = (1200, 630)
        
        # Padding
        padding = 100
        max_width = size[0] - padding * 2
        max_height = size[1] - padding * 2
        
        ratio = min(max_width / img.width, max_height / img.height)
        new_size = (int(img.width * ratio), int(img.height * ratio))
        
        img = img.resize(new_size, Image.Resampling.LANCZOS)
        
        # Background: gradient or solid color, using white for now
        new_img = Image.new("RGBA", size, (255, 255, 255, 255))
        
        position = ((size[0] - new_size[0]) // 2, (size[1] - new_size[1]) // 2)
        new_img.paste(img, position, img)
        
        new_img.save(output_path, "PNG")
        print(f"Successfully created {output_path}")
    except Exception as e:
        print(f"Error creating {output_path}: {e}")

if __name__ == "__main__":
    logo_path = "public/favicon.ico"
    
    if not os.path.exists(logo_path):
        print(f"File {logo_path} not found!")
    else:
        # Next.js App Router icons
        # app/icon.png -> Automatically mapped as favicon / icon links
        # app/apple-icon.png -> Automatically mapped as apple touch icon
        create_square_icon(logo_path, "app/icon.png")
        create_square_icon(logo_path, "app/apple-icon.png")
        create_square_icon(logo_path, "public/icons/icon-192x192.png", size=(192, 192))
        create_square_icon(logo_path, "public/icons/icon-512x512.png", size=(512, 512))
        create_square_icon(logo_path, "public/icons/apple-touch-icon.png", size=(180, 180))
        create_og_image(logo_path, "app/opengraph-image.png")
        create_og_image(logo_path, "app/twitter-image.png")
