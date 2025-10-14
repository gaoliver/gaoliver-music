# Social Media (OG) Image Creation Guide

## Overview

The Open Graph (OG) image is what appears when your website is shared on social media platforms like Facebook, Twitter, LinkedIn, WhatsApp, Discord, and more.

---

## 📐 Image Specifications

### Required Dimensions
- **Width**: 1200 pixels
- **Height**: 630 pixels
- **Aspect Ratio**: 1.91:1
- **Format**: PNG or JPG
- **File Size**: < 300KB (recommended for fast loading)
- **Location**: `/public/images/og-image.webp`

### Safe Zone
Keep important content within the center **1200x600px** area, as some platforms crop edges.

---

## 🎨 Design Recommendations

### What to Include
1. **G.A. Oliver Logo** - Main brand identity
2. **Artist Name** - Clear and readable
3. **Tagline** - "Heavy riffs • Loud screams • Deep faith"
4. **Visual Element** - Album art, artist photo, or graphic
5. **Background** - Dark aesthetic matching website (#121212)

### Design Tips
✅ **High contrast** - Text must be readable in small thumbnails  
✅ **Large text** - Minimum 60px for main text  
✅ **Brand consistency** - Match website's dark aesthetic  
✅ **Simple design** - Don't overcrowd  
✅ **Centered content** - Account for platform cropping  

❌ **Avoid:**
- Tiny text (< 40px)
- Too much information
- Low contrast
- Important content at edges

---

## 🎯 Design Options

### Option 1: Logo + Tagline (Recommended)
```
┌────────────────────────────────────────┐
│                                        │
│        [G.A. OLIVER LOGO]             │
│                                        │
│    Heavy riffs • Loud screams •       │
│           Deep faith                   │
│                                        │
│         gaoliver-music.com                   │
│                                        │
└────────────────────────────────────────┘
```

**Pros:** Clean, brand-focused, versatile  
**Use:** General sharing, homepage

---

### Option 2: Album Artwork Feature
```
┌────────────────────────────────────────┐
│  [Album Cover]    G.A. OLIVER         │
│                                        │
│                   "Night Divine"       │
│                   EP • 2024            │
│                                        │
│                   Listen Now →         │
│                   gaoliver-music.com         │
└────────────────────────────────────────┘
```

**Pros:** Promotes latest release, eye-catching  
**Use:** New release announcements

---

### Option 3: Artist Photo + Brand
```
┌────────────────────────────────────────┐
│         [ARTIST      G.A. OLIVER       │
│          PHOTO]                         │
│                     Heavy Metal &       │
│                     Progressive Rock    │
│                                        │
│                     gaoliver-music.com       │
└────────────────────────────────────────┘
```

**Pros:** Personal connection, humanizes brand  
**Use:** About page, interviews

---

## 🛠️ Tools for Creation

### Online Tools (Free)
1. **Canva** (https://canva.com)
   - Template: "Open Graph Image"
   - 1200x630px preset available
   - Easy drag-and-drop

2. **Figma** (https://figma.com)
   - Professional design tool
   - Free for individuals
   - Precise control

3. **Photopea** (https://photopea.com)
   - Free Photoshop alternative
   - Browser-based
   - Supports PSD files

### Design Software
- Adobe Photoshop
- Adobe Illustrator
- Affinity Designer
- GIMP (free)

---

## 📝 Step-by-Step: Canva Method

### Step 1: Create Canvas
1. Go to Canva.com
2. Click "Custom size"
3. Enter: 1200 x 630 px
4. Click "Create new design"

### Step 2: Set Background
1. Click "Elements" → "Shapes"
2. Add rectangle, make it black (#121212)
3. Stretch to fill canvas

### Step 3: Add Logo
1. Upload your circular logo
2. Place in center-top area
3. Resize to ~300-400px

### Step 4: Add Text
1. Click "Text" → "Add heading"
2. Type "G.A. OLIVER"
3. Font: Bold, sans-serif (like Inter Black or Montserrat Bold)
4. Size: 80-100px
5. Color: White (#FFFFFF)

### Step 5: Add Tagline
1. Add subheading
2. Type: "Heavy riffs • Loud screams • Deep faith"
3. Font: Inter or similar
4. Size: 40-50px
5. Color: Light gray (#E5E5E5)

### Step 6: Add URL (Optional)
1. Add small text at bottom
2. Type: "gaoliver-music.com"
3. Size: 30-40px
4. Color: Gray (#8E8E8E)

### Step 7: Export
1. Click "Share" → "Download"
2. File type: PNG
3. Download
4. Rename to `og-image.png`
5. Move to `/public/images/`

---

## ✅ Quick Template

If you want to use existing assets:

### Using Album Cover
1. Take "Night Divine" or "Hail to the King" cover
2. Create 1200x630px canvas
3. Place album cover on left (600x630px)
4. Right side (600x630px):
   - Dark background
   - Logo at top
   - "New Release"
   - Album name
   - "Stream now → gaoliver-music.com"

### Using Website Screenshot
1. Take screenshot of hero section
2. Crop to 1200x630px
3. Add subtle dark overlay
4. Add text overlay with main message

---

## 🧪 Testing Your Image

### Before Publishing
1. **View at Small Size**: Zoom out or view thumbnail
2. **Check Readability**: Can you read all text?
3. **Check Colors**: Does it match brand?
4. **File Size**: Is it under 300KB?

### After Publishing

**Facebook Sharing Debugger:**
```
https://developers.facebook.com/tools/debug/
```
1. Enter: https://gaoliver-music.com
2. Click "Scrape Again"
3. Verify image displays correctly

**Twitter Card Validator:**
```
https://cards-dev.twitter.com/validator
```
1. Enter: https://gaoliver-music.com
2. Preview Card
3. Check image renders

**LinkedIn Post Inspector:**
```
https://www.linkedin.com/post-inspector/
```
1. Enter URL
2. Inspect
3. Verify preview

---

## 💾 File Management

### Naming Convention
- Main image: `og-image.png`
- Versions: `og-image-v2.png`, `og-image-release.png`

### When to Update
- New album release
- Rebranding
- Major website update
- Special events/tours

### Cache Clearing
When updating image:
1. Rename file (og-image-v2.png)
2. Update meta tag in index.html
3. Clear social media cache in debuggers
4. Wait 24 hours for full propagation

---

## 🎨 Color Palette (From Brand)

Use these colors for consistency:

```css
Background: #121212 (Black)
Text: #E5E5E5 (Light Gray)
Muted: #8E8E8E (Medium Gray)
Accent: #E45B66 (Red/Pink)
Pure White: #FFFFFF
```

---

## 📱 Platform-Specific Previews

### How Your Image Appears:

**Facebook:**
- Shows above link preview
- Large image display
- Title and description below

**Twitter:**
- Summary Large Image card
- Image above text
- Title and description visible

**LinkedIn:**
- Professional preview
- Large image prominent
- Good for networking

**WhatsApp:**
- Thumbnail in chat
- Shows when link shared
- Smaller display

**Discord:**
- Embedded preview
- Shows in chat
- Medium size

---

## ⚠️ Common Mistakes to Avoid

### ❌ Too Much Text
Keep it simple - logo, name, tagline max

### ❌ Small Font Sizes
Minimum 40px for any text

### ❌ Low Contrast
White on light gray won't work

### ❌ Off-Brand Colors
Stick to brand palette

### ❌ Content at Edges
Keep 50px margin from edges

### ❌ Low Resolution
Must be exactly 1200x630px

### ❌ Wrong Aspect Ratio
Must be 1.91:1 ratio

---

## 🎬 Quick Start Checklist

- [ ] Open design tool (Canva/Figma/Photoshop)
- [ ] Create 1200x630px canvas
- [ ] Dark background (#121212)
- [ ] Add logo (centered, ~300px)
- [ ] Add "G.A. OLIVER" text (80-100px)
- [ ] Add tagline (40-50px)
- [ ] Add website URL (optional, 30-40px)
- [ ] Export as PNG
- [ ] Rename to `og-image.png`
- [ ] Save to `/public/images/`
- [ ] Test with Facebook Debugger
- [ ] Test with Twitter Card Validator
- [ ] Share and verify!

---

## 🚀 Alternative: Use Placeholder

If you need a quick solution:

### Temporary Option
Use your circular logo (favicon.png):
```html
<meta property="og:image" content="https://gaoliver-music.com/favicon.png" />
```

**Pros:** Quick, uses existing asset  
**Cons:** Not optimized dimensions, less appealing

### Upgrade Path
1. Launch with logo/album cover
2. Create custom OG image later
3. Update and clear cache
4. Much better social shares!

---

Need help creating your OG image? Consider hiring a designer on:
- Fiverr (budget-friendly)
- 99designs (contest-based)
- Dribbble (find designers)
- Upwork (freelance designers)

Or ask in design communities for feedback! 🎨✨

