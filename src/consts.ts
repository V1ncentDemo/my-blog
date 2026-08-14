// 全站的公共配置都放在这里，任何页面都可以 import 使用。
// 想改站点名字、简介、页脚署名，只改这一个文件即可。

export const SITE_TITLE = '我的记录';
export const SITE_DESCRIPTION = '想把日子一点一点记下来。';

// 页脚显示的署名（换成你自己的名字）
export const AUTHOR = '你的名字';

// 分类：混合记录用这三类即可，想增删就改这里。
// key 用于文章 frontmatter 里的 category 字段，label 是页面上显示的中文名。
export const CATEGORIES = [
	{ key: 'diary', label: '日记' },
	{ key: 'notes', label: '笔记' },
	{ key: 'quick', label: '随手记' },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]['key'];

// 根据 key 拿到中文标签；找不到就原样返回。
export function categoryLabel(key: string): string {
	return CATEGORIES.find((c) => c.key === key)?.label ?? key;
}
