'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('GpaCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];
    $scope.gpaStudents = [
        {firstName:"", lastName:"", gpa:""}
    ];

    $http.get('/api/students').success(function(myStudents) {
      $scope.myStudents = myStudents;
      socket.syncUpdates('student', $scope.myStudents);
      $scope.populateGpaArray();
    });

    $scope.populateGpaArray = function(){
      for(var i= 0; i < $scope.myStudents.length; i++){
        var totalCredits = 0;
        var totalGradePoint = 0;
        for(var j = 0; j< $scope.myStudents[i].courses.length; j++){
          totalCredits += parseInt($scope.myStudents[i].courses[j].course.credits);
          var gradeValue = parseInt($scope.returnGradeValue($scope.myStudents[i].courses[j].grade));
          totalGradePoint += (gradeValue * parseInt($scope.myStudents[i].courses[j].course.credits));
        }
        var gpa = (totalGradePoint/totalCredits).toFixed(3);
        $scope.gpaStudents.push({firstName:$scope.myStudents[i].firstName, lastName:$scope.myStudents[i].lastName, gpa:gpa});
      }
    };

    $scope.returnGradeValue = function(str){
      if (str === "A") {
        return 4.0;
      } else if (str === "B") {
        return 3.0;
      } else if (str === "C") {
        return 2.0;
      } else if (str === "D") {
        return 1.0;
      } else {
        return 0;
      }
    };
  });

