angular.module('starter', ['ionic','firebase'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.product', {
      url: '/product/:type',
      views: {
        'menuContent': {
          templateUrl: 'templates/product.html',
          controller: 'ProductCtrl'
        }
      }
    })
  .state('app.product-women', {
      url: '/product-women/:type',
      views: {
        'menuContent': {
          templateUrl: 'templates/product-women.html',
          controller: 'ProductCtrl'
        }
      }
    })
  .state('app.detail', {
      url: '/detail/:code',
      views: {
        'menuContent': {
          templateUrl: 'templates/detail.html',
          controller: 'DetailProductCtrl'
        }
      }
    })
  .state('app.search', {
      url: '/search/:name',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html',
          controller: 'SearchProductCtrl'
        }
      }
    })
  .state('app.cart', {
      url: '/cart',
      views: {
        'menuContent': {
          templateUrl: 'templates/cart.html',
        }
      }
    })
  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/app/home');
})
.constant('GET_URL','https://finalassignment.firebaseio.com/');


