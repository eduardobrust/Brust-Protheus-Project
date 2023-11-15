import { Component } from '@angular/core';
import { PoMenuItem, PoNotificationService } from '@po-ui/ng-components';
import { ProAppConfigService, ProJsToAdvplService } from '@totvs/protheus-lib-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public protheus: boolean | undefined;
  public endPointProt: string | undefined;

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/controllers/home', icon: "po-icon po-icon-home" },
    { label: 'Rotina x Empresa', link: '/controllers/table-transport', icon: "po-icon po-icon-company" },
    { label: 'Exit', action: this.closeApp.bind(this), icon: 'po-icon po-icon-exit' }
  ];

  constructor(
    private proAppConfigService: ProAppConfigService,
    private proJsToAdvplService: ProJsToAdvplService,
    private poNotification: PoNotificationService
  ) {
    if (this.proAppConfigService.insideProtheus()) {
      this.proJsToAdvplService.jsToAdvpl('receberProtheus', '');
      this.endPointProt = sessionStorage.getItem('setUrlProtheus') || 'http://';
      this.poNotification.information('EndPoint Rest:' + this.endPointProt);
      this.protheus = true;
    }
    else {
      this.proAppConfigService.loadAppConfig();
      this.protheus = false;
    }
  }

  private closeApp() {
    if (this.proAppConfigService.insideProtheus()) {
      this.proAppConfigService.callAppClose();
      this.protheus = true;
    } else {
      this.protheus = false;
      this.poNotification.setDefaultDuration(3000);
      this.poNotification.warning('Rotina rodando fora do Protheus!');
    }
  }

}
