angular.module("buzzbook", ["ionic"])
.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('appintro', {
        url: '/appintro',
        templateUrl: 'appPages/introScreen.html',
        controller: 'introCntrl'
    })
    .state('appLogin', {
        url: '/appLogin',
        templateUrl: 'appPages/loginblock.html',
        controller: 'LoginCtrl'
    })
    .state('appRegister', {
        url: '/appRegister',
        templateUrl: 'appPages/registerPage.html',
        controller: 'RegisterCntrl'
    })   
    .state('home.homeScreen', {
        url: "/home",
        views: {
            'home-tab': {
                templateUrl: "appPages/innerScreens/postsList.html",
                controller: 'postDataCntrl'
            }
        }
    })   
// old Code Link    
    .state('home',{
        url: '/home',
        templateUrl: 'appPages/homePage.html',
            controller: 'homeCtrl'
    })
      .state('registration', {
          url: '/registerOTP',
          templateUrl: 'templates/registrationOTP.html',
          controller: 'otpCntrl'
      })
     .state('registrationSuccess', {
         url: '/registerSuccess',
         templateUrl: 'templates/regSuccess.html',
         controller: 'otpSuccessCntrl'
     })
   // $urlRouterProvider.otherwise('/appintro');
   $urlRouterProvider.otherwise('/home');
})
