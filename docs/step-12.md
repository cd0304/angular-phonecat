


###在这一章节, 我们将利用css和js动画来加强这个手机网站的显示效果.

我们将使用 `ngAnimate` 模块来配合完成这个功能.
实现这个特效，有两种办法：

* ngAnimate配合css实现
* ngAnimate配合jquery提供的animate方法实现

这个章节手机列表页和手机详细页分别使用了这两种办法来实现动画效果

##切换版本
    git checkout -f step-12
    npm start
我们重新用浏览器打开，点击手机详细页，我们发现当点击不同的图片时，主图片出现了滚动的显示效果
在手机主页上，切换过滤条件，你会发现右边的手机列表的图片是有一个滑动效果的。

下面我们来分析代码：

## 依赖
angular提供了一个实现动画功能的模块 `ngAnimate` ,他是单独发布的，并不再angular的核心模块里面，所以，
如果要想使用该功能，需要引入angular-animate.js模块代码，同时我们也引入`jQUery` 来实现而外的动画效果，
后面会详细讲解到。

首先，我们需要修改我们的包依赖管理配置，将jquery和animate引入，关于bower包管理器在前面章节也介绍过了，
如果需要了解，请百度一下相关知识，如这个文章介绍的：[bower解决js的依赖管理](http://blog.fens.me/nodejs-bower-intro/)

我们将使用 [Bower][bower] 来安装客户端的依赖.  
请留意`bower.json`这个配置文件已经做了如下的改动

```javascript
{
  "name": "angular-seed",
  "description": "A starter project for AngularJS",
  "version": "0.0.0",
  "homepage": "https://github.com/angular/angular-seed",
  "license": "MIT",
  "private": true,
  "dependencies": {
    "angular": "1.4.x",
    "angular-mocks": "1.4.x",
    "jquery": "~2.1.1",
    "bootstrap": "~3.1.1",
    "angular-route": "1.4.x",
    "angular-resource": "1.4.x",
    "angular-animate": "1.4.x"
  }
}
```

* `"angular-animate": "1.4.x"`告诉 bower 安装angular-animate 组件 来兼容angular 1.4.x.版本
* `"jquery": "~2.1.1"` 告诉 bower 安装 2.1.1 版本的jQuery. 






##  ngAnimate是如何工作的

更加详细的工作原理可以参考官方指导：
[ngAnimate详细官方指导](https://docs.angularjs.org/guide/animations)

你也可以仅看下面的讲解，也能明白他的工作原理：



## 模版


我们看到在index.html中，代码有了如下的变化

__`app/index.html`.__

```html
...
  <!-- for CSS Transitions and/or Keyframe Animations -->
  <link rel="stylesheet" href="css/animations.css">

  ...

  <!-- jQuery is used for JavaScript animations (include this before angular.js) -->
  <script src="bower_components/jquery/dist/jquery.js"></script>

  ...

  <!-- required module to enable animation support in AngularJS -->
  <script src="bower_components/angular-animate/angular-animate.js"></script>

  <!-- for JavaScript Animations -->
  <script src="js/animations.js"></script>

...
```






## Module & Animations

__`app/js/animations.js`.__

```js
angular.module('phonecatAnimations', ['ngAnimate']);
  // ...
  // this module will later be used to define animations
  // ...
```



__`app/js/app.js`.__

```js
// ...
angular.module('phonecatApp', [
  'ngRoute',

  'phonecatAnimations',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices',
]);
// ...
```
好了，下面我们开始制作动画效果了


## 使用方法1： CSS Transition Animations



我们先在phone-list.html页面增加动画效果，让手机列表出来和消失的时候都有一个动画过度效果，具体效果，大家可以在浏览器上
体验一下，当输入过滤的时候，我们看到手机列表已经不是那么呆板的出现了，而是有一个平滑的过度效果。

这个是如何做到的呢：

先来看看phone-list.html文件的代码变化

__`app/partials/phone-list.html`.__

```html
<!--
  Let's change the repeater HTML to include a new CSS class
  which we will later use for animations:
-->
<ul class="phones">
  <li ng-repeat="phone in phones | filter:query | orderBy:orderProp"
      class="thumbnail phone-listing">
    <a href="#/phones/{{phone.id}}" class="thumb"><img ng-src="{{phone.imageUrl}}"></a>
    <a href="#/phones/{{phone.id}}">{{phone.name}}</a>
    <p>{{phone.snippet}}</p>
  </li>
</ul>

```


我们看到在class中增加了phone-listing的类，只要html代码中增加这个就行了，剩下的就交给css了

__`app/css/animations.css`__

```css
.phone-listing.ng-enter,
.phone-listing.ng-leave,
.phone-listing.ng-move {
  -webkit-transition: 0.5s linear all;
  -moz-transition: 0.5s linear all;
  -o-transition: 0.5s linear all;
  transition: 0.5s linear all;
}

.phone-listing.ng-enter,
.phone-listing.ng-move {
  opacity: 0;
  height: 0;
  overflow: hidden;
}

.phone-listing.ng-move.ng-move-active,
.phone-listing.ng-enter.ng-enter-active {
  opacity: 1;
  height: 120px;
}

.phone-listing.ng-leave {
  opacity: 1;
  overflow: hidden;
}

.phone-listing.ng-leave.ng-leave-active {
  opacity: 0;
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
```

这样便可实现手机列表页的动画效果。

为何这样就能实现这个效果，其玄机何在？

###机理
引入了angular-animate.js后，一些指令便有了对class控制的能力，拥有这类能力的指令如下：




------------

**指令  支持的能力**


* ngRepeatenter  leave and move
* ngView|enter and leave
* ngInclude	 enter and leave
* ngSwitch	 enter and leave
* ngIf enter and leave
* ngClass or	add and remove
* ngShow & ngHide	 add and remove 

------------

这个是什么意思呢？
原来当这些指令所对应的html元素被创建、被移动、被移除的时候，他会自动的在class里面添加对应的类名
如代码中，一个item被创建时，他会在class类中添加ng-enter
即，实际上，当创建是，class是变成如下的

``` html
 <li ng-repeat="phone in phones | filter:query | orderBy:orderProp"
      class="thumbnail phone-listing ng-enter">
```
同样，在被移除时，会变成
``` html
 <li ng-repeat="phone in phones | filter:query | orderBy:orderProp"
      class="thumbnail phone-listing ng-leave">
```

然后我们再看看上面css的定义就知道，动画是怎么产生的了。


##使用方法2： 利用jquey实现动画

在手机详细页中的动画并不是借助css实现的，而是通过jquery实现的

app/partials/phone-detail.html.

```html
<!-- We're only changing the top of the file -->
<div class="phone-images">
  <img ng-src="{{img}}"
       class="phone"
       ng-repeat="img in phone.images"
       ng-class="{active:mainImageUrl==img}">
</div>

<h1>{{phone.name}}</h1>

<p>{{phone.description}}</p>

<ul class="phone-thumbs">
  <li ng-repeat="img in phone.images">
    <img ng-src="{{img}}" ng-mouseenter="setImage(img)">
  </li>
</ul>
```


可以发现，并不是在class中添加标记，而是增加了一个指令： ng-class="{active:mainImageUrl==img}"

当mainImageUrl==img，即显示的那个主img是该img时，active为true

在来看看animations.js中的代码，增加了一个新的模块，并使用animation

app/js/animations.js.

``` js

var phonecatAnimations = angular.module('phonecatAnimations', ['ngAnimate']);

phonecatAnimations.animation('.phone', function() {

  var animateUp = function(element, className, done) {
    if(className != 'active') {
      return;
    }
    element.css({
      position: 'absolute',
      top: 500,
      left: 0,
      display: 'block'
    });

    jQuery(element).animate({
      top: 0
    }, done);

    return function(cancel) {
      if(cancel) {
        element.stop();
      }
    };
  }

  var animateDown = function(element, className, done) {
    if(className != 'active') {
      return;
    }
    element.css({
      position: 'absolute',
      left: 0,
      top: 0
    });

    jQuery(element).animate({
      top: -500
    }, done);

    return function(cancel) {
      if(cancel) {
        element.stop();
      }
    };
  }

  return {
    addClass: animateUp,
    removeClass: animateDown
  };
});
```


代码细节先不追究，其大意是：该模块返回了一个对象，指明了，当phone这个class所对应的元素增加class或者去除class的时候
调用响应的响应函数：animateUp和animateDown
而ng-class="{active:mainImageUrl==img} 这个指令就能控制他增加actiove还是去除actiove
因此，当鼠标点中他的时候，就符合了条件，active添加到class中，从而引发了animateUp响应函数




#本章结束
第一章到处为止，通过本章12节的讲解，相信已经对angular有了一个基本的了解，算是入门了，后面想对angular能够
应用的更加熟练甚至到精通，可以通过学习angular的官方指导来进行下一步的深入学习。

从这12节学习中，我们仅仅是了解了angular是做什么的，怎么做的，但是对于大量的指令、模块等还并没有涉及，angular提供
了众多方便我们开发的功能，熟悉了他，开发web应用就能随心所欲。

[官方指导-angular指南](https://docs.angularjs.org/guide/)



#第二章开始了

如果仅仅是学习angular，并不是要开发移动web应用的，就学习到第一章就够了，后续通过更多的项目实践和官方指导就能深入进去。
从第二章开始，是学习在基于angular的基础上，利用ionic前端框架开发移动web应用
从第三章开始，是学习如何在微信公众号中，将移动web应用到微信中
从第四章开始，是学习如何实现一套代码既能应用与移动web，也能快速改造成本地app，支持ios和android系统的app




