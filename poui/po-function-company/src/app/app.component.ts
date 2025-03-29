import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PoMenuItem, PoNotificationService } from '@po-ui/ng-components';
import { ProAppConfigService, ProJsToAdvplService } from '@totvs/protheus-lib-core';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {

  public protheus: boolean | undefined;
  public endPointProt: string | undefined;

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/controllers/home', icon: " an an-house-line" },
    { label: 'Function x Company', link: '/controllers/table-transport', icon: " an an-building-apartment" },
    { label: 'Exit', action: this.closeApp.bind(this), icon: ' an an-sign-out' }
  ];

  constructor(
    private proAppConfigService: ProAppConfigService,
    private proJsToAdvplService: ProJsToAdvplService,
    private poNotification: PoNotificationService,
    private http: HttpClient
  ) {

    if (this.proAppConfigService.insideProtheus()) {
      this.protheus = true;
      this.endPointProt  = sessionStorage.getItem('api_baseUrl') || undefined;
      this.poNotification.information('Endpoint Rest :' + this.endPointProt);
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
      this.poNotification.information('Endpoint Rest [JsonConfig] : ' + this.endPointProt);
      console.error('Endpoint Rest [JsonConfig] :', this.endPointProt);
      return response.api_baseUrl
    } catch (error) {
      console.error('Error loading app config', error);
      throw error; // You might want to handle the error appropriately in your application
    }
  }
}
