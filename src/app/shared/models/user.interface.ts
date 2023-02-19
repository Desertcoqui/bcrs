// Title: Bobs Computer Repair Shop
// Author: Professor Krasso
// Date: Feb 10 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
//https://www.youtube.com/watch?v=WDrU305J1yw
// In-Class tutorials

import { SelectedSecurityQuestion } from "./selected-security-question.interface";


export interface User {
  _id?: string;
  userName?: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string; 
  selectedSecurityQuestions?: SelectedSecurityQuestion[]; 
}
