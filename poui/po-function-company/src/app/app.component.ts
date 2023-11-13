import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { ProAppConfigService } from '@totvs/protheus-lib-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/controllers/home', icon: "po-icon po-icon-home"  },
  //  { label: 'Manager - Function x Company', link: '/controllers/dynamic-table' },
  //  { label: 'Manager2 - Dynamic-users', link: '/controllers/dynamic-table2' },
  //  { label: 'Manager3 - Dynamic-Brust', link: '/controllers/dynamic-table3' },
    { label: 'Rotina x Empresa', link: '/controllers/table-transport',icon: "po-icon po-icon-company" },
  //  { label: 'Rotina x Empresa - (basic)', link: '/controllers/table-basic',icon: "po-icon po-icon-company" }
  //  { label: 'Fechar aplicativo',action: this.closeApp.bind(this),icon: 'po-icon po-icon-exit' }
  ];
  
  /*
  constructor(private proAppConfigService: ProAppConfigService) {
  }
  */

  private closeApp() {
    /*
    if (this.proAppConfigService.insideProtheus()) {
      this.proAppConfigService.callAppClose();
    } else {
      alert('O App não está sendo executado dentro do Protheus.');
    }
    */
  }

}
