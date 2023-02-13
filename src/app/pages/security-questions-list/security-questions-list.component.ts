// Title: Bobs Computer Repair Shop
// Author: Professor Krasso
// Date: Feb 10 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
//https://www.youtube.com/watch?v=WDrU305J1yw
// In-Class tutorials

import { Component, OnInit } from "@angular/core";
import { SecurityQuestionService } from "./../../shared/services/security-question.service";
import { SecurityQuestion } from "./../../shared/models/security-question.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, ConfirmEventType } from "primeng/api";

@Component({
  selector: "app-security-questions-list",
  templateUrl: "./security-questions-list.component.html",
  styleUrls: ["./security-questions-list.component.css"],
  providers: [ConfirmationService],
})
export class SecurityQuestionsListComponent implements OnInit {
  securityQuestions: SecurityQuestion[];
  sqForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private securityQuestionService: SecurityQuestionService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {
    this.securityQuestions = [];

    this.securityQuestionService.findAllSecurityQuestions().subscribe({
      next: (res) => {
        this.securityQuestions = res.data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {}

  create(): void {
    const sqText = this.sqForm.controls["text"].value;
    const newSq = {
      text: sqText,
    };
    this.securityQuestionService.createSecurityQuestion(newSq).subscribe({
      next: (res) => {
        this.securityQuestions.push(res.data);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.sqForm.controls["text"].setErrors({ incorrect: false });
      },
    });
  }

  delete(sqId: string): void {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete record",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.securityQuestionService.deleteSecurityQuestion(sqId).subscribe({
          next: (res) => {
            console.log("Security question deleted successfully!");
            this.securityQuestions = this.securityQuestions.filter((sq) => sq._id !== sqId);
          },
          error: (e) => {
            console.log(e);
          },
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            console.log("User rejected this operation");
            break;
          case ConfirmEventType.CANCEL:
            console.log("User canceled this operation");
            break;
        }
      },
    });
  }
}
