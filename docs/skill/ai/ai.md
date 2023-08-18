# **AI代码编程工具调研**
1. # 背景
随着人工智能技术的飞速发展，AI代码生成器逐渐在软件开发领域中崭露头角。这些工具通过自动分析和学习大量代码库，并使用机器学习技术来生成新的代码。AI代码生成器开始作为辅助工具，帮助程序员完成一些基本的编码任务，如代码补全和错误检查。随着技术的进步，它们逐渐涉足更加复杂的编程工作，如自动生成代码和优化算法等。
1. # 工具介绍
本次在众多的插件中选择了copilot、codeium、codewhisperer和bito来介绍与对比。

GitHub Copilot是一款由GitHub和OpenAI联合开发的人工智能编程工具，它使用机器学习技术从代码库中学习并为用户生成代码建议。Copilot可以极大地提高编写代码的效率，让开发者更专注于业务逻辑实现，减少了一些繁琐的编码工作。

Codeium是一款免费的人工智能代码加速工具，它可以为开发者提供智能的代码完成、聊天和搜索功能，支持70多种编程语言，集成于40多种编辑器，具有闪电般的速度和最先进的建议质量。Codeium可以帮助开发者提高编程效率和质量，减少重复和繁琐的工作，轻松实现自己的想法。

Amazon CodeWhisperer是亚马逊出品的一款基于机器学习的AI编程助手，可实时提供代码建议。现在已正式可用，面向个人提供免费服务，通过在各种流行的IDE里集成CodeWhisperer（插件名称aws toolkit），在编写代码时，它会自动根据您现有的代码和注释生成建议。CodeWhisperer 还可以扫描您的代码以突出显示安全问题。

Bito是一款在IntelliJ IDEA编辑器中的插件，Bito插件是由ChatGPT团队开发的，它是ChatGPT团队为了提高开发效率而开发的一款工具。ChatGPT团队是一支专注于自然语言处理技术的团队，他们开发了一款基于GPT的自然语言处理模型，可以用于生成自然语言文本。Bito插件的强大之处在于它可以帮助开发人员更快地提交代码，同时还提供了一些有用的功能，如自动补全提交信息、快速查看历史记录等。

以下是几种插件的对比


||**代码生成**|**测试用例生成**|**注释生成**|**代码安全扫描**|**GPT生成**|**收费**|
| :- | :-: | :-: | :-: | :-: | :-: | :-: |
|codeium|√|√|√|×|Vscode插件支持|免费|
|copilot|√|√|√|×|×|10$/月|
|codewhisper（推荐）|√|√|√|√|×|免费|
|bito（推荐）|√|√|√|√|√|免费|

1. # 功能演示
本文以copilot插件为例介绍下基本功能

3\.1插件安装步骤

3\.1.1 Idea安装

双击shift，输入plugins，打开插件应用市场，搜索copilot并安装，安装之后右下角点击login to GitHub,需要登陆github授权登陆，首次可以试用30天。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.001.png)

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.002.png)由于idea版本的插件暂不支持chat功能，可以下载一个bito插件替代，见下图。


3\.2 功能介绍（copilot+bito）

本文以copilot插件在idea中做一下功能演示，copilot插件在idea中没有聊天与搜索功能，可以使用bito插件替代。

3\.2.1 自动代码补全-copilot

场景一 算法类实现	

当我们的业务场景需要用到某个算法时，copilot可以直接根据中文注释生成符合当前文件语言的整体算法代码。例如，某个业务场景需要实现排序算法，我们创建一个SortService类，然后直接在类中输入注释“冒泡排序”，copilot会根据注释自动生成整体代码，见下图，此时按下tab键可以自动在编辑器中插入代码，如果对代码不满意可以按下alt+] 选择其他的提示。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.003.png)场景二：业务代码开发

在业务代码开发场景中，copilot会根据当前项目的上下文或者注释生成你需要的代码。下面以一个spring boot + mybatisplus 的后台框架简单的演示下copilot的代码补全功能。先创建一个订单和商品数据模型类，然后分别创建下dao层，service层和controller层，目录结构如下图

