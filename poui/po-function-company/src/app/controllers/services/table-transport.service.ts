import { Injectable } from '@angular/core';

import { PoTableColumn } from '@po-ui/ng-components';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../company.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TableTransportService {
  items: any[] = []; // Initialize the items property in the constructor

  private readonly API = `${environment.baseUrl}/tlpp/cfg/v1/cApiFunctionCompany`
  private readonly headers = new HttpHeaders({ Authorization: environment.token })
  httpClient: any;

  constructor(private http: HttpClient) {}

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'cfunction', label: 'Rotina',visible: true },
      { property: 'reducedCode', label: 'Cod.Reduzido',width: '1%',visible: true },
      { property: 'company', label: 'Filial',width: '1%',visible: true },
      { property: 'abbreviation', label: 'Sigla',width: '1%',visible: true },
      { property: 'description', label: 'Nome Comercial',width: '25%',visible: true },
      { property: 'cnpj', label: 'CNPJ',width: '10%',visible: true },
      {
        property: 'active',
        type: 'label',
        width: '8%',
        labels: [
          { value: 'Y', color: 'green', label: 'Ativo',icon: 'po-icon po-icon-lock-off'  },
          { value: 'N', color: 'red', label: 'Inativo', icon: 'po-icon po-icon-lock' }
        ]
      }
    ];
  }

  getItems(): Observable<Company[]> {
    console.log(this.API);
    console.log(this.headers);
    const url = `${this.API}?cToken=tokenteste&cActive=*`;
    return this.http.get<Company[]>(url);
  }
  
  patchItems(json: any): Observable<any> {
    const url =this.API;
    return this.http.patch(url, json);
  }

  postItems(json: any): Observable<any> {
    const url =this.API;
    return this.http.post(url, json);
  }
  
}