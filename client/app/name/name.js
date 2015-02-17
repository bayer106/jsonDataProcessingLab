'use strict';

angular.module('jsonDataProcessingLabApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('name', {
        url: '/name',
        templateUrl: 'app/name/name.html',
        controller: 'NameCtrl'
      });
  });
