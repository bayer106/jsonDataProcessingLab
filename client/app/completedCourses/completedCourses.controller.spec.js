'use strict';

describe('Controller: CompletedCoursesCtrl', function () {

  // load the controller's module
  beforeEach(module('jsonDataProcessingLabApp'));
  beforeEach(module('socketMock'));

  var CompletedCoursesCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/students')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    CompletedCoursesCtrl = $controller('CompletedCoursesCtrl', {
      $scope: scope
    });
  }));

  describe('testing isGradeValid', function() {
      it('should return true for grade A through d', function () {
        $httpBackend.flush();
        expect(scope.isGradeValid("a")).toBeTruthy();
        expect(scope.isGradeValid("b")).toBeTruthy();
        expect(scope.isGradeValid("c")).toBeTruthy();
        expect(scope.isGradeValid("d")).toBeTruthy();
      });

    it('should return true for both lower and upper case grades that are in the right range', function () {
      $httpBackend.flush();
      expect(scope.isGradeValid("a")).toBeTruthy();
      expect(scope.isGradeValid("B")).toBeTruthy();
      expect(scope.isGradeValid("b")).toBeTruthy();
      expect(scope.isGradeValid("D")).toBeTruthy();
    });

    it('should return false for grades not in the A - D range', function() {
        expect(scope.isGradeValid("F")).toBeFalsy();
        expect(scope.isGradeValid("IP")).toBeFalsy();
    });
  });

  describe ('testing totalCreditsForStudent', function(){
    it('should have 50 credits', function(){
      var student1 ={ "courses": [
        {
          "course": {
            "name": "Models of Computing Systems",
            "subject": "CSCI",
            "courseNumber": 3401,
            "credits": 5
          },
          "grade": "A"
        },
        {
          "course": {
            "name": "Software Design and Development",
            "subject": "CSCI",
            "courseNumber": 3601,
            "credits": 5
          },
          "grade": "D"
        },
        {
          "course": {
            "name": "Psychology",
            "subject": "PSYC",
            "courseNumber": 1101,
            "credits": 4
          },
          "grade": "F"
        }]};
      expect(scope.totalCreditsForStudent(student1).toEqual(10));
    });
  });
});

