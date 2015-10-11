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

请打开浏览器查看http://127.0.0.1:8000/app/index.html
我们想实现这样的一个功能，主页顶上有两个标签，分别显示手机列表和订单列表
当点击手机列表的时候，显示手机列表页，手机列表页里面当点击显示列表就会把所有手机信息展示出来
订单列表也是如此功能。

这个章节暂时还没有把之前做好的手机列表真正展示出来，还只是一个壳，后面章节会进行真实数据的绑定和显示。

我们看看代码是如何实现的：

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
我们看到index.html上的body部分写成了如下这样的代码
```html
<body>

  <a ui-sref="state1">手机列表</a>
  <a ui-sref="state2">我的订单</a>

<div ui-view></div>
</body>
```
然后app.js的代码变成了这样
```js
phonecatApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
      .state('state1', {
        url: "/state1",
        templateUrl: "partials/state1.html"
      })
      .state('state1.list', {
        url: "/list",
        templateUrl: "partials/state1.list.html",
        controller: function($scope) {
          $scope.items = ["A", "List", "Of", "Items"];
        }
      })
      .state('state2', {
        url: "/state2",
        templateUrl: "partials/state2.html"
      })
      .state('state2.list', {
        url: "/list",
        templateUrl: "partials/state2.list.html",
        controller: function($scope) {
          $scope.things = ["A", "Set", "Of", "Things"];
        }
      });
});
```

这个就是ui-router的用法，他使用 ui-sref和 ui-view这两个指令来配合控制器中的$stateProvider，当点击页面
上的 <a ui-sref="state1">手机列表</a>这个标签时，代表此时状态变成了state1，因此
```
 .state('state1', {
        url: "/state1",
        templateUrl: "partials/state1.html"
      })
 ```
这个状态就被选中了，他就会在当前html模版中找到 ui-view 这个指令对应的html部分，把他替换成
partials/state1.html 这个模版 。
而partials/state1.html模版中也有相同的写法：
```
<h1>手机产品页</h1>
<hr/>
<a ui-sref="state1.list">展示所有手机</a>
<div ui-view></div>
```

同样，这个模版也有一个state1.list的状态，当他被选中时，控制器中这个部分就对应上了
```
.state('state1.list', {
           url: "/list",
           templateUrl: "partials/state1.list.html",
           controller: function($scope) {
             $scope.items = ["A", "List", "Of", "Items"];
           }
         })

```
所以partials/state1.html模版中的ui-view部分继续被替换成了partials/state1.list.html，另外
他还能创建一个控制器传递给替换的模版使用。