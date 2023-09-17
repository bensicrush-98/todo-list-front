import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _tokenService: TokenService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  _initForm() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // get form fields
      const { username, password } = this.loginForm.value;
      // call service for login
      this._authService.login(username, password).subscribe({
        next: (token) => this._handleLoginSuccess(token),
        error: (error) => this._handleLoginError(error),
        complete: () => this._handleLoginComplete(),
      });
    }
  }

  _handleLoginSuccess(token: string) {
    this._tokenService.saveToken(token);
    this._router.navigate(['/tasks']);
  }

  _handleLoginError(error: any) {
    console.log(error);
    this._toastr.error(error.error);
    this.isLoading = false;
  }

  _handleLoginComplete() {
    this.isLoading = false;
  }
}
