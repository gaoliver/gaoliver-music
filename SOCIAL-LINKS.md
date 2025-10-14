# Social Links Configuration Guide

## Overview

Social links in the footer are displayed as **icons** with hover effects. Easily manage your streaming and social media presence through `src/data/site.json`.

---

## 🎵 Supported Platforms

### Streaming Services

| Platform | Icon | Platform Name in JSON |
|----------|------|----------------------|
| Spotify | <img src="https://img.shields.io/badge/Spotify-1DB954?style=flat&logo=spotify&logoColor=white" height="20"/> | `Spotify` |
| Apple Music | <img src="https://img.shields.io/badge/Apple_Music-FA243C?style=flat&logo=apple-music&logoColor=white" height="20"/> | `AppleMusic` |
| Amazon Music | <img src="https://img.shields.io/badge/Amazon_Music-FF9900?style=flat&logo=amazon&logoColor=white" height="20"/> | `AmazonMusic` |
| Deezer | <img src="https://img.shields.io/badge/Deezer-FEAA2D?style=flat&logo=deezer&logoColor=white" height="20"/> | `Deezer` |
| YouTube | <img src="https://img.shields.io/badge/YouTube-FF0000?style=flat&logo=youtube&logoColor=white" height="20"/> | `YouTube` |

### Social Media

| Platform | Icon | Platform Name in JSON |
|----------|------|----------------------|
| Instagram | <img src="https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white" height="20"/> | `Instagram` |
| TikTok | <img src="https://img.shields.io/badge/TikTok-000000?style=flat&logo=tiktok&logoColor=white" height="20"/> | `TikTok` |
| Facebook | <img src="https://img.shields.io/badge/Facebook-1877F2?style=flat&logo=facebook&logoColor=white" height="20"/> | `Facebook` |

---

## 📝 Configuration

### File Location
**`src/data/site.json`**

### Structure

```json
{
  "socialLinks": [
    {
      "platform": "Spotify",
      "url": "https://open.spotify.com/artist/YOUR_ARTIST_ID",
      "ariaLabel": "Listen on Spotify"
    },
    {
      "platform": "AppleMusic",
      "url": "https://music.apple.com/artist/YOUR_ARTIST_NAME/ID",
      "ariaLabel": "Listen on Apple Music"
    }
  ]
}
```

### Properties

- **`platform`** (required): Must match exactly (case-sensitive)
  - Supported values: `Spotify`, `AppleMusic`, `AmazonMusic`, `Deezer`, `YouTube`, `Instagram`, `TikTok`, `Facebook`
  
- **`url`** (required): Full URL to your profile/artist page
  - Use `#` as placeholder during development
  - External URLs automatically open in new tab
  
- **`ariaLabel`** (required): Descriptive text for screen readers
  - Format: `"Listen on [Platform]"` or `"Follow on [Platform]"`
  - Improves accessibility

---

## 🔗 Example URLs

### Streaming Platforms

```json
{
  "platform": "Spotify",
  "url": "https://open.spotify.com/artist/1234567890abcdef",
  "ariaLabel": "Listen on Spotify"
}
```

```json
{
  "platform": "AppleMusic",
  "url": "https://music.apple.com/us/artist/artist-name/1234567890",
  "ariaLabel": "Listen on Apple Music"
}
```

```json
{
  "platform": "AmazonMusic",
  "url": "https://music.amazon.com/artists/B08ABCDEFG",
  "ariaLabel": "Listen on Amazon Music"
}
```

```json
{
  "platform": "Deezer",
  "url": "https://www.deezer.com/artist/12345678",
  "ariaLabel": "Listen on Deezer"
}
```

```json
{
  "platform": "YouTube",
  "url": "https://youtube.com/@yourusername",
  "ariaLabel": "Watch on YouTube"
}
```

### Social Media

```json
{
  "platform": "Instagram",
  "url": "https://instagram.com/yourusername",
  "ariaLabel": "Follow on Instagram"
}
```

```json
{
  "platform": "TikTok",
  "url": "https://tiktok.com/@yourusername",
  "ariaLabel": "Follow on TikTok"
}
```

```json
{
  "platform": "Facebook",
  "url": "https://facebook.com/yourpage",
  "ariaLabel": "Follow on Facebook"
}
```

---

## 🎨 Visual Appearance

### Default State
- Icon size: **20px**
- Color: Inherits from text (white with opacity)
- Spacing: **16px** gap between icons
- Separator: Bullet point (•) between icons

