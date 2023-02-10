// Title: Bobs Computer Repair Shop
// Author: Professor Krasso
// Date: Feb 10 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
//https://www.youtube.com/watch?v=WDrU305J1yw
// In-Class tutorials

// import required statements
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const BaseResponse = require("../models/base-response");
const ErrorResponse = require("../models/error-response");

// configuration for routes
const router = express.Router();

/**
 * login
 * @openapi
 * /api/session/login:
 *   post:
 *     tags:
 *       - Session
 *     description: API to login user
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *              userName:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid username and/or password, please try again
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/login", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const signinMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(signinMongodbErrorResponse.toObject());
      } else {
        console.log(user);

        /**
         * if username is valid
         */
        if (user) {
          let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // compares hashed PW with signin PW

          let isDisabled = user.isDisabled;
          console.log("isDisabled below:");
          console.log(isDisabled);
          /**
           * if password is valid
           */
          if (passwordIsValid && !isDisabled) {
            console.log(`Login successful`);
            const signinResponse = new BaseResponse(200, "Login successful", user);
            res.json(signinResponse.toObject());
          } else {
            /**
             * if password is NOT valid
             */
            console.log(`Invalid password for username: ${user.userName}`);
            const invalidPasswordResponse = new BaseResponse(
              401,
              "Invalid username and/or password, please try again",
              null
            );
            res.status(401).send(invalidPasswordResponse.toObject());
          }
        } else {
          /**
           * if the username is NOT valid
           */
          console.log(`Username: ${req.body.userName} is invalid`);
          const invalidUsernameResponse = new BaseResponse(
            200,
            "Invalid username and/or password, please try again",
            null
          );
          res.status(401).send(invalidUsernameResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const signinCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(signinCatchErrorResponse.toObject());
  }
});
