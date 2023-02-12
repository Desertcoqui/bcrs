import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";

/**
 * Components
 */
// Pages
import { HomeComponent } from "./pages/home/home.component";
import { SecurityQuestionDetailsComponent } from "./pages/security-question-details/security-question-details.component";
import { SecurityQuestionListComponent } from "./pages/security-question-list/security-question-list.component";
import { LoginComponent } from "./pages/signin/signin.component";
import { UserCreateComponent } from "./pages/user-create/user-create.component";
import { UserDetailsComponent } from "./pages/user-details/user-details.component";
import { UserListComponent } from "./pages/user-list/user-list.component";

// Shared
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { DeleteRecordDialogComponent } from "./shared/delete-record-dialog/delete-record-dialog.component";

// Services
import { CookieService } from "ngx-cookie-service";

/**
 * Angular material imports
 */
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";

// Dialog
import { DialogModule } from "@angular/cdk/dialog";

/**
 * PrimeNG
 */
import { ButtonModule } from "primeng/button";
import { ConfirmationService, ConfirmEventType } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    DeleteRecordDialogComponent,
    HomeComponent,
    SecurityQuestionDetailsComponent,
    SecurityQuestionListComponent,
    LoginComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserListComponent,
  ],
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
    ReactiveFormsModule,
    TableModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
