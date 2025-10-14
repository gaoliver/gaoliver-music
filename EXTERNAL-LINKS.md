# External Links Configuration

## Overview

All external links on the website automatically open in a new tab with proper security attributes.

## Implementation

### Automatic Detection

The website automatically detects external links (URLs starting with `http://` or `https://`) and applies:
- `target="_blank"` - Opens in new tab
- `rel="noopener noreferrer"` - Security best practice

### Components with External Link Support

1. **Button Component** (`src/components/atoms/Button/Button.tsx`)
   - Automatically detects external URLs
   - Used for all CTAs and streaming platform buttons

2. **SocialLink Component** (`src/components/atoms/SocialLink/SocialLink.tsx`)
   - Opens social media links in new tabs
   - Used in Hero and Footer sections

3. **Releases "View All" Link** (`src/components/organisms/Releases/Releases.tsx`)
   - Supports external links if needed

## Streaming Platform Buttons

All release cards now display **all 4 streaming platform buttons** (when URLs are provided):

1. **Spotify** - `links.spotify`
2. **Apple Music** - `links.appleMusic`
3. **YouTube** - `links.youtube`
4. **Other** - `links.other` (Bandcamp, SoundCloud, etc.)

### JSON Example

```json
{
  "links": {
    "spotify": "https://open.spotify.com/track/...",
    "appleMusic": "https://music.apple.com/album/...",
    "youtube": "https://www.youtube.com/watch?v=...",
    "other": "https://bandcamp.com/..."
  }
}
```

## Internal vs External Links

### Internal Links (Same Tab)
- Hash anchors: `#listen`, `#about`, `#releases`, `#contact`
- Relative paths: `/about`, `/releases`

### External Links (New Tab)
- Full URLs: `https://spotify.com/...`
- Any link starting with `http://` or `https://`

## Security

All external links include `rel="noopener noreferrer"` which:
- Prevents the new page from accessing `window.opener`
- Prevents the `Referer` header from being sent
- Protects against reverse tabnabbing attacks

## Testing

To test external link behavior:
1. Click any streaming platform button (Spotify, Apple Music, YouTube, Other)
2. Click social media links in Hero or Footer
3. Verify they open in new tabs
4. Verify internal navigation (#anchor links) stays in same tab

