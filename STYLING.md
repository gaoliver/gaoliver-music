# Styling Guide - Oliver Music Website

This document outlines all the CSS and Tailwind styling applied to match the mockup design.

## CSS Variables & Base Styles

```css
:root {
  --bg: #121212
  --bgAlt: #0C0C0C
  --text: #E5E5E5
  --muted: #8E8E8E
  --accent: #E45B66
}
```

## Tailwind Configuration

### Custom Colors
- `brand-bg`: #121212 (Main background)
- `brand-bgAlt`: #0C0C0C (Alternative darker background)
- `brand-text`: #E5E5E5 (Primary text color)
- `brand-muted`: #8E8E8E (Muted/secondary text)
- `brand-accent`: #E45B66 (Accent/CTA color)

### Custom Fonts
- **Title Font**: Cinzel (serif) - Used for headings
- **Body Font**: Inter (sans-serif) - Used for body text

### Custom Shadow
- `shadow-soft`: 0 10px 30px rgba(0,0,0,0.35)

### Container
- Max-width: 1120px
- Centered by default

## Custom CSS Classes

### .glass
```css
background: rgba(0, 0, 0, 0.55);
backdrop-filter: blur(8px);
```
**Used in**: Header navigation

### .divider
```css
height: 1px;
background: linear-gradient(to right, transparent, #2a2a2a, transparent);
```
**Used in**: Section separators

## Component Styling

### Header
- Fixed positioning at top
- Glass effect background
- z-index: 50
- Padding: py-3, px-6

### Hero Section
- Min-height: 88vh
- Radial gradient overlay: `rgba(228,91,102,0.10)`
- Two-column grid on desktop
- Logo: w-64 md:w-80
- Title: text-4xl md:text-5xl (Cinzel font)

### Featured Release Card
- Rounded: rounded-2xl
- Padding: p-6
- Border: border-white/10
- Background: bg-brand-bgAlt
- Image: aspect-square with rounded-xl
- Shadow: shadow-soft

### Regular Release Cards
- Rounded: rounded-xl
- No outer padding (image edge-to-edge)
- Border: border-white/10
- Background: bg-brand-bgAlt
- Image: aspect-square
- Hover: scale-[1.02] transition
- Content padding: p-4

### Buttons

#### Primary (Accent)
- Background: bg-brand-accent
- Text: text-black
- Hover: opacity-90
- Shadow: shadow-soft
- Sizes: sm (px-3 py-2), md (px-5 py-3), lg (px-6 py-3)

#### Secondary
- Background: bg-white/5
- Border: border-white/10
- Hover: bg-white/10

### Form Inputs
- Background: bg-white/5
- Border: border-white/10
- Padding: px-4 py-3
- Focus: ring-2 ring-brand-accent
- Placeholder: text-brand-muted

### About Section
- Grid: md:grid-cols-5
- Image: md:col-span-2, aspect-[4/5]
- Content: md:col-span-3

### Releases Section
- Grid: sm:grid-cols-2 lg:grid-cols-3
- Gap: gap-6

### Footer
- Border-top: border-white/10
- Background: bg-brand-bgAlt
- Padding: py-10

## Typography

### Headings
- Hero Title: text-4xl md:text-5xl, font-title, tracking-wide
- Section Titles: text-3xl md:text-4xl, font-title
- Card Titles: text-lg font-semibold (regular), text-2xl font-title (featured)

### Body Text
- Regular: Default (14px equivalent)
- Small: text-sm
- Muted: text-brand-muted

## Spacing

### Sections
- Vertical padding: py-12
- Container padding: px-6

### Elements
- Button gaps: gap-3
- Social links: gap-4
- Grid gaps: gap-6 (releases), gap-10 (hero, about)

## Responsive Breakpoints

- Mobile: Default (< 768px)
- Tablet/Desktop: md: (≥ 768px)
- Large Desktop: lg: (≥ 1024px)

## Key Layout Patterns

1. **Container**: All sections use `.container mx-auto px-6` with max-width 1120px
2. **Glass Effect**: Header uses custom `.glass` class for translucent background
3. **Dividers**: Custom `.divider` class for subtle section separators
4. **Cards**: Consistent border-white/10, bg-brand-bgAlt, shadow-soft pattern
5. **Hover States**: Subtle opacity changes and scale transforms

