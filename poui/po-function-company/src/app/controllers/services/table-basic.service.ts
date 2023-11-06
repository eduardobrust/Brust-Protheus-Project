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

  loadById(id: string) {
    return this.httpClient.get<any>(`${this.API}/${id}`);
  }

  save(record: Partial<any>) {
    if (record['id']) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<any>) {
    return this.httpClient.post<any>(this.API, record);
  }

  private update(record: Partial<any>) {
    return this.httpClient.put<any>(`${this.API}/${record['id']}`, record);
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
