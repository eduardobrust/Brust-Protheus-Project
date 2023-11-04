import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apibaseUrl = environment.baseUrl;
  constructor() {
    console.log('config.service.ts ->');
   }

  public getHostRest() {
    console.log('config.service.ts ->' + this.apibaseUrl);
    return this.apibaseUrl;
  }

}
