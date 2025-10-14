# Data Structure Documentation

This document explains the JSON data structure used throughout the website.

## File Organization

```
src/data/
├── site.json       # Site-wide configuration
├── home.json       # Homepage content
├── about.json      # About section content
├── releases.json   # Music releases catalog
├── contact.json    # Contact form configuration
└── index.ts        # Central exports
```

## 🎯 CTA Structure

All Call-to-Action (CTA) elements throughout the website follow a consistent structure:

```typescript
interface CTA {
  isActive: boolean;  // Controls visibility
  label: string;      // Button/link text
  url: string;        // Destination URL
}
```

**Example:**
```json
{
  "isActive": true,
  "label": "Listen now",
  "url": "#listen"
}
```

This structure allows you to easily enable/disable CTAs without removing them from the JSON.

## 📄 site.json

Site-wide configuration including navigation, header CTA, social links, and footer.

```json
{
  "meta": {
    "title": "G.A. Oliver | The Official Website",
    "description": "Heavy riffs • Loud screams • Deep faith",
    "lang": "en"
  },
  "navigation": [
    { "label": "Home", "href": "#home" }
  ],
  "headerCta": {
    "isActive": true,
    "label": "Listen now",
    "url": "#listen"
  },
  "socialLinks": [
    { "platform": "Spotify", "url": "#", "ariaLabel": "Listen on Spotify" },
    { "platform": "AppleMusic", "url": "#", "ariaLabel": "Listen on Apple Music" },
    { "platform": "AmazonMusic", "url": "#", "ariaLabel": "Listen on Amazon Music" },
    { "platform": "Deezer", "url": "#", "ariaLabel": "Listen on Deezer" },
    { "platform": "YouTube", "url": "#", "ariaLabel": "Watch on YouTube" },
    { "platform": "Instagram", "url": "#", "ariaLabel": "Follow on Instagram" },
    { "platform": "TikTok", "url": "#", "ariaLabel": "Follow on TikTok" },
    { "platform": "Facebook", "url": "#", "ariaLabel": "Follow on Facebook" }
  ],
  "footer": {
    "copyright": "© [YEAR] G.A. Oliver | All rights reserved."
  }
}
```

### Social Links

Social links are displayed as **icons** in the footer. Supported platforms:

| Platform | Icon Used | Example URL |
|----------|-----------|-------------|
| `Spotify` | Spotify logo | `https://open.spotify.com/artist/...` |
| `AppleMusic` | Apple logo | `https://music.apple.com/artist/...` |
| `AmazonMusic` | Amazon logo | `https://music.amazon.com/artists/...` |
| `Deezer` | Deezer logo | `https://www.deezer.com/artist/...` |
| `YouTube` | YouTube logo | `https://youtube.com/@username` |
| `Instagram` | Instagram logo | `https://instagram.com/username` |
| `TikTok` | TikTok logo | `https://tiktok.com/@username` |
| `Facebook` | Facebook logo | `https://facebook.com/username` |

**Properties:**
- `platform`: Must match one of the supported platform names exactly (case-sensitive)
- `url`: Full URL to your profile/artist page
- `ariaLabel`: Descriptive label for screen readers

**Note:** The `[YEAR]` placeholder in the copyright is automatically replaced with the current year.

## 🏠 home.json

Homepage-specific content including hero section and section previews.

```json
{
  "hero": {
    "title": "Christmas release!",
    "subtitle": "Listen to the classic Christmas songs in Metal version.",
    "ctaPrimary": {
      "isActive": true,
      "label": "Pre-save now",
      "url": "#"
    },
    "ctaSecondary": {
      "isActive": true,
      "label": "View discography",
      "url": "#releases"
    }
  },
  "about": {
    "summary": "Brief about description...",
    "cta": {
      "isActive": false,
      "label": "Learn more",
      "url": "/about"
    }
  },
  "releases": {
    "sectionTitle": "Releases",
    "cta": {
      "isActive": true,
      "label": "View all",
      "url": "#releases"
    },
    "limit": 3
  },
  "contact": {
    "sectionTitle": "Contact",
    "description": "Get in touch..."
  }
}
```

