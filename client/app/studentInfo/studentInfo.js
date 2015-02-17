'use strict';

angular.module('jsonDataProcessingLabApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('studentInfo', {
        url: '/studentinfo',
        templateUrl: 'app/studentInfo/studentInfo.html',
        controller: 'StudentInfoCtrl'
      });
  });
