angular.module('starter')
.controller('AppCtrl', ['$scope','GET_URL','$firebaseArray',function($scope,GET_URL,$firebaseArray) {
  var ref = new Firebase(GET_URL+"menu");
  $scope.group=$firebaseArray(ref);
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };
}])
