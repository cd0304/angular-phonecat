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


另外，我们发现代码在phone-list.html中点击某个手机时，已经无法跳到该手机的详细页了，这个是为何呢
下一章节来继续研究如何实现手机详细页的展示