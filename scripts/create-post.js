#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONTENT_DIR = path.join(__dirname, '../src/content');
const POST_TEMPLATE = `---
title: "{{TITLE}}"
date: {{DATE}}
draft: true
seo:
  title: "{{SEO_TITLE}}"
  description: "{{DESCRIPTION}}"
  tag: "{{TAG}}"
  type: "{{TYPE}}"
  keywords: "{{KEYWORDS}}"
---

## Introduction

Start your article here...

## Main Content

Add your main content sections here...

## Conclusion

Wrap up your article with key takeaways and next steps.

### Key Takeaways

- ➡️ **First takeaway**
- ➡️ **Second takeaway** 
- ➡️ **Third takeaway**
`;

const KO_POST_TEMPLATE = `---
title: "{{TITLE}}"
date: {{DATE}}
draft: true
seo:
  title: "{{SEO_TITLE}}"
  description: "{{DESCRIPTION}}"
  tag: "{{TAG}}"
  type: "{{TYPE}}"
  keywords: "{{KEYWORDS}}"
---

## 소개

여기에 기사를 시작하세요...

## 본문

여기에 주요 내용 섹션을 추가하세요...

## 결론

핵심 교훈과 다음 단계로 기사를 마무리하세요.

### 주요 교훈

- ➡️ **첫 번째 교훈**
- ➡️ **두 번째 교훈**
- ➡️ **세 번째 교훈**
`;

function generatePostId(title) {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 20);
  return `post_${date}_${slug}`;
}

function getCurrentDate() {
  return new Date().toISOString().slice(0, 10);
}

async function createPost(title, options = {}) {
  const {
    description = 'A brief description of the article',
    tag = 'Technical Experience',
    type = 'technology',
    keywords = '',
    createKorean = true,
  } = options;

  const postId = generatePostId(title);
  const date = getCurrentDate();

  // Create English post
  const enPostDir = path.join(CONTENT_DIR, 'en', 'posts', postId);
  await fs.mkdir(enPostDir, { recursive: true });

  const enContent = POST_TEMPLATE.replace(/{{TITLE}}/g, title)
    .replace(/{{DATE}}/g, date)
    .replace(/{{SEO_TITLE}}/g, title)
    .replace(/{{DESCRIPTION}}/g, description)
    .replace(/{{TAG}}/g, tag)
    .replace(/{{TYPE}}/g, type)
    .replace(/{{KEYWORDS}}/g, keywords);

  await fs.writeFile(path.join(enPostDir, 'index.mdx'), enContent);
  console.log(`✅ Created English post: ${enPostDir}/index.mdx`);

  // Create Korean post if requested
  if (createKorean) {
    const koPostDir = path.join(CONTENT_DIR, 'ko', 'posts', postId);
    await fs.mkdir(koPostDir, { recursive: true });

    const koContent = KO_POST_TEMPLATE.replace(/{{TITLE}}/g, title)
      .replace(/{{DATE}}/g, date)
      .replace(/{{SEO_TITLE}}/g, title)
      .replace(/{{DESCRIPTION}}/g, description)
      .replace(/{{TAG}}/g, tag)
      .replace(/{{TYPE}}/g, type)
      .replace(/{{KEYWORDS}}/g, keywords);

    await fs.writeFile(path.join(koPostDir, 'index.mdx'), koContent);
    console.log(`✅ Created Korean post: ${koPostDir}/index.mdx`);
  }

  console.log(`\n🎉 Post "${title}" created successfully!`);
  console.log(`📁 Post ID: ${postId}`);
  console.log(`📝 Edit the files and set draft: false when ready to publish`);
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📝 Blog Post Creator

Usage: bun run scripts/create-post.js "Your Post Title" [options]

Options:
  --description "Brief description"
  --tag "Category tag"
  --type "Content type"
  --keywords "space separated keywords"
  --no-korean (skip Korean version)

Examples:
  bun run scripts/create-post.js "My New Article"
  bun run scripts/create-post.js "Debugging Tips" --tag "Debugging" --type "tutorial"
  bun run scripts/create-post.js "Quick Fix" --description "A quick solution" --no-korean
`);
    return;
  }

  const title = args[0];
  const options = {};

  // Parse options
  for (let i = 1; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];

    switch (flag) {
      case '--description':
        options.description = value;
        break;
      case '--tag':
        options.tag = value;
        break;
      case '--type':
        options.type = value;
        break;
      case '--keywords':
        options.keywords = value;
        break;
      case '--no-korean':
        options.createKorean = false;
        i--; // Don't skip next arg
        break;
    }
  }

  try {
    await createPost(title, options);
  } catch (error) {
    console.error('❌ Error creating post:', error.message);
    process.exit(1);
  }
}

main();
