'use strict';

angular.module('jsonDataProcessingLabApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('allCourses', {
        url: '/allcourses',
        templateUrl: 'app/allCourses/allCourses.html',
        controller: 'AllCoursesCtrl'
      });
  });
