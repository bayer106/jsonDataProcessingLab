'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var StudentSchema = new Schema({
  "firstName": String,
  "lastName": String,
  "dateOfBirth": String,
  "gender": String,
  "email": String,
  "phone": String,
  "address": String,
  "courses": [
    {
      "course": {
        "name": String,
        "subject": String,
        "courseNumber": Number,
        "credits": Number
      },
      "grade": String
    }],
  "major1":String,
  "major2": String
});

module.exports = mongoose.model('Student', StudentSchema);
