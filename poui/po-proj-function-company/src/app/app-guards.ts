import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private loginService: LoginService) {}

  canActivate(): Observable<boolean> {
    return this.activatedRoute.data.pipe(
      pluck('user'), // Extrai o valor da propriedade `user` do objeto
      map((user) => !!user), // Converte o valor para booleano
      tap((user) => {
        if (user) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
