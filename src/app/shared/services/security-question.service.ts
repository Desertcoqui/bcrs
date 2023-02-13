/**
 * user.js
 * Author: Professor Krasso
 * Modified: Manel Phiseme
 * Date : 02/12/2023
 * Description: contains service for the task (uses the get and post http methods to retrieve and send data to database)
 */

//imported statement
import { SecurityQuestion } from '../models/security-question.interface';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionService {



  constructor(private http: HttpClient) { }

  /**
   * function to find all security questions   *
   */
  findAllSecurityQuestions(): Observable<any>{
    return this.http.get('/api/security-questions');    
  }

  /**
   * function to find all security questions by id
   */
  findSecurityQuestionById(questionId: string): Observable<any>{
    return this.http.get('/api/security-questions/' + questionId);

  }

  /**
   * function to create security questions
   */
  createSecurityQuestion(newSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.post('/api/security-questions', {
      text: newSecurityQuestion.text
    })
  }

  /**
   * function to create security questions
   */
  updateSecurityQuestion(questionId:string, updatedSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.put('/api/security-questions/' + questionId, {
      text: updatedSecurityQuestion.text
    })
  }

  /**
   * function to delete security questions
   */
  deleteSecurityQuestion(questionId: string): Observable<any>{
    return this.http.delete('/api/security-questions/' + questionId);
  }
}
