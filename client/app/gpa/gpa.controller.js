'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('GpaCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];

    $http.get('/api/students').success(function(myStudents) {
      $scope.myStudents = myStudents;
      socket.syncUpdates('student', $scope.myStudents);
    });

    $scope.returnName = function(){
      return $scope.myStudents[0].firstName;
    };
  });

