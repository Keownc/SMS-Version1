'use strict';

/**
 * @ngdoc function
 * @name workPunchApp.controller:TimeCtrl
 * @description
 * # TimeCtrl
 * Controller of the workPunchApp
 */
angular.module('workPunchApp')
  .controller('TimeCtrl', function ($scope, $rootScope, $firebaseArray, $firebaseAuth, $firebaseObject) {
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
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

            //Update user information


            //Add a timecard record of the employees
            //A timecard route to hold the time the employee clockd In
            var punchDateURL = new Firebase(URL + '/users/' +uid+ '/timecards/' + '/' + yearNum + '/' + ++monthNum + '/' + dayNum);
            var punchObj = $firebaseObject(punchDateURL);

            //A Function to Add Date and Time to the database when the employee Clocks In
            $scope.clockIn = function() {
                var punchInDay = Date.now();

                punchObj.dateIn = punchInDay;
                punchObj.timeIn = punchInDay;
                //Save to the database
                punchObj.$save();
            };
            //A Function to Add Date and Time to the database when the employee Clocks Out
            $scope.clockOut = function() {
                console.info('CLOCK OUT');
                var punchOutDay = Date.now();

                punchObj.dateOut = punchOutDay;
                punchObj.timeOut = punchOutDay;

                punchObj.$save();
            };

            $scope.punchcard = punchObj;

        } else {
            console.log('Logged out');
            // hide the log out and register button/link
            $rootScope.loggedIn = false;
       }

    });

});
