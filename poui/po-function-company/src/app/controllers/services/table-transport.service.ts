import { Injectable } from '@angular/core';

import { PoTableColumn } from '@po-ui/ng-components';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../company.interface';


@Injectable()
export class TableTransportService {
  items: any[] = []; // Initialize the items property in the constructor

  constructor(private http: HttpClient) {}


  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'cfunction', label: 'Rotina',visible: true },
      { property: 'reducedCode', label: 'Cod.Reduzido',visible: true },
      { property: 'company', label: 'Filial',visible: true },
      { property: 'abbreviation', label: 'Sigla',visible: true },
      { property: 'description', label: 'Nome Comercial',visible: true },
      { property: 'cnpj', label: 'CNPJ',visible: true },
      {
        property: 'active',
        type: 'label',
        width: '8%',
        labels: [
          { value: 'Y', color: 'green', label: 'Ativo',icon: 'po-icon po-icon-lock-off'  },
          { value: 'N', color: 'rgb(201, 53, 125)', label: 'Bloqueado', icon: 'po-icon po-icon-lock' }
        ]
      }
    ];
  }

  getItems(): Observable<Company[]> {
    const url = 'http://localhost:8003/rest/tlpp/cfg/v1/cApiFunctionCompany?cToken=tokenteste&cActive=*';
    return this.http.get<Company[]>(url);
  }

  getItems2(): Array<any> {
    return [
      {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320101",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320102",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320103",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "N"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320104",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "N"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320105",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320106",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320108",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320109",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320110",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320111",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320112",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320113",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320114",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320116",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320117",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320118",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320119",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320120",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320121",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTICF",
        reducedCode: "32",
        company: "320123",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "01",
        company: "010101",
        abbreviation: "CAN",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "02",
        company: "020101",
        abbreviation: "CAJ",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "02",
        company: "020102",
        abbreviation: "CAJ",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "02",
        company: "020103",
        abbreviation: "CAJ",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "06",
        company: "060101",
        abbreviation: "CAP",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "08",
        company: "080101",
        abbreviation: "CAI",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "10",
        company: "100101",
        abbreviation: "CAAN",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "13",
        company: "130101",
        abbreviation: "CANF",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "19",
        company: "190101",
        abbreviation: "CAA",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "21",
        company: "210101",
        abbreviation: "CAV",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "23",
        company: "230101",
        abbreviation: "CAPY",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "25",
        company: "250101",
        abbreviation: "CAJA",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "26",
        company: "260101",
        abbreviation: "CAPAM",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "30",
        company: "300101",
        abbreviation: "CAC",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320101",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320102",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320103",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320104",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320105",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320106",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320108",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320109",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320110",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320111",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320112",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320113",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320114",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320116",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320117",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320118",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320119",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320120",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320121",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "32",
        company: "320123",
        abbreviation: "RIOMAIS",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    },
    {
        cfunction: "FSTARTINOVA",
        reducedCode: "33",
        company: "330101",
        abbreviation: "CAIZ",
        description: "Grupo Aguas do Brasil",
        cnpj: "111.111.111.111-11",
        active: "Y"
    }
    ];
  }
}