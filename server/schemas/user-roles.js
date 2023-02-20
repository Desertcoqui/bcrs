/**
 * Title: user-api.js
 * Author: Manel Phiseme
 * Date : 02/09/2023
 * Description: schema for user roles.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userRoleSchema = new Schema({
    text: {type: String, default: 'standard'}
})

module.exports = userRoleSchema;
