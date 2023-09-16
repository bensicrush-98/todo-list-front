import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, of, take, tap } from 'rxjs';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { TokenService } from 'src/app/shared/services/token.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  const _userService = inject(UserService);
  const _tokenService = inject(TokenService);

  return _authService.getUser().pipe(
    take(1),
    map((user: User) => {
      if (user) {
        _userService.setUser(user);
        return true;
      }
      return false
    }),
    catchError(() => {
      if (_tokenService.hasToken()) {
        _tokenService.removeToken();
      }
      _router.navigate(['/auth']);
      return of(false);
    })
  );
};
