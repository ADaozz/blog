export const site = {
  name: 'ADaozz',
  brand: 'ADaozz.',
  title: 'ADaozz',
  description: '关于 AI Agent、软件工程与开发工具。记录实践中的问题、设计取舍和未完成的思考。',
  locale: 'zh-CN',
  author: {
    name: 'ADaozz',
    headline: '写代码，做实验，记录为什么。',
    bio: '关于 AI Agent、软件工程与开发工具。记录实践中的问题、设计取舍和未完成的思考。',
    interests: ['AI Agent', '软件工程', '开发工具', '终端工作流'],
    email: '',
    github: 'https://github.com/ADaozz',
  },
} as const;

export const nav = [
  { href: '/writing/', label: 'Writing' },
  { href: '/notes/', label: 'Notes' },
  { href: '/projects/', label: 'Projects' },
  { href: '/about/', label: 'About' },
] as const;
