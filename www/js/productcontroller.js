angular.module('starter')
.controller("ProductCtrl",['$scope','$firebaseArray','$stateParams','STORE_URL',function($scope,$firebaseArray,$stateParams,STORE_URL){
         var ref = new Firebase(STORE_URL + "product");
         var type = $stateParams.type;
         $scope.type = type;
         $scope.data = $firebaseArray(ref.orderByChild('type').equalTo(type));
    }]);