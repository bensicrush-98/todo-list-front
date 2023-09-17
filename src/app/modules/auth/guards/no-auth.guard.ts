import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';

export const NoAuthGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.hasToken()) {
    router.navigate(['/tasks']);
    return false;
  }
  return true;
};
