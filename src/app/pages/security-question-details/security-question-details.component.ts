// Title: Bobs Computer Repair Shop
// Author: Professor Krasso
// Date: February 11 2023
// Modified By: Kailee Stephens
// Attributions: In-Class tutorials

import { Component, OnInit } from "@angular/core";
import { SecurityQuestion } from "../../shared/models/security-question.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SecurityQuestionService } from "../../shared/services/security-question.service";
import { Message } from "primeng/api";

@Component({
  selector: "app-security-question-details",
  templateUrl: "./security-question-details.component.html",
  styleUrls: ["./security-question-details.component.css"],
})
export class SecurityQuestionDetailsComponent implements OnInit {

  question: SecurityQuestion;
  questionId: string;
  errorMessages: Message[];

  editForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required])],
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) {
    this.question = {} as SecurityQuestion;
    this.errorMessages = [];
    this.questionId = this.route.snapshot.paramMap.get("questionId") ?? "";

    this.securityQuestionService.findSecurityQuestionById(this.questionId).subscribe({
      next: (res) => {
        this.question = res.date;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.editForm.controls["text"].setValue(this.question.text);
      },
    });
  }

  ngOnInit(): void {}

  save(): void {
    const updatedSecurityQuestion: SecurityQuestion = {
      text: this.editForm.controls["text"].value,
    };

    this.securityQuestionService.updateSecurityQuestion(this.questionId, updatedSecurityQuestion).subscribe({
      next: (res) => {
        this.router.navigate(["/security-questions"]);
      },
      error: (e) => {
        this.errorMessages = [{ severity: "error", summary: "Error", detail: e.message }];
        console.log("error occurred while saving the updated security question");
      },
    });
  }

  cancel(): void {
    this.router.navigate(["/security-questions"]);
  }
}
