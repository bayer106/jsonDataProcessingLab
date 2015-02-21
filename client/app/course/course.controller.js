'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('CourseCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];
    $scope.searchField = "";
    $scope.classResults = [];

    $http.get('/api/students').success(function(myStudents) {
      $scope.myStudents = myStudents;
      socket.syncUpdates('student', $scope.myStudents);
    });

    $scope.searchForStudent = function(){
      $scope.classResults = [];
      for (var i = 0; i < $scope.myStudents.length; i++) {
        for (var j = 0; j < $scope.myStudents[i].courses.length; j++) {
          if ($scope.myStudents[i].courses[j].course.name == $scope.searchField) {
            $scope.classResults.push($scope.myStudents[i]);
          }
        }
      }
      if($scope.classResults.length == 0){
        alert("No Courses with that name were found. Please check spelling and remember this search is case-sensitive.");
      }
    };
  });
