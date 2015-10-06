


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






|| *Directive* || *Supported* ||
|| ngRepeat   || enter  leave and move||
|| ngView	|| enter and leave||
|| ngInclude	|| enter and leave||
|| ngSwitch	|| enter and leave||
|| ngIf	|| enter and leave||
|| ngClass or||	add and remove||
|| ngShow & ngHide	|| add and remove ||



  * The `ng-enter` class is applied to the element when a new phone is added to the list and rendered on the page.
  * The `ng-move` class is applied when items are moved around in the list.
  * The `ng-leave` class is applied when they're removed from the list.

The phone listing items are added and removed depending on the data passed to the `ng-repeat` attribute.
For example, if the filter data changes, the items will be animated in and out of the repeat list.

Something important to note is that when an animation occurs, two sets of CSS classes
are added to the element:

  1. a "starting" class that represents the style at the beginning of the animation
  2. an "active" class that represents the style at the end of the animation

The name of the starting class is the name of the event that is fired (like `enter`, `move` or `leave`) prefixed with
`ng-`. So an `enter` event will result in a class called `ng-enter`.

The active class name is the same as the starting class's but with an `-active` suffix.
This two-class CSS naming convention allows the developer to craft an animation, beginning to end.

In our example above, elements are expanded from a height of **0** to **120 pixels** when they're added to the 
list and are collapsed back down to **0 pixels** before being removed from the list.
There's also a nice fade-in and fade-out effect that occurs at the same time. All of this is handled
by the CSS transition declarations at the top of the example code above.

