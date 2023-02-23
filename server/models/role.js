// Title: Bobs Computer Repair Shop
// Author: Professor Krasso
// Date: Feb 23 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
//https://www.youtube.com/watch?v=WDrU305J1yw
// In-Class tutorials

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    text: { type: String, unique: true },
    isDisabled: { type: Boolean, default: false },
  },
  //specifying collection name
  { collection: "roles" }
);

module.exports = mongoose.model("Role", roleSchema);
