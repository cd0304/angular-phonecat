


'use strict';

/* Controllers */

var HomeController = angular.module('HomeController',['ionic']);

HomeController.controller('HomeCtrl', ['$scope',
  function ($scope) {
    $scope.tab1title = "项目";
    $scope.tab2title = "工作";
    $scope.tab3title = "对话";
    $scope.tab4title = "我的";
  }]);



