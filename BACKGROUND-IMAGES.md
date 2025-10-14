# Background Images Configuration Guide

## Overview

Background images for different sections of the website can be managed through JSON files. This allows you to easily change or update background images without modifying component code.

---

## 📂 Configuration Files

### 1. **Hero Section** (`src/data/home.json`)

Configure the Hero section background image:

```json
{
  "hero": {
    "title": "Christmas release!",
    "subtitle": "Listen to the classic Christmas songs in Metal version.",
    "backgroundImage": "https://your-image-url.com/hero-bg.jpg",
    "ctaPrimary": { ... },
    "ctaSecondary": { ... }
  }
}
```

**Properties:**
- `backgroundImage` (optional): URL to the hero background image
- Leave as empty string `""` to disable background image
- Displays with:
  - 40% opacity
  - 8px blur effect
  - Radial vignette (dark edges → light center)
  - Subtle accent color overlay

---

### 2. **About Section** (`src/data/about.json`)

Configure the About section background image:

```json
{
  "title": "About",
  "description": "...",
  "details": [...],
  "image": "https://your-image-url.com/about-card.jpg",
  "backgroundImage": "https://your-image-url.com/about-bg.jpg"
}
```

**Properties:**
- `image`: Foreground image shown in the left card (always visible)
- `backgroundImage` (optional): Background image for the section
- If `backgroundImage` is not provided, it falls back to `image`
- Displays with:
  - 50% opacity
  - 4px blur effect
  - Radial vignette (dark edges → light center)

---

## 🎨 Visual Effects

### Hero Background
```css
opacity: 25%
blur: 8px
vignette: dual gradient system
  - Radial: transparent center (0-15%) → 80% dark (40%) → complete black (75%)
  - Linear: black top (0%) → transparent (20-80%) → black bottom (100%)
  - Larger transparent center for better content visibility
  - Complete black at ALL edges (sides, top, bottom)
  - Matches website background color (#121212)
accent: subtle pink glow at center
effect: cinematic spotlight with complete darkness on all sides
height: full screen (100vh)
```

### About Background
```css
opacity: 50%
blur: 4px
vignette: radial gradient (transparent center → dark edges)
effect: dramatic spotlight, heavy shadows at sides
```

Both sections use a **radial vignette effect** that creates:
- ✨ **Light center**: Content area stays visible
- 🌑 **Dark edges**: Sides fade into shadows
- 🎭 **Spotlight effect**: Focuses attention on the center

---

## 💡 Usage Examples

### Example 1: Set Different Images

```json
// about.json
{
  "image": "https://example.com/portrait.jpg",
  "backgroundImage": "https://example.com/studio-wide.jpg"
}
```
- Foreground: Portrait for card
- Background: Wide studio shot for atmosphere

### Example 2: Use Same Image

```json
// about.json
{
  "image": "https://example.com/artist.jpg",
  "backgroundImage": "https://example.com/artist.jpg"
}
```
- Same image used with different effects

### Example 3: Disable Hero Background

```json
// home.json
{
  "hero": {
    "backgroundImage": "",
    // ...other properties
  }
}
```
- Only shows radial gradient overlay
- No background image

---

## 🖼️ Image Recommendations

### Hero Section
- **Aspect Ratio**: 16:9 or wider
- **Resolution**: 1920x1080 or higher
- **Format**: JPG, PNG, or WebP
- **File Size**: Optimize for web (< 500KB)
- **Subject**: Wide shots, atmospheric images

### About Section
- **Foreground Image** (`image`):
  - Aspect Ratio: 3:4 or 4:5 (portrait/square)
  - Resolution: 600x800 or similar
  - Clear subject (artist photo)
  
- **Background Image** (`backgroundImage`):
  - Aspect Ratio: 16:9 or wider
  - Resolution: 1920x1080 or higher
  - Can be same as foreground or different
  - Works well with busy/atmospheric shots

---

## 🔧 Technical Details

### Component Implementation

Both `Hero` and `About` components accept optional `backgroundImage` props:

```typescript
interface HeroProps {
  backgroundImage?: string;
  // ...other props
}

interface AboutProps {
  backgroundImage?: string;
  // ...other props
}
```

### Fallback Behavior

**About Section:**
```typescript
const bgImage = backgroundImage || image;
```
If no `backgroundImage` is provided, it uses the `image` value.

**Hero Section:**
```typescript
{backgroundImage && (
  <div className="background-layer" />
)}
```
Only renders if `backgroundImage` is provided.

---

## ✅ Best Practices

1. **Use CDN URLs**: Use image hosting services (Unsplash, Cloudinary, etc.)
2. **Optimize Images**: Compress before uploading
3. **Test Visibility**: Ensure text remains readable over background
4. **Consistent Style**: Use similar tone/style for all backgrounds
5. **Responsive Images**: Use URLs with responsive parameters (e.g., `?w=1920`)

---

## 📝 Quick Reference

| Section | JSON File | Field | Required | Default Effect |
|---------|-----------|-------|----------|----------------|
| Hero | `home.json` | `hero.backgroundImage` | No | 30% opacity, 8px blur |
| About | `about.json` | `backgroundImage` | No | 40% opacity, 4px blur |
| About (Card) | `about.json` | `image` | Yes | Full opacity, no blur |

---

## 🚀 Getting Started

1. **Choose your images** (or use placeholder URLs)
2. **Update the JSON files** with your image URLs
3. **Save the files** (hot reload will apply changes automatically)
4. **Verify** the images display correctly in your browser

No code changes required! ✨

