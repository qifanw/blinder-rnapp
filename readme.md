## 安装
- nvm
  管理node版本的shell工具，用来便捷安装和管理npm，node版本。[安装地址](https://github.com/creationix/nvm)
- node 8及以上版本
  `nvm install 8.1.3`
- npm 4
  `npm install -g npm@4`
- nrm（npm源地址管理，方便切换源）
  `npm install -g nrm`
- jinhui源
  `nrm add jinhui http://cnpm.jinhui365.cn/`
- gulp
  `npm install -g gulp`
- react-native-cli (gulp，react-native打包需要)
  `nrm use taobao`
  `npm install -g react-native-cli`

> 可以通过`npm ls -g --depth=0`查看已经安装在全局的npm模块

## 运行
1. 命令行进入项目主文件夹
2. `nrm use jinhui`切换金汇源, `npm install` 安装依赖
3. `npm run mingonghui`运行项目不同项目
4. 打开模拟器/真机连接服务

> 启动会处理config文件，并以清除缓存的方式启动

## 打包
在确保项目正常的情况下，运行`npm run build-mingonghui`进行不同项目打包。打包完成后会生成两个文件夹，**dist**存放RN的资源和Bundle文件，**release**存放RN的压缩资源包。

## 调试
此处以iOS模拟器为例，`Command+D`打开开发者面板。
![RNDebugger](https://i.loli.net/2018/07/13/5b486458a527f.png)
### 界面调试和性能监控
![RNInspect](https://i.loli.net/2018/07/13/5b48659887048.png)
### 远程调试
在RN实例启动后，启动远程调试，自动弹出Chrome.
通过Console面板，我们可以查看RN的输出。
通过在Sources面板，我们可以通过`Command+P`查找页面文件然后断点调试。

**文件查找**
![RNChrome](https://i.loli.net/2018/07/13/5b486a2612827.png)

**断点调试**
![RNChromeDebug](https://i.loli.net/2018/07/13/5b486a393c225.png)

## 项目结构
    ├── dist          #打包生成RN的资源和Bundle文件
    ├── release       #dist压缩文件
    ├── maojiuhui     #茅酒汇项目入口文件
    ├── yunmatong     #云码通项目入口文件
    ├── build.sh      #打包脚本
    ├── gulpfile.js   #gulp打包脚本文件
    ├── history.json  #版本历史记录
    ├── package.json  
    ├── readme.md 
    └── src 
       ├── init.js            #项目初始化文件
       ├── maojiuhui.js       #茅酒汇项目路由注册文件
       ├── yunmatong.js       #云码通项目路由注册文件
       ├── common             #通用文件，RN实例，本地存储，公共方法等
       ├── communication      #RN/app交互文件
       ├── router             #路由方法文件
       ├── services           #服务相关
       │   ├── logger.js        #日志配置文件
       │   └── service.js       #http服务配置文件
       ├── config             #配置文件
       ├── components         #公共组件
       ├── pages              #茅酒汇View
       └── ymt-pages          #云码通View

## 命名约定
1. 文件夹及文件名称全小写，用"-"分割，如back-button
2. 类名首字母大写，大驼峰
3. 变量名小驼峰
4. 命名见名知意即可

## 目录结构约定
以src/ymt-pages/transfer为例：

    ├── components      #组件
    ├── images          #图片
    ├── common          #非组件图片外的公共资源
    ├── home.js         #首页
    ├── index.js        #导出文件
    ├── organ.js        #其他页面
    └── personal.js     #其他页面
**约定**
1. page文件夹下以功能区分不同文件夹，例如：transfer为转账功能
2. index.js作为文件夹整体导出文件，方便引用
3. image放到对应页面文件夹同级目录，就近原则
4. components为当前功能的公共组件，组件存放依照就近原则。若仅为某页面使用可编写在该页面。
5. common存放部分公共资源，例如该功能使用到的一些mapping关系、函数等

## 版本约定
### 命名
v主版本号.次版本号.修正版本号.build版本号

### 迭代

1. 产品初版时，版本号为1.0.0
2. 当产品进行了**部分优化**或**bug修正**时，主版本号和子版本号都不变，**修正版本号+1**
3. 当产品在原有的基础上**增加了部分功能**或者**更新了一个不兼容的修改**时，主版本号不变，**子版本号+1，修正版本号复位为0**
4. 当产品进行了**大需求迭代**或**局部修正累计较多**，而导致产品整体发生全局变化的，**主版本号+1**
5. build版本号，一般是编译器在编译过程中自动生成的，我们只定义其格式，并不进行人为控制

### 书写

    {
     "version": "1.1.1", //版本
     "desc": ["修复因http-service签名生成获取客户端时间导致的签名验证失败问题"], //该版本描述
     "android":"",  //该版本android版本要求
     "ios":""       //该版本ios版本要求
    }

> 打包时将采用history.json各自项目第一个元素的版本字段作为项目版本号，并修改配置文件。


## 页面编写
### 路由注册
1. 在对应项目的路由注册文件（`maojiuhui.js`/`yunmatong.js`）中注册路由.
2. 在app路由库中注册路由。将RN路由的Key交付给APP方注册，在tools上记录。


### 组件编写

    import React, { Component } from 'react';
    import { StyleSheet, Text, View } from 'react-native';

    // 导出组件
    export class Home extends Component {
      constructor(props) {
        super(props);
        // 状态初始化
        this.state = {
          refreshing: false
        };
      }

      // 数据请求方法
      httpRequest() {
        // 接口调用
        return userService.$getUserInvitor().then(result => {
          if(result.message.code == 0) {
            return result.data;
          }
        }).catch(err => {
          // 日志记录
          logger.error('userService.$getUserInvitor', err);
        })
      }

      // 页面刷新方法，一般统一在该方法进行数据初始化状态
      refresh() {
      }

      // React生命周期方法componentDidMount， 一般用来进行组件初始化
      componentDidMount() {
        this.refresh();
      }

      // React生命周期方法componentWillReceiveProps，一般用来组件刷新
      componentWillReceiveProps(nextProps){
        this.refresh()
      }

      render() {
        return (
          <View>
          </View>
        )
      }
    }

    // 页面复用抽离子组件，仅在本页面使用
    class ListItem extends Component {
      constructor(props) {
        super(props);
      }

      render() {
        return <View></View>
      }
    }

    // 样式定义
    const styles = StyleSheet.create({
      container: {
      }
    })
        
## APP通信
### 主动调用
由APP编写方法供RN调用。RN通过`react-native`库中的NativeModules组件引用APP提供的module，通过module调用APP方法。如下：

    import { NativeModules } from 'react-native';
    const { ReactModule } = NativeModules;
    ReactModule.XXX();

> `ReactModule`为目前和APP定义的module名称。

目前和APP定义调用方法为：（详情参照src/communication/index）
- startActivity
- finishActivity
- getUserInfo

### 事件监听
由RN和APP两方定义事件，RN监听，APP发送。通过NativeEventEmitter进行监听。

目前定义事件为：
- jump
  跳转事件，RN跳至指定页面。若路由中存在该页面，回退至该页面。
- show
  当APP从隐藏到显示RN时，发送该事件。捕获到该事件后RN刷新用户数据，并刷新当前页面。（通过调用refresh方法，由componentWillReceiveProps捕获刷新）
- hide
  当APP从显示到隐藏RN时，发送该事件。
  
> 事件传递必带reactTag参数，标识APP所传RN实例。
> 首页可能因show事件两次刷新(componentDidMount，componentWillReceiveProps)，需处理！


## http接口编写
1. 在`src/services/services`中注册某服务
2. 编写对应的服务文件

> 需注意服务命名冲突，http-service和本项目中的服务。

## 自动化构建
项目自动化构建由jenkins完成。

1. jenkins监听master/tag变动，执行配置中的构建命令。构建命令：`bash -xe build.sh maojiuhui $BUILD_NUMBER`。
2. 执行项目中编写好的build.sh脚本。
3. 文件结构初始化
4. 配置文件自动修改版本
5. react native文件编译
6. 压缩RN编译文件
7. 产出release
8. jenkins根据配置提供release内所有文件的下载

## 热更新
![RN](https://i.loli.net/2018/07/12/5b470a3d870c7.png)

## 第三方库安装
### 无需APP支持
`npm install --save XXX`
### 需APP支持
1. `npm install --save XXX`
2. 将安装的第三方库在node_modules找到并交与APP方即可

**目前已使用的需APP支持的第三方库**
1. react-native-picker
2. react-native-device-info
3. react-native-fast-image

> 需APP支持的第三方库使用为不兼容修改，需升级次版本号并记录支持的APP版本

## 问题记录

- android首页scrollView无法完整展示，需要在scrollView里最后加一行`{Platform.OS == "android" && <View style = {{height: 50}}></View> }`

- react界面中的条件判断`{variable && <View></View>}`需注意当variable为string时会导致RN崩溃，推荐使用三元式判断。util中提供了isNotBlock方法。

- react界面中的循环需给每个item添加key的属性，一般为后端的数据id。key应唯一，若重复则重复key的item可能不显示。

- 页面去掉回退按钮需在路由中添加`back={false} renderBackButton={false}`这两个属性

- Image组件会自动适应本地图片的大小展示，如果UI给的图合适是不用设置宽高的，但是如果是网络图片，就必须设置宽高。ImageBackground和CachedImage必须设置宽高。

- componentWillReceiveProps调用refresh重新渲染需注意老得state未销毁的问题。

- 路由中替代导航栏的组件接受props。例如:`title={props => `${props.vipName}邀请资格`}`
- ios首页scrollView无法完整展示，需要在父View中添加`<View style={[{backgroundColor: color["c1"]}, Platform.OS == 'android' ? {flex: 1} : {height: instance.homeViewHeight}]}>`
- componentWillReceiveProps需注意初次加载RN实例show事件的refresh，解决方法：通过this.state.isComplete && this.refresh()
