/**
 * app-routing.module.ts
 * Author: Professor Krasso
 * Modified: Manel Phiseme, Ferdinand Detres
 * Date : 02/12/2023
 * Description: tis code define the application routes
 */

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { SecurityQuestionDetailsComponent } from "./pages/security-question-details/security-question-details.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { SecurityQuestionsListComponent } from "./pages/security-questions-list/security-questions-list.component";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "users",
        component: UserListComponent,
      },
      {
        path: "users/:userId",
        component: HomeComponent,
      },
      {
        path: "users/create/new",
        component: UserDetailsComponent,
      },
      {
        path: "security-questions",
        component: SecurityQuestionsListComponent,
      },
      {
        path: "security-questions/:questionId",
        component: SecurityQuestionDetailsComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: "session",
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
