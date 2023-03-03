// Title: Bobs Computer Repair Shop
// Author: Professor Krasso
// Date: Feb 10 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
//https://www.youtube.com/watch?v=WDrU305J1yw
// In-Class tutorials

import { Component, OnInit } from "@angular/core";
import { User } from "../../shared/models/user.interface";
import { UserService } from "../../shared/services/user.service";
import { ConfirmationService, ConfirmEventType } from "primeng/api";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
  providers: [ConfirmationService],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private confirmationService: ConfirmationService) {
    this.userService.findAllUsers().subscribe({
      next: (res) => {
        this.users = res.date;      
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {}
  delete(userId: string) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete record",
      header: "Confirmations",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.userService.deleteUser(userId).subscribe({
          next: (res) => {
            console.log("User deleted successfully");
            this.users = this.users.filter((user) => user._id !== userId);
          },
          error: (e) => {
            console.log(e);
          },
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            console.log("User rejected this Operation!");
            break;
          case ConfirmEventType.CANCEL:
            console.log("User canceled this Operations!");
            break;
        }
      },
    });
  }
}
