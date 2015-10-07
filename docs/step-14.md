#使用angular-ui-route
在之前的章节中，我们使用了ng-route来实现前端路由的管理，但是ng-route有一些不足，因此社区提供了更加强大的
ui-router。
同时，我们这一章节开始重点是使用ionic来构建手机，pad等移动端的web应用，而ionic集合的angularjs功能中，路由管理就是使用ui-router.因此，在介绍ionic之前，先对angular的路由部分先改进一下。

###选择angular-ui-router的好处

* ui-router是一个社区库用来完善ng-route的诸多不足
* UI-Router路由器允许嵌套视图(nested views)和多个命名视图(multiple named views),我们可能有较多的页面需要继承其他部分，所以很有用。
* 通过构建ui-sref来实现不同的状态链接到不同的页面
* states允许你通过$statsParams来轻松的传递信息，允许不同的信息不同的states的map格式。
* 你的路由可以访问动态创建的链接接

##切换版本
git checkout -f step-14
npm start

我们先来看一下包管理器中，对前端的包所做的变化
``` js
{
  "name": "angular-phonecat",
  "description": "A starter project for AngularJS",
  "version": "0.0.0",
  "homepage": "https://github.com/angular/angular-phonecat",
  "license": "MIT",
  "private": true,
  "dependencies": {
    "angular": "1.4.x",
    "angular-mocks": "1.4.x",
    "jquery": "~2.1.1",
    "bootstrap": "~3.1.1",
    "angular-ui-router": "",
    "angular-resource": "1.4.x",
    "angular-animate": "1.4.x"
  }
}
```
看到了吗， angular-router: 被替换成了 angular-ui-router，如果你想知道这个名字准确叫什么，只要
执行bower search ui-router ，他会搜索到一大堆，你再去确认一下就行了。
当安装完毕后，我们发现在bower_components目录就多了一个angular-ui-router文件夹了。


