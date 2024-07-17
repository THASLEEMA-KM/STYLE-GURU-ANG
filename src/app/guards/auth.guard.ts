import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = () => {
  const authservice = inject(AuthService)
  const toaster = inject(ToastrService)
  const router = inject(Router)
  if(authservice.isLoggedIn()){
    return true;
  }else{
    toaster.warning("Operation Denied...Please Login")
    router.navigateByUrl('/login')
    return false
  }
};
