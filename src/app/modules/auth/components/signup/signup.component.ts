import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _tokenService: TokenService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  _initForm() {
    this.signupForm = this._fb.group({
      username: ['', [Validators.required,Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      // get form fields
      const { username, email, password } = this.signupForm.value;
      // call service for login
      this._authService.signup(username, email, password).subscribe({
        next: (token) => this._handleSignupSuccess(token),
        error: (error) => this._handleSignupError(error),
        complete: () => this._handleSignupComplete(),
      });
    }
  }

  _handleSignupSuccess(token: string) {
    this._toastrService.success('¡Registro existoso!');
    this._tokenService.saveToken(token);
    this._router.navigate(['/tasks']);
  }

  _handleSignupError(error: any) {
    this._toastrService.error(error.error, 'Error al registrarse: ');
    this.isLoading = false;
  }

  _handleSignupComplete() {
    this.isLoading = false;
  }
}
