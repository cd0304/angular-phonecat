��һ�½ڣ����ǽ�֮ǰ���õ��ֻ��б��Լ��������˹������Ͻ�����
��checkout���½ڴ���
```
git checkout -f step-15
npm start
```
��������������Щ�仯��
1����ģ������У��������°�֮ǰ���õ��ֻ��б�չʾ��ģ�����¼ӻ���
```
var phonecatApp = angular.module('phonecatApp', [
   'ui.router',
   'phonecatAnimations',
   'phonecatControllers',
   'phonecatFilters',
   'phonecatServices'
]);
```
2����$stateProvider��״̬�����У���ģ���ַ�޸ĳ�partials/phone-list.html�������������滻��PhoneListCtrl
      .state('state1.list', {
        url: "/list",
        templateUrl: "partials/phone-list.html",
        controller: 'PhoneListCtrl'
      })

��˼򵥵��޸ľͿ��Խ�֮ǰ�����õ��ֻ�չʾ��ҳ��ҵ���������������ˣ���������鿴һ�£����ֹ����Ѿ�������
���Ƿ��֣�ʹ����ui-route��ҳ��ĸ���ܾ���ͬ���ľһ��򵥡�


���⣬���Ƿ��ִ�����phone-list.html�е��ĳ���ֻ�ʱ���ܹ��л�����ϸҳ��,���������������أ�

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
��phone-list.html�У����������Ѿ����޸ĳ���href="#/state1/detail/{{phone.id}}
Ȼ�����ǿ�app.js�еĴ���
```js
      .state('state1.detail', {
          url: "/detail/:phoneId",
          templateUrl: "partials/phone-detail.html",
          controller: 'PhoneDetailCtrl'
      })
```
��������������һ��״̬state1.detail,ͬʱ��Ӧ��url��/detail/:phoneId��Ȼ�����ǰ�½�д�õĿ�����PhoneDetailCtrl�����˽�ȥ

��controller.js�У���ԭ���Ĳ����Ķ����޸ĳ��� $stateParams
```
  function($scope, $stateParams, Phone) {

    $scope.phone = Phone.get({phoneId: $stateParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });
```

��ˣ��Ϳ���ʵ�ֵ��ĳ���ֻ�ʱ���л�����ϸҳ�Ĺ����ˡ�

ui-router����ϸ���ܣ����Բο��ٷ�wiki�ϵ�˵����
https://github.com/angular-ui/ui-router/wiki
�ر�������½ڽ��ܵ�urlƥ��Ĵ���
https://github.com/angular-ui/ui-router/wiki/URL-Routing


����url��״̬�Ķ�Ӧ��ϵ�����Լ���������������
```
<body>
  <a ui-sref="state1">�ֻ��б�</a>
  <a ui-sref="state2">�ҵĶ���</a>
<div ui-view></div>
```
body��ͼ����һ�� ui-view,�������������Ӷ�Ӧstate1��state2״̬
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
�����state1������ӵ�ʱ�������ui-view��װ����partials/state1.html���ģ�棬�������Ϊ·�����þ�����
  ```
      .state('state1', {
        url: "/state1",
        templateUrl: "partials/state1.html"
      })
  ```
  ��partials/state1.htmlģ�����滹��һ������
  ```
  <h1>�ֻ���Ʒҳ</h1>
  <hr/>
  <a ui-sref="state1.list">չʾ�����ֻ�</a>
  <div ui-view></div>
  ```
  ����ui-sref��state1.list��Ȼ��·���������£�
  ```
        .state('state1.list', {
          url: "/list",
          templateUrl: "partials/phone-list.html",
          controller: 'PhoneListCtrl'
        })
  ```
  ���ǻᷢ�������״̬Ҳ��д��state1.list����url��ֻд���� "/list",�����Ǵ�������������
  �ƶ����ֻ��б�-��չʾ�����ֻ�  �������ʱ��ע��۲����������ʵ�ֵ�url���������ǣ�
  http://127.0.0.1:8000/app/index.html#/state1/list
  ע�⵽����ʵ�ʵ�url��/state1/list
  ��������һ��ʵ�飬��״̬state1.list�޸ĳ�state3.list,Ȼ��<a ui-sref="state1.list">չʾ�����ֻ�</a>Ҳ�޸ĳ�
  <a ui-sref="state3.list">չʾ�����ֻ�</a>
  Ȼ��������ִ�У����ֵ㶼�㲻���ˡ�

  ʵ���ϣ�ui-router��·�ɵ�״̬��ϵ�����ϸ�ĸ��ӹ�ϵ��
   .state('state1.list', {     ��ʾ���·������state1�µģ�����url��ȻҲ����state1������
   ���ԣ�����urlֻ��Ҫд���Լ��������þͿ����� url: "/list",������������ url: "/state1/list",
   ������ҳ����ʹ�õ�ʱ��ʹ��/state1/list��������ƥ���ϡ�

   ��ˣ�������������ֻ���ϸҳ����htmlģ���У���������д��
```
<a href="#/state1/detail/{{phone.id}}"
```
��Ϊ��ʹ��href������ȻҪ������д·�ɣ�#/state1/detail/
Ȼ������������:
```
 .state('state1.detail', {
          url: "/detail/:phoneId",
          templateUrl: "partials/phone-detail.html",
          controller: 'PhoneDetailCtrl'
      })
```
��ʾ��state1�����״̬�£���һ����״̬��detail,Ȼ��url:   /detail/:phoneId ����ʾstate1��״̬��
ȥƥ�䣬�����൱��/state1/detail/:phoneId��

���ǿ���ͨ���޸�state1.detail�������޳ɳ�detail����ʾ�������˸�Ŀ¼�£�Ȼ��ͬʱ�޸�html�е�href����

��ᷢ�֣�������ֻ���ϸʱ���ֻ�����ϸҳ��ֱ�ӹҵ����ֻ��б��������ͼ�ϣ��������ֻ��б�->չʾ����
�ֻ� ����������ͼ�� �����ʵ���˵������ͼ֮����һ�ָ��ӹ�ϵ��

ui-router֧��һ���ڵ��¹Ҷ������ͼ������ͼ�������Ƕ������ͼ��

