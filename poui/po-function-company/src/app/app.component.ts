import { Component } from '@angular/core';
import { PoMenuItem, PoNotificationService } from '@po-ui/ng-components';
import { ProAppConfigService, ProJsToAdvplService } from '@totvs/protheus-lib-core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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
 //   { label: 'LER_JSON', action: this.loadAppConfig.bind(this), icon: 'po-icon po-icon-exit' }
  ];

  constructor(
    private proAppConfigService: ProAppConfigService,
    private proJsToAdvplService: ProJsToAdvplService,
    private poNotification: PoNotificationService,
    private http: HttpClient
  ) {

    if (this.proAppConfigService.insideProtheus()) {
      this.protheus = true;
      let retorno = this.proJsToAdvplService.jsToAdvpl('receberprotheus', '');

      if (retorno) {
        this.endPointProt = sessionStorage['urlprotheus'];
        if  (this.endPointProt !== undefined && this.endPointProt !== null){
          this.poNotification.information('Endpoint Rest [MV_XURLPRO] :' + this.endPointProt);
        }else {
          this.loadAppConfig();
        }
      }
    }
    else {    
      this.loadAppConfig();
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

  async loadAppConfig(): Promise<string> {
    try {
      const response = await firstValueFrom(this.http.get<any>('assets/data/appConfig.json'));

      this.endPointProt = response.api_baseUrl;
      this.endPointProt = response.api_baseUrl
      this.poNotification.information('Endpoint Rest [JsonConfig] : ' + this.endPointProt);
      return response.api_baseUrl
    } catch (error) {
      //console.error('Error loading app config', error);
      throw error; // You might want to handle the error appropriately in your application
    }
  }
}