### Hover State
- Color changes to: **Accent color** (#E45B66)
- Smooth transition: **200ms**
- Cursor: Pointer

---

## ✏️ How to Update

### Step 1: Open Configuration File
```bash
src/data/site.json
```

### Step 2: Update URLs
Replace `#` placeholders with your actual profile URLs:

```json
{
  "platform": "Spotify",
  "url": "#",  // ← Replace this
  "ariaLabel": "Listen on Spotify"
}
```

Becomes:

```json
{
  "platform": "Spotify",
  "url": "https://open.spotify.com/artist/YOUR_ARTIST_ID",
  "ariaLabel": "Listen on Spotify"
}
```

### Step 3: Save & Verify
1. Save the file
2. Hot reload will apply changes automatically
3. Verify links work by clicking icons in footer

---

## 🔄 Adding/Removing Platforms

### To Remove a Platform

Simply delete its object from the array:

```json
{
  "socialLinks": [
    { "platform": "Spotify", "url": "#", "ariaLabel": "..." },
    // { "platform": "Facebook", "url": "#", "ariaLabel": "..." },  ← Removed
    { "platform": "Instagram", "url": "#", "ariaLabel": "..." }
  ]
}
```

### To Reorder Platforms

Just rearrange the objects in the array:

```json
{
  "socialLinks": [
    { "platform": "Instagram", ... },    // Now first
    { "platform": "Spotify", ... },      // Now second
    { "platform": "YouTube", ... }       // Now third
  ]
}
```

---

## ⚠️ Important Notes

### 1. Platform Names are Case-Sensitive

✅ **Correct:**
```json
{ "platform": "AppleMusic", ... }
```

❌ **Incorrect:**
```json
{ "platform": "applemusic", ... }
{ "platform": "Apple Music", ... }
{ "platform": "APPLEMUSIC", ... }
```

### 2. External Links Auto-Open in New Tab

Any URL starting with `http://` or `https://` automatically:
- Opens in a new browser tab
- Includes security attributes (`rel="noopener noreferrer"`)

### 3. Test Your Links

After updating URLs:
1. Click each icon in the footer
2. Verify it goes to the correct page
3. Check that your artist profile loads correctly

---

## 🆘 Troubleshooting

### Icon Not Showing

**Problem:** Icon shows as text instead of logo  
**Solution:** Check that `platform` name matches exactly (case-sensitive)

```json
❌ { "platform": "spotify", ... }
✅ { "platform": "Spotify", ... }
```

### Link Doesn't Work

**Problem:** Clicking icon does nothing  
**Solution:** Check URL format

```json
❌ { "url": "spotify.com/artist/123", ... }
✅ { "url": "https://open.spotify.com/artist/123", ... }
```

### Wrong Icon Appears

**Problem:** Wrong logo displays for platform  
**Solution:** Verify exact platform name spelling

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| `Apple` | `AppleMusic` |
| `Amazon` | `AmazonMusic` |
| `Tiktok` | `TikTok` |

---

## 📋 Complete Example

```json
{
  "socialLinks": [
    {
      "platform": "Spotify",
      "url": "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
      "ariaLabel": "Listen on Spotify"
    },
    {
      "platform": "AppleMusic",
      "url": "https://music.apple.com/us/artist/drake/271256",
      "ariaLabel": "Listen on Apple Music"
    },
    {
      "platform": "AmazonMusic",
      "url": "https://music.amazon.com/artists/B001U6Y3A4",
      "ariaLabel": "Listen on Amazon Music"
    },
    {
      "platform": "Deezer",
      "url": "https://www.deezer.com/artist/13",
      "ariaLabel": "Listen on Deezer"
    },
    {
      "platform": "YouTube",
      "url": "https://youtube.com/@Drake",
      "ariaLabel": "Watch on YouTube"
    },
    {
      "platform": "Instagram",
      "url": "https://instagram.com/champagnepapi",
      "ariaLabel": "Follow on Instagram"
    },
    {
      "platform": "TikTok",
      "url": "https://tiktok.com/@drake",
      "ariaLabel": "Follow on TikTok"
    },
    {
      "platform": "Facebook",
      "url": "https://facebook.com/Drake",
      "ariaLabel": "Follow on Facebook"
    }
  ]
}
```

---

## 🚀 Quick Start Checklist

- [ ] Open `src/data/site.json`
- [ ] Find your artist profiles on each platform
- [ ] Copy your profile URLs
- [ ] Replace `#` placeholders with real URLs
- [ ] Save the file
- [ ] Test each link in the footer
- [ ] Verify correct pages open

That's it! Your footer social links are now live! ✨

