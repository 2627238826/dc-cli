# dc-cli

一个简易上手的前端脚手架。

## 目前已有的模板：
```
H5模板：[vue-h5](http://192.168.3.200/web/vue-based-h5-template)
PC模板：[vue-pc](http://192.168.3.200/web/vue-based-pc-template)
小程序模板：[uni-app](http://192.168.3.200/web/vue-based-applet-template)
桌面端模板：[electron](http://192.168.3.200/web/vue-based-electron-template)
pc业务组件模板：[component-pc](http://192.168.3.200/web/vue-based-business-component-pc)
h5业务组件模板：[component-h5](http://192.168.3.200/web/vue-based-business-component-pc)
nest+mongo模板：[nest-mongo](http://192.168.3.200/web/nest-base-mongo)
nest+mysql模板：[nest-mysql](http://192.168.3.200/web/nest-base-mysql)
```
## Installation & Quick start

### 安装

先切回到公司内部npm源。

Windows系统安装
```
$ npm install dc-cli -g
```

Mac下安装
```
$ sudo npm install dc-cli -g
```

### 查看帮助信息

```
$ dc
```

### 创建项目

```
# 指定项目名字创建项目
$ dc create 模板名<template-name> 项目名字<project-name>

# 在当前目录创建项目（!!!注意模板名后面加.）
$ dc create 模板名<template-name> .
```

### 查看所有支持的项目模板

```
$ dc list
```

### 添加项目模板

```
$ dc add 模板名<template-name> 模板仓库地址只需要写内网的模板包名字<template-repo-name>
```

### 删除项目模板

```
$ dc delete 模板名<template-name>
```

### 发布版本并且生成CHANGELOG

执行pkg下的脚本
```
npm run release
```
然后执行

```
npm publish
```

### 自动加载基于Vue.js项目的code lint配置文件以及依赖

更新dcWebpack为最新版本（旧工程）
-安装脚手架dc-cli

```
# Windows系统安装
npm install dc-cli -g

# Mac下安装
$ sudo npm install dc-cli -g
```

在你的项目根目录下执行
```
$ dc vue-lint
```
执行成功后, 执行npm install安装新增加的依赖

```
npm install
```
建议统一使用编辑器VSCode, 并自行配置辅助插件如eslint, stylelint, prettier等

### update
```
2.0.8 dc-cli工程模板移植到gitlab
2.0.9 优化了模板list地址
2.1.0 增加业务组件模板
2.1.1 增加h5业务组件模板
2.1.2 优化 clone 地址
3.0.0 增加nest应用模版
 
```