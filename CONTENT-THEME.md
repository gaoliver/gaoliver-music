# Content Theme Configuration Guide

## Overview

Control text color schemes to ensure optimal readability against different background images.

---

## 🎨 About Section: Light/Dark Content

The About section supports a `lightContent` boolean that switches between light and dark text color schemes.

### Configuration

**File:** `src/data/about.json`

```json
{
  "title": "About",
  "description": "...",
  "details": [...],
  "image": "/images/Profile.jpg",
  "backgroundImage": "/images/singing-studio-white.webp",
  "lightContent": false
}
```

### Property: `lightContent`

- **Type:** `boolean`
- **Optional:** Yes (defaults to `false`)
- **Default:** `false` (dark theme)

---

## 🎯 When to Use

### `lightContent: false` (Default - Dark Theme)

Use when background is **dark** or the vignette creates sufficient darkness:

```json
{
  "backgroundImage": "/images/dark-studio.jpg",
  "lightContent": false
}
```

**Text Colors:**
- Title: `#E5E5E5` (brand-text)
- Description: `#E5E5E5` (brand-text)
- Details: `#8E8E8E` (brand-muted)

### `lightContent: true` (Light Theme)

Use when background is **bright/light** and text needs to be lighter for readability:

```json
{
  "backgroundImage": "/images/bright-stage.jpg",
  "lightContent": true
}
```

**Text Colors:**
- Title: `#FFFFFF` (white)
- Description: `rgba(255, 255, 255, 0.9)` (white 90% opacity)
- Details: `rgba(255, 255, 255, 0.7)` (white 70% opacity)

---

## 📊 Visual Comparison

### Dark Theme (`lightContent: false`)
```
┌─────────────────────────────────┐
│    [Dark Background Image]      │
│                                 │
│    ABOUT                        │  ← #E5E5E5
│    Text appears in gray         │  ← #E5E5E5
│    • Details in muted gray      │  ← #8E8E8E
│                                 │
└─────────────────────────────────┘
```

### Light Theme (`lightContent: true`)
```
┌─────────────────────────────────┐
│    [Light Background Image]     │
│                                 │
│    ABOUT                        │  ← #FFFFFF
│    Text appears in white        │  ← rgba(255,255,255,0.9)
│    • Details in light white     │  ← rgba(255,255,255,0.7)
│                                 │
└─────────────────────────────────┘
```

---

## 💡 Best Practices

1. **Test Readability**: Always check text readability after changing backgrounds
2. **Consider Vignette**: Remember the radial vignette adds darkness at edges
3. **Match Background**: Choose theme based on the **center** of the image (where text appears)
4. **Contrast Check**: Ensure sufficient contrast between text and background

### Quick Decision Guide

| Background Type | Recommended Setting |
|----------------|---------------------|
| Dark studio photo | `lightContent: false` |
| Bright stage photo | `lightContent: true` |
| Night/dim lighting | `lightContent: false` |
| Daylight/outdoor | `lightContent: true` |
| High-key (very bright) | `lightContent: true` |
| Low-key (very dark) | `lightContent: false` |

---

## 🔧 Technical Implementation

### Component Logic

The About component uses conditional classes:

```typescript
const titleColor = lightContent ? 'text-white' : 'text-brand-text';
const textColor = lightContent ? 'text-white/90' : 'text-brand-text';
const mutedColor = lightContent ? 'text-white/70' : 'text-brand-muted';
```

### Rich Text Support

The description field supports HTML formatting (see [RICH-TEXT.md](./RICH-TEXT.md)):
- Text color automatically adapts to `lightContent` setting
- HTML tags like `<strong>`, `<em>`, `<br>`, `<a>` are fully supported
- Example: `"Text with <strong>bold</strong> formatting"`

### CSS Classes Applied

**Dark Theme (default):**
- `text-brand-text` → `#E5E5E5`
- `text-brand-muted` → `#8E8E8E`

**Light Theme:**
- `text-white` → `#FFFFFF`
- `text-white/90` → `rgba(255, 255, 255, 0.9)`
- `text-white/70` → `rgba(255, 255, 255, 0.7)`

---

## 📝 Example Configurations

### Example 1: Dark Studio Background

```json
{
  "image": "/images/artist-portrait.jpg",
  "backgroundImage": "/images/dark-studio.jpg",
  "lightContent": false
}
```
✅ Standard gray text works well against dark backgrounds

### Example 2: Bright Stage Performance

```json
{
  "image": "/images/artist-portrait.jpg",
  "backgroundImage": "/images/bright-stage.jpg",
  "lightContent": true
}
```
✅ White text ensures readability against bright backgrounds

### Example 3: No Background Override

```json
{
  "image": "/images/artist-portrait.jpg",
  "lightContent": false
}
```
✅ Uses image as background, dark theme by default

---

## ⚠️ Important Notes

1. **Vignette Effect**: The radial vignette already darkens edges significantly. In most cases, `lightContent: false` (default) works well.

2. **Background Opacity**: Background images are displayed at 50% opacity with blur, which naturally darkens them.

3. **Testing**: Always preview changes in the browser to ensure readability.

4. **Future Expansion**: This pattern can be extended to other sections if needed.

---

## 🚀 Quick Start

1. **Choose your background image** in `about.json`
2. **Preview the section** in your browser
3. **If text is hard to read**:
   - Set `"lightContent": true` for bright backgrounds
   - Keep `"lightContent": false` for dark backgrounds
4. **Save and verify** readability

No code changes needed - just update the JSON! ✨

