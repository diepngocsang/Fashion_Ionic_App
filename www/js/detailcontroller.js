angular.module('starter')
.controller("DetailProductCtrl",function($scope,$firebaseArray,$stateParams,GET_URL){
         var ref = new Firebase(GET_URL+"product");
         var code = $stateParams.code;
         $scope.data = $firebaseArray(ref.orderByChild('code').equalTo(code));         
    });