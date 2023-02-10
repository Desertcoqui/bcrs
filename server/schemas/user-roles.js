const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userRoleSchema = new Schema({
    text: {type: String, default: 'standard'}
})

module.exports = userRoleSchema;
