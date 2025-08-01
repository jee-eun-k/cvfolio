#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../src/content');

async function listPosts() {
  const enPostsDir = path.join(CONTENT_DIR, 'en', 'posts');
  const koPostsDir = path.join(CONTENT_DIR, 'ko', 'posts');

  try {
    const enPosts = await fs.readdir(enPostsDir);
    const koPosts = await fs.readdir(koPostsDir);

    console.log('\n📝 Blog Posts Status:\n');

    // Process English posts
    for (const postDir of enPosts) {
      const postPath = path.join(enPostsDir, postDir, 'index.mdx');
      try {
        const content = await fs.readFile(postPath, 'utf-8');
        const frontmatter = extractFrontmatter(content);

        const status = frontmatter.draft ? '📝 Draft' : '✅ Published';
        const date = new Date(frontmatter.date).toLocaleDateString();

        console.log(`${status} ${frontmatter.title}`);
        console.log(`   📅 ${date} | 📁 ${postDir}`);
        console.log(`   🏷️  ${frontmatter.seo?.tag || 'No tag'}`);
        console.log('');
      } catch (error) {
        console.log(`❌ Error reading ${postDir}: ${error.message}`);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   English posts: ${enPosts.length}`);
    console.log(`   Korean posts: ${koPosts.length}`);
  } catch (error) {
    console.error('❌ Error listing posts:', error.message);
  }
}

function extractFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return {};

  const frontmatterText = frontmatterMatch[1];
  const frontmatter = {};

  // Simple YAML parsing for basic fields
  const lines = frontmatterText.split('\n');
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      if (value === 'true') frontmatter[key] = true;
      else if (value === 'false') frontmatter[key] = false;
      else if (!isNaN(value)) frontmatter[key] = Number(value);
      else frontmatter[key] = value.replace(/^["']|["']$/g, '');
    }
  }

  return frontmatter;
}

async function publishPost(postId) {
  const enPostPath = path.join(CONTENT_DIR, 'en', 'posts', postId, 'index.mdx');
  const koPostPath = path.join(CONTENT_DIR, 'ko', 'posts', postId, 'index.mdx');

  try {
    // Update English post
    let enContent = await fs.readFile(enPostPath, 'utf-8');
    enContent = enContent.replace(/draft:\s*true/g, 'draft: false');
    await fs.writeFile(enPostPath, enContent);
    console.log(`✅ Published English post: ${postId}`);

    // Update Korean post if it exists
    try {
      let koContent = await fs.readFile(koPostPath, 'utf-8');
      koContent = koContent.replace(/draft:\s*true/g, 'draft: false');
      await fs.writeFile(koPostPath, koContent);
      console.log(`✅ Published Korean post: ${postId}`);
    } catch (error) {
      console.log(`⚠️  Korean post not found for: ${postId}`);
    }
  } catch (error) {
    console.error(`❌ Error publishing post ${postId}:`, error.message);
  }
}

async function unpublishPost(postId) {
  const enPostPath = path.join(CONTENT_DIR, 'en', 'posts', postId, 'index.mdx');
  const koPostPath = path.join(CONTENT_DIR, 'ko', 'posts', postId, 'index.mdx');

  try {
    // Update English post
    let enContent = await fs.readFile(enPostPath, 'utf-8');
    enContent = enContent.replace(/draft:\s*false/g, 'draft: true');
    await fs.writeFile(enPostPath, enContent);
    console.log(`📝 Unpublished English post: ${postId}`);

    // Update Korean post if it exists
    try {
      let koContent = await fs.readFile(koPostPath, 'utf-8');
      koContent = koContent.replace(/draft:\s*false/g, 'draft: true');
      await fs.writeFile(koPostPath, koContent);
      console.log(`📝 Unpublished Korean post: ${postId}`);
    } catch (error) {
      console.log(`⚠️  Korean post not found for: ${postId}`);
    }
  } catch (error) {
    console.error(`❌ Error unpublishing post ${postId}:`, error.message);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'list':
    case 'ls':
      await listPosts();
      break;

    case 'publish':
      if (!args[1]) {
        console.log('❌ Please provide a post ID to publish');
        console.log('Usage: node scripts/manage-posts.js publish <post-id>');
        return;
      }
      await publishPost(args[1]);
      break;

    case 'unpublish':
      if (!args[1]) {
        console.log('❌ Please provide a post ID to unpublish');
        console.log('Usage: node scripts/manage-posts.js unpublish <post-id>');
        return;
      }
      await unpublishPost(args[1]);
      break;

    default:
      console.log(`
📝 Post Management Tool

Usage: bun run scripts/manage-posts.js <command> [options]

Commands:
  list, ls          List all posts with their status
  publish <id>      Publish a draft post (set draft: false)
  unpublish <id>    Unpublish a post (set draft: true)

Examples:
  bun run scripts/manage-posts.js list
  bun run scripts/manage-posts.js publish post_20250101_my-article
  bun run scripts/manage-posts.js unpublish post_20250101_my-article
`);
  }
}

main();
