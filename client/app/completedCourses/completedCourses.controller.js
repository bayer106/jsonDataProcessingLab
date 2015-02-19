'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('CompletedCoursesCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];

    $http.get('/api/students').success(function(myStudents) {
      $scope.myStudents = myStudents;
      socket.syncUpdates('student', $scope.myStudents);
    });

    $scope.returnName = function(){
      return $scope.myStudents[0].firstName;
    };

    $scope.isGradeValid = function(grade) {
      grade = grade.toUpperCase();
      switch(grade) {
        case "A":
        case "B":
        case "C":
        case "D":
           return true;
        default:
          return false;
      }
    };
  });

