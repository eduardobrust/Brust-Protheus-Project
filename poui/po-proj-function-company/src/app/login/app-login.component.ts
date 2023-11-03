import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoPageLogin } from '@po-ui/ng-templates';
import { LoginService } from './../login/app-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class LoginComponent implements OnInit {

  @Inject(LoginService)
  private loginService!: LoginService;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Init');
  }

  async loginSubmit(formData: PoPageLogin) {
    const login = formData.login;
    const password = formData.password;

    const retorno = await this.loginService.login(login, password).toPromise();

    if (retorno) {
      sessionStorage.setItem('refreshtoken', retorno['refresh_token'] ?? '');
      sessionStorage.setItem('access_token', retorno['access_token'] ?? '');
      this.loginService.setNextDataRefreshToken(retorno['expires_in'] ?? 0);
      this.router.navigate(['/home']);
    }
  }
}