'use strict';

angular.module('jsonDataProcessingLabApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dob', {
        url: '/dob',
        templateUrl: 'app/dob/dob.html',
        controller: 'DobCtrl'
      });
  });
