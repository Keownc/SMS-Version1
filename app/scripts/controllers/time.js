'use strict';

/**
 * @ngdoc function
 * @name workPunchApp.controller:TimeCtrl
 * @description
 * # TimeCtrl
 * Controller of the workPunchApp
 */
angular.module('workPunchApp')
  .controller('TimeCtrl', function ($scope, $rootScope, $firebaseArray, $firebaseAuth) {
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
    var URL = 'https://workpunchdev.firebaseio.com/';
    var list = $firebaseArray(new Firebase(URL));

    $rootScope.authObj = $firebaseAuth(new Firebase(URL));
    // authenticate the user when logged In
    $scope.authObj.$onAuth(function(authData) {
        if (authData) {
            console.log("Logged in as:", authData.uid);
             // show the log out button
             $rootScope.loggedIn = true;
             var uid = authData.uid;
             //gets a single user based on ID
             var user = new Firebase("https://gify.firebaseio.com/users/"+uid);
             // turns that obj in firebase object
             var obj = $firebaseObject(user);
             obj.$loaded().then(function() {
             //loads the object from Firebase
             // reads username from Firebase
             $rootScope.user = obj;
           } else {
               console.log("Logged out");
               // hide the log out and register button/link
               $rootScope.loggedIn = false;
               $location.path('/');
       }
    });

    //Show user information

    //Update user information

    //Delete user Information


    //show user logs
    list.$loaded( function(data) {
        console.log('Data', data);
        $scope.users = data;
    }, function(error) {
        console.error('Error:', error);
    });

    $scope.users = list;

    //Add user Logs to the database
    $scope.addTime = function() {
        list.$add($scope.name).then(function(ref) {
            var id = ref.key();
            console.log('added record with id ' + id);
            list.$indexFor(id); // returns location in the array
        });
    };

});
