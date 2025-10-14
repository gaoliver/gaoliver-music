# Rich Text Support Guide

## Overview

The About section description supports **HTML formatting** for rich text content including bold, italic, line breaks, links, and more.

---

## 📝 Supported HTML Tags

### Text Formatting

#### Bold Text
```json
{
  "description": "This is <strong>bold text</strong> or <b>also bold</b>"
}
```

#### Italic Text
```json
{
  "description": "This is <em>emphasized text</em> or <i>also italic</i>"
}
```

#### Underline
```json
{
  "description": "This is <u>underlined text</u>"
}
```

#### Combination
```json
{
  "description": "<strong><em>Bold and italic</em></strong> text"
}
```

---

### Line Breaks & Paragraphs

#### Single Line Break
```json
{
  "description": "First line<br>Second line"
}
```

#### Paragraphs
```json
{
  "description": "<p>First paragraph.</p><p>Second paragraph.</p>"
}
```

#### Multiple Line Breaks
```json
{
  "description": "Line 1<br><br>Line 3 (with space between)"
}
```

---

### Links

#### Basic Link
```json
{
  "description": "Visit <a href='https://example.com'>our website</a>"
}
```

#### Link Opening in New Tab
```json
{
  "description": "Check out <a href='https://spotify.com' target='_blank' rel='noopener noreferrer'>Spotify</a>"
}
```

---

### Special Characters

#### Quote Marks
```json
{
  "description": "He said &quot;Hello World&quot;"
}
```
Or use escaped quotes:
```json
{
  "description": "He said \"Hello World\""
}
```

#### Apostrophes
```json
{
  "description": "It's working fine"
}
```
Or use HTML entity:
```json
{
  "description": "It&apos;s working fine"
}
```

#### Ampersand
```json
{
  "description": "Rock &amp; Metal"
}
```

---

## 💡 Practical Examples

### Example 1: Simple Bold Keywords
```json
{
  "title": "About",
  "description": "Oliver is a solo project between <strong>Heavy</strong> and <strong>Progressive</strong>, mixing heavy riffs with dark atmospheres and introspective melodies."
}
```

**Result:** Oliver is a solo project between **Heavy** and **Progressive**, mixing heavy riffs...

---

### Example 2: Multi-line Description
```json
{
  "description": "Oliver is a solo artist specializing in heavy metal.<br><br>The project combines aggressive riffs with melodic elements, creating a unique sound that bridges traditional metal with modern progressive influences."
}
```

**Result:**
Oliver is a solo artist specializing in heavy metal.

The project combines aggressive riffs...

---

### Example 3: With Links
```json
{
  "description": "Listen to Oliver on <a href='https://spotify.com/artist/oliver' target='_blank' rel='noopener noreferrer'><strong>Spotify</strong></a> or follow on <a href='https://instagram.com/oliver' target='_blank' rel='noopener noreferrer'>Instagram</a>."
}
```

**Result:** Listen to Oliver on **Spotify** or follow on Instagram. (links clickable)

---

### Example 4: Styled Paragraph
```json
{
  "description": "<p><strong>Oliver</strong> is a solo project between Heavy and Progressive.</p><p><em>\"Music is my way to express faith and struggle.\"</em></p>"
}
```

**Result:**
**Oliver** is a solo project between Heavy and Progressive.

*"Music is my way to express faith and struggle."*

---

### Example 5: Complex Formatting
```json
{
  "description": "<strong>Oliver</strong> – A solo project mixing <em>heavy riffs</em> with <em>dark atmospheres</em>.<br><br>Influenced by bands like <strong>Skillet</strong>, <strong>Metallica</strong>, and <strong>BMTH</strong>, this project explores themes of faith, struggle, and redemption.<br><br>Listen on <a href='#' target='_blank'>streaming platforms</a>."
}
```

---

## ⚠️ Important Notes

### 1. **Escape JSON Special Characters**

When using quotes inside HTML attributes, use single quotes:
```json
✅ CORRECT:
"description": "<a href='#link'>Text</a>"

❌ INCORRECT:
"description": "<a href=\"#link\">Text</a>"
```

Or use HTML entities:
```json
✅ ALSO CORRECT:
"description": "<a href=&quot;#link&quot;>Text</a>"
```

---

### 2. **Keep It Clean**

Only use supported HTML tags:
- ✅ `<strong>`, `<em>`, `<b>`, `<i>`, `<u>`
- ✅ `<br>`, `<p>`
- ✅ `<a href='...'>`
- ❌ Avoid: `<div>`, `<span>`, `<script>`, `<style>`, etc.

---

### 3. **Accessibility**

When adding links, always include descriptive text:
```json
✅ GOOD:
"description": "Listen on <a href='#'>Spotify</a>"

❌ BAD:
"description": "Listen <a href='#'>here</a>"
```

For external links, always add `target='_blank' rel='noopener noreferrer'`:
```json
"<a href='https://external.com' target='_blank' rel='noopener noreferrer'>Link</a>"
```

---

### 4. **Text Color Adaptation**

Rich text automatically adapts to the `lightContent` setting:
- `lightContent: false` → Standard gray colors
- `lightContent: true` → White/light colors for bright backgrounds

---

## 🎨 Styling

### Default Styles Applied

The rich text container includes:
- `leading-relaxed` - Comfortable line height
- `prose prose-invert` - Typography styles for content
- `max-w-none` - No width restrictions
- Color adapts based on `lightContent` setting

### Bold/Strong Tags
```css
font-weight: 700
color: inherit (matches text color)
```

### Italic/Emphasis Tags
```css
font-style: italic
```

### Links
```css
Default: 
  - Underlined (subtle offset)
  - Inherits current text color
  - Smooth transition

Hover:
  - Changes to accent color (#E45B66)
  - Maintains underline
```

### Paragraphs
```css
margin-bottom: 1em (spacing between paragraphs)
Last paragraph: no bottom margin
```

---

## 🔒 Security Note

The component uses `dangerouslySetInnerHTML` which means:
- ✅ You have full control over the content (it's your JSON file)
- ⚠️ Never accept HTML from user input
- ✅ Safe for static content managed by you

---

## 📋 Quick Reference

| Effect | HTML |
|--------|------|
| Bold | `<strong>text</strong>` or `<b>text</b>` |
| Italic | `<em>text</em>` or `<i>text</i>` |
| Underline | `<u>text</u>` |
| Line break | `<br>` |
| Paragraph | `<p>text</p>` |
| Link | `<a href='url'>text</a>` |
| External link | `<a href='url' target='_blank' rel='noopener noreferrer'>text</a>` |

---

## 🚀 Getting Started

1. Open `src/data/about.json`
2. Update the `description` field with HTML tags
3. Use single quotes for HTML attributes
4. Save and preview in browser
5. Adjust as needed!

### Basic Template

```json
{
  "title": "About",
  "description": "<strong>Project Name</strong> is a <em>genre</em> project.<br><br>Description continues here...",
  "details": [...],
  "image": "...",
  "backgroundImage": "...",
  "lightContent": false
}
```

Happy formatting! ✨

