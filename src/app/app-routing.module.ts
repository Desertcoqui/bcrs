/**
 * app-routing.module.ts
 * Author: Professor Krasso
 * Modified: Manel Phiseme, Ferdinand Detres
 * Date : 02/12/2023
 * Description: tis code define the application routes
 */

import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { SecurityQuestionDetailsComponent } from "./pages/security-question-details/security-question-details.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { SecurityQuestionListComponent } from "./pages/security-question-list/security-question-list.component";
import { UserCreateComponent } from "./pages/user-create/user-create.component";
import { UserDetailsComponent } from "./pages/user-details/user-details.component";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { AuthGuard } from "./shared/auth.guard";
import { LoginComponent } from "./pages/login/login.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";
import { ResetPasswordFormComponent } from "./shared/reset-password-form/reset-password-form/reset-password-form.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ErrorComponent } from "./pages/error/error.component";
import { VerifySecurityQuestionsComponent } from "./shared/forms/verify-security-questions/verify-security-questions.component";
import { RegisterComponent } from "./pages/register/register.component";
import { VerifyUsernameFormComponent } from "./shared/forms/verify-username-form/verify-username-form.component";
import { RoleDetailsComponent } from "./pages/role-details/role-details.component";
import { RoleListComponent } from "./pages/role-list/role-list.component";
import { PurchasesByServiceGraphComponent } from "./pages/purchases-by-service-graph/purchases-by-service-graph.component";
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
        path: "about",
        component: AboutComponent,
      },
      {
        path: "contact",
        component: ContactUsComponent,
      },
      {
        path: "users",
        component: UserListComponent,
      },
      {
        path: "users/create/new",
        component: UserCreateComponent,
      },
      {
        path: "users/:id",
        component: UserDetailsComponent,
      },

      {
        path: "security-questions",
        component: SecurityQuestionListComponent,
      },
      {
        path: "security-questions/:questionId",
        component: SecurityQuestionDetailsComponent,
      },
      {
        path: "roles/:roleId",
        component: RoleDetailsComponent,
      },
      {
        path: "roles",
        component: RoleListComponent,
      },
      {
        path: "purchases-by-service-graph",
        component: PurchasesByServiceGraphComponent,
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
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: "forgot",
        component: VerifyUsernameFormComponent,
      },
      {
        path: "verify-security-questions",
        component: VerifySecurityQuestionsComponent,
      },
      {
        path: "reset-password",
        component: ResetPasswordFormComponent,
      },
      {
        path: "404",
        component: NotFoundComponent,
      },
      {
        path: "505",
        component: ErrorComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "session/404",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
