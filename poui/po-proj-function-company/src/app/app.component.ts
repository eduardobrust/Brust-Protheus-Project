import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _router: Router) { }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick },
    { label: 'Login', link: '\login' }
  ];

  private onClick(): void {
    let lret: boolean = true;
    if (sessionStorage.getItem('access_token') === null || sessionStorage.getItem('access_token') === '') {
      lret = false;
    }

    if (lret) {
      console.log('app.component.ts->logado')
      //this._router.navigate(['/home']);
    } else {
      console.log('app.component.ts->nao logado')
      alert('Você não está logado. Por favor, faça login para acessar esta página.');
      //this._router.navigate(['/login']);
    }
  }
}
