'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('DobCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];

    $http.get('/api/students').success(function(myStudents) {
      $scope.myStudents = myStudents;
      socket.syncUpdates('student', $scope.myStudents);
    });

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
      }
    });


