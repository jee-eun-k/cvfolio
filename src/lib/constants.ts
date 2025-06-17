import type { z } from 'astro/zod';
import MetaDefaultImage from '@/assets/images/meta-default.jpg';
import avatar from '@/assets/images/avatar.jpg';
import type { seoSchemaWithoutImage } from '@/content.config';
import astroConfig from 'astro.config.mjs';

export type AuthorInfo = {
  name: string;
  avatar: any;
  headline: string;
  username?: string;
  location?: string;
  pronouns?: string;
}

export type Seo = z.infer<typeof seoSchemaWithoutImage> & {
  image?: any;
}

type DefaultConfigurationType = {
  baseUrl: string,
  author: AuthorInfo;
  seo: Seo;
}

export const DEFAULT_CONFIGURATION: DefaultConfigurationType = {
  baseUrl: astroConfig.site || 'https://getcvfolio.com',
  author: {
    avatar,
    name: 'Jee-eun Kang',
    headline: 'FE Engineer',
    username: 'jee-eun-k',
    location: 'Seoul',
    pronouns: 'She/Her',
  },
  seo: {
    title: 'Portfolio of Jee-eun Kang, Frontend Engineer',
    description: 'Hi, I am Jee-eun Kang, a frontend engineer passionate about interface design and web experiences.',
    type: 'website',
    image: MetaDefaultImage,
    robots: 'noindex, nofollow',
  }
};