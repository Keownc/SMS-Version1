'use strict';

/**
 * @ngdoc function
 * @name workPunchApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the workPunchApp
 */
angular.module('workPunchApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $firebaseArray, $firebaseAuth, $firebaseObject, $location) {
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
    var URL = new Firebase('https://workpunchdev.firebaseio.com');
    $rootScope.authObj = $firebaseAuth(URL);
    $rootScope.show = true;

    //Log In a user
    $rootScope.logIn = function () {
        $scope.authObj.$authWithPassword({
            email: $scope.user.email,
            password: $scope.user.password
        })
        .then(function (authData) {
            //redirectTo to the dashboard/time route
            $rootScope.loggedIn = true;
            $location.path('/time');
        })
        .catch(function (error) {
            alert('Error', error);
        });
    };
  });
