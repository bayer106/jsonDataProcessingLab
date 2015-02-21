'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('MajorCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];

    $http.get('/api/students').success(function(myStudents) {
      $scope.myStudents = myStudents;
      socket.syncUpdates('student', $scope.myStudents);
    });

    $scope.orderBy = function (property) {
      var sortOrder = 1;
      if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a,b) {
        var isPropertyBNull = b[property] !== null;
        var isPropertyANull = a[property] !== null;
        var result = 0;
        if ((a[property] < b[property]) && isPropertyBNull) {
          result = -1;
        } else if ((a[property] > b[property]) &&  isPropertyANull) {
          result=1;
        } else {
          result = 2;
        }
        return result * sortOrder;
      }
    }
  });

