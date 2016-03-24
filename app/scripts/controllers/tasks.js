'use strict';

/**
 * @ngdoc function
 * @name workPunchApp.controller:TasksCtrl
 * @description
 * # TasksCtrl
 * Controller of the workPunchApp
 */
angular.module('workPunchApp')
  .controller('TasksCtrl', function ($scope, $rootScope, $firebaseArray, $firebaseAuth, $firebaseObject, $route) {
      var URL = 'https://workpunchdev.firebaseio.com/';

      var today = new Date();
      var yearNum = today.getFullYear();
      var monthNum = today.getMonth();
      var dayNum = today.getDate();

      //console.log("======TODAY======", yearNum , ++monthNum, dayNum);

      $rootScope.authObj = $firebaseAuth(new Firebase(URL));
      // authenticate the user when logged In
      $scope.authObj.$onAuth(function(authData) {

          if (authData) {

              // show the log out button
              $rootScope.loggedIn = true;

              console.log("Logged in as:", authData.uid);
              var uid = authData.uid;

              //gets a single user based on ID
              var user = new Firebase('https://workpunchdev.firebaseio.com/users/'+uid);
              //Show user information
              $scope.user = $firebaseObject(user);

              //Add a timecard record of the employees
              //A timecard route to hold the time the employee clockd In
              var taskURL = new Firebase(URL + '/users/' +uid+ '/timecards/' + '/' + yearNum + '/' + ++monthNum + '/' + dayNum);
              var punchObj = $firebaseObject(taskURL);

              //A Function to Add Date and Time to the database when the employee Clocks In
              $scope.dailyTasks = function() {

                  punchObj.dailytasks = $scope.usertask.task;
                  //Save to the database
                  punchObj.$save();
                  $route.reload();
              };
              $scope.punchcard = punchObj;

              $scope.removeTasks = function() {
                  punchObj.$remove();
            };
               $scope.punchcard = punchObj;
          } else {
              console.log('Logged out');
              // hide the log out and register button/link
              $rootScope.loggedIn = false;
         };

      });
  });
