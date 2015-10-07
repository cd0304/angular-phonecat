'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ionic',
  'ngRoute',
  'phonecatAnimations',

  'phonecatControllers',
  'HomeController',
  'phonecatFilters',
  'phonecatServices'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/home',{
        templateUrl: 'templates/tabs.html',
        controller: 'HomeCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
