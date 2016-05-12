angular.module('starter')
.controller("DetailProductCtrl",['$scope','$firebaseArray','$stateParams','STORE_URL',function($scope,$firebaseArray,$stateParams,STORE_URL){
         var ref = new Firebase(STORE_URL + "product");
         var code = $stateParams.code;
         $scope.data = $firebaseArray(ref.orderByChild('code').equalTo(code));         
    }]);          