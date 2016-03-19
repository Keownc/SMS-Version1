'use strict';

/**
 * @ngdoc function
 * @name workPunchApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the workPunchApp
 */
angular.module('workPunchApp')
  .controller('EditCtrl', function ($scope, $rootScope, $firebaseArray, $firebaseAuth, $firebaseObject, $location) {

        var URL = 'https://workpunchdev.firebaseio.com/';
        $rootScope.authObj = $firebaseAuth(new Firebase(URL));

        $scope.authObj.$onAuth(function(authData) {

            if (authData) {
                var userEdit = new Firebase(URL+'/users/'+authData.uid);
                var obj = $firebaseObject(userEdit);

                obj.$loaded().then(function(data) {
                  $scope.user = obj;
                  $scope.editUser = obj;
                })
                .catch(function(error) {
                    console.error("Error:", error);
                });

                $scope.editProfile = function() {
                    console.log("Saved successfully.");
                    $scope.user.company = $scope.edituser.company;
                    $scope.user.employeeId = $scope.edituser.employeeId;
                    obj.$save();
                    $location.path('/time');
                }
            } else {
                console.log('Logged out');
                // hide the log out and register button/link
                $rootScope.loggedIn = false;
         }

        });

  });
