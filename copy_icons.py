import shutil
import sys

src = "public/icons/icon-96x96.png"

try:
    shutil.copy(src, "app/icon.png")
    shutil.copy(src, "app/apple-icon.png")
    shutil.copy(src, "public/favicon.ico")
    shutil.copy(src, "public/icons/apple-touch-icon.png")
    shutil.copy(src, "public/icons/icon-192x192.png")
    shutil.copy(src, "public/icons/icon-512x512.png")
    print("Files copied successfully.")
except Exception as e:
    print("Error:", e)
