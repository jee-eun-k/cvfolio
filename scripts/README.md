# Blog Post Management Scripts

This directory contains scripts to simplify the process of creating and managing blog posts for your Astro site.

## Quick Start

### Creating a New Post

```bash
# Create a new post with default settings
bun run new-post "Your Post Title"

# Create a post with custom metadata
bun run new-post "Debugging Tips" --description "How to debug common issues" --tag "Debugging" --type "tutorial"

# Create only English version (skip Korean)
bun run new-post "Quick Fix" --no-korean
```

### Managing Existing Posts

```bash
# List all posts with their status
bun run posts:list

# Publish a draft post
bun run posts:publish post_20250101_my-article

# Unpublish a post (make it draft again)
bun run posts:unpublish post_20250101_my-article
```

## Scripts Overview

### `create-post.js`

Creates new blog posts with proper directory structure and frontmatter templates.

**Features:**

- Automatically generates post ID with date and slug
- Creates both English and Korean versions
- Generates proper frontmatter with SEO fields
- Includes content templates with writing guidelines

**Usage:**

```bash
bun run scripts/create-post.js "Title" [options]
```

**Options:**

- `--description "text"` - Set post description
- `--tag "text"` - Set category tag
- `--type "text"` - Set content type
- `--keywords "text"` - Set SEO keywords
- `--no-korean` - Skip Korean version

### `manage-posts.js`

Manages existing posts (list, publish, unpublish).

**Commands:**

- `list` / `ls` - Show all posts with status
- `publish <id>` - Publish a draft post
- `unpublish <id>` - Unpublish a post

## File Structure

When you create a new post, the following structure is generated:

```
src/content/
├── en/posts/
│   └── post_20250101_your-title/
│       └── index.mdx
└── ko/posts/
    └── post_20250101_your-title/
        └── index.mdx
```

## Frontmatter Template

Each post includes this frontmatter structure:

```yaml
---
title: 'Your Article Title'
date: 2025-01-01
draft: true
seo:
  title: 'SEO-Optimized Title'
  description: 'Brief description'
  tag: 'Technical Experience'
  type: 'technology'
  keywords: 'keyword1 keyword2 keyword3'
---
```

## Content Guidelines

The generated posts include templates that follow your established writing style:

- **Storytelling approach**: Present problems as mysteries to solve
- **Step-by-step debugging**: Document your investigation process
- **Key takeaways**: End with actionable insights
- **Bilingual support**: Templates for both English and Korean

## Workflow

1. **Create**: `bun run new-post "Title"`
2. **Edit**: Modify the generated `.mdx` files
3. **Preview**: `bun run dev` to see your changes
4. **Publish**: `bun run posts:publish <post-id>`
5. **Manage**: `bun run posts:list` to see all posts

## Tips

- Posts start as drafts (`draft: true`) - change to `false` when ready to publish
- Use the provided templates as a starting point for consistent content structure
- The Korean template includes Korean section headers and writing style
- Post IDs are automatically generated based on date and title slug
