'use strict';

angular.module('jsonDataProcessingLabApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('studentStatus', {
        url: '/studentstatus',
        templateUrl: 'app/studentStatus/studentStatus.html',
        controller: 'StudentStatusCtrl'
      });
  });
