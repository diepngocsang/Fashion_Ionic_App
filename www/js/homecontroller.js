angular.module('starter')
.controller('homeController',function ($state,$scope,$firebaseArray,$ionicPopup,$window,GET_URL){
        $scope.numcart=0;
        $scope.shopcart=[];
        $scope.user={};
        $scope.isGroupShown = function(group) {
          return group.show;
        };
        $scope.delProductItem = function(code){
            var confirmPopup=$ionicPopup.confirm({
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
                code.quantity=1;
                for (var i = 0;i< $scope.shopcart.length;i++) {
                    if(code.code == $scope.shopcart[i].code){
                        checkCode=false;
                    }
                }
                if(checkCode){
                    $scope.shopcart.push(code);
                    $scope.numcart =$scope.numcart +1;
                    $ionicPopup.alert({
                        title: 'Success',
                        content: 'Adding this product into your cart'
                      });
                }else{
                    $ionicPopup.alert({
                        title: 'Warning',
                        content: 'This product contained in your cart'
                      });
                }
            }
        };
        $scope.addCartToFirebase = function(){
            var ref = new Firebase(GET_URL+"cart/post");
            $scope.postsRef = $firebaseArray(ref);
            $scope.quantity= $scope.shopcart;
            $scope.user.item = $scope.shopcart;
            var confirmPopup=$ionicPopup.confirm({
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
                        $scope.user={};
                        $scope.shopcart=[];
                        $scope.numcart=0;
                        $state.go('app.home');
                        setTimeout(function(){ 
                           $window.location.reload()
                        }, 100);
                        // $window.location.reload(true);
                      }
                    });
                } 
             });
        };
        $scope.getTotal = function(items){
            var   total=0;  
            angular.forEach(items , function(item){
                total+= (parseInt(item.price)*parseInt(item.quantity));
            });
            return total;
        }
    });