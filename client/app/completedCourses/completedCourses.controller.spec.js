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

  scope.myStudents = [ //trying to add student so our test will run
    {
      "firstName": "Love",
      "lastName": "Roberts",
      "dateOfBirth": "1989-01-18",
      "gender": "male",
      "email": "loveroberts@eweville.com",
      "phone": "+1 (875) 519-3316",
      "address": "562 Eastern Parkway, Crayne, Virginia, 5152",
      "courses": [
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
            "name": "PreCalculus I: Functions",
            "subject": "MATH",
            "courseNumber": 1012,
            "credits": 5
          },
          "grade": "C"
        },
        {
          "course": {
            "name": "Calculus II",
            "subject": "MATH",
            "courseNumber": 1102,
            "credits": 5
          },
          "grade": "IP"
        },
        {
          "course": {
            "name": "Data Structures",
            "subject": "CSCI",
            "courseNumber": 2101,
            "credits": 5
          },
          "grade": "A"
        },
        {
          "course": {
            "name": "Theory: Quantum Computing",
            "subject": "CSCI",
            "courseNumber": 4557,
            "credits": 4
          },
          "grade": "B"
        },
        {
          "course": {
            "name": "Beginning French I",
            "subject": "FREN",
            "courseNumber": 1001,
            "credits": 4
          },
          "grade": "C"
        },
        {
          "course": {
            "name": "Intermediate French I",
            "subject": "FREN",
            "courseNumber": 2001,
            "credits": 4
          },
          "grade": "B"
        },
        {
          "course": {
            "name": "Intermediate French II",
            "subject": "FREN",
            "courseNumber": 2002,
            "credits": 4
          },
          "grade": "B"
        },
        {
          "course": {
            "name": "Reading and Analysis of Texts",
            "subject": "FREN",
            "courseNumber": 3401,
            "credits": 4
          },
          "grade": "C"
        },
        {
          "course": {
            "name": "Fundamentals of Genetics, Evolution, and Development",
            "subject": "BIOL",
            "courseNumber": 1101,
            "credits": 3
          },
          "grade": "B"
        },
        {
          "course": {
            "name": "Introduction to Film Studies",
            "subject": "ENGL",
            "courseNumber": 2015,
            "credits": 4
          },
          "grade": "C"
        },
        {
          "course": {
            "name": "Beginning Ceramics",
            "subject": "ARTS",
            "courseNumber": 1050,
            "credits": 3
          },
          "grade": "B"
        }
      ],
      "major1": "ENGLISH",
      "major2": null
    }
  ]

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
      expect(scope.totalCreditsForStudent(scope.myStudents[0]).toBe(50));
    });
  });
});

