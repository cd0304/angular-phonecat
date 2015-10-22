

'use strict';

angular.module('tabs', [])
.controller('TabsCtrl',  ['$scope', '$state',function($scope, $state) {
  $scope.onHomeClick = function() {
    $state.go('tab.phonelist');
    alert(1);
  }
}]);
