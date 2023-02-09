
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserRoleSchema = require('../schemas/user-role');
const SelectedSecurityQuestionSchema = require('../schemas/selected-security-question');

let userSchema = new Schema({
    userName:  {type: String, required: true, unique: true},
    password:  {type: String, required: true},
    firstName: {type: String},
    lastName:  {type: String},
    phoneNumber: {type: String},
    address:   {type: String},
    email:     {type: String},
    isDisable:  {type:Boolean, default: false},
    role:       UserRoleSchema,
    selectedSecurityQuestions: [SelectedSecurityQuestionSchema],
    dateCreated: {type: Date, default: new Date()},
    dateModified: {type: Date}
}, {collection: 'users'})


module.exports = mongoose.model('User', userSchema)