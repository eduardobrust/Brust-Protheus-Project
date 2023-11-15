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
    { label: 'Exit', action: this.closeApp.bind(this), icon: 'po-icon po-icon-exit' },
    { label: 'receber >> protheus', action: this.click1.bind(this), icon: 'po-icon po-icon-exit' }
  ];

  constructor(
    private proAppConfigService: ProAppConfigService,
    private proJsToAdvplService: ProJsToAdvplService,
    private poNotification: PoNotificationService
  ) {

      this.endPointProt = sessionStorage.getItem('urlprotheus') || 'nao_achou_session';
      this.poNotification.information('EndPoint Rest:' + this.endPointProt);

    if (this.proAppConfigService.insideProtheus()) {
      this.proJsToAdvplService.jsToAdvpl('receberprotheus', '');
      this.endPointProt = sessionStorage.getItem('urlprotheus') || 'nao_achou_session';
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

  private click1(){
    this.proJsToAdvplService.jsToAdvpl('receberprotheus', '');
    this.endPointProt = sessionStorage.getItem('urlprotheus') || 'nao_achou_session';
    this.poNotification.information('EndPoint Rest:' + this.endPointProt);
  }

}
