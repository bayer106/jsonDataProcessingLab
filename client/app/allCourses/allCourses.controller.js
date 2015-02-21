'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('AllCoursesCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];
    $scope.searchedStudent = [];
    $scope.searchedStudentClasses = [];
    $scope.searchField = "";
    $scope.toReturn = "";

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
      if ($scope.searchedStudent.length > 1){
        alert("We found more than one student with that name. Please try searching by last name.");
      }else if (!$scope.searchedStudent.length > 0) {
        alert("We couldn't find anyone by that name. Try checking your spelling.");
      } else {
        $scope.toReturn = $scope.searchedStudent[0].firstName + " " + $scope.searchedStudent[0].lastName;
        $scope.loopThroughCourses();
      }
      $scope.searchField = "";
    };

    $scope.returnStudentSearched = function(){
      return $scope.toReturn;
    };

    $scope.loopThroughCourses = function(){
      for (var i = 0; i<$scope.searchedStudent[0].courses.length; i++){
        $scope.searchedStudentClasses.push($scope.searchedStudent[0].courses[i]);
      }
      console.log($scope.searchedStudentClasses[0].class);
      console.log($scope.searchedStudentClasses[0].grade);
    }
  });

