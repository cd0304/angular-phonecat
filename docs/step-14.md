#ʹ��angular-ui-route
��֮ǰ���½��У�����ʹ����ng-route��ʵ��ǰ��·�ɵĹ�������ng-route��һЩ���㣬��������ṩ�˸���ǿ���
ui-router��
ͬʱ��������һ�½ڿ�ʼ�ص���ʹ��ionic�������ֻ���pad���ƶ��˵�webӦ�ã���ionic���ϵ�angularjs�����У�·�ɹ������ʹ��ui-router.��ˣ��ڽ���ionic֮ǰ���ȶ�angular��·�ɲ����ȸĽ�һ�¡�

###ѡ��angular-ui-router�ĺô�

* ui-router��һ����������������ng-route����಻��
* UI-Router·��������Ƕ����ͼ(nested views)�Ͷ��������ͼ(multiple named views),���ǿ����н϶��ҳ����Ҫ�̳��������֣����Ժ����á�
* ͨ������ui-sref��ʵ�ֲ�ͬ��״̬���ӵ���ͬ��ҳ��
* states������ͨ��$statsParams�����ɵĴ�����Ϣ������ͬ����Ϣ��ͬ��states��map��ʽ��
* ���·�ɿ��Է��ʶ�̬���������ӽ�

##�л��汾
git checkout -f step-14
npm start

���������鿴http://127.0.0.1:8000/app/index.html
������ʵ��������һ�����ܣ���ҳ������������ǩ���ֱ���ʾ�ֻ��б�Ͷ����б�
������ֻ��б��ʱ����ʾ�ֻ��б�ҳ���ֻ��б�ҳ���浱�����ʾ�б�ͻ�������ֻ���Ϣչʾ����
�����б�Ҳ����˹��ܡ�

����½���ʱ��û�а�֮ǰ���õ��ֻ��б�����չʾ��������ֻ��һ���ǣ������½ڻ������ʵ���ݵİ󶨺���ʾ��

���ǿ������������ʵ�ֵģ�

����������һ�°��������У���ǰ�˵İ������ı仯
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
�������� angular-router: ���滻���� angular-ui-router���������֪���������׼ȷ��ʲô��ֻҪ
ִ��bower search ui-router ������������һ��ѣ�����ȥȷ��һ�¾����ˡ�
����װ��Ϻ����Ƿ�����bower_componentsĿ¼�Ͷ���һ��angular-ui-router�ļ����ˡ�
���ǿ���index.html�ϵ�body����д�������������Ĵ���
```html
<body>

  <a ui-sref="state1">�ֻ��б�</a>
  <a ui-sref="state2">�ҵĶ���</a>

<div ui-view></div>
</body>
```
Ȼ��app.js�Ĵ�����������
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

�������ui-router���÷�����ʹ�� ui-sref�� ui-view������ָ������Ͽ������е�$stateProvider�������ҳ��
�ϵ� <a ui-sref="state1">�ֻ��б�</a>�����ǩʱ�������ʱ״̬�����state1�����
```
 .state('state1', {
        url: "/state1",
        templateUrl: "partials/state1.html"
      })
 ```
���״̬�ͱ�ѡ���ˣ����ͻ��ڵ�ǰhtmlģ�����ҵ� ui-view ���ָ���Ӧ��html���֣������滻��
partials/state1.html ���ģ�� ��
��partials/state1.htmlģ����Ҳ����ͬ��д����
```
<h1>�ֻ���Ʒҳ</h1>
<hr/>
<a ui-sref="state1.list">չʾ�����ֻ�</a>
<div ui-view></div>
```

ͬ�������ģ��Ҳ��һ��state1.list��״̬��������ѡ��ʱ����������������־Ͷ�Ӧ����
```
.state('state1.list', {
           url: "/list",
           templateUrl: "partials/state1.list.html",
           controller: function($scope) {
             $scope.items = ["A", "List", "Of", "Items"];
           }
         })

```
����partials/state1.htmlģ���е�ui-view���ּ������滻����partials/state1.list.html������
�����ܴ���һ�����������ݸ��滻��ģ��ʹ�á