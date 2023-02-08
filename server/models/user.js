const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {type: String, unique: true, require:true},
    firstName: {type: String},
    lastName: {type: String}
})

module.exports = mongoose.model('User', userSchema)