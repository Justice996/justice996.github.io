import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'


export default defineUserConfig({
    lang: 'zh-CN',
    title: 'justice的博客',
    description: ' ',
    plugins: [
        docsearchPlugin({
            appId:'JP2DLPFM6S',
            apiKey:'dd1f89db01cf75dfb57af6cb7878f9f7',
            indexName:'justice996io',
        }),
    ],
    theme:defaultTheme({
        repo: 'https://github.com/Justice996',
        editLink:false,
        contributors:false,
        backToHome:'返回首页',
        lastUpdatedText:'最后更新时间',
        sidebar: [
            // 侧边栏
            {
                text: '技术',
                link: '/skill/',
                children: [
                    // SidebarItem
                    {
                        text: '前端',
                        link: '/skill/js/js.md',
                        children: [
                            {
                                text: '如何清除前端缓存',
                                link: '/skill/js/clean.md',
                                children: [],
                            },
                            {
                                text: '$forceUpdate详解',
                                link: '/skill/js/forceUpdate.md',
                                children: [],
                            },
                        ],
                    },
                    {
                        text: '企业微信开发',
                        link: '/skill/wecom',
                        children: [
                            {
                                text: '如何配置本地开发环境?',
                                link: '/skill/wecom/configuration.md',

                            },
                        ],
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
    }),

})
