angular.module('starter')
.controller("ProductCtrl",function($scope,$firebaseArray,$stateParams,GET_URL){
         var ref = new Firebase(GET_URL+"product");
         var type = $stateParams.type;
         $scope.type= type;
         $scope.data = $firebaseArray(ref.orderByChild('type').equalTo(type));
         $scope.nowPage = 0;
         $scope.sizePage = 8;
         $scope.totalPage=function(){
            return Math.ceil($scope.data.length/$scope.sizePage);                
         }
    });