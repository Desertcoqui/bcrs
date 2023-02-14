// Title: Bobs Computer Repair Shop
// Author: Professor Krasso
// Date: Jan 11 2023
// Modified By: Ferdinand Detres Jr, Manel Phisme, Kailee Stephens
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
//https://www.youtube.com/watch?v=WDrU305J1yw
// In-Class tutorials

/**
 * Require statements
 */
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express(); // Express variable.

/**
 * Routes
 */
const UserApi = require("./routes/user-api");
const SessionApi = require("./routes/session-api");
const SecurityQuestionApi = require("./routes/security-question-api");

// default server port value.
const PORT = process.env.PORT || 3000;

// created database on Feb 10 8:24AM Central Time
const CONN = "mongodb+srv://admin:s3cret@bcrsdb.hdw2zdb.mongodb.net/bcrsDB?retryWrites=true&w=majority";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WEB 450 RESTful APIs",
      version: "1.0.0",
    },
  },
  apis: ["./server/routes/*.js"], //files containing annotations for the OpenApi Specification
};

const openapiSpecification = swaggerJsdoc(options);

/**
 * APIs
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/bcrs")));
app.use("/", express.static(path.join(__dirname, "../dist/bcrs")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api/users", UserApi);
app.use("/api/session", SessionApi);
app.use("/api/security-questions", SecurityQuestionApi);

/**
 * Database connection.
 */
mongoose.set("strictQuery", false);
mongoose
  .connect(CONN)
  .then(() => {
    console.log("Connection to the database was successful");
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log("Application started and listening on PORT: " + PORT);
});
