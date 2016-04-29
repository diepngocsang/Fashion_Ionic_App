angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('AppCtrl', function($scope) {
  // $scope.headerItem=stateParams(subName);
  // $scope.groups = [
  //   {
  //     name: 'Men',      
  //     // icon: 'ion-clipboard',
  //     items: [
  //       {
  //         subName: 'T-shirt',
  //         href: "app.product({type: 'T-shirt Men'})"
  //       },
  //       {
  //         subName: 'Shirt',
  //         href: "app.product({type: 'Shirt Men'})"
  //       },
  //       {
  //         subName: 'Jean',
  //         href: "app.product({type: 'Jean Men'})"
  //       },
  //       {
  //         subName: 'Suit',
  //         href: "app.product({type: 'Suit Men'})"
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Women',
     
  //     // icon: 'ion-android-alert',
  //     items: [
  //       {
  //         subName: 'Dress',
  //         href: "app.product-women({type: 'Dress Girl'})"
  //       },
  //       {
  //         subName: 'Jean',
  //         href: "app.product-women({type: 'Jean Girl'})"
  //       },
  //       {
  //         subName: 'Shirt',
  //         href: "app.product-women({type: 'Shirt Girl'})"
  //       },
  //       {
  //         subName: 'Suit',
  //         href: "app.product-women({type: 'Suit Girl'})"
  //       }
  //     ]
  //   }
  // ];
  var ref = new Firebase("https://finalassignment.firebaseio.com/menu");
  $scope.group=$firebaseArray(ref);
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };
})
.controller("ProductCtrl",function($scope,$firebaseArray,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product");
         var type = $stateParams.type;
         $scope.type= type;
         $scope.data = $firebaseArray(ref.orderByChild('type').equalTo(type));
         $scope.nowPage = 0;
         $scope.sizePage = 8;
         $scope.totalPage=function(){
            return Math.ceil($scope.data.length/$scope.sizePage);                
         }
    })
.controller("DetailProductCtrl",function($scope,$firebaseArray,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product");
         var code = $stateParams.code;
         $scope.data = $firebaseArray(ref.orderByChild('code').equalTo(code));         
    })
.controller('homeController',function ($state,$scope,$firebaseArray,$ionicPopup,$window){
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
                        content: 'Added this product into your cart'
                      });
                }else{
                    $ionicPopup.alert({
                        title: 'Warning',
                        content: 'This product that contained in your cart'
                      });
                }                
            }
        };
        $scope.addCartToFirebase = function(){         
            var ref = new Firebase("https://finalassignment.firebaseio.com/cart/post");
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
                      content: 'Thank you to order our products! We will contact to you as soon as possible to confirm your order!'
                    }).then(function(ok){
                      if(ok){
                        $scope.user={};
                        $scope.shopcart=[];                
                        $scope.numcart=0;
                        $state.go('app');
                        $window.location.reload();
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
    })
.controller("SearchProductCtrl",function($scope,$firebaseArray,$stateParams){          
        var ref = new Firebase("https://finalassignment.firebaseio.com/product");
        $scope.name = $stateParams.name;
        $scope.data = $firebaseArray(ref);
    });