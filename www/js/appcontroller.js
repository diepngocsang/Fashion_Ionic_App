angular.module('starter')
.controller('AppCtrl', ['$scope','STORE_URL','$firebaseArray',function($scope,STORE_URL,$firebaseArray) {
  var ref = new Firebase(STORE_URL + "menu");
  $scope.group = $firebaseArray(ref);
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };
}])
