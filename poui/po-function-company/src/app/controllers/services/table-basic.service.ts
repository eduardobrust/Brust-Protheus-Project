import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableBasicService {
  private readonly API = 'http://localhost:8003/rest/tlpp/cfg/v1/cApiFunctionCompany?cToken=tokenteste';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<any>(this.API);
  }

}
