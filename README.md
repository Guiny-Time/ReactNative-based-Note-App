# 基于RN的简单笔记app
这是一个基于react-native开发的功能很贫弱的笔记app。功能只有基本的增删改还没有查。
这个项目完全是面向CSDN、stackOverflow、思否、简书等开发的，在做这个之前只有一点原生React的经验。本项目使用的是**函数式组件**，和原生React的结构差别有点大（一个是class，一个全是函数）

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
在这个界面可以具体的查看某一篇日志，同时可以修改本篇日志的内容并保存，也可以选择删除这篇日志（图片未更新，新版底下有垃圾桶）

<img src="https://raw.githubusercontent.com/Guiny-Time/PictureBed/main/20211225224457.png"/>
<br>

# 鸣谢
- **React Native**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本项目所使用的前端框架，FB基于React开发的专用来开发移动端应用的前端框架。实际上写RN的方式有两种（类编程和函数式编程），本项目采用的是函数式编程。
这也是我第一次接触非面向对象编程，过程让人挺吐血的
- **AsyncStorge**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一个用来实现键值对本地存储的包，很好用，操作也简单易懂
- **React Native Navigetion**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基本功能很完善，想要更多操作需要魔改（我没有改）的导航栏包
