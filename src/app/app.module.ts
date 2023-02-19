// Title: Bobs Computer Repair Shop
// Author: Professor Krasso
// Date: Feb 10 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
//https://www.youtube.com/watch?v=WDrU305J1yw
// In-Class tutorials

//imports
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./pages/home/home.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { SecurityQuestionDetailsComponent } from "./pages/security-question-details/security-question-details.component";
import { UserCreateComponent } from "./pages/user-create/user-create.component";
import { LoginComponent } from "./pages/login/login.component";
import { SecurityQuestionListComponent } from "./pages/security-question-list/security-question-list.component";
import { UserDetailsComponent } from "./pages/user-details/user-details.component";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { CookieService } from "ngx-cookie-service";
import { DialogModule } from "@angular/cdk/dialog";
// PrimeNG
import { ButtonModule } from "primeng/button";
import { ConfirmationService, ConfirmEventType } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";

//fixed errors
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ResetPasswordFormComponent } from './shared/reset-password-form/reset-password-form/reset-password-form.component';
<<<<<<< HEAD
import { AboutComponent } from './pages/about/about.component';
=======
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ErrorComponent } from './pages/error/error.component';
>>>>>>> 1fb8e44e4e07774f8a041464f0115e16add3cc71

@NgModule({
  
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    MessageModule,
    MessagesModule,
    ReactiveFormsModule,
    TableModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    LoginComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserListComponent,
    SecurityQuestionDetailsComponent,
    SecurityQuestionListComponent,
    ResetPasswordFormComponent,
<<<<<<< HEAD
    AboutComponent,
=======
    NotFoundComponent,
    ErrorComponent,
>>>>>>> 1fb8e44e4e07774f8a041464f0115e16add3cc71
  ],
  providers: [CookieService, ConfirmationService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
