# Oliver — Music Website

A modern, minimalist music artist website built with React, TypeScript, and TailwindCSS, featuring a dark aesthetic with smooth animations and responsive design.

## 🎨 Design

- **Dark Theme**: Sophisticated dark color palette with accent colors
- **Typography**: Cinzel for titles and Inter for body text
- **Architecture**: Atomic Design principles (Atoms, Molecules, Organisms, Templates, Pages)

## 🚀 Tech Stack

- **React 19** with TypeScript
- **Vite** for blazing fast development
- **TailwindCSS v3** for styling
- **React Router** for navigation
- **React Icons** for icon library
- **Atomic Design** for component architecture

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic building blocks (Button, Input, Logo, etc.)
│   ├── molecules/      # Simple component combinations (ReleaseCard, NavMenu, etc.)
│   └── organisms/      # Complex components (Header, Hero, Footer, etc.)
├── templates/          # Page layouts
├── pages/              # Full pages
├── data/               # Static JSON data
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎵 Features

- Smooth scroll navigation
- Responsive design
- Release showcase
- Contact form (UI only)
- Social media links
- SEO-friendly

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Content Management

Website content is organized into separate JSON files for better maintainability:

- **`src/data/site.json`** - Site-wide settings (navigation, social links, footer, header CTA)
- **`src/data/home.json`** - Homepage hero section content (including background image)
- **`src/data/about.json`** - About page/section content (foreground & background images)
- **`src/data/releases.json`** - All music releases and streaming links
- **`src/data/contact.json`** - Contact form configuration

Each page imports only the data it needs, making the structure clean and scalable.

### 📚 Documentation Guides

- **[DATA-STRUCTURE.md](./DATA-STRUCTURE.md)** - Complete guide to data file organization
- **[CTA-GUIDE.md](./CTA-GUIDE.md)** - How to configure Call-to-Action buttons
- **[BACKGROUND-IMAGES.md](./BACKGROUND-IMAGES.md)** - Managing background images via JSON
- **[CONTENT-THEME.md](./CONTENT-THEME.md)** - Light/dark text theme for readable content
- **[RICH-TEXT.md](./RICH-TEXT.md)** - HTML formatting in About section description
- **[ICON-BUTTONS.md](./ICON-BUTTONS.md)** - Streaming service icon buttons implementation
- **[STYLING.md](./STYLING.md)** - Custom CSS and Tailwind configuration

## 🎯 Component Architecture

Following **Atomic Design** principles:

- **Atoms**: Button, Input, Textarea, Logo, SocialLink, Divider
- **Molecules**: ReleaseCard, NavMenu, SocialLinks, ContactForm
- **Organisms**: Header, Hero, About, Releases, Contact, Footer
- **Templates**: MainLayout
- **Pages**: Home

## 🌈 Color Palette

```css
Brand Background: #121212
Background Alt: #0C0C0C
Text: #E5E5E5
Muted: #8E8E8E
Accent: #E45B66
```

## 📄 License

All rights reserved © 2025 Oliver
