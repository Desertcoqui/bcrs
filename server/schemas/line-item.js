// Title: Bobs Computer Repair Shop
// Author: Professor Krasso
// Date: Feb 23 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
//https://www.youtube.com/watch?v=WDrU305J1yw
// In-Class tutorials

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//title of items and price
const lineItemSchema = new Schema({
  title: { type: String },
  price: { type: Number },
});

module.exports = lineItemSchema;