![0f26c5c1fb5a7e2f9da4c6eb248ef66](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.004.png "0f26c5c1fb5a7e2f9da4c6eb248ef66")![16d629c5d130e8897988dee16a463a8](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.005.png "16d629c5d130e8897988dee16a463a8")
下面在GoodService演示下根据注释生成业务代码的功能，如下图所示，copilot可以根据中文自动翻译成业务代码。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.006.png)
这些都是最基础的curd功能，当然copilot也可以根据你的描述生成一段复杂的代码，比如输入一段注释“根据商品名称，商品类型分页查询商品列表，使用ListResultVo返回,使用LambdaQueryWrapper查询构造器”，这里我们指定了接口的返回对象和查询使用的构造器，copilot会自动生成如下图所示的代码。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.007.png)Copilot也可以根据你输入的方法名帮你自己生成代码，比如我想实现一个根据商品名称和创建时间分页查询商品列表的方法，只需要输入方法的签名，可以看到copilot可以自动从你的方法名、参数以及返回对象生成代码，我们只需要按下tab键就可以把提示的代码插入到idea中。

同时，copilot还可以学习用户的代码风格。例如，我们让copilot新增一个商品新增接口，并创建一个GoodsVo对象。这个接口主要功能是将前台传过来的
GoodsVo对象赋值给Goods对象并插入创建时间。然后再让copilot创建一个更新接口，可以看到copilot并没有使用我们常用的beansUtils工具复制对象。

![fed9d89041a30222921a624ccd1019f](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.008.png "fed9d89041a30222921a624ccd1019f")

我们修改一下代码，将重复的set方法改为beasUtils工具类复制，然后在新增一个更新接口，可以看到这次copilot创建的更新接口使用beasUtils工具类中的方法赋值了。

![4772026a0935978a74a3c60a3c23cda](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.009.png "4772026a0935978a74a3c60a3c23cda")
3\.2.2 测试用例生成-copilot

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.010.png)Copilot可以自动生成测试用例代码，我们创建一个GoodsServiceTest类。只需要在类中输入@Test，copilot就会自动帮我们生成GoodsService这个类中所有方法的基础测试用例，如下图所示。


3\.2.3 注释自动生成-bito

通过copilot生成的代码可以使用bito插件实现注释自动生成，我们选中刚刚copilot生成的queryGoodsListByNameAndCreateTime方法，然后在bito插件中点击Generate Comment按钮，bito就会将生成的好的注释代码返回给我们，具体操作见如下图。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.011.png)
完成之后的代码见下图，可以看到bito自动帮我们生成了代码注释。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.012.png)

3\.2.4 代码安全检查-bito

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.013.png)bito可以对选中的代码进行安全检查，扫描出哪些代码有隐藏的安全隐患。

3\.2.5 代码翻译-bito

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.014.png)  bito插件还可以对选中的代码解读，方便开发者阅读代码。

3\.2.6 代码生成-bito

`    `bito插件可以通过对话的形式帮助开发者生成完整的代码。例如，我们输入用java创建一个冒泡排序，bito就会返回一段java创建的冒泡排序的方法。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.015.png)




1. # 推荐
推荐使用codewhisper+bito。这两个插件不用翻墙，并且免费。Copilot可以去淘宝购买一个学生特权30元， 可以使用2年。

【金山文档】 Codewhisperer使用手册

<https://kdocs.cn/l/ccvU5C1a2Uqe>

【金山文档】 BITO使用手册

<https://kdocs.cn/l/cpUpcoZ9QIbQ>



1. # 使用反馈
目前只在小范围推广使用，以下是ai工具使用效果的反馈。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.016.png)

下图是ai工具功能使用率的柱状图。


![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.017.png)



`    `生成测试用例功能由于开发中没有写test类的习惯，所以使用的人较少。

