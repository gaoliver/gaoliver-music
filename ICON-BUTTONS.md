# Icon Buttons for Streaming Services

## Overview

Release cards use icon buttons instead of text labels for a cleaner, more compact design.

## Icons Used

### Service Icons
- **Spotify** → `<FaSpotify />` - Spotify logo
- **Apple Music** → `<FaApple />` - Apple logo
- **YouTube** → `<FaYoutube />` - YouTube logo
- **More/Other** → `<HiDotsHorizontal />` - Three dots icon

## Accessibility

All icon buttons include proper `aria-label` attributes for screen readers:

```tsx
<Button aria-label="Listen on Spotify">
  <FaSpotify size={16} />
</Button>
```

### Aria Labels:
- **Spotify**: "Listen on Spotify"
- **Apple Music**: "Listen on Apple Music"
- **YouTube**: "Watch on YouTube"
- **More**: "More streaming options"

## Button Styling

- **Size**: 20px icons (22px for dots icon)
- **Padding**: `!px-4 !py-2.5` (larger buttons)
- **Gap**: `gap-2` between buttons
- **Responsive**: Wraps to multiple rows with `flex-wrap`

## Hover Colors

Each button features its official brand color on hover:

- **Spotify**: `#1DB954` - Spotify green
- **Apple Music**: `white` with black text
- **YouTube**: `#FF0000` - YouTube red
- **More**: Brand accent color (`#E45B66`)

All hover states include smooth transitions with `transition-colors`.

## Benefits

✅ **Space-efficient** - Takes up less room than text  
✅ **Recognizable** - Brand logos are instantly identifiable  
✅ **Universal** - Icons transcend language barriers  
✅ **Modern** - Clean, minimal aesthetic  
✅ **Accessible** - Proper aria-labels for screen readers  

## Package

Icons provided by `react-icons` package:
- `react-icons/fa` - Font Awesome icons
- `react-icons/hi` - Hero Icons

## Updating Icons

To change an icon, simply replace the import and component:

```tsx
// Change Spotify icon
import { FaSpotify } from 'react-icons/fa';
// to
import { SiSpotify } from 'react-icons/si';
```

Browse all available icons at: https://react-icons.github.io/react-icons/

