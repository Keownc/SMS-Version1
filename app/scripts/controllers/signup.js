'use strict';

/**
 * @ngdoc function
 * @name workPunchApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the workPunchApp
 */
angular.module('workPunchApp')
  .controller('SignupCtrl', function ($scope, $rootScope, $firebaseArray, $firebaseAuth, $firebaseObject, $location) {
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];

    var URL = new Firebase('https://workpunchdev.firebaseio.com');
    $rootScope.authObj = $firebaseAuth(URL);
    $rootScope.show = true;

    //register a new user
    $scope.register = function () {
        $scope.authObj.$createUser({
            email: $scope.newuser.email,
            password: $scope.newuser.password
        })
        .then(function (userData) {
            //create user data in the database
            //create vairable to the hold the data then save it
            var user_table = new Firebase('https://workpunchdev.firebaseio.com/users/'+userData.uid);
            var user = $firebaseObject(user_table);
            user.employeeId = $scope.newuser.employeeId;
            user.firstName = $scope.newuser.firstName;
            user.lastName = $scope.newuser.lastName;
            user.company = $scope.newuser.company;
            user.$save();
            return $scope.authObj.$authWithPassword({
                email: $scope.newuser.email,
                password: $scope.newuser.password
            });
        })
        .then(function (authData) {
            $rootScope.loggedIn = true;
            $location.path('/time');
        })
        .catch(function (error) {
            console.log('Error', error);
        });
    };

  });
