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
import { SecurityQuestionListComponent } from "./pages/security-question-list/security-question-list.component";
import { UserCreateComponent } from "./pages/user-create/user-create.component";
import { UserDetailsComponent } from "./pages/user-details/user-details.component";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./pages/login/login.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";

const routes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      {
        path: "/",
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
        path: "users/:userId",
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