代码安全是开发经理或者项目经理比较关注的地方，相对其他功能使用率较少。其他功能，例如代码补全、chatgpt、注释生成等，则普遍使用率相对较高。对于开发效率的提升大概在5%-10%。


1. # 使用场景
1) ### **修改原有业务代码**
在日常开发中，可能会遇到需要修改原业务代码的情况。

例如：商城项目的日常需求“在商城系统添加合肥多玩商户订单查询功能（同欧飞美团外卖），并根据订单类型校验同步订单号不可重复”。根据这个需求我们分析出只需要根据订单类型和订单号校验一下订单是否存在就可以了。把代码选中插入到BITO中并把OfOrderBean 作为上下文插入，输入“帮我校验一下订单号是否存在，根据订单号和订单类型校验，OfOrderBean 参考以下类（代码省略） ”，BITO的回答如下图。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.018.png)

把代码插入到实现类中，把逻辑加上就实现了需求。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.019.png)
1) ### **编写类似的业务代码**
`  `Copilot可以帮我们快捷生成类似的方法，例如营销中心的接口服务中有一个按月校验中奖上限的方法checkBingoLimitForMonth。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.020.png)

现在我们要加一个按年校验中奖上限的方法，只需要输入checkBingoLimitForYear copilot就会帮我们生成完整的方法，如下图。 

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.021.png)

1) ### **新业务开发**
创建新代码可以使用代码补全工具也可以使用BITO。copilot支持把需求写在注释上自动翻译成带代码，节省了写代码的时间，使开发人员更专注于业务，它的优势在于可以基于你的项目上下文来生成代码，保证了代码生成的成功率和准确性。BITO可以在对话框中描述你的需求并上传上下文生成你所需的代码，代码生成的质量取决于描述的准确性，在使用的时候可以参考以下这个流程图。

![chatgpt-新代码使用 (1)](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.022.png "chatgpt-新代码使用 (1)")

BITO案例：基于spring boot + mybatisplus框架的项目，实现一个活动管理模块。新增一个Activity实体类，ActivityVo前端展示类, ActivityMapper和LisetResultVo前端展示类。

打开BITO对话框

1、输入 “帮我实现一个需求，以下是涉及到的类 ，项目的框架基于springboot+mybatisplus”然后把新增的类的代码添加进去，作为上下文。

2、输入“帮我在ActivityService中添加增删改查的方法，注意 activity的时间属性设置”这样就能得到一个完整的实现类，具体见演示。

3、输入“getAllActivities  给这个方法加个分页入参，还有活动时间，活动名称，活动状态”

最终BITO输出了一个完整的带有增删改查的类，点击复制然后粘贴到IDEA里面，具体见下图。我们还可以让它基于这个service生成controller以及test类。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.023.png)

Copilot案例：上面的service为例，我们需要新建一个校验当前日期是否在活动有效期的方法，可以直接写在注释上，copilot可以自动帮我们补全代码，见下图。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.024.png)

1) ### **前端页面开发**
BITO可以帮我们根据需求生成前端页面。例如选中后台代码的某一个controller，输入“根据这个controller创建一个HTML页面”，BITO就会根据你的接口创建一个简单的HTML页面。

案例：我们通过BITO新增一个员工模块的增删改查代码，然后在BITO对话框中输入“基于这个controller生成一个前端的HTML页面”并附上controller的代码，接下来BITO就会返回一个HTML，如下图所示。

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.025.png)

如果需要美化一下，可以把前端代码输入到BITO对话框中并输入你的样式要求，例如“帮我优化一下样式，使用element ui”，然后BITO会返回给我们加上了element ui 组件样式的代码，如下图所示。BITO通过我们的描述生成了基础的前端页面，后续可以在这个基础上继续调整。 

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.026.png)


1) ### **自动化测试用例生成**
BITO同样也可以输出测试用例脚本，例如在BITO中输入基于上面的controller生成python测试脚本。BITO返回结果如下：

![](Aspose.Words.128e7452-0f07-49ff-971c-0faf8b5be55d.027.png)
