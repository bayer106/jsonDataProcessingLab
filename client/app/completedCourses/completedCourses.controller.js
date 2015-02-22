'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('CompletedCoursesCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];
    $scope.completedCourses = [
      {firstName:"", lastName:"", major1:"", completedCredits: 0}
    ];

    $http.get('/api/students').success(function(myStudents) {
      $scope.myStudents = myStudents;
      socket.syncUpdates('student', $scope.myStudents);
      $scope.completedCredits();
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

    $scope.orderBy = function (property) {
      var sortOrder = 1;
      if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
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

    $scope.completedCredits = function () {
      for (var i = 0; i < $scope.myStudents.length; i++) {
        $scope.completedCourses.push({firstName:$scope.myStudents[i].firstName,
          lastName:$scope.myStudents[i].lastName,
          major1:$scope.myStudents[i].major1,
          completedCredits:$scope.totalCreditsForStudent($scope.myStudents[i])});
      }
    };
  });

