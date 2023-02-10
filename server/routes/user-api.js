/**
 * Title: user-api.js
 * Author: Manel Phiseme, Ferdinand Detres,  Kailee Stephens
 * Date : 02/09/2023
 * Description: CRUD APIS for users
 */

// require statements
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");

const router = express.Router();
const saltRounds = 10; // default salt rounds for hashing algorithm
/**
 * createUser
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     description: API to create new user objects
 *     summary: Creates a new user object
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
 *         description: Query successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/", async (req, res) => {
  try {
    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
    standardRole = {
      text: "standard",
    };

    // user object
    let newUser = {
      userName: req.body.userName,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
      role: standardRole,
    };

    User.create(newUser, function (err, user) {
      if (err) {
        console.log(err);
        const createUserMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(createUserMongodbErrorResponse.toObject());
      } else {
        console.log(user);
        const createUserResponse = new BaseResponse(200, "Query successful", user);
        res.json(createUserResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const createUserCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(createUserCatchErrorResponse.toObject());
  }
});

/**
 * findAll
 * @openapi
 * /api/users:
 *  get:
 *      tags:
 *          - Users
 *      description: This Api for returning an array users objects
 *      summary: Return a list of all users
 *      responses:
 *          '200':
 *              description: array of users
 *          '500':
 *              description: Server Exception.
 *          '501':
 *              description: MongoDB Exception
 */
router.get("/", async (req, res) => {
  try {
    User.find({}, function (err, users) {
      if (err) {
        console.log(err);
        const findAllMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(findAllMongodbErrorResponse.toObject());
      } else {
        console.log(users);
        const findAllUsersResponse = new BaseResponse(200, "Query successful", users);
        res.json(findAllUsersResponse.toObjet());
      }
    });
  } catch (e) {
    const findAllCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});
/**
 * updateUser
 * @openapi
 * /api/user/{id}
 *  post:
 *      tags:
 *          - user
 *      description: This api update a user
 *      summary: update an employee
 *      parameters:
 *          - in: path
 *            name: id
 *            description: the id of the employee to update
 *            required: yes
 *            schema:
 *              type: number
 *      response:
 *          '200':
 *              description: The updated document
 *          '500':
 *              description: Server Exception
 *          '501':
 *              description: MongoDB Exception
 */
router.post("/:id", async (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const updateUserMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(updateUserMongodbErrorResponse.toObject());
      } else {
        console.log(user);

        user.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          email: req.body.email,
        });
        user.save(function (err, savedUser) {
          if (err) {
            console.log(err);
            const saveUserMongodbErrorResponse = new ErrorResponse(500, "Iternal server error", err);
            res.status(500).send(saveUserMongodbErrorResponse.toObject());
          } else {
            console.log(savedUser);
            const saveUserResponse = new BaseResponse(200, "Query successful", savedUser);
            res.json(saveUserResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const updateUserCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(updateUserCatchErrorResponse.toObject());
  }
});
module.exports = router;
