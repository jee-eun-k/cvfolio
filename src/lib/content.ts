import { getCollection } from 'astro:content';
import { getCollectionName, type LanguageCode, DEFAULT_LANGUAGE } from './languages';

export const getLocalizedContent = async (
  baseCollection: string,
  language: LanguageCode = DEFAULT_LANGUAGE
) => {
  const collectionName = getCollectionName(baseCollection, language);
  
  try {
    // Try to get content in the requested language
    const content = await getCollection(collectionName as any);
    return content;
  } catch (error) {
    // If content doesn't exist in the requested language, fall back to English
    if (language !== 'en') {
      try {
        const fallbackCollection = getCollectionName(baseCollection, 'en');
        const fallbackContent = await getCollection(fallbackCollection as any);
        return fallbackContent;
      } catch (fallbackError) {
        console.error(`Failed to load content for ${baseCollection} in both ${language} and English:`, fallbackError);
        return [];
      }
    }
    
    console.error(`Failed to load content for ${baseCollection} in ${language}:`, error);
    return [];
  }
};

// Helper functions for specific content types
export const getLocalizedJobs = (language?: LanguageCode) => 
  getLocalizedContent('jobs', language);

export const getLocalizedProjects = (language?: LanguageCode) => 
  getLocalizedContent('projects', language);

export const getLocalizedPosts = (language?: LanguageCode) => 
  getLocalizedContent('posts', language);

export const getLocalizedPages = (language?: LanguageCode) => 
  getLocalizedContent('pages', language);

export const getLocalizedTalks = (language?: LanguageCode) => 
  getLocalizedContent('talks', language);

export const getLocalizedLinks = (language?: LanguageCode) => 
  getLocalizedContent('links', language);