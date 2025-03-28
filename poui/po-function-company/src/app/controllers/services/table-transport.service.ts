import { AppComponent } from './../../app.component';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../company.interface';

@Injectable({
  providedIn: 'root'
})
export class TableTransportService {
  items: any[] = []; // Initialize the items property in the constructor

  private  API:any;
  private  headers:any;
  httpClient: any;
  
  constructor(private http: HttpClient,private appComponent: AppComponent) {

    this.API = '/tlpp/cfg/v1/cApiFunctionCompany'
  }

  getColumns(): Array<PoTableColumn> {
    return [
      {
        property: 'active',
        type: 'label',
        width: '8%',
        labels: [
          { value: 'Y', color: 'green', label: 'Ativo',icon: 'po-icon po-icon-lock-off'  },
          { value: 'N', color: 'red', label: 'Inativo', icon: 'po-icon po-icon-lock' }
        ]
      },
      { property: 'cfunction', label: 'Rotina',visible: true },
      { property: 'reducedCode', label: 'Cod.Reduzido',width: '1%',visible: true },
      { property: 'company', label: 'Filial',width: '1%',visible: true },
      { property: 'abbreviation', label: 'Sigla',width: '1%',visible: true },
      { property: 'description', label: 'Nome Comercial',width: '25%',visible: true },
      { property: 'cnpj', label: 'CNPJ',width: '10%',visible: true }
    ];
  }

  getItems(): Observable<Company[]> {
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