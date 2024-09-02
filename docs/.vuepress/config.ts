// @ts-ignore
import { defineUserConfig } from 'vuepress'
// @ts-ignore
import { defaultTheme } from 'vuepress'
// @ts-ignore
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { commentPlugin } from "vuepress-plugin-comment2";

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'Justice的博客',
    description: '我在感觉良好的状态下进行改变，效果最佳。',
    head: [[
        'link', { rel: 'icon', href: '/images/favicon.ico' }
    ]],
    plugins: [
        docsearchPlugin({
            appId: 'JP2DLPFM6S',
            apiKey: '8ff7660a6e94d8542475bf886be9bc39',
            indexName: 'justice996io',
        }),
        commentPlugin({
            // 插件选项
            provider: "Giscus",
        }),
    ],
    theme: defaultTheme({
        repo: 'https://github.com/Justice996',
        editLink: false,
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
                collapsible: true,
                children: [
                    // SidebarItem
                    {
                        text: '数据结构和算法',
                        link: '/skill/DataStructureAndalgorithm/README.md',
                        children: [
                            {
                                text: '开始',
                                link: '/skill/DataStructureAndalgorithm/start.md',
                                children: [],
                            },
                            {
                                text: '队列',
                                link: '/skill/DataStructureAndalgorithm/queue.md',
                            },
                            {
                                text: '双端队列',
                                link: '/skill/DataStructureAndalgorithm/deque.md',
                            },
                            {
                                text: '循环队列',
                                link: '/skill/DataStructureAndalgorithm/loopQueue.md',
                            },
                            {
                                text: '链表',
                                link: '/skill/linkedList/linkedList.md',
                            },
                            {
                                text: '双向链表',
                                link: '/skill/linkedList/DoublyLinkedList.md',
                            },
                            {
                                text: '循环链表',
                                link: '/skill/linkedList/CircularLinkedList.md',
                            },
                            {
                                text: '有序链表',
                                link: '/skill/linkedList/SortedLinkedList.md',
                            },
                            {
                                text: '集合',
                                link: '/skill/set/set.md',
                            },
                            {
                                text: '字典',
                                link: '/skill/dictionaryAndHashTable/dictionary.md',
                            },
                            {
                                text: '散列表',
                                link: '/skill/dictionaryAndHashTable/hashTable.md',
                            },
                            {
                                text: '递归',
                                link: '/skill/recursive/recursive.md',
                            },
                            {
                                text: '树',
                                link: '/skill/tree/tree.md',
                            },
                            {
                                text: '二叉堆',
                                link: '/skill/binaryHeap/binaryHeap.md',
                            },
                            {
                                text: '图',
                                link: '/skill/Graph/graph.md',
                            }
                        ],
                    },
                    {
                        text: '前端',
                        link: '/skill/js/js.md',
                        children: [
                            {
                                text: '前端面试题',
                                link: '/skill/js/interview.md'
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
                            {
                                text: 'js中的forEach可以改变原数组吗？',
                                link: '/skill/js/aboutForEach.md',
                                children: [],
                            },
                            {
                                text: 'Vue变量中以$或者_开头的变量无法访问',
                                link: '/skill/js/vueabout$.md',
                                children: [],
                            },
                            {
                                text: '浏览器工作原理',
                                link: '/skill/js/howBrowsersWork.md',
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
                            {
                                text: 'git配置代理',
                                link: '/skill/git/gitUsePorxy.md',
                                children: [],
                            }
                        ],
                    },
                ],
            },
            {
              text:'windows相关',
              collapsible: true,
              children: [
                  {
                      text:'Windows自带工具本地验证文件md5，sha256值',
                      link:'/windows/checkFIleIntegrity.md'
                  },
              ]
            },
            {
                text:'系统架构',
                collapsible: true,
                children: [
                    {
                        text:'占坑',
                        link:'/systemStructure/init.md'
                    },
                ]
            },
            {
                text: '网络安全',
                collapsible: true,
                children: [
                    {
                        text: '红队',
                        collapsible: true,
                        children: [
                            {
                                text: '红队威胁情报',
                                link: '/cyberSecurity/redTeam/RedTeamThreatIntel.md',
                            }
                        ]
                    },
                    {
                        text: '进攻性安全简介',
                        link: '/cyberSecurity/whatIsOffensiveSecurity.md',
                    },
                    {
                        text: '操作系统安全',
                        link: '/cyberSecurity/operatingSystemSecurity.md',
                    },
                    {
                        text: 'Linux 基础知识第1部分',
                        link: '/cyberSecurity/LinuxFundamentalsPart1.md',
                    },
                    {
                        text: 'Linux 基础知识第2部分',
                        link: '/cyberSecurity/LinuxFundamentalsPart2.md',
                    },
                    {
                        text: 'Burp Suite 基本使用',
                        link: '/cyberSecurity/BurpSuite.md',
                    },
                    {
                        text: 'Nmap 基本使用',
                        link: '/cyberSecurity/Nmap.md',
                    },
                    {
                        text: 'netCat基本使用',
                        link: '/cyberSecurity/netCat.md',
                    },
                    {
                        text: 'Hydra基本使用',
                        link: '/cyberSecurity/Hydra.md',
                    },
                    {
                        text: '被动侦察',
                        link: '/cyberSecurity/PassiveReconnaissance.md',
                    },
                    {
                        text: '协议和服务器',
                        link: '/cyberSecurity/ProtocolsAndServers.md',
                    },
                    {
                        text: 'Metasploit基本使用',
                        link: '/cyberSecurity/Metasploit.md',
                    },
                    {
                        text: 'webshell使用',
                        link: '/cyberSecurity/webShell.md',
                    },
                    {
                        text: '如何研究问题?(Example Research Question)',
                        link: '/cyberSecurity/exampleResearchQuestion.md',
                    },
                ]
            },
            {
                text: '生活',
                collapsible: true,
                children: [
                    // SidebarItem
                    {
                        text: '自言自语',
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
                    {
                        text: '25岁生日',
                        link: '/life/birthday25.md',
                    },
                    {
                        text: '投喂流浪猫',
                        link: '/life/strayCat.md',
                    },
                    {
                        text: '第二次投喂流浪猫',
                        link: '/life/strayCat2.md',
                    },
                    {
                        text: '第三次投喂流浪猫',
                        link: '/life/strayCat3.md',
                    },
                    {
                        text: '第四次投喂流浪猫',
                        link: '/life/strayCat4.md',
                    },
                    {
                        text: '流浪猫变家猫',
                        link: '/life/strayCatIshomeCat.md',
                    },
                    {
                        text: '小橘拉屎在猫砂盆外面',
                        link: '/life/catpoop.md',
                    },
                    {
                        text: '2024520',
                        link: '/life/LoveDay.md',
                    },
                    {
                        text: '0522随笔',
                        link: '/life/Journal0522.md',
                    },
                    {
                        text: '如何提高创造力?',
                        link: '/life/HowToImproveCreativity.md',
                    },
                    {
                        text: '关于我',
                        link: '/life/aboutMe.md',
                    },
                    {
                        text: '如果失业了，我能做什么？',
                        link: '/life/unemployment.md',
                    },
                    {
                        text: '关于自己面对新知识/技能的一些思考',
                        link: '/life/thinkMyself.md',
                    },

                    // 字符串 - 页面文件路径
                    // '/foo/bar.md',
                ],
            },
            {
                text: '学英语',
                collapsible: true,
                children: [
                    {
                        text: '如何记单词',
                        link: '/english/howToRememberTheWords.md',
                    },
                    {
                        text: '单词表1',
                        link: '/english/list1.md',
                    },
                    {
                        text: '单词表2',
                        link: '/english/list2.md',
                    }
                ]
            },
            {
                text: '阅读',
                collapsible: true,
                children: [
                    {
                        text: '<<硅谷钢铁侠：埃隆·马斯克的冒险人生>>',
                        link: '/read/ElonReeveMuskBiography.md',
                    },
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
                    },
                    {
                        text: '<<傅雷家书>>节选',
                        link: '/read/FuLeisletter.md',
                    },
                    {
                        text: '<<少有人走的路>>节选',
                        link: '/read/theRoadLessTraveled.md',
                    },

                ]
            },
            {
                text: '娱乐',
                collapsible: true,
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
            {
                text: '树莓派', collapsible: true, children: [
                    {
                        text: '树莓派控制二极管灯泡',
                        link: '/raspberry/diode.md',
                    },
                    {
                        text: '树莓派4B安装nodejs',
                        link: '/raspberry/installNodeJs.md',
                    },
                ]
            },
            {
                text: '厨艺入门', collapsible: true, children: [
                    {
                        text: '如何选择材料?',
                        link: '/cookingSkills/basic.md',
                    },
                    {
                        text: '已经做过的菜',
                        link: '/cookingSkills/menu.md',
                    },
                ]
            }
        ],
    }),

})
