/**
 * reset-password-form.component.ts
 * Author: Professor Krasso
 * Modified: Manel Phiseme
 * Date : 02/18/2023
 * Description: Reset-password code for user create page
 */

//imported statement
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {SessionService} from "../../services/session.service";
//import {NgModule} from '@angular/core';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {

  isAuthenticated: string;
  username: string;

  form: FormGroup = this.fb.group({
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=. *\\d)[A-Za-z\\d]{8,}$')])]
  })

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private cookieService: CookieService, private sessionService: SessionService) {

      this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated') ?? '';
      this.username = this.route.snapshot.queryParamMap.get('username') ?? '';
     }

  ngOnInit(): void {
  }

  
  updatePassword(){
    const password = this.form.controls['password'].value;
    this.sessionService.updatePassword(password, this.username).subscribe({
      next: (res) =>{
        this.cookieService.set('sessionuser', this.username, 1);
        this.router.navigate(['/']);
      },
      error: (e) =>{
        console.log(e);
      }
    })
  }

}
