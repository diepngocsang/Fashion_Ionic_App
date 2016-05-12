angular.module('starter')
.controller("SearchProductCtrl",['$scope','$firebaseArray','$stateParams','STORE_URL',function($scope,$firebaseArray,$stateParams,STORE_URL){          
        var ref = new Firebase(STORE_URL + "product");
        $scope.name = $stateParams.name;
        $scope.data = $firebaseArray(ref);
    }]);