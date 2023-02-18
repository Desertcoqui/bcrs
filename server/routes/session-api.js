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
    //test username 
    console.log("test user name value")
    console.log(req.body.userName)
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const signinMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(signinMongodbErrorResponse.toObject());
      } else {
        console.log("test user Database")
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

router.get('/verify/users/:userName', async (req, res)=>{
  try {

    User.findOne({'userName': req.params.userName}, function(err, user){
      if(err){
        console.log(err);
        const verifyUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(verifyUserMongodbErrorResponse.toObject());

      }
      else {
        if(user){
          console.log(user);
          const verifyUserResponse = new BaseResponse('200', 'Query successful', user);
          res.json(verifyUserResponse.toObject());

        }else{
          const invalidUsernameResponse = new BaseResponse('400', 'Invalid username', req.params.userName);
          res.status(400).send(invalidUsernameResponse.toObject());
        }

      }
    })
  }
  catch (e){
    console.log(e);
    const verifyUserCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
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
router.post('/register', async(req, res) => {
  try {
    User.findOne({'userName': req.body.userName}, function(err, user)
    {
      if(err) {
        console.log(err);
        const registerUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(registerUserMongodbErrorResponse.toObject());
      } else {
        if (!user) {
          let hashedPassword = bycrypt.hashSync(req.body.password, saltRounds); // salt/hash password
          standardRole = {
            text: 'standard'
          }

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
            selectedSecurityQuestions: req.body.selectedSecurityQuestions
          };

          User.create(registeredUser, function(err, newUser) {
            if (err) {
              console.log(err);
              const newUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
            } else {
              console.log(newUser); 
              const registeredUserResponse = new BaseResponse('200', 'Query successful', newUser);
              res.json(registeredUserResponse.toObject());
            }
          })
        } else {
          console.log('Username ${req.body.userName} already exists.');
          const userInUseError = new BaseResponse('400', 'The username ${req.body.userName} is already in use.', null);
          res.status(400).send(userInUseError.toObject());
        }
      }
    })
  } catch (e) {
    console.log(e);
    const registeredUserCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
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
router.post('/users/:username/reset-password', async(req, res) => {
  try {
    const password = req.body.password;
    User.findOne({'username': req.params.userName}, function(err, user) {
      if (err) {
        console.log(err);
        const resetPasswordMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
      } else {
        console.log(user);
        let hashedPassword = bycrypt.hashSync(password, saltRounds); //salt/hash password
        user.set({
          password: hashedPassword
        });

        user.save(function(err, updatedUser) {
          if (err) {
            console.log(err);
            const updatedUserMongodbErrorREsponse = new ErrorResponse('500', 'Internal server error', err);
            res.status(500).send(updatedUserMongodbErrorREsponse.toObject());
          } else {
            console.log(updatedUser);
            const updatedPasswordResponse = new BaseResponse('200', 'Query successful', updatedUser);
            res.json(updatedPasswordResponse.toObject());
          }
        })
      }
    })
  } catch (e) {
    console.log(e);
    const resetPasswordCatchError = new ErrorResponse('500', 'Internal server error', e);
    res.status(500).send(resetPasswordCatchError.toObject());
  }
});

module.exports = router;