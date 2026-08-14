// 全站的公共配置都放在这里，任何页面都可以 import 使用。
// 想改站点名字、简介、页脚署名，只改这一个文件即可。

export const SITE_TITLE = 'Vincent 的日常';
export const SITE_DESCRIPTION = '记录 Vincent 的日常，一周一点点。';

// 页脚显示的署名
export const AUTHOR = 'Vincent';

// 分类：周记为主，另有笔记与随手记。想增删就改这里。
// key 用于文章 frontmatter 里的 category 字段，label 是页面上显示的中文名。
export const CATEGORIES = [
	{ key: 'weekly', label: '周记' },
	{ key: 'notes', label: '笔记' },
	{ key: 'quick', label: '随手记' },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]['key'];

// 根据 key 拿到中文标签；找不到就原样返回。
export function categoryLabel(key: string): string {
	return CATEGORIES.find((c) => c.key === key)?.label ?? key;
}
