import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login/app-login.service';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class AuthGuard {

constructor(private router: Router, private activatedRoute: ActivatedRoute, private loginService: LoginService) {}

canActivate(): boolean {
  type DataWithUser = {
    user: boolean;
  };

  const user = this.activatedRoute.data as Observable<DataWithUser>;

if (user) {
  return true;
} else {
  this.router.navigate(['/login']);
  return false;
}
}

}