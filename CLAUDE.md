# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CVfolio is a minimalistic portfolio/CV website built with Astro 5 and TailwindCSS 4. It supports bilingual content (English/Korean) and serves as a personal portfolio showcase for a frontend engineer.

## Development Commands

- `bun dev` or `npm run dev` - Start development server at localhost:4321
- `bun build` or `npm run build` - Build production site to ./dist/
- `bun preview` or `npm run preview` - Preview build locally

## Content Architecture

### Bilingual Content System
The project uses a sophisticated bilingual content management system:

- Content is organized by language: `src/content/en/` and `src/content/ko/`
- Each language has identical collection structures: `pages`, `jobs`, `links`, `posts`, `projects`, `talks`
- Collections are defined in `src/content.config.ts` with language suffixes (e.g., `pages-en`, `pages-ko`)
- Content fetching uses fallback system: if Korean content doesn't exist, falls back to English

### Content Collections Schema
- **Pages**: Homepage and static page content with SEO metadata
- **Jobs**: Work experience with company, location, date range, and URLs
- **Links**: Contact/social links with labels and URLs (YAML format)
- **Posts**: Blog posts with dates, images, and draft status
- **Projects**: Portfolio projects with descriptions, tech stacks, and images
- **Talks**: Speaking engagements with event details

### Adding a New Blog Post

When adding a new blog post, follow these steps to ensure it meets the content schema and builds correctly:

1.  **Create a New Directory**: Create a new directory for the post under both `src/content/en/posts/` and `src/content/ko/posts/`. The directory name should follow the format `post_YYYYMMDD`.
2.  **Create `index.mdx`**: Inside each new directory, create an `index.mdx` file.
3.  **Add Frontmatter**: At the very beginning of each `index.mdx` file, add the required frontmatter. The site will fail to build without it.

    ```yaml
    ---
    title: "Your Post Title"
    date: YYYY-MM-DD
    draft: false # Set to true if the post is not ready
    seo:
      title: "SEO-friendly Title for the Post"
      description: "A brief but compelling description of the post for search engines."
      tag: "Technical Experience" # Or other relevant tag
      type: "technology" # Or other relevant type
      keywords: "Keyword1, Keyword2, Keyword3"
    ---
    ```

4.  **Write Content**: Add your post content in MDX format below the frontmatter.
5.  **Bilingual Content**: Ensure that both the English and Korean versions have the frontmatter. You can use the same English text for the Korean version's frontmatter initially and translate it later. The `title` and `date` fields are the most critical for a successful build.

### Key Architecture Files
- `src/lib/languages.ts`: Language detection, URL handling, and collection naming
- `src/lib/content.ts`: Localized content fetching with fallback logic
- `src/lib/constants.ts`: Author info, SEO defaults, and localized configurations
- `src/content.config.ts`: Zod schemas for all content collections

## Component Structure

### Layouts
- `BaseLayout.astro`: Main layout with Header, Footer, theme/language switchers

### UI Components
- Language switching: `SwitchLang.tsx`, `LanguageAwareLinks.tsx`
- Theme switching: `SwitchTheme.tsx`
- Content display: `Author.astro`, `WorkExperience.astro`, `Talk.astro`

## Configuration

### Astro Configuration
- Uses experimental font loading for Inter font family
- TailwindCSS integration via Vite plugin
- MDX support with Shiki syntax highlighting (gruvbox-dark-medium theme)
- Custom remark plugin for reading time calculation (`src/lib/remark.mjs`)

## Content Management Notes

When adding new content:
1. Add to both `en/` and `ko/` directories for full bilingual support
2. Use identical file structures and naming conventions
3. Follow existing frontmatter schemas defined in `content.config.ts`
4. YAML files for simple data (links), MDX for rich content (jobs, posts, projects)

## Blog Article Guidelines

### File Structure
- Create posts in both languages: `src/content/en/posts/` and `src/content/ko/posts/`
- Use folder structure: `post_YYYYMMDD/index.mdx` (e.g., `post_20250301/index.mdx`)
- Images and assets go in the same folder as the post

### Frontmatter Requirements
```yaml
---
title: "Article Title"
date: 2025-03-01
draft: false  # Set to true to hide from production
seo:
  title: SEO-optimized title
  description: Brief description for meta tags
  tag: Category or tag
  type: article, technology, tutorial, etc.
  keywords: space-separated keywords
---
```

### Content Style Guide
- **Structure**: Use clear headings (##, ###) for navigation
- **Code blocks**: Include language specification for syntax highlighting
- **Lists**: Use bullet points (➡️, ✅, ❌) for visual emphasis
- **Technical content**: Include code examples, configurations, and step-by-step solutions
- **Takeaways**: End with key learnings or actionable insights


### Tone and Perspective Guidelines

**Point of View**: Write as a solo frontend developer navigating real-world challenges
- "As a frontend developer dipping my toes into DevOps..."
- "Being the only frontend dev on the team, I had to figure this out myself..."
- "Without a backend teammate to ask, I dove into the server logs..."

**Storytelling Approach**: Present debugging/problem-solving as a journey
- Start with the mystery: "I encountered a puzzling scenario..."
- Show the investigation process: "Initial Investigation", "The Root Cause"
- Document failed attempts: "First, I tried X... but that didn't work"
- Celebrate the breakthrough: "The Solution", "What finally worked"

**Easy-going Tone Examples**:
- Use conversational language: "dipping my toes into", "puzzling scenario"
- Show vulnerability: "I was stumped", "This had me scratching my head"
- Admit mistakes: "I initially thought...", "My first approach was wrong"
- Share learning moments: "This taught me...", "Now I know better"

**Technical Narrative Structure**:
1. **The Problem**: Set the scene with what went wrong
2. **Investigation**: Document your debugging process step-by-step
3. **Attempts**: Show both failed and successful approaches
4. **Solution**: Explain what finally worked and why
5. **Reflection**: Share lessons learned and future prevention

**Voice Characteristics**:
- Humble and honest about not knowing everything
- Curious and methodical in problem-solving approach
- Practical focus on real-world solutions
- Encouraging tone for other solo developers facing similar challenges

### Bilingual Content Strategy
- Translate core content while adapting for cultural context
- Technical terms can remain in English if commonly used in Korean tech community
- Maintain identical file structure and naming across languages
- Use `draft: true` for incomplete translations

## URL Structure

The site uses language suffixes for bilingual content:
- `/` - Default (English) homepage
- `/en` - Explicit English homepage  
- `/ko` - Korean homepage
- Content routing handled by `src/lib/languages.ts` utilities