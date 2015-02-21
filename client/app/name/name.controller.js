'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('NameCtrl', function ($scope, $http, socket) {
    $scope.myStudents = [];
    $scope.orderButton = 1;

    $http.get('/api/students').success(function(myStudents) {
      $scope.myStudents = myStudents;
      socket.syncUpdates('student', $scope.myStudents);
    });

    //source: http://stackoverflow.com/questions/1129216/sorting-objects-in-an-array-by-a-field-value-in-javascript
    // put "-" in front of the property to sort in descending order
    $scope.orderBy = function (property) {
      var sortOrder = 1;
      if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a,b) {
        //var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        var result = 0;
        if (a[property] < b[property]) {
          result = -1;
        } else if (a[property] > b[property]) {
          result=1;
        } else {
          result = 0;
        }
        return result * sortOrder;
      }
    }
    $scope.retrieveSwitch = function(){
      if($scope.orderButton == 1){
        return "lastName";
      }else if ($scope.orderButton == 2){
        return "firstName";
      }
    };

    $scope.changeSwitch = function(num){
      $scope.orderButton = num;
    };

    $scope.getOrder = function(){
      if($scope.orderButton == 1){
        return "Last Name";
      }else if($scope.orderButton){
        return "First Name";
      }
    }
  });

