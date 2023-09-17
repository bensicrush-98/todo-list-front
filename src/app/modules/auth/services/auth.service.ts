import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { AuthenticationResponse } from 'src/app/interfaces/authentication-response.interface';
import { User } from 'src/app/interfaces/user.interface';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = 'http://localhost:8080/api/users';

  constructor(private _http: HttpClient, private _tokenService: TokenService, private _userService: UserService) {}

  private setAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this._tokenService.getToken();
    return headers.set('Authorization', `Bearer ${token}`);
  }

  /**
   * Sign up a new user.
   * @param username User's username.
   * @param email User's email.
   * @param password User's password.
   * @returns Observable of the authentication token.
   */
  signup(
    username: string,
    email: string,
    password: string
  ): Observable<string> {
    const url = `${this.BASE_URL}/signup`;
    const body = { username, email, password };
    return this._http
      .post<AuthenticationResponse>(url, body)
      .pipe(map((response) => response.token));
  }

  /**
   * Log in an existing user.
   * @param username User's username.
   * @param password User's password.
   * @returns Observable of the authentication token.
   */
  login(username: string, password: string): Observable<string> {
    const body = { login: username, password };
    const url = `${this.BASE_URL}/login`;
    return this._http
      .post<AuthenticationResponse>(url, body, {
        headers: this.setAuthHeaders(),
      })
      .pipe(map((response) => response.token));
  }

  /**
   * Fetch the authenticated user's details.
   * @returns Observable of the user's details.
   */
  getUser(): Observable<User> {
    return this._http.get<User>(`${this.BASE_URL}/me`, {
      headers: this.setAuthHeaders(),
    });
  }

  logout(): void{
    this._userService.removeUser();
    this._tokenService.removeToken();
  }

}
