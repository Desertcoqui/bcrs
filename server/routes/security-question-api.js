/**
 * Title: security-question-api.js
 * Author: Manel Phiseme, Ferdinand Detres,  Kailee Stephens
 * Date : 02/08/2023
 * Description: CRUD APIS for Security Questions
 */


const express = require('express');
const SecurityQuestion = require('../models/security-question');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');


//configurations
const router = express.Router();

/**
 * openapi: 3.0.0
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
 *              description: MongoDB exception                                                                                          
 * 
 */

/**
 * CreateSecurityQuestion
 */



router.post('/', async(req, res)=>{
   try 
   {
    let newSecurityQuestion ={
        text: req.body.text
    };

    SecurityQuestion.create(newSecurityQuestion, function(err, securityQuestion) {
        if(err)
        {
            console.log(err);
            const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'internal server error', err);
            res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject())
        }
        else 
        {
            console.log(securityQuestion);
            const createSecurityQuestionMongodbErrorResponse = new BaseResponse(200, 'Query successful', securityQuestion);
            res.json(createSecurityQuestionMongodbErrorResponse.toObject());
        }
    })
   }
   catch (e) 
   {
    console.log(e);
    const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());

   }
})

