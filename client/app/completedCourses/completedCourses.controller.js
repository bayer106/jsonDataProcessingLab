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

    $scope.totalCreditsForStudent = function (student) {
      var totalCredits = 0;
      for (var i = 0; i < student.courses.length; i++) {
        var aClass = student.courses[i].course;
        var aGrade = student.courses[i].grade;
        if ($scope.isGradeValid(aGrade)) {
          totalCredits += aClass.credits;
        }
      }
      console.log(totalCredits);
      return totalCredits;
    };
  });

