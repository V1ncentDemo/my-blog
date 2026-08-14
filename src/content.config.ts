import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// 加载 `src/content/blog/` 目录下的 Markdown / MDX 文件。
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// 校验每篇文章开头的 frontmatter 字段
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// 把字符串日期转成 Date 对象
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// 分类：diary（日记）/ notes（笔记）/ quick（随手记），不写默认随手记
			category: z.enum(['diary', 'notes', 'quick']).default('quick'),
		}),
});

export const collections = { blog };
