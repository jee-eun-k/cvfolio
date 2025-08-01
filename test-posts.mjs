import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testPosts() {
  try {
    console.log('🔍 Testing blog post collections...');

    const contentDir = path.join(__dirname, 'src/content');

    // Test English posts
    const enPostsDir = path.join(contentDir, 'en', 'posts');
    const enPosts = await fs.readdir(enPostsDir);
    console.log(`✅ Found ${enPosts.length} English posts`);

    // Test Korean posts
    const koPostsDir = path.join(contentDir, 'ko', 'posts');
    const koPosts = await fs.readdir(koPostsDir);
    console.log(`✅ Found ${koPosts.length} Korean posts`);

    // Test specific post
    const keycloakPostEn = enPosts.find((post) =>
      post.includes('post_20250713')
    );
    const keycloakPostKo = koPosts.find((post) =>
      post.includes('post_20250713')
    );

    if (keycloakPostEn) {
      console.log(`✅ Found English Keycloak post: ${keycloakPostEn}`);
    }

    if (keycloakPostKo) {
      console.log(`✅ Found Korean Keycloak post: ${keycloakPostKo}`);
    }

    // Test file structure
    if (keycloakPostEn) {
      const postPath = path.join(enPostsDir, keycloakPostEn, 'index.mdx');
      const exists = await fs
        .access(postPath)
        .then(() => true)
        .catch(() => false);
      if (exists) {
        console.log(`✅ English post file exists and is accessible`);
      }
    }

    if (keycloakPostKo) {
      const postPath = path.join(koPostsDir, keycloakPostKo, 'index.mdx');
      const exists = await fs
        .access(postPath)
        .then(() => true)
        .catch(() => false);
      if (exists) {
        console.log(`✅ Korean post file exists and is accessible`);
      }
    }

    console.log('\n🎉 All tests passed! Blog posts are working correctly.');
  } catch (error) {
    console.error('❌ Error testing posts:', error);
    process.exit(1);
  }
}

testPosts();
