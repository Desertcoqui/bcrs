/**
 * Bob's Computer Repair Shop
 * Author: Professor Krasso
 * Modified: Kailee Stephens
 * Date : 02/20/2023
 * Description: ts code for login page
 */

import { Component, OnInit } from "@angular/core";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { SecurityQuestion } from "../../shared/models/security-question.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Message } from "primeng/api";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { SecurityQuestionService } from "../../shared/services/security-question.service";
import { SelectedSecurityQuestion } from "../../shared/models/selected-security-question.interface";
import { User } from "../../shared/models/user.interface";
import { SessionService } from "../../shared/services/session.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RegisterComponent implements OnInit {
  securityQuestions: SecurityQuestion[];
  errorMessages: Message[];
  user: User;
  selectedSecurityQuestions: SelectedSecurityQuestion[];

  contactForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required])],
    address: [null, Validators.compose([Validators.required])],
  });

  sqForm: FormGroup = this.fb.group({
    securityQuestion1: [null, Validators.compose([Validators.required])],
    securityQuestion2: [null, Validators.compose([Validators.required])],
    securityQuestion3: [null, Validators.compose([Validators.required])],
    answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
    answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
    answerToSecurityQuestion3: [null, Validators.compose([Validators.required])],
  });

  credForm: FormGroup = this.fb.group({
    userName: [null, Validators.compose([Validators.required])],
    password: [
      null,
      Validators.compose([Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")]),
    ],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private securityQuestionService: SecurityQuestionService,
    private sessionService: SessionService
  ) {
    this.securityQuestions = [];
    this.errorMessages = [];
    this.user = {} as User;
    this.selectedSecurityQuestions = [];

    this.securityQuestionService.findAllSecurityQuestions().subscribe({
      next: (res) => {
        this.securityQuestions = res.data;
        console.log(this.securityQuestions);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {}

  register() {
    const contactInformation = this.contactForm.value;
    const securityQuestions = this.sqForm.value;
    const credentials = this.credForm.value;

    this.selectedSecurityQuestions = [
      {
        questionText: securityQuestions.securityQuestion1,
        answerText: securityQuestions.answerToSecurityQuestion1,
      },
      {
        questionText: securityQuestions.securityQuestion2,
        answerText: securityQuestions.answerToSecurityQuestion2,
      },
      {
        questionText: securityQuestions.securityQuestion3,
        answerText: securityQuestions.answerToSecurityQuestion3,
      },
    ];
    console.log(this.selectedSecurityQuestions);

    this.user = {
      userName: credentials.userName,
      password: credentials.password,
      firstName: contactInformation.firstName,
      lastName: contactInformation.lastName,
      phoneNumber: contactInformation.phoneNumber,
      address: contactInformation.address,
      email: contactInformation.email,
      selectedSecurityQuestions: this.selectedSecurityQuestions,
    };
    console.log(this.user);

    this.sessionService.register(this.user).subscribe({
      next: (res) => {
        this.cookieService.set("sessionuser", credentials.userName, 1);
        this.router.navigate(["/"]);
      },
      error: (e) => {
        this.errorMessages = [{ severity: "error", summary: "Error", detail: e.message }];
        console.log("Node.js server error; message:${e.message}");
        console.log(e);
      },
    });
  }
}
