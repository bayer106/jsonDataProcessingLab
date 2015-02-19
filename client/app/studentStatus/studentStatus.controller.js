'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('StudentStatusCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];
    $scope.statusSort = [];
    $scope.classSelected = 0;

    $scope.changeClassSelected = function(num){
      $scope.classSelected = num;
    };

    $scope.returnStudentStatus = function(){
      $scope.sortByStatus();
      if($scope.classSelected == 0){
        return "Not Selected";
      }else if ($scope.classSelected == 1){
        return "Freshman";
      }else if ($scope.classSelected == 2){
        return "Sophomore";
      }else if ($scope.classSelected == 3){
        return "Junior";
      }else if ($scope.classSelected == 4){
        return "Senior";
      }else if ($scope.classSelected == 5){
        return "Senior +";
      }
    };

    $http.get('/api/students').success(function(myStudents) {
      $scope.myStudents = myStudents;
      socket.syncUpdates('student', $scope.myStudents);
    });

    $scope.sortByStatus = function(){
      $scope.statusSort = [];
      for (var i = 0; i < $scope.myStudents.length; i++) {
        var totalCredits = 0;
        for (var j = 0; j < $scope.myStudents[i].courses.length; j++) {
          if($scope.myStudents[i].courses[j].grade != "F" && $scope.myStudents[i].courses[j].grade != "IP") {
            totalCredits += $scope.myStudents[i].courses[j].course.credits;
          }
        }
        totalCredits = parseInt(totalCredits);
        if ($scope.classSelected == 1 && totalCredits < 30) {
          $scope.statusSort.push($scope.myStudents[i]);
        } else if ($scope.classSelected == 2 && totalCredits > 30 && totalCredits < 60) {
          $scope.statusSort.push($scope.myStudents[i]);
        } else if ($scope.classSelected == 3 && totalCredits > 60 && totalCredits < 90) {
          $scope.statusSort.push($scope.myStudents[i]);
        } else if ($scope.classSelected == 4 && totalCredits > 90 && totalCredits < 120) {
          $scope.statusSort.push($scope.myStudents[i]);
        } else if ($scope.classSelected == 5 && totalCredits > 120) {
          $scope.statusSort.push($scope.myStudents[i]);
        }
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
  });

