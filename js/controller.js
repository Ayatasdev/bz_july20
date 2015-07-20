angular.module("buzzbook")
.controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        $scope.userDetails = {};
        $scope.data = {};
        $scope.callHome = function () {
            $location.path('/appintro');            
        }
       // AuthenticationService.ClearCredentials();
        $scope.login = function (dataLogin) {
            console.log("login Working");
            $scope.dataLoading = true;
            AuthenticationService.Login(dataLogin.username, dataLogin.password, function (response) {
                if (response.success) {
                  //  AuthenticationService.SetCredentials(response.result[0].user_city, response.result[0].user_name);
                    $location.path('/home');                    
                    //$scope.userDetails = response.result[0];                                       
                    // console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        }
    }])
.controller('introCntrl', function ($scope, $location, $state) {
    $scope.callLogin = function () {
        $state.go("appLogin"); 
    };
    $scope.callRegister = function () {
        $state.go("appRegister");
    };
})
    // Old Code
.controller('homeCtrl', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$ionicSlideBoxDelegate',
    function ($scope, $rootScope, $location, AuthenticationService, $ionicSlideBoxDelegate) {
        $scope.authdata = "read";
        $scope.navSlide = function (index) {
            $ionicSlideBoxDelegate.slide(index, 100);
        }
        $scope.goForward = function () {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1) {
                $ionicTabsDelegate.select(selected + 1);
            }
        }

        $scope.goBack = function () {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1 && selected != 0) {
                $ionicTabsDelegate.select(selected - 1);
            }
        }
}])
.controller('otpSuccessCntrl', ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
      //  $scope.authdata = "read";       
}])
.controller('otpCntrl', ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
       // $scope.authdata = "read";
        $scope.otp = function (dataOTP) {
            console.log($rootScope.authData);
            $scope.dataLoading = true;
            AuthenticationService.OTP(dataOTP.otp, $rootScope.authData, function (response) {
                //console.log("LOGIN user: " + dataRegister.firstname + " - PW: " + dataRegister.lastname);
                if (response.success) {
                    //AuthenticationService.SetAccesssToken(response.access_token);
                    $location.path('/registerSuccess');
                    // console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
                } else {
                    //console.log("Register Working");
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
        $scope.resendOTP = function (dataOTP) {
            console.log($rootScope.authData);
            $scope.dataLoading = true;
            AuthenticationService.OTP_Resend($rootScope.authData, function (response) {
                //console.log("LOGIN user: " + dataRegister.firstname + " - PW: " + dataRegister.lastname);
                if (response.success) {
                    //AuthenticationService.SetAccesssToken(response.access_token);                    
                   // $location.path('/registerSuccess');
                    // console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
                } else {
                    //console.log("Register Working");
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
}])
.controller('RegisterCntrl', ['$scope','globalBuzz', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, globalBuzz, $rootScope, $location, AuthenticationService) {
        $scope.data = {};
        $scope.callHome = function () {
            $location.path('/appintro');
           
        }
        
    AuthenticationService.ClearCredentials();
    $scope.register = function (dataRegister) {        
        $scope.dataLoading = true;
        AuthenticationService.Register(dataRegister.firstname, dataRegister.lastname, dataRegister.email, dataRegister.phone_number, dataRegister.password, dataRegister.dob, dataRegister.gender, function (response) {
            console.log("LOGIN user: " + dataRegister.firstname + " - PW: " + dataRegister.lastname);
            if (response.success) {
                //console.log(response.access_token);
                AuthenticationService.SetAccesssToken(response.access_token);
                $location.path('/registerOTP');                 
                // console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
            } else {
                //console.log("Register Working");
                $scope.error = response.message;
                $scope.dataLoading = false;
            }
        });

    }
    }])
    .controller('postDataCntrl', ['$scope', 'globalBuzz', '$ionicModal', '$http','$ionicSlideBoxDelegate',
    function ($scope, globalBuzz, $ionicModal, $http, $ionicSlideBoxDelegate) {
        $scope.postLinks = [];
        $http({
            method: 'GET',
            url: globalBuzz.baseURL + '/api/posts/getposts/' + globalBuzz.authorizeCode,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function (data, status) {
            console.log("Success Data");
            $scope.postLinks = data.result;  
   
            // console.log($scope.postLinks); 
        })
        .error(function (data, status) {
                //console.log(data);
        });
        $scope.range = function (count) {
            var ratings = [];
            for (var i = 0; i < count; i++) {
                ratings.push(i)
            }
            return ratings;
        }
        $scope.aImages = [];
        $ionicModal.fromTemplateUrl('image-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            $ionicSlideBoxDelegate.slide(0);
            $scope.modal.show();
        };

        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });
        $scope.$on('modal.shown', function () {
            console.log('Modal is shown!');
        });

        // Call this functions if you need to manually control the slides
        $scope.next = function () {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.goToSlide = function (index) {
            $scope.modal.show();
            $ionicSlideBoxDelegate.slide(index);
        }

        // Called each time the slide changes
        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;
        };


    }])
