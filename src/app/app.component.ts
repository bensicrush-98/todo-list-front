import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './interfaces/user.interface';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  user: Observable<User>;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.user = this._userService.user$;
  }
  

}
