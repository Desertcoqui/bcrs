// Title: Bobs Computer Repair Shop
// Author: Professor Krasso
// Date: Feb 23 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
//https://www.youtube.com/watch?v=WDrU305J1yw
// In-Class tutorials

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//title and price imported from line-item schema
const lineItemDocument = require("../schemas/line-item");

const invoiceSchema = new Schema(
  {
    userName: { type: String },
    lineItems: [lineItemDocument],
    partsAmount: { type: Number },
    laborAmount: { type: Number },
    lineItemTotal: { type: Number },
    total: { type: Number },
    orderDate: { type: Date, default: new Date() },
  },
  //specific collection name
  { collection: "invoices" }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
