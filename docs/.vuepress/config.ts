import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'


export default defineUserConfig({
    lang: 'zh-CN',
    title: 'justice的博客',
    description: ' ',
    theme:defaultTheme({
        repo: 'https://github.com/Justice996',
        editLink:false,
        sidebar: [
            // 侧边栏
            {
                text: '技术',
                link: '/skill/',
                children: [
                    // SidebarItem
                    {
                        text: 'javascript',
                        link: '/skill/js/js.md',
                        children: [],
                    },
                    {
                        text: 'php',
                        link: '/skill/php/',
                        children: [
                            {
                                text: '关联表 一对多',
                                link: '/skill/php/search.md',
                                children: [],
                            },
                            {
                                text: 'tp',
                                link: '/skill/php/tp.md',
                                children: [],
                            },
                            {
                                text: 'php基础',
                                link: '/skill/php/basic.md',
                                children: [],
                            },
                        ],
                    },
                    {
                        text: '运维',
                        children: [
                            {
                                text: '宝塔面板',
                                link: '/skill/DevOps/btUse.md',
                            },
                        ],
                    },
                    {
                        text: 'git',
                        children: [
                            {
                                text: 'git基本使用',
                                link: '/skill/git/gitBasic.md',
                                children: [],
                            },
                        ],
                    },
                    {
                        text: '如何清除前端缓存',
                        link: '/skill/js/clean.md',
                        children: [],
                    },
                ],
            },
            {
                text: '生活',
                children: [
                    // SidebarItem
                    {
                        text: '整活',
                        link: '/life/',
                        children: [],
                    },
                    // 字符串 - 页面文件路径
                    // '/foo/bar.md',
                ],
            },  {
                text: '娱乐',
                children: [
                    // SidebarItem
                    {
                        text: '饥荒',
                        link: '/game/dontStrave.md',
                    },
                    {
                        text: '怀旧游戏机',
                        link: 'http://yx.1dly.cn/',
                    },
                ],
            },
        ],
    })
})
