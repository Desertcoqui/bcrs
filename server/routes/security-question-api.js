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
    SecurityQuestion.findOne({ _id: req.params.id }, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        const findByIdMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(findByIdMongodbErrorResponse.toObject());
      } else {
        console.log(securityQuestion);
        const findByIdResponse = new BaseResponse(200, "Query successful", securityQuestion);
        res.json(findByIdResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const findByIdCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
});
/**
 *findAll
 * @openapi
 * /api/security-questions:
 *   get:
 *      summary: find all questions
 *      description: returns a list of all questions
 *      responses:
 *           '200':    # status code
 *           description: List of all tasks
 *           content:
 *               application/json:
 *               schema:
 *                   type: array
 *                   items:
 *                   type: string
 *           '500':    # status code
 *           description: Server exceptions
 *           content:
 *               application/json:
 *               schema:
 *                   type: array
 *                   items:
 *                   type: string
 *           '501':    # status code
 *           description: MongoDB exceptions
 *           content:
 *               application/json:
 *               schema:
 *                   type: array
 *                   items:
 *                   type: string
 */
router.get("/", async (req, res) => {
  try {
    SecurityQuestion.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, securityQuestions) {
        if (err) {
          console.log(err);
          const findAllMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
          res.status(500).send(findAllMongodbErrorResponse.toObject());
        } else {
          console.log(securityQuestions);
          const findAllResponse = new BaseResponse(200, "Query successful", securityQuestions);
          res.json(findAllResponse.toObject());
        }
      });
  } catch (e) {
    console.log(e);
    const findAllCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
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