import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly userAuthService: UserAuthService,
    private readonly router: Router) {}

  ngOnInit(): void {

    if(this.userAuthService.isLoggedIn()) {
      this.router.navigate([".."]);
    }

    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  loginUser(): void {
    this.loginService.loginUser(this.loginForm.value).subscribe({
      next: (response) => {
        this.userAuthService.setRoles(response.user.roles[0].role);
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setUserName(response.user.firstName)
        this.userAuthService.setUserId(response.user.id)

        const role = response.user.roles[0].role;
        if(role === 'Admin') {
          this.router.navigate(['/admin/dashboard']);
        }
        else if(role === 'User') {
          this.router.navigate(['/user/dashboard']);
        }
      },
      error: () => {
        alert("Invalid");
      }
    })
  }
}
