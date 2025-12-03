import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
    const blog = await getCollection('blog');
    return rss({
        title: 'The Blog',
        description: 'Anirudh Aswal\'s blog',
        site: context.site,
        items: blog.map((post) => ({
            link: `/blog/${post.id}/`,
            // Note: this will not process components or JSX expressions in MDX files.
            content: sanitizeHtml(parser.render(post.body), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
            }),
            ...post.data,
        })),
    });
}