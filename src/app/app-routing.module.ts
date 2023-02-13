/**
 * app-routing.module.ts
 * Author: Professor Krasso
 * Modified: Manel Phiseme
 * Date : 02/12/2023
 * Description: tis code define the application routes
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BaseLayoutComponent} from "./shared/base-layout/base-layout.component";
import {HomeComponent} from "./pages/home/home.component";
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
//import {SecurityQuestionListComponent}
//import {UserListComponent}

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'users/create/new',
        component: UserCreateComponent
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
