import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../shared/services/session.service";
import {HttpClient} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Message} from  "primeng/api";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    userName: [null, Validators.compose([Validators.required])],
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])],

  })

  errorMessage: Message[] = []

  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService, 
    private http: HttpClient, private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  login() {
    const userName = this.loginForm.controls['userName'].value;
    const password = this.loginForm.controls['password'].value;

    this.sessionService.login(userName, password).subscribe({
      next: (res) => {
        console.log(res);
        this.cookieService.set('sessionuser', res.data.userName, 1);
        this.router.navigate(['/']);        
      },
      error: (e) => {
        this.errorMessage = [
          {severity: 'error', summary: 'Error', detail: e.message}
        ]
      }
    })
  }

}
