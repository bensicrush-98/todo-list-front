import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  public user$: Observable<User>;

  constructor() { 
    this.user$ = this._userSubject.asObservable();
  }

  setUser(user: User): void {
    this._userSubject.next(user);
  }

  removeUser(): void {
    this._userSubject.next(null);
  }
}
