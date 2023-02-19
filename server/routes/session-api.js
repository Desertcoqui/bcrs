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
const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");

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
/**
 * VerifyUser
 * @openapi
 * /api/user/verify/users/{userName}:
 *  get:
 *    tags:
 *      - User
 *    description: Api to verify user
 *    summary: Return verified user
 *    parameters:
 *      - name: userName
 *        in: path
 *        required: true
 *        description: The name of the user that need to be verified
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Query successful
 *      "500":
 *        description: Internal server error
 *      "501":
 *        description: MongoDB Exception
 */

router.get("/verify/users/:userName", async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const verifyUserMongodbErrorResponse = new ErrorResponse("500", "Internal server error", err);
        res.status(500).send(verifyUserMongodbErrorResponse.toObject());
      } else {
        if (user) {
          console.log(user);
          const verifyUserResponse = new BaseResponse("200", "Query successful", user);
          res.json(verifyUserResponse.toObject());
        } else {
          const invalidUsernameResponse = new BaseResponse("400", "Invalid username", req.params.userName);
          res.status(400).send(invalidUsernameResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const verifyUserCatchErrorResponse = new ErrorResponse("500", "Internal server error", e.message);
    res.status(500).send(verifyUserCatchErrorResponse.toObject());
  }
});
/**
 * register
 * @openapi
 * /api/session/register:
 *   post:
 *     tags:
 *       - Session
 *     description: API to register user
 *     summary: Register user
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
router.post("/register", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const registerUserMongodbErrorResponse = new ErrorResponse("500", "Internal server error", err);
        res.status(500).send(registerUserMongodbErrorResponse.toObject());
      } else {
        if (!user) {
          let hashedPassword = bycrypt.hashSync(req.body.password, saltRounds); // salt/hash password
          standardRole = {
            text: "standard",
          };

          //user object
          let registeredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            role: standardRole,
            selectedSecurityQuestions: req.body.selectedSecurityQuestions,
          };

          User.create(registeredUser, function (err, newUser) {
            if (err) {
              console.log(err);
              const newUserMongodbErrorResponse = new ErrorResponse("500", "Internal server error", err);
            } else {
              console.log(newUser);
              const registeredUserResponse = new BaseResponse("200", "Query successful", newUser);
              res.json(registeredUserResponse.toObject());
            }
          });
        } else {
          console.log("Username ${req.body.userName} already exists.");
          const userInUseError = new BaseResponse("400", "The username ${req.body.userName} is already in use.", null);
          res.status(400).send(userInUseError.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const registeredUserCatchErrorResponse = new ErrorResponse("500", "Internal server error", e.message);
    res.status(500).send(registeredUserCatchErrorResponse.toObject());
  }
});
/**
 * resetPassword
 * @openapi
 * /api/session/users/:username/reset-password:
 *   post:
 *     tags:
 *       - Session
 *     description: API to reset password
 *     summary: Reset a users password
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
router.post("/users/:username/reset-password", async (req, res) => {
  try {
    const password = req.body.password;
    User.findOne({ username: req.params.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const resetPasswordMongodbErrorResponse = new ErrorResponse("500", "Internal server error", err);
        res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
      } else {
        console.log(user);
        let hashedPassword = bycrypt.hashSync(password, saltRounds); //salt/hash password
        user.set({
          password: hashedPassword,
        });

        user.save(function (err, updatedUser) {
          if (err) {
            console.log(err);
            const updatedUserMongodbErrorREsponse = new ErrorResponse("500", "Internal server error", err);
            res.status(500).send(updatedUserMongodbErrorREsponse.toObject());
          } else {
            console.log(updatedUser);
            const updatedPasswordResponse = new BaseResponse("200", "Query successful", updatedUser);
            res.json(updatedPasswordResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const resetPasswordCatchError = new ErrorResponse("500", "Internal server error", e);
    res.status(500).send(resetPasswordCatchError.toObject());
  }
});
/**
 * VerifySecurityQuestions
 **/
/**
 * verifySecurityQuestions
 * @openapi
 * /api/session/verify/users/{userName}/security-questions:
 *  post:
 *    tags:
 *      - Session
 *    description: API for comparing users entered security question answers against what's saved in user document
 *    summary: Verifies user's security question answers
 *    parameters:
 *      - name: userName
 *        in: path
 *        required: true
 *        description: The username requested by user
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - questionText1
 *              - questionText2
 *              - questionText3
 *              - answerText1
 *              - answerText2
 *              - answerText3
 *            properties:
 *              questionText1:
 *                type: string
 *              questionText2:
 *                type: string
 *              questionText3:
 *                type: string
 *              answerText1:
 *                type: string
 *              answerText2:
 *                type: string
 *              answerText3:
 *                type: string
 *    responses:
 *      "200":
 *        description: Query successful
 *      "400":
 *        description: Invalid username
 *      "500":
 *        description: Internal server error
 *      "501":
 *        description: MongoDB Exception
 */
router.post("/verify/users/:userName/security-questions", async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const verifySecurityQuestionsMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(verifySecurityQuestionsMongodbErrorResponse.toObject());
      } else {
        const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(
          (q) => q.questionText === req.body.questionText1
        );
        const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(
          (q2) => q2.questionText === req.body.questionText2
        );
        const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find(
          (q3) => q3.questionText === req.body.questionText3
        );

        const isValidAnswerOne = selectedSecurityQuestionOne.answerText === req.body.answerText1;
        const isValidAnswerTwo = selectedSecurityQuestionTwo.answerText === req.body.answerText2;
        const isValidAnswerThree = (selectedSecurityQuestionThree.answerText = req.body.answerText3);

        if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree) {
          console.log(`User ${user.userName} answered their security questions correctly`);
          const validSecurityQuestionsResponse = new BaseResponse(200, "Success", user);
          res.json(validSecurityQuestionsResponse.toObject());
        } else {
          console.log(`User ${user.userName} did not answer their security questions correctly`);
          const invalidSecurityQuestionsResponse = new BaseResponse(200, "Error", user);
          res.json(invalidSecurityQuestionsResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
  }
});

module.exports = router;
