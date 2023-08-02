import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'


export default defineUserConfig({
    lang: 'zh-CN',
    title: 'justice的博客',
    description: '我在感觉良好的状态下进行改变，效果最佳。',
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
        navbar:[
            {
                text: '友情链接',
                link: '/friends.md',
            },
        ],
        notFound: [
            '这里什么都没有',
            '我们怎么到这来了？',
            '这是一个 404 页面',
            '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
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
                                text:'前端面试题',
                                link:'/skill/js/interview.md'
                            },
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
                        text: '微信公众号开发',
                        children: [
                            {
                                text: '扫二维码关注公众号并获取用户-逻辑?',
                                link: '/skill/wechat/basic.md',
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
                    {
                        text: '整了台ipad',
                        link: '/life/ipad.md',
                        children: [],
                    },
                    {
                        text: '杂谈',
                        link: '/life/thinks.md',
                        children: [],
                    },
                    {
                        text: '寻找',
                        link: '/life/seek.md',
                    },
                    // 字符串 - 页面文件路径
                    // '/foo/bar.md',
                ],
            },
            {
                text:'学英语',
                link: '/english/',
            },
            {
                text:'阅读',
                link: '/read/',
                children: [
                    {
                        text: '<<世界尽头的咖啡馆>>',
                        link: '/read/TheCafeattheEndoftheWorld.md',
                    },
                    {
                        text: '<<生活的艺术家>>',
                        link: '/read/artistsOfLife.md',
                    },
                    {
                        text: '<<计算机是怎样跑起来的>>',
                        link: '/read/howComputersWork.md',
                    }
                ]
            },
            {
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
