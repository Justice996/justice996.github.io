import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'


export default defineUserConfig({
    lang: 'zh-CN',
    title: 'justice的博客',
    description: '这是我的第一个 VuePress 站点',
    theme:defaultTheme({
        repo: 'https://github.com/Justice996',
        editLink:false,
        sidebar: [
            // 侧边栏
            {
                text: '技术',
                children: [
                    // SidebarItem
                    {
                        text: 'javascript',
                        link: '/foo/bar.md',
                        children: [],
                    },
                ],
            },
            {
                text: '生活',
                link: '/foo/',
                children: [
                    // SidebarItem
                    {
                        text: '整活',
                        children: [],
                    },
                    // 字符串 - 页面文件路径
                    // '/foo/bar.md',
                ],
            },  {
                text: '娱乐',
                link: '/foo/',
                children: [
                    // SidebarItem
                    {
                        text: '饥荒',
                    },
                ],
            },
        ],
    })
})
