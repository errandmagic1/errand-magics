import os
from PIL import Image, ImageChops

def trim_and_make_square(input_path, output_path, size=(512, 512), padding_ratio=0.05):
    try:
        # Load image
        img = Image.open(input_path).convert("RGBA")
        
        # Create a white background image of the same size to find differences
        bg = Image.new(img.mode, img.size, img.getpixel((0,0)))
        diff = ImageChops.difference(img, bg)
        diff = ImageChops.add(diff, diff, 2.0, -100)
        
        # Find the bounding box of the non-background foreground
        bbox = diff.getbbox()
        
        if bbox:
            print(f"Original bounding box: {bbox}")
            # Crop tightly to the logo content
            img = img.crop(bbox)
        
        print(f"Cropped size: {img.size}")

        # Now we want to place this tightly cropped image into a square canvas
        # Determine scaling factor
        max_canvas_width = size[0] * (1 - padding_ratio * 2)
        max_canvas_height = size[1] * (1 - padding_ratio * 2)
        
        ratio = min(max_canvas_width / img.width, max_canvas_height / img.height)
        new_w = int(img.width * ratio)
        new_h = int(img.height * ratio)
        
        img_resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Create final square canvas (white background so Vercel doesn't show transparent black or weirdness)
        # Using white creates a clean App-like icon
        final_img = Image.new("RGBA", size, (255, 255, 255, 255))
        
        # Center horizontally and vertically
        pos_x = (size[0] - new_w) // 2
        pos_y = (size[1] - new_h) // 2
        final_img.paste(img_resized, (pos_x, pos_y), img_resized)
        
        final_img.save(output_path, "PNG")
        print(f"Successfully generated full square icon at {output_path}")

    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    # We use main_logo.png as the source because it might be the uncorrupted original
    # Wait, in earlier steps, how was main_logo.png?
    logo_src = "public/main_logo.png"
    if not os.path.exists(logo_src):
        logo_src = "public/errand-magics-logo.png"

    print(f"Using source image: {logo_src}")
    
    # Generate proper icons
    trim_and_make_square(logo_src, "app/icon.png")
    trim_and_make_square(logo_src, "app/apple-icon.png")
    trim_and_make_square(logo_src, "public/favicon.ico")
    trim_and_make_square(logo_src, "public/icons/apple-touch-icon.png", size=(180, 180))
    trim_and_make_square(logo_src, "public/icons/icon-192x192.png", size=(192, 192))
    trim_and_make_square(logo_src, "public/icons/icon-512x512.png", size=(512, 512))    
