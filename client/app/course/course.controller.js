'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('AllCoursesCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];
    $scope.searchedCourse = [];
    $scope.searchedCourseStudents = [];
    $scope.searchResultsArray = [];
    $scope.searchField = "";
    $scope.toReturn = "";
    $scope.courseToSearchFor = "";

    $http.get('/api/students').success(function (myStudents) {
      $scope.myStudents = myStudents;
      socket.syncUpdates('student', $scope.myStudents);
    });

    $scope.searchResults = function(){
      var str;
      var n;
      for(var i = 0; i<$scope.myStudents.length; i++){
        for(var j = 0; j<$scope.myStudents[i].courses.length; j++){
          str = $scope.myStudents[i].courses[j].course.name;
          n = str.search(/$scope.searchField/i);
          if(n != -1){
            $scope.searchResultsArray.push(str);
          }
        }
      }
      if($scope.searchResultsArray.length == 1){
        $scope.toReturn = $scope.searchResultsArray[0];
      } else if($scope.searchResultsArray.length < 1){
        alert("No classes were found. Try checking your spelling.");
      }
    };

    $scope.searchForCourse = function(){

      for (var i = 0; i < $scope.myStudents.length; i++) {
        if ($scope.myStudents[i].firstName == $scope.fixedSearchField()){
          $scope.searchedCourse.push($scope.myStudents[i]);
        } else if ($scope.myStudents[i].lastName == $scope.fixedSearchField()){
          $scope.searchedCourse.push($scope.myStudents[i]);
        }
      }
      if ($scope.searchedCourse.length > 1){
        alert("We found more than one course with that name.");
      }else if (!$scope.searchedCourse.length > 0) {
        alert("We couldn't find any course by that name. Try checking your spelling.");
      } else {
        $scope.toReturn = $scope.searchedCourse[0].firstName + " " + $scope.searchedStudent[0].lastName;
        $scope.loopThroughCourses();
      }
      $scope.searchField = "";
    };

    $scope.returnCourseSearched = function(){
      return $scope.toReturn;
    };

    $scope.loopThroughCourses = function(){
      for (var i = 0; i<$scope.searchedStudent[0].courses.length; i++){
        $scope.searchedStudentClasses.push($scope.searchedStudent[0].courses[i]);
      }
    }
  });
