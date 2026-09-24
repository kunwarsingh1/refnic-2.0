import { getSiteConfig } from "@/lib/content/siteConfig";

export const NEWSLETTER_PAGE_KEY = "newsletterPage";

export type NewsletterPageConfig = {
  subscribeImageUrl?: string;
};

export const DEFAULT_NEWSLETTER_PAGE_CONFIG: NewsletterPageConfig = {};

export async function getNewsletterPageConfig(): Promise<NewsletterPageConfig> {
  return getSiteConfig<NewsletterPageConfig>(NEWSLETTER_PAGE_KEY, DEFAULT_NEWSLETTER_PAGE_CONFIG);
}
