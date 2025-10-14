# CTA (Call-to-Action) Configuration Guide

This guide explains how to manage all CTAs across the website.

## 🎯 CTA Structure

All CTAs follow this consistent structure:

```typescript
interface CTA {
  isActive: boolean;  // Show/hide the CTA
  label: string;      // Button/link text
  url: string;        // Destination URL
}
```

## 📍 Available CTAs by Location

### 1. Header CTA
**File:** `src/data/site.json`  
**Location:** Top right of header (fixed navigation)

```json
{
  "headerCta": {
    "isActive": true,
    "label": "Listen now",
    "url": "#listen"
  }
}
```

**Use Cases:**
- Promote new release
- Link to latest single
- Drive to streaming platforms
- Promote pre-save campaigns

---

### 2. Hero Primary CTA
**File:** `src/data/home.json`  
**Location:** Hero section (left side, below subtitle)

```json
{
  "hero": {
    "ctaPrimary": {
      "isActive": true,
      "label": "Pre-save now",
      "url": "#"
    }
  }
}
```

**Styling:** Primary button (accent color background)

**Use Cases:**
- Main call-to-action
- Pre-save links
- Latest release
- Ticket sales

---

### 3. Hero Secondary CTA
**File:** `src/data/home.json`  
**Location:** Hero section (left side, next to primary CTA)

```json
{
  "hero": {
    "ctaSecondary": {
      "isActive": true,
      "label": "View discography",
      "url": "#releases"
    }
  }
}
```

**Styling:** Secondary button (outlined style)

**Use Cases:**
- View all releases
- Browse discography
- Secondary actions
- Alternative paths

---

### 4. About CTA
**File:** `src/data/home.json`  
**Location:** About section (currently not rendered, reserved for future)

```json
{
  "about": {
    "cta": {
      "isActive": false,
      "label": "Learn more",
      "url": "/about"
    }
  }
}
```

**Status:** Currently inactive (set for future use)

**Use Cases:**
- Link to full about page
- Bio/press kit download
- Artist story

---

### 5. Releases "View All" CTA
**File:** `src/data/home.json`  
**Location:** Releases section header (top right)

```json
{
  "releases": {
    "cta": {
      "isActive": true,
      "label": "View all",
      "url": "#releases"
    }
  }
}
```

**Styling:** Text link (muted color, hover accent)

**Use Cases:**
- Link to full discography
- Navigate to releases page
- Expand release list

---

## 🔧 Common URL Patterns

### Internal Anchors (Smooth Scroll)
```json
"url": "#listen"      // Scroll to featured release
"url": "#releases"    // Scroll to releases section
"url": "#about"       // Scroll to about section
"url": "#contact"     // Scroll to contact form
```

### External Links
```json
"url": "https://spotify.com/..."
"url": "https://music.apple.com/..."
"url": "https://youtube.com/..."
```

### Future Pages (React Router)
```json
"url": "/about"       // About page
"url": "/releases"    // Full releases page
"url": "/release/id"  // Individual release page
```

---

## 📋 Configuration Examples

### Example 1: Promoting a Pre-save Campaign

**Header:**
```json
"headerCta": {
  "isActive": true,
  "label": "Pre-save Christmas EP",
  "url": "https://distrokid.com/hyperfollow/..."
}
```

**Hero Primary:**
```json
"ctaPrimary": {
  "isActive": true,
  "label": "Pre-save now",
  "url": "https://distrokid.com/hyperfollow/..."
}
```

**Hero Secondary:**
```json
"ctaSecondary": {
  "isActive": true,
  "label": "Listen to previous releases",
  "url": "#releases"
}
```

---

### Example 2: Post-Release (Album Available)

**Header:**
```json
"headerCta": {
  "isActive": true,
  "label": "Stream now",
  "url": "#listen"
}
```

**Hero Primary:**
```json
"ctaPrimary": {
  "isActive": true,
  "label": "Listen on Spotify",
  "url": "https://open.spotify.com/album/..."
}
```

**Hero Secondary:**
```json
"ctaSecondary": {
  "isActive": true,
  "label": "View on Apple Music",
  "url": "https://music.apple.com/album/..."
}
```

---

### Example 3: Ticket Sales / Tour

**Header:**
```json
"headerCta": {
  "isActive": true,
  "label": "Get tickets",
  "url": "https://eventbrite.com/..."
}
```

**Hero Primary:**
```json
"ctaPrimary": {
  "isActive": true,
  "label": "Buy tickets now",
  "url": "https://eventbrite.com/..."
}
```

**Hero Secondary:**
```json
"ctaSecondary": {
  "isActive": true,
  "label": "View tour dates",
  "url": "/tour"
}
```

---

### Example 4: No Active Campaign (Browse Mode)

**Header:**
```json
"headerCta": {
  "isActive": false,
  "label": "Listen now",
  "url": "#listen"
}
```

**Hero Primary:**
```json
"ctaPrimary": {
  "isActive": true,
  "label": "Explore music",
  "url": "#releases"
}
```

**Hero Secondary:**
```json
"ctaSecondary": {
  "isActive": false,
  "label": "View discography",
  "url": "#releases"
}
```

---

## 🎨 Visual Hierarchy

1. **Header CTA** → Small, always visible (fixed)
2. **Hero Primary** → Largest, accent color, main action
3. **Hero Secondary** → Medium, outlined, alternative action
4. **Releases "View All"** → Small text link, subtle

---

## ✅ Best Practices

### DO:
- ✅ Keep labels short (2-4 words)
- ✅ Use action verbs ("Listen", "Pre-save", "Get", "View")
- ✅ Set `isActive: false` instead of deleting CTAs
- ✅ Use HTTPS for external links
- ✅ Test all URLs before deploying
- ✅ Update labels to match current campaigns

### DON'T:
- ❌ Use long text in CTA labels
- ❌ Delete CTA objects (set `isActive: false` instead)
- ❌ Use generic labels like "Click here"
- ❌ Point multiple CTAs to the same URL
- ❌ Leave broken/test URLs in production

---

## 🔄 Quick Update Checklist

When updating CTAs for a new campaign:

1. **Update `site.json`**
   - [ ] Update header CTA label and URL
   - [ ] Set `isActive: true` if promoting

2. **Update `home.json`**
   - [ ] Update hero title and subtitle
   - [ ] Update primary CTA label and URL
   - [ ] Update secondary CTA (or disable if not needed)
   - [ ] Verify releases "View all" CTA is active

3. **Update Release Data**
   - [ ] Add new release to `releases.json`
   - [ ] Set `featured: true` on latest release
   - [ ] Update cover image URL

4. **Test**
   - [ ] Click all CTAs to verify URLs
   - [ ] Check on mobile and desktop
   - [ ] Verify smooth scroll for anchor links

---

## 🆘 Troubleshooting

**CTA not showing?**
- Check `isActive` is set to `true`
- Verify the component is importing the correct data file
- Check browser console for errors

**Link not working?**
- Verify URL format (include `https://` for external)
- Test URL in browser first
- Check for typos in anchor names (e.g., `#listen` vs `#listen-now`)

**Styling looks wrong?**
- Primary CTA uses `variant="primary"`
- Secondary CTA uses `variant="secondary"`
- Check TailwindCSS is loading correctly

