# Mobile Menu Implementation

This document explains the mobile hamburger menu and drawer implementation.

## Overview

The mobile navigation uses a hamburger menu icon that opens a slide-in drawer from the right side of the screen. The drawer contains navigation links, a CTA button, and social media links.

## Components

### 1. **HamburgerButton** (Atom)
- Location: `src/components/atoms/HamburgerButton/`
- Animated hamburger icon that transforms into an X when open
- Only visible on mobile devices (hidden on `lg` breakpoint and above)
- Props:
  - `isOpen`: boolean - Controls the animation state
  - `onClick`: function - Callback when clicked

### 2. **MobileDrawer** (Organism)
- Location: `src/components/organisms/MobileDrawer/`
- Slide-in drawer that appears from the right side
- Features:
  - Smooth slide animation
  - Backdrop overlay with blur effect
  - Prevents body scrolling when open
  - Auto-closes when navigation link is clicked
  - Contains navigation links, CTA button, and social links
- Props:
  - `isOpen`: boolean - Controls drawer visibility
  - `onClose`: function - Callback to close the drawer
  - `navigation`: NavItem[] - Navigation menu items
  - `cta`: CTA | undefined - Call-to-action button
  - `socialLinks`: SocialLink[] - Social media links
  - `onNavClick`: function - Callback for navigation clicks

### 3. **Header** (Updated)
- Location: `src/components/organisms/Header/`
- Manages state for drawer open/close
- Shows desktop navigation on large screens
- Shows hamburger button on mobile screens
- Props:
  - `navigation`: NavItem[]
  - `cta`: CTA | undefined
  - `socialLinks`: SocialLink[]
  - `onNavClick`: function

## Behavior

### Desktop (≥1024px)
- Desktop navigation menu is visible
- CTA button is visible
- Hamburger button is hidden
- Mobile drawer is not accessible

### Mobile (<1024px)
- Desktop navigation menu is hidden
- CTA button is hidden (moved to drawer)
- Hamburger button is visible
- Clicking hamburger opens the drawer
- Clicking backdrop or navigation link closes the drawer

## Styling

### Drawer Styles
- Width: 320px (`w-80`)
- Max width: 85% of viewport width
- Background: Brand dark alt color
- Shadow: Extra large shadow for depth
- Animation: 300ms slide transition

### Backdrop Styles
- Background: Black with 80% opacity
- Backdrop blur for depth effect
- Fade in/out animation

### Hamburger Animation
- Three horizontal lines
- Top line: rotates 45° and moves down
- Middle line: fades out
- Bottom line: rotates -45° and moves up
- Creates an X shape when open

## Accessibility

- Proper ARIA labels (`aria-label`, `aria-expanded`)
- Keyboard accessible
- Focus management
- Screen reader friendly
- External links open in new tabs with proper `rel` attributes

## Integration

The mobile menu is integrated into the `MainLayout` template and receives data from `src/data/site.json`:

```json
{
  "navigation": [...],
  "headerCta": {...},
  "socialLinks": [...]
}
```

## Notes

- Body scroll is prevented when drawer is open
- Drawer closes automatically when a navigation link is clicked
- All external links open in new tabs
- Social links display platform icons
- Smooth scroll behavior is maintained for anchor links

