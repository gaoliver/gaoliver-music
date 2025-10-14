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

## 📄 site.json

Site-wide configuration including navigation, social links, and footer.

```json
{
  "meta": {
    "title": "Oliver — Music",
    "description": "Heavy/Prog with minimalist and dark aesthetics",
    "lang": "en"
  },
  "navigation": [
    { "label": "Home", "href": "#home" }
  ],
  "socialLinks": [
    { "platform": "Spotify", "url": "#", "ariaLabel": "Spotify" }
  ],
  "footer": {
    "copyright": "© 2025 Oliver — All rights reserved."
  }
}
```

## 🏠 home.json

Homepage-specific content including hero section and section previews.

```json
{
  "hero": {
    "title": "Shadows in Motion",
    "subtitle": "Official site — releases, links and news.",
    "ctaPrimary": "Listen now",
    "ctaSecondary": "View discography"
  },
  "about": {
    "summary": "Brief about description...",
    "readMoreLabel": "Learn more"
  },
  "releases": {
    "sectionTitle": "Releases",
    "viewAllLabel": "View all",
    "limit": 3
  },
  "contact": {
    "sectionTitle": "Contact",
    "description": "Get in touch..."
  }
}
```

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
  "image": "https://..."
}
```

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
        "youtube": "#"
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
- **links**: Object with streaming platform URLs

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

