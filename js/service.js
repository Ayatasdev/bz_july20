angular.module("buzzbook").factory('AuthenticationService',
    ['Base64', '$http', 'globalBuzz', '$rootScope', '$timeout',
    function (Base64, $http, globalBuzz, $rootScope, $timeout) {
        var service = {};
        service.Login = function (username, password, callback) {
            //globalBuzz.baseURL+'
            $http({
                method: 'POST',
                url: globalBuzz.baseURL + '/signg_in/api_db_check_login',
                data: $.param({ email: username, password: password }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status) {
                callback(data);
            })
            .error(function (data, status) {
                console.log(data);
            });
        };

        service.Register = function (firstname, lastname, email, phone_number, password, dob, gender, callback) {
            callback(true);
            $http({
                method: 'POST',
                url: globalBuzz.baseURL + '/api/customer/cust_sign_up',
                //firstname,lastname,email,phone_number,password,dob(date of birth)
                data: $.param({ firstname: firstname, lastname: lastname, email: email, phone_number: phone_number, password: password, dob: dob, gender: gender }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status) {
                callback(data);
            })
            .error(function (data, status) {
                console.log(data);
            });
        };
        service.OTP = function (otp_code, authcode, callback) {
            callback(true);
            $http({
                method: 'POST',
                url: globalBuzz.baseURL + '/api/customer/check_otp',
                //firstname,lastname,email,phone_number,password,dob(date of birth)
                data: $.param({ access_token: authcode, otp: otp_code }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status) {
                callback(data);
                // console.log("Success Data");
            })
            .error(function (data, status) {
                console.log(data);
            });
        };
        service.OTP_Resend = function (authcode, callback) {
            callback(true);
            $http({
                method: 'POST',
                url: globalBuzz.baseURL + '/api/customer/regenerate_otp',
                //sending code: firstname,lastname,email,phone_number,password,dob(date of birth)
                data: $.param({ access_token: authcode }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status) {
                callback(data);
                console.log("Success Data Resend");
            })
            .error(function (data, status) {
                console.log(data);
            });
        };
        service.SetCredentials = function (username, authdata) {
            //var authdata = Base64.encode(username + ':' + password);
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
            // $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            //$cookieStore.put('globals', $rootScope.globals);
        };
        service.SetAccesssToken = function (authdata) {
            //Temporarily Storing the AuthData for Registration and OTP Confirmation;
            $rootScope.authData = authdata;
            //console.log("i am storing" + $rootScope.authData);
            // $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            //$cookieStore.put('globals', $rootScope.globals);
        };
        service.ClearCredentials = function () {
            // $rootScope.globals = {};
            //$cookieStore.remove('globals');
            //$http.defaults.headers.common.Authorization = 'Basic';
        };
        return service;
    }])
    // Here I Control Global variables to Store on device.
.factory('globalBuzz', function () {
    return {
        baseURL: 'http://bzzbook.com',
        tempPopupImage: '',
        authorizeCode: "70cced1b20c617c13e3079e0a0548191",
        callHome: function () {
            console.log("Tester App");
            // $state.go("appintro");
        },
        callRegisterB: function () {
            // $state.go("appRegister");
        }
    };
}
)

.factory('Base64', function () {
    /* jshint ignore:start */

    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

    /* jshint ignore:end */
})
.filter('iif', function () {
    return function (input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
    };
})
.filter('imageFilter', function (testValue) {
    return function (input, trueValue, falseValue) {
        console.log(input);
        return input ? trueValue : falseValue;
    };
})