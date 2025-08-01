import { defineCollection, type ImageFunction } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

export const seoSchemaWithoutImage = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string().optional(),
  keywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
  twitter: z
    .object({
      creator: z.string().optional(),
    })
    .optional(),
  robots: z.string().optional(),
});

const seoSchema = (image: ImageFunction) =>
  z
    .object({
      image: image().optional(),
    })
    .merge(seoSchemaWithoutImage);

// English collections
const pageCollectionEn = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/en/pages',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      seo: seoSchema(image),
    }),
});

const linkCollectionEn = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: './src/content/en/links' }),
  schema: z.object({
    label: z.string(),
    name: z.string(),
    url: z.string(),
  }),
});

const jobCollectionEn = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/en/jobs' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    from: z.number(),
    to: z.number().or(z.enum(['Now'])),
    url: z.string(),
  }),
});

const talkCollectionEn = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/en/talks',
  }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    event: z.string(),
    location: z.string(),
    url: z.string(),
  }),
});

const postCollectionEn = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/en/posts',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
      draft: z.boolean().optional().default(false),
      image: image().optional(),
      seo: z
        .object({
          title: z.string(),
          description: z.string(),
          tag: z.string(),
          type: z.string(),
          keywords: z
            .union([z.string(), z.array(z.string())])
            .transform((val) => (Array.isArray(val) ? val.join(' ') : val)),
        })
        .optional(),
    }),
});

const projectCollectionEn = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/en/projects',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image().optional(),
      url: z.string(),
      tech: z.array(z.string()).optional(),
      draft: z.boolean().optional().default(false),
    }),
});

// Korean collections
const pageCollectionKo = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/ko/pages',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      seo: seoSchema(image),
    }),
});

const linkCollectionKo = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: './src/content/ko/links' }),
  schema: z.object({
    label: z.string(),
    name: z.string(),
    url: z.string(),
  }),
});

const jobCollectionKo = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/ko/jobs' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    from: z.number(),
    to: z.number().or(z.enum(['Now'])),
    url: z.string(),
  }),
});

const talkCollectionKo = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/ko/talks',
  }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    event: z.string(),
    location: z.string(),
    url: z.string(),
  }),
});

const postCollectionKo = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/ko/posts',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
      draft: z.boolean().optional().default(false),
      image: image().optional(),
      seo: z
        .object({
          title: z.string(),
          description: z.string(),
          tag: z.string(),
          type: z.string(),
          keywords: z
            .union([z.string(), z.array(z.string())])
            .transform((val) => (Array.isArray(val) ? val.join(' ') : val)),
        })
        .optional(),
    }),
});

const projectCollectionKo = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/ko/projects',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image().optional(),
      url: z.string(),
      tech: z.array(z.string()).optional(),
      draft: z.boolean().optional().default(false),
    }),
});

export const collections = {
  // English collections
  'pages-en': pageCollectionEn,
  'links-en': linkCollectionEn,
  'jobs-en': jobCollectionEn,
  'talks-en': talkCollectionEn,
  'posts-en': postCollectionEn,
  'projects-en': projectCollectionEn,

  // Korean collections
  'pages-ko': pageCollectionKo,
  'links-ko': linkCollectionKo,
  'jobs-ko': jobCollectionKo,
  'talks-ko': talkCollectionKo,
  'posts-ko': postCollectionKo,
  'projects-ko': projectCollectionKo,
};
