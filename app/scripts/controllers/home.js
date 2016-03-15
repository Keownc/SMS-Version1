'use strict';

/**
 * @ngdoc function
 * @name workPunchApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the workPunchApp
 */
angular.module('workPunchApp')
  .controller('HomeCtrl', function ($scope, $firebaseArray) {
    //   this.awesomeThings = [
    //     'HTML5 Boilerplate',
    //     'AngularJS',
    //     'Firebase',
    //     'Karma'
    //     ];
    //     var Firebase;
      var URL = 'https://workpunchdev.firebaseio.com/';
      var list = $firebaseArray(new Firebase(URL));

      list.$loaded( function(data) {
        console.log('Data', data);
        $scope.users = data;
      }, function(error) {
        console.error('Error:', error);
      });

      // add an item
      //list.$add({ foo: "bar" }).then(...);

      // remove an item
      //list.$remove(2).then(...);

      // make the list available in the DOM
      $scope.users = list;

      $scope.addName = function() {
          list.$add($scope.name).then(function(ref) {
              var id = ref.key();
              console.log('added record with id ' + id);
              list.$indexFor(id); // returns location in the array
          });
      };
  });
