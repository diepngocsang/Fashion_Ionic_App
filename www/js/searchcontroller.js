angular.module('starter')
.controller("SearchProductCtrl",function($scope,$firebaseArray,$stateParams,GET_URL){          
        var ref = new Firebase(GET_URL+"product");
        $scope.name = $stateParams.name;
        $scope.data = $firebaseArray(ref);
    });