import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';

export const TokenGuard: CanActivateFn = () => {
  const tokenService = new TokenService();
  if (!tokenService.hasToken()) {
    const router = new Router();
    router.navigate(['/auth'])
    return false;
  }
  return true;
};
