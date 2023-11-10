import { Component, OnInit, ViewChild } from '@angular/core';

import { PoSelectOption, PoTableAction } from '@po-ui/ng-components';

import { PoTableColumn } from '@po-ui/ng-components';

import { PoBreadcrumb } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { Company } from '../company.interface';
import { TableTransportService } from '../services/table-transport.service';
import { PoDynamicViewField } from '@po-ui/ng-components';
import { PoModalComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-table-transport',
  templateUrl: './table-transport.component.html',
  providers: [TableTransportService]
})
export class TableTransportComponent implements OnInit {
  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;

  columns: Array<PoTableColumn> = [];
  items: Array<any> = [];
  poTable: any;
  detailedUser: any;
  
  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Configurar:' }]
  };

  actions: Array<PoTableAction> = [
    {
      label: 'Details',
      action: this.onClickUserDetail.bind(this),
      icon: 'po-icon-user'
    },
    {
      action: (row: any) => {
        console.log(row); 
      },
      icon: 'po-icon po-icon-edit',
      label: 'Editar',
    },
  ];

  private onClickUserDetail(user: any) {
    this.detailedUser = user;

    this.userDetailModal.open();
  }

  update(item: { [key: string]: any }) {
    this.poTable.updateItem(item);
  }

  readonly statusOptions: Array<PoSelectOption> = [
    { label: 'Ativo', value: 'Y' },
    { label: 'Bloqueado', value: 'N' }
  ];

  constructor(private transportService: TableTransportService) {
    // Não chame o método `document.querySelector('po-modal')` no construtor.
  }

  ngOnInit() {
    this.columns = this.transportService.getColumns();
    let companies: Company[]; // Declara a variável 'companies' aqui

    this.transportService.getItems().pipe(
      map((response: any) => response.companies)
    ).subscribe((items) => {
      companies = items; // Inicializa a variável 'companies' aqui
      this.items = companies;
    });
  }

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'status', tag: true, gridLgColumns: 4, divider: 'Personal Data' },
    { property: 'name', gridLgColumns: 4 },
    { property: 'nickname', label: 'User name', gridLgColumns: 4 },
    { property: 'email', gridLgColumns: 4 },
    { property: 'birthdate', gridLgColumns: 4, type: 'date' },
    { property: 'genre', gridLgColumns: 4, gridSmColumns: 6 },
    { property: 'cityName', label: 'City', divider: 'Address' },
    { property: 'state' },
    { property: 'country' }
  ];
}
