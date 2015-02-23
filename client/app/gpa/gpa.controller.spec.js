'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('jsonDataProcessingLabApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/students')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('GpaCtrl', {
      $scope: scope
    });
  }));

  describe('testing returnGradeValue', function() {
    it('should return 4.0 for A', function () {
      expect(scope.returnGradeValue("A")).toEqual(4.0);
    });

    it('should return 3.0 for B', function () {
      expect(scope.returnGradeValue("B")).toEqual(3.0);
    });

    it('should return 2.0 for C', function () {
      expect(scope.returnGradeValue("C")).toEqual(2.0);
    });

    it('should return 1.0 for D', function () {
      expect(scope.returnGradeValue("D")).toEqual(1.0);
    });

    it('should return 0.0 for F', function () {
      expect(scope.returnGradeValue("F")).toEqual(0.0);
    });
  });
});

