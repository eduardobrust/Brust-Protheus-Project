import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoPageLogin
} from '@po-ui/ng-templates';
import { LoginService } from './../login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router,
    private loginService: LoginService,
  ) {
    console.log('login.component.ts ->');
   }

  ngOnInit() {
    console.log('Init')
  }

  async loginSubmit(formData: PoPageLogin) {
    let login = formData.login
    let password = formData.password

    const retorno = await this.loginService.login(login, password).toPromise()
    console.log('login.component.ts(loginSubmit)->'+ retorno);
    console.log(retorno)
    
    if (retorno) {
      sessionStorage.setItem('refreshtoken', retorno['refresh_token']);
      sessionStorage.setItem('access_token', retorno['access_token']);
      this.loginService.setNextDataRefreshToken(retorno['expires_in'])
      this.router.navigate(['/home']);
    }

  }




}
