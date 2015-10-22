'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
    'ionic',

   'phonecatAnimations',
   'phonecatControllers',
   'phonecatFilters',
   'phonecatServices'
]);


phonecatApp.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/tab/phonelist");
  $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('left');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
  // Now set up the states
  $stateProvider
      .state('tab', {
          url: '/tab',
          abstract:true,
          templateUrl: 'partials/tabs.html'

      })
      .state('tab.phonelist', {
          url: "/phonelist",

          views: {
              'tabphonelist': {
                  templateUrl: 'partials/phone-list.html',
                  controller:'PhoneListCtrl'
              }
          }
      })
      .state('tab.phonedetail', {
          url: "/phonedetail/:phoneId",
          views: {
              'tabphonelist': {
                  templateUrl: 'partials/phone-detail.html',
                  controller:'PhoneDetailCtrl'
              }
          }
      });

});



