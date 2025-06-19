// @ts-ignore
import { defineUserConfig } from 'vuepress'
// @ts-ignore
import { hopeTheme } from "vuepress-theme-hope";
import { getDirname, path } from "vuepress/utils";
// @ts-ignore
import { viteBundler } from '@vuepress/bundler-vite'
// import { defineUserConfig } from 'vuepress'
const __dirname = getDirname(import.meta.url);
import { sidebar } from './sidebar'


export default defineUserConfig({
    lang: 'zh-CN',
    title: 'Justice的博客',
    description: '我在感觉良好的状态下进行改变，效果最佳。',
    head: [[
        'link', { rel: 'icon', href: '/images/favicon.ico' }
    ]],
    bundler: viteBundler({
        viteOptions: {},
        vuePluginOptions: {},
      }),
    theme: hopeTheme({
        hostname: 'https://github.com/Justice996',
        // 全局禁用编辑链接
        editLink: false,
        // 确保导航栏显示
        navbar: [
            {
                text: '友情链接',
                link: '/friends.md',
            },
            {
                text: '贪吃蛇',
                link: '/snake.md',
            },
            {
                text: '今天吃什么',
                link: '/howtoeat.md',
            },
        ],
        // 明确设置导航栏显示
        navbarLayout: {
            start: ["Brand"],
            center: ["Links"],
            end: ["Search", "Outlook", "Repo"],
        },
        sidebar: sidebar,
        markdown: {
            component: true,
          },     
        plugins: {
            blog: {
                excerptLength: 0,
              },
            comment: {
              // 选择一个评论服务
              provider: "Giscus",
              repo: "Justice996/justice996.github.io",
              repoId: "R_kgDOJ1ivvQ",
              category: "Announcements",
              categoryId: "DIC_kwDOJ1ivvc4CZHRk",
            },
            docsearch:{
                appId: 'JP2DLPFM6S',
                apiKey: '8ff7660a6e94d8542475bf886be9bc39',
                indexName: 'justice996io',
            }
          },
    }),

})
