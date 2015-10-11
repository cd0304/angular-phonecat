这一章节，我们将之前做好的手机列表以及搜索过滤功能整合进来。
先checkout本章节代码
```
git checkout -f step-15
npm start
```
看看代码有了那些变化：
1、在模块加载中，我们重新把之前做好的手机列表展示的模块重新加回来
```
var phonecatApp = angular.module('phonecatApp', [
   'ui.router',
   'phonecatAnimations',
   'phonecatControllers',
   'phonecatFilters',
   'phonecatServices'
]);
```
2、在$stateProvider的状态配置中，将模版地址修改成partials/phone-list.html，并将控制器替换成PhoneListCtrl
      .state('state1.list', {
        url: "/list",
        templateUrl: "partials/phone-list.html",
        controller: 'PhoneListCtrl'
      })

如此简单的修改就可以将之前开发好的手机展示的页面挂到这个导航架子上了，用浏览器查看一下，发现功能已经出来了
我们发现，使用了ui-route后，页面的各项功能就如同搭积木一般简单。


另外，我们发现代码在phone-list.html中点击某个手机时，能够切换到详细页面,这个是如何做到的呢，

```html
      <ul class="phones">
        <li ng-repeat="phone in phones | filter:query | orderBy:orderProp"
            class="thumbnail phone-listing">
          <a href="#/state1/detail/{{phone.id}}" class="thumb"><img ng-src="{{phone.imageUrl}}"></a>
          <a href="#/state1/detail/{{phone.id}}">{{phone.name}}</a>
          <p>{{phone.snippet}}</p>
        </li>
      </ul>
```
在phone-list.html中，两个链接已经被修改成了href="#/state1/detail/{{phone.id}}
然后，我们看app.js中的代码
```js
      .state('state1.detail', {
          url: "/detail/:phoneId",
          templateUrl: "partials/phone-detail.html",
          controller: 'PhoneDetailCtrl'
      })
```
发现这里配置了一个状态state1.detail,同时对应的url是/detail/:phoneId，然后把以前章节写好的控制器PhoneDetailCtrl传递了进去

在controller.js中，把原来的参数的对象修改成了 $stateParams
```
  function($scope, $stateParams, Phone) {

    $scope.phone = Phone.get({phoneId: $stateParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });
```

如此，就可以实现点击某个手机时，切换到详细页的功能了。

ui-router的详细介绍，可以参考官方wiki上的说明：
https://github.com/angular-ui/ui-router/wiki
特别是这个章节介绍的url匹配的处理：
https://github.com/angular-ui/ui-router/wiki/URL-Routing


对于url，状态的对应关系，可以简单如下梳理来掌握
```
<body>
  <a ui-sref="state1">手机列表</a>
  <a ui-sref="state2">我的订单</a>
<div ui-view></div>
```
body视图下有一个 ui-view,上面有两个链接对应state1和state2状态
```
$stateProvider
      .state('state1', {
        url: "/state1",
        templateUrl: "partials/state1.html"
      })
      .state('state1.detail', {
          url: "/detail/:phoneId",
          templateUrl: "partials/phone-detail.html",
          controller: 'PhoneDetailCtrl'
      })
      .state('state1.list', {
        url: "/list",
        templateUrl: "partials/phone-list.html",
        controller: 'PhoneListCtrl'
      })
      .state('state2', {
        url: "/state2",
        templateUrl: "partials/state2.html"
      })
});
```
当点击state1这个链接的时候，下面的ui-view就装载了partials/state1.html这个模版，这个是因为路由配置决定的
  ```
      .state('state1', {
        url: "/state1",
        templateUrl: "partials/state1.html"
      })
  ```
  而partials/state1.html模版里面还有一个链接
  ```
  <h1>手机产品页</h1>
  <hr/>
  <a ui-sref="state1.list">展示所有手机</a>
  <div ui-view></div>
  ```
  他的ui-sref是state1.list，然后路由配置如下：
  ```
        .state('state1.list', {
          url: "/list",
          templateUrl: "partials/phone-list.html",
          controller: 'PhoneListCtrl'
        })
  ```
  我们会发现这里的状态也是写成state1.list，而url切只写成了 "/list",当我们打开浏览器，把鼠标
  移动到手机列表-》展示所有手机  这个链接时候，注意观察浏览器下面实现的url，发现他是：
  http://127.0.0.1:8000/app/index.html#/state1/list
  注意到，他实际的url是/state1/list
  我们来做一个实验，把状态state1.list修改成state3.list,然后<a ui-sref="state1.list">展示所有手机</a>也修改成
  <a ui-sref="state3.list">展示所有手机</a>
  然后打开浏览器执行，发现点都点不动了。

  实际上，ui-router的路由的状态关系是有严格的父子关系的
   .state('state1.list', {     表示这个路由是在state1下的，他的url自然也是在state1的里面
   所以，他的url只需要写他自己这层的配置就可以了 url: "/list",而不是完整的 url: "/state1/list",
   当我们页面上使用的时候，使用/state1/list，他就能匹配上。

   因此，我们来看点击手机详细页，在html模版中，他是这样写的
```
<a href="#/state1/detail/{{phone.id}}"
```
因为是使用href，他自然要完整的写路由：#/state1/detail/
然后到了配置那里:
```
 .state('state1.detail', {
          url: "/detail/:phoneId",
          templateUrl: "partials/phone-detail.html",
          controller: 'PhoneDetailCtrl'
      })
```
表示在state1这个父状态下，有一个子状态叫detail,然后url:   /detail/:phoneId ，表示state1父状态下
去匹配，所以相当于/state1/detail/:phoneId。

我们可以通过修改state1.detail，把他修成成detail，表示他挂载了更目录下，然后同时修改html中的href链接

你会发现，当点击手机详细时，手机的详细页把直接挂到了手机列表下面的视图上，而不是手机列表->展示所有
手机 这个下面的视图。 从这个实验就说明了视图之间是一种父子关系。

ui-router支持一个节点下挂多个子视图，子视图里面继续嵌套子视图。

