# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with VuePress 2.x and VuePress Theme Hope, serving as a technical documentation and life journal platform. The content is primarily in Chinese and covers topics including web development, cybersecurity, algorithms, personal experiences, and reading notes.

## Development Commands

```bash
# Install dependencies (requires pnpm)
pnpm install

# Start development server
pnpm run docs:dev

# Build for production
pnpm run docs:build
```

**Note**: This project uses pnpm as the package manager. Make sure to use pnpm instead of npm or yarn.

## Architecture

### VuePress Configuration
- **Main Config**: `docs/.vuepress/config.ts` - Contains site title, theme settings, and plugin configurations
- **Sidebar**: `docs/.vuepress/sidebar.ts` - Defines the hierarchical navigation structure
- **Theme**: VuePress Theme Hope with blog functionality, comments (Giscus), and search (DocSearch)

### Directory Structure
```
docs/
├── .vuepress/
│   ├── config.ts           # VuePress main configuration
│   ├── sidebar.ts          # Navigation sidebar structure
│   ├── styles/             # Custom SCSS styles
│   └── client.ts           # Client-side configurations (snow effect)
├── skill/                  # Technical content
│   ├── DataStructureAndalgorithm/
│   ├── js/                 # Frontend development
│   ├── wecom/              # WeChat Work development
│   ├── php/                # PHP development
│   └── git/                # Git tutorials
├── cybersecurity/          # Security-related content
├── life/                   # Personal blog posts
├── read/                   # Book reviews and reading notes
├── english/                # English learning materials
├── cookingSkills/          # Cooking tutorials
└── components/             # Vue components (Home.vue, Snake.vue, Layout.vue)
```

### Content Organization
- **No frontmatter**: Content files use simple markdown without YAML frontmatter
- **Chinese navigation**: Sidebar categories use Chinese titles with English technical terms where appropriate
- **Hierarchical structure**: Main categories are collapsible with nested subcategories
- **Mixed content types**: Technical tutorials, personal reflections, and academic notes

### Key Features
- **Comment system**: Giscus integration for user comments
- **Search functionality**: Docsearch configured with Algolia
- **Custom components**: Interactive snake game and custom home layout
- **Image hosting**: Uses jsdelivr CDN for images stored in GitHub repository
- **Snow effect**: Custom client-side animation

## Development Notes

### Adding New Content
1. Create markdown files in appropriate category directories under `docs/`
2. Update `docs/.vuepress/sidebar.ts` to include new content in navigation
3. Use Chinese titles for navigation entries
4. No frontmatter required - content starts directly with headings

### Styling
- Custom SCSS styles in `docs/.vuepress/styles/`
- Responsive design with dark mode support
- Custom navigation bar with backdrop blur effect

### Deployment
The site is configured for GitHub Pages deployment with the production build output serving the static blog content.

### Content Guidelines
- Technical articles should include code examples with proper syntax highlighting
- Personal posts use narrative style with embedded images
- Reading notes follow quote-based format with excerpts and reflections