**CTA Configuration:**
- **Hero CTAs**: Two buttons in hero section (primary and secondary)
- **About CTA**: Optional "Learn more" button (set `isActive: false` to hide)
- **Releases CTA**: "View all" link at top of releases section

## 👤 about.json

Full about section content.

```json
{
  "title": "About",
  "description": "Full description...",
  "details": [
    "• Guitar & Vocals",
    "• Influences: Band1, Band2"
  ],
  "image": "https://...",
  "backgroundImage": "https://...",
  "lightContent": false
}
```

### About Properties

- **title**: Section heading
- **description**: Main description text (supports HTML formatting - see [RICH-TEXT.md](./RICH-TEXT.md))
  - Can include HTML tags like `<strong>`, `<em>`, `<br>`, `<a>`, etc.
  - Example: `"Description with <strong>bold</strong> text"`
- **details**: Array of detail strings (bullet points)
- **image**: Foreground image (displayed in card on left)
- **backgroundImage** (optional): Background image for the section (see [BACKGROUND-IMAGES.md](./BACKGROUND-IMAGES.md))
  - If not provided, falls back to `image`
- **lightContent** (optional, boolean): Use light text colors for better readability on bright backgrounds (see [CONTENT-THEME.md](./CONTENT-THEME.md))
  - `false` (default): Standard gray text (`#E5E5E5`)
  - `true`: White text with opacity variations for better contrast on light backgrounds

## 🎵 releases.json

Complete catalog of music releases.

```json
{
  "title": "Releases",
  "releases": [
    {
      "id": "unique-id",
      "title": "Release Title",
      "type": "Single|EP|Album",
      "year": "2025",
      "cover": "https://...",
      "featured": true,
      "newReleaseLabel": "New Release",
      "links": {
        "spotify": "#",
        "appleMusic": "#",
        "youtube": "#",
        "other": "#"
      }
    }
  ]
}
```

### Release Properties

- **id**: Unique identifier (slug format)
- **title**: Release name
- **type**: Single, EP, or Album
- **year**: Release year
- **cover**: Cover art image URL
- **featured**: Boolean - shows in hero section if true
- **newReleaseLabel**: Text label for featured releases (default: "New Release")
- **links**: Object with streaming platform URLs (spotify, appleMusic, youtube, other)
  - **other**: Optional additional link (e.g., Bandcamp, SoundCloud, Deezer, Tidal, etc.)

## 📧 contact.json

Contact form configuration.

```json
{
  "title": "Contact",
  "description": "Get in touch...",
  "form": {
    "fields": {
      "name": "Your name",
      "email": "Your email",
      "message": "Message"
    },
    "submitText": "Send"
  }
}
```

## 🔧 Usage in Components

### Importing Data

```typescript
// Single import
import homeData from '../../data/home.json';

// Multiple imports
import siteData from '../../data/site.json';
import releasesData from '../../data/releases.json';

// Or use the central export
import { siteData, homeData } from '../../data';
```

### Example Component Usage

```typescript
const Home: React.FC = () => {
  const featuredRelease = releasesData.releases.find(r => r.featured);
  
  return (
    <Hero
      title={homeData.hero.title}
      subtitle={homeData.hero.subtitle}
      featuredRelease={featuredRelease}
    />
  );
};
```

## 📋 Best Practices

1. **Single Responsibility**: Each JSON file represents one concern
2. **DRY Principle**: Site-wide data (navigation, social) lives in `site.json`
3. **Type Safety**: TypeScript interfaces match JSON structure
4. **Scalability**: Easy to add new pages/sections without touching existing files
5. **Maintainability**: Content editors only need to touch relevant files

## 🌐 Multi-language Support

To add multi-language support in the future:

```
src/data/
├── en/
│   ├── site.json
│   ├── home.json
│   └── ...
└── pt/
    ├── site.json
    ├── home.json
    └── ...
```

## 🔄 Adding New Content

### Adding a New Release

1. Open `src/data/releases.json`
2. Add new object to `releases` array
3. Set `featured: true` for newest release, remove from old featured
4. Update cover image URL
5. Add streaming platform links

### Adding a New Page

1. Create new JSON file: `src/data/newpage.json`
2. Define content structure
3. Export from `src/data/index.ts`
4. Create page component importing the data
5. Add route in `App.tsx`

