'use strict';

angular.module('jsonDataProcessingLabApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {'title': 'Home', 'link': '/'}
    ];
    $scope.search = [
      {'title': 'Students by Course', 'link': '/course'},
      {'title': 'Students by Student Status', 'link': '/studentstatus'},
      {'title': 'Courses taken by a Student', 'link': '/allcourses'},
      {'title': 'Detailed Information for a Student', 'link': '/studentinfo'},
      {'title': 'Successfully Completed Courses by a Student', 'link': '/completedcourses'}
    ];

    $scope.list = [
      {'title': 'Name', 'link': '/name'},
      {'title': 'GPA', 'link': '/gpa'},//if you change link to html, goes to that page
      {'title': 'Major', 'link': '/major'},
      {'title': 'DOB', 'link': '/dob'}
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
