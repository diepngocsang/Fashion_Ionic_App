angular.module('starter')
.controller('homeController',['$state','$scope','$firebaseArray','$ionicPopup','$window','STORE_URL',function ($state,$scope,$firebaseArray,$ionicPopup,$window,STORE_URL){
        $scope.numcart = 0;
        $scope.shopcart = [];
        $scope.user = {};
        $scope.isGroupShown = function(group) {
          return group.show;
        };
        $scope.delProductItem = function(code){
            var confirmPopup = $ionicPopup.confirm({
               title: 'Delete Item',
               template: 'Are you sure you want to delete this item?'
             });
             confirmPopup.then(function(res) {
               if(res) {
                  $scope.shopcart.splice($scope.shopcart.indexOf(code),1);
                  $scope.numcart = $scope.numcart - 1;
                } 
             });
        };        
        $scope.addProductItem = function(code){
            if($scope.shopcart.indexOf(code)<=0){
                var checkCode = true;
                code.quantity = 1;
                for (var i = 0; i < $scope.shopcart.length; i++) {
                    if(code.code == $scope.shopcart[i].code){
                        checkCode = false;
                    }
                }
                if(checkCode){
                    $scope.shopcart.push(code);
                    $scope.numcart = $scope.numcart +1;
                    $ionicPopup.alert({
                        title: 'Success',
                        content: 'Added product to cart'
                      });
                }else{
                    $ionicPopup.alert({
                        title: 'Warning',
                        content: 'Already in cart'
                      });
                }
            }
        };
        $scope.addCartToFirebase = function(){
            var ref = new Firebase(STORE_URL+"cart/post");
            $scope.postsRef = $firebaseArray(ref);
            $scope.quantity= $scope.shopcart;
            $scope.user.item = $scope.shopcart;
            var confirmPopup = $ionicPopup.confirm({
               title: 'Order',
               template: 'Do you want to order these products?'
             });
            confirmPopup.then(function(res) {
               if(res) {
                  $scope.postsRef.$add($scope.user);
                  $ionicPopup.alert({
                      title: 'Success',
                      content: 'Thank you for ordering our products! We will contact to you as soon as possible to confirm your order!'
                    }).then(function(ok){
                      if(ok){
                        $scope.user = {};
                        $scope.shopcart = [];
                        $scope.numcart = 0;
                        $state.go('app.home');
                        //Return Home Page after order the product with no Back button and to make sure that get back to the first time open the app
                        setTimeout(function(){ 
                           $window.location.reload()
                        }, 50);
                      }
                    });
                } 
             });
        };
        $scope.getTotal = function(items){
            var   total = 0;  
            angular.forEach(items , function(item){
                total+= (parseInt(item.price) * parseInt(item.quantity));
            });
            return total;
        }
    }]);