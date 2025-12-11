import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";

import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
    const renderers = await loadRenderers([getMDXRenderer()]);
    const container = await AstroContainer.create({ renderers });
    const blogs = await getCollection('blog');
    const items = [];
    for (const blog of blogs) {
        const { Content } = await render(blog);
        const content = await container.renderToString(Content);
        const blogbody = sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        })
        const link = `/blog/${blog.id}`
        items.push({ ...blog.data, link, content:blogbody });
    }
    return rss({
        title: 'The Blog',
        description: 'Anirudh Aswal\'s blog',
        site: context.site,
        items,
    });
}