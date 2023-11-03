import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

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