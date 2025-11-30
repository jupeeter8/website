// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/blog" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      week: z.string(),
      pubDate: z.date(),
      draft: z.boolean().default(false),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = { blog };