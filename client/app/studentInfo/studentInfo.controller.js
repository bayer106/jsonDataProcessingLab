'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('StudentInfoCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];
    $scope.searchedStudent = [];
    $scope.searchField = "";

    $scope.fixedSearchField = function(){
      return $scope.searchField.charAt(0).toUpperCase() + $scope.searchField.slice(1);
    };

    $http.get('/api/students').success(function (myStudents) {
      $scope.myStudents = myStudents;
      socket.syncUpdates('student', $scope.myStudents);
    });

    $scope.searchForStudent = function(){
      $scope.searchedStudent = [];
      for (var i = 0; i < $scope.myStudents.length; i++) {
        if ($scope.myStudents[i].firstName == $scope.fixedSearchField()){
          $scope.searchedStudent.push($scope.myStudents[i]);
        } else if ($scope.myStudents[i].lastName == $scope.fixedSearchField()){
          $scope.searchedStudent.push($scope.myStudents[i]);
        }
      }
    };
  });
