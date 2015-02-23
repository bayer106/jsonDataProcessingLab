'use strict';
angular.module('jsonDataProcessingLabApp')
  .controller('MajorCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];
    $scope.majorArray = [];

    $http.get('/api/students').success(function(myStudents) {
      $scope.myStudents = myStudents;
      socket.syncUpdates('student', $scope.myStudents);
      $scope.populateMajorArray();
    });

    $scope.populateMajorArray = function(){
      for(var i=0; i<$scope.myStudents.length; i++){
        if($scope.myStudents[i].major1 == null){
          $scope.majorArray.push({firstName:$scope.myStudents[i].firstName, lastName:$scope.myStudents[i].lastName, major:"No Declared Major"});
          console.log($scope.majorArray[1].major);
        } else {
          $scope.majorArray.push({firstName:$scope.myStudents[i].firstName, lastName:$scope.myStudents[i].lastName, major:$scope.myStudents[i].major1});
          console.log("this student did have a major :" + $scope.myStudents[i].firstName);
        }
      }
    };

    //putting "-" in front of the property changes the sorting order from ascending to descending
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

