import base64
from PIL import Image

# Open master logo
img = Image.open('public/assets/true_inspire.jpeg')

# Generate standard ICO file with multi-resolution support
img.save('public/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

# Generate PNG favicons
img.resize((32, 32), Image.Resampling.LANCZOS).save('public/assets/favicon-32x32.png')
img.resize((16, 16), Image.Resampling.LANCZOS).save('public/assets/favicon-16x16.png')
img.resize((180, 180), Image.Resampling.LANCZOS).save('public/assets/apple-touch-icon.png')
img.resize((192, 192), Image.Resampling.LANCZOS).save('public/assets/android-chrome-192x192.png')
img.resize((512, 512), Image.Resampling.LANCZOS).save('public/assets/android-chrome-512x512.png')

# Create SVG embedding the high-resolution logo as base64
with open('public/assets/android-chrome-192x192.png', 'rb') as f:
    b64_logo = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="100%" height="100%">
  <rect width="192" height="192" rx="36" fill="#0d0c0a"/>
  <image href="data:image/png;base64,{b64_logo}" width="192" height="192" preserveAspectRatio="xMidYMid meet" clip-path="inset(0 round 36px)"/>
</svg>
'''

with open('public/assets/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print("All favicons generated successfully from true_inspire.jpeg!")
