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


���⣬���Ƿ��ִ�����phone-list.html�е��ĳ���ֻ�ʱ���Ѿ��޷��������ֻ�����ϸҳ�ˣ������Ϊ����
��һ�½��������о����ʵ���ֻ���ϸҳ��չʾ