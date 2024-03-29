/**
 * Title: security-question-api.js
 * Author: Manel Phiseme, Ferdinand Detres,  Kailee Stephens
 * Date : 02/08/2023
 * Description: CRUD APIS for Security Questions
 */

const express = require("express");
const SecurityQuestion = require("../models/security-question");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");

//configurations
const router = express.Router();
/**
 * findById
 * @openapi
 * /api/security-questions/{id}:
 *  get:
 *    tags:
 *      - Security Questions
 *    description: API for returning a single security question object from MongoDB
 *    summary: Returns a security question document
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The security question id requested by user
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
router.get("/:id", async (req, res) => {
  try {
    //find security question by ID
    SecurityQuestion.findOne({ _id: req.params.id }, function (err, securityQuestion) {
      if (err) {
        //catch internal server error 500
        console.log(err);
        const findByIdMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(findByIdMongodbErrorResponse.toObject());
      } else {
        //disppay correct security question if info correct
        console.log(securityQuestion);
        const findByIdResponse = new BaseResponse(200, "Query successful", securityQuestion);
        res.json(findByIdResponse.toObject());
      }
    });
  } catch (e) {
    //display internal server error
    console.log(e);
    const findByIdCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
});
/**
 * findAll
 * @openapi
 * /api/security-questions:
 *   get:
 *     tags:
 *       - Security Questions
 *     description:  API for returning all Security Questions
 *     summary: returns all user security question
 *     responses:
 *       '200':
 *         description: List of security questions
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 * */
router.get("/", async (req, res) => {
  try {
    /* finds all security questions if isDisabled key is set to false */
    SecurityQuestion.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, securityQuestion) {
        if (err) {
          /* handles server error */
          console.log(err);
          const findAllMongodbErrorResponse = new ErrorResponse(500, "Internal Server Error", err);
          res.status(500).send(findAllMongodbErrorResponse.toObject());
        } else {
          /* returns all sq with isDisabled set to false */
          console.log(securityQuestion);
          const findAllResponse = new BaseResponse(200, "Query Successful", securityQuestion);
          res.json(findAllResponse.toObject());
        }
      });
  } catch (e) {
    /* Handles error if try fails */
    console.log(e);
    const findAllCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});
/**
 * CreateSecurityQuestion
 * @openapi
 * /api/security-questions:
 *  post:
 *      tags:
 *          - Employees
 *      description: Api to create questions
 *      summary: create new questions *
 *      requestBody:
 *          description: question title
 *          content:
 *              application/json:
 *                  schema:
 *                      required:
 *                          - text
 *                      properties:
 *                          text:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Security questions document
 *          '500':
 *              description: Server Exception
 *          '501':
 *              description: MondoDB exception
 *
 */
router.post("/", async (req, res) => {
  try {
    let newSecurityQuestion = {
      text: req.body.text,
    };

    SecurityQuestion.create(newSecurityQuestion, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, "internal server error", err);
        res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
      } else {
        console.log(securityQuestion);
        const createSecurityQuestionMongodbErrorResponse = new BaseResponse(200, "Query successful", securityQuestion);
        res.json(createSecurityQuestionMongodbErrorResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
  }
});
/**
 * updateSecurityQuestion
 * @openapi
 * /api/security-questions/{id}:
 *  put:
 *    tags:
 *      - Security Questions
 *    description: API to update security question objects
 *    summary: Updates a new security question object
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The security question id requested by user
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
router.put("/:id", async (req, res) => {
  try {
    SecurityQuestion.findOne({ _id: req.params.id }, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        const updateSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(updateSecurityQuestionMongodbErrorResponse.toObject());
      } else {
        console.log(securityQuestion);

        securityQuestion.set({
          text: req.body.text,
        });

        securityQuestion.save(function (err, savedSecurityQuestion) {
          if (err) {
            console.log(err);
            const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
            res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
          } else {
            console.log(savedSecurityQuestion);
            const updateSecurityQuestionResponse = new BaseResponse(200, "Query Successful", savedSecurityQuestion);
            res.json(updateSecurityQuestionResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const updateSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(updateSecurityQuestionMongodbErrorResponse.toObject());
  }
});
/**
 * deleteSecurityQuestions
 * @openapi
 * /api/security-questions/{id}:
 *   delete:
 *     tags:
 *       - Security Questions
 *     description: API to delete security question objects
 *     summary: Deletes a new security question object
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The security question's id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.delete("/:id", async (req, res) => {
  try {
    SecurityQuestion.findOne({ _id: req.params.id }, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        const deleteSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(deleteSecurityQuestionMongodbErrorResponse.toObject());
      } else {
        console.log(securityQuestion);

        securityQuestion.set({
          isDisabled: true,
        });

        securityQuestion.save(function (err, savedSecurityQuestion) {
          if (err) {
            console.log(err);
            const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
            res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
          } else {
            console.log(savedSecurityQuestion);
            const deleteSecurityQuestionResponse = new BaseResponse(200, "Query successful", savedSecurityQuestion);
            res.json(deleteSecurityQuestionResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const deleteSecurityQuestionCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());
  }
});

module.exports = router;
