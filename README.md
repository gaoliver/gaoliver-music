# Oliver — Music Website

A modern, minimalist music artist website built with React, TypeScript, and TailwindCSS, featuring a dark aesthetic with smooth animations and responsive design.

## 🎨 Design

- **Dark Theme**: Sophisticated dark color palette with accent colors
- **Typography**: Cinzel for titles and Inter for body text
- **Architecture**: Atomic Design principles (Atoms, Molecules, Organisms, Templates, Pages)

## 🚀 Tech Stack

- **React 19** with TypeScript
- **Vite** for blazing fast development
- **TailwindCSS v4** for styling
- **React Router** for navigation
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

All website content is managed through `src/data/siteData.json`. Edit this file to update:
- Hero section content
- About information
- Releases
- Navigation items
- Social links
- Contact form labels

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
