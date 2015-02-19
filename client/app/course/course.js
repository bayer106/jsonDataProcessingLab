'use strict';

angular.module('jsonDataProcessingLabApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('course', {
        url: '/course',
        templateUrl: 'app/course/course.html',
        controller: 'CourseCtrl'
      });
  });
