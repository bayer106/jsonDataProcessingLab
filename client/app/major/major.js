'use strict';

angular.module('jsonDataProcessingLabApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('major', {
        url: '/major',
        templateUrl: 'app/major/major.html',
        controller: 'MajorCtrl'
      });
  });
