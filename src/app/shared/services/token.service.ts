import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'auth-token';

  constructor() { }

  /**
   * Stores JWT token
   * @param token Token JWT
   */
  saveToken(token: string): void{
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Gets JWT token from localstorage
   * @returns Token JWT or null in case it does not exist
   */
  getToken(): string | null{
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Removes token from localstorage
   */
  removeToken(): void{
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Check if token exists in localstorage
   * @returns true if token exists, otherwise false
   */
  hasToken(): boolean{
    return !!this.getToken();
  }
  
}
