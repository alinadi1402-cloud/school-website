import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.farzanegan-khaf.ir'
  
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: baseUrl + '/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/news', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: baseUrl + '/gallery', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: baseUrl + '/teachers', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/achievements', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/faq', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/rules', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/admission', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: baseUrl + '/programs', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: baseUrl + '/testimonials', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: baseUrl + '/register', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: baseUrl + '/login', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]
}