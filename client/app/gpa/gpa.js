'use strict';

angular.module('jsonDataProcessingLabApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('gpa', {
        url: '/gpa',
        templateUrl: 'app/gpa/gpa.html',
        controller: 'GpaCtrl'
      });
  });
