# 为什么会有这个
这是一个基于react-native开发的功能很贫弱的笔记app，来自非常操蛋的一人carry整个项目的该死的课程小组作业（课程：移动应用开发）
<br>
真的离谱，三个组员直接摆烂说不会开发想从网上找一个来，然后找了个web应用给我，还不是RN是React原生的
<br>
然后我说我来做吧，又开始画大饼，要这个功能那个功能，什么添加图片，什么富文本，什么标签收藏夹，大家都是零基础就指望抱我大腿做一个绝世无敌上市就暴揍其他笔记app的终极闪光爆好用的笔记app是吧？？我不会，草，饼画这么大又什么都不干，nt（非常恼
<br>
于是我打算把骨架做完，其他什么功能都之后再说。这个项目完全是面向CSDN、stackOverflow、思否、简书等开发的，在做这个之前只有一点原生React的经验。实际上本项目使用的是**函数式组件**，和原生React的结构差别有点大，教程也是有的函数式有的正常的类组件，整的天花乱坠的
<br>
几番周折终于是快搞完了。本项目想拿走参考学习请随意，拿的话请和我一起骂一句**小组作业是sb**

# 使用到的技术
- **React Native**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长得和React差不多，专用来开发移动端应用的前端框架。实际上写RN的方式有两种，本项目采用的是函数式编程
- **AsyncStorge**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;键值对本地存储，很好用
- **React Native Navigetion**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基本功能很完善，想要更多操作需要魔改（我没有改）的导航栏

# 已完成功能
## 记录日志
你可以在这个界面键入日志的标题和文本。系统会标注最后修改时间。如果没有输入标题或者内容会被打回来

<img src="https://raw.githubusercontent.com/Guiny-Time/PictureBed/main/20211225224717.png"/><img src="https://raw.githubusercontent.com/Guiny-Time/PictureBed/main/20211225224640.png"/>
<br>

## 查看日志列表
在这个界面可以查看已经发布的日志。每次发布完需要手动上滑刷新获取更新

<img src="https://raw.githubusercontent.com/Guiny-Time/PictureBed/main/20211225224538.png"/>
<br>

## 修改日志
在这个界面可以具体的查看某一篇日志，同时可以修改本篇日志的内容并保存

<img src="https://raw.githubusercontent.com/Guiny-Time/PictureBed/main/20211225224457.png"/>
<br>