Although most modern browsers have good support for [CSS transitions](http://caniuse.com/#feat=css-transitions)
and [CSS animations](http://caniuse.com/#feat=css-animation), IE9 and earlier do not.
If you want animations that are backwards-compatible with older browsers, consider using JavaScript-based animations,
which are described in detail below.


## Animating `ngView` with CSS Keyframe Animations

Next let's add an animation for transitions between route changes in {@link ngRoute.directive:ngView `ngView`}.

To start, let's add a new CSS class to our HTML like we did in the example above.
This time, instead of the `ng-repeat` element, let's add it to the element containing the `ng-view` directive.
In order to do this, we'll have to make some small changes to the HTML code so that we can have more control over our
animations between view changes.

__`app/index.html`.__

```html
<div class="view-container">
  <div ng-view class="view-frame"></div>
</div>
```

With this change, the `ng-view` directive is nested inside a parent element with
a `view-container` CSS class. This class adds a `position: relative` style so that the positioning of the `ng-view`
is relative to this parent as it animates transitions.

With this in place, let's add the CSS for this transition animation to our `animations.css` file:

__`app/css/animations.css`.__

```css
.view-container {
  position: relative;
}

.view-frame.ng-enter, .view-frame.ng-leave {
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.view-frame.ng-enter {
  -webkit-animation: 0.5s fade-in;
  -moz-animation: 0.5s fade-in;
  -o-animation: 0.5s fade-in;
  animation: 0.5s fade-in;
  z-index: 100;
}

.view-frame.ng-leave {
  -webkit-animation: 0.5s fade-out;
  -moz-animation: 0.5s fade-out;
  -o-animation: 0.5s fade-out;
  animation: 0.5s fade-out;
  z-index:99;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@-moz-keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@-webkit-keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
@-moz-keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
@-webkit-keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* don't forget about the vendor-prefixes! */
```

Nothing crazy here! Just a simple fade in and fade out effect between pages. The only out of the
ordinary thing here is that we're using absolute positioning to position the next page (identified
via `ng-enter`) on top of the previous page (the one that has the `ng-leave` class) while performing
a cross fade animation in between. So as the previous page is just about to be removed, it fades out
while the new page fades in right on top of it.

Once the leave animation is over then element is removed and once the enter animation is complete
then the `ng-enter` and `ng-enter-active` CSS classes are removed from the element, causing it to rerender and
reposition itself with its default CSS code (so no more absolute positioning once the animation is
over). This works fluidly so that pages flow naturally between route changes without anything
jumping around.

The CSS classes applied (the start and end classes) are much the same as with `ng-repeat`. Each time
a new page is loaded the `ng-view` directive will create a copy of itself, download the template and
append the contents. This ensures that all views are contained within a single HTML element which
allows for easy animation control.

For more on CSS animations, see the
[Web Platform documentation](http://docs.webplatform.org/wiki/css/properties/animations).


## Animating `ngClass` with JavaScript

Let's add another animation to our application. Switching to our `phone-detail.html` page,
we see that we have a nice thumbnail swapper. By clicking on the thumbnails listed on the page,
the profile phone image changes. But how can we change this around to add animations?

Let's think about it first. Basically, when you click on a thumbnail image, you're changing the
state of the profile image to reflect the newly selected thumbnail image.
The best way to specify state changes within HTML is to use classes.
Much like before, how we used a CSS class to specify an animation, this time the animation will
occur whenever the CSS class itself changes.

Whenever a new phone thumbnail is selected, the state changes and the `.active` CSS class is added
to the matching profile image and the animation plays.

Let's get started and tweak our HTML code on the `phone-detail.html` page first. Notice that we 
have changed the way we display our large image:

__`app/partials/phone-detail.html`.__

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

Just like with the thumbnails, we're using a repeater to display **all** the profile images as a
list, however we're not animating any repeat-related animations. Instead, we're keeping our eye on
the ng-class directive since whenever the `active` class is true then it will be applied to the
element and will render as visible. Otherwise, the profile image is hidden. In our case, there is
always one element that has the active class, and, therefore, there will always be one phone profile
image visible on screen at all times.

When the active class is added to the element, the `active-add` and the `active-add-active` classes
are added just before to signal AngularJS to fire off an animation. When removed, the
`active-remove` and the `active-remove-active` classes are applied to the element which in turn
trigger another animation.

To ensure that the phone images are displayed correctly when the page is first loaded we also tweak
the detail page CSS styles:

__`app/css/app.css`__
```css
.phone-images {
  background-color: white;
  width: 450px;
  height: 450px;
  overflow: hidden;
  position: relative;
  float: left;
}

...

img.phone {
  float: left;
  margin-right: 3em;
  margin-bottom: 2em;
  background-color: white;
  padding: 2em;
  height: 400px;
  width: 400px;
  display: none;
}

img.phone:first-child {
  display: block;
  }
```


You may be thinking that we're just going to create another CSS-enabled animation.
Although we could do that, let's take the opportunity to learn how to create JavaScript-enabled
animations with the `animation()` module method.

__`app/js/animations.js`.__

```js
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

Note that we're using [jQuery](http://jquery.com/) to implement the animation. jQuery
isn't required to do JavaScript animations with AngularJS, but we're going to use it because writing
your own JavaScript animation library is beyond the scope of this tutorial. For more on
`jQuery.animate`, see the [jQuery documentation](http://api.jquery.com/animate/).

The `addClass` and `removeClass` callback functions are called whenever a class is added or removed
on the element that contains the class we registered, which is in this case `.phone`. When the `.active`
class is added to the element (via the `ng-class` directive) the `addClass` JavaScript callback will
be fired with `element` passed in as a parameter to that callback. The last parameter passed in is the
`done` callback function. The purpose of `done` is so you can let Angular know when the JavaScript
animation has ended by calling it.

The `removeClass` callback works the same way, but instead gets triggered when a class is removed
from the element.

Within your JavaScript callback, you create the animation by manipulating the DOM. In the code above,
that's what the `element.css()` and the `element.animate()` are doing. The callback positions the next
element with an offset of `500 pixels` and animates both the previous and the new items together by
shifting each item up `500 pixels`. This results in a conveyor-belt like animation. After the `animate`
function does its business, it calls `done`.

Notice that `addClass` and `removeClass` each return a function. This is an **optional** function that's
called when the animation is cancelled (when another animation takes place on the same element)
as well as when the animation has completed. A boolean parameter is passed into the function which
lets the developer know if the animation was cancelled or not. This function can be used to
do any cleanup necessary for when the animation finishes.


# Summary

There you have it!  We have created a web app in a relatively short amount of time. In the {@link
the_end closing notes} we'll cover where to go from here.

<ul doc-tutorial-nav="12"></ul>

[bower]: http://bower.io/
