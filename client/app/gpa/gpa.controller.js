'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('GpaCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];

    $http.get('/api/student').success(function(myStudents) {
      $scope.myStudents = myStudents;
      socket.syncUpdates('student', $scope.myStudents);
    });
  });

