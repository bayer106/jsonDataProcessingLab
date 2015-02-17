'use strict';

angular.module('jsonDataProcessingLabApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('successfulCredits', {
        url: '/successfulcredits',
        templateUrl: 'app/successfulCredits/successfulCredits.html',
        controller: 'SuccessfulCreditsCtrl'
      });
  });
