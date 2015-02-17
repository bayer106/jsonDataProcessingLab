'use strict';

angular.module('jsonDataProcessingLabApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('completedCourses', {
        url: '/completedcourses',
        templateUrl: 'app/completedCourses/completedCourses.html',
        controller: 'CompletedCoursesCtrl'
      });
  });
