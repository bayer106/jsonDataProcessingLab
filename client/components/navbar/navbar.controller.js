'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {'title': 'Home', 'link': '/'}
    ];
    $scope.search = [
      {'title': 'Course', 'link': '/'},
      {'title': 'Student Status', 'link': '/studentstatus'}
    ];
    $scope.display = [
      {'title': 'Detailed Information', 'link': '/studentinfo'},
      {'title': 'All Courses', 'link': '/allcourses'}
    ];
    $scope.list = [
      {'title': 'Name', 'link': '/name'},
      {'title': 'GPA', 'link': '/gpa'},//if you change link to html, goes to that page
      {'title': 'Major', 'link': '/major'},
      {'title': 'DOB', 'link': '/dob'},
      {'title': 'Completed Courses', 'link': '/completedcourses'}
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function (route) {
      return route === $location.path();
    };
  });
