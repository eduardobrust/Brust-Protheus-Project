import { Component, OnInit } from '@angular/core';

import { PoSelectOption, PoTableAction } from '@po-ui/ng-components';

import { PoTableColumn } from '@po-ui/ng-components';

import { PoBreadcrumb } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { Company } from '../company.interface';
import { TableTransportService } from '../services/table-transport.service';

@Component({
  selector: 'app-table-transport',
  templateUrl: './table-transport.component.html',
  providers: [TableTransportService]
})
export class TableTransportComponent implements OnInit {
  columns: Array<PoTableColumn> = [];
  items: Array<any> = [];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Configurar:' }]
  };

  actions: Array<PoTableAction> = [
    { action: this.update.bind(this), icon: 'po-icon po-icon-edit', label: 'Editar' }	
  ];
  poTable: any;

  update(item: { [key: string]: any }) {
    this.poTable.updateItem(item)
  }

  deleteItems(items: Array<any>) {
    this.items = items;
  }

  readonly statusOptions: Array<PoSelectOption> = [
    { label: 'Ativo', value: 'Y' },
    { label: 'Bloqueado', value: 'N' }
  ];

  constructor(private transportService: TableTransportService) {}

  ngOnInit() {
    this.columns = this.transportService.getColumns();
    let companies: Company[]; // Declare the 'companies' variable here
  
    this.transportService.getItems().pipe(
      map((response: any) => response.companies)
    ).subscribe((items) => {
      companies = items; // Initialize the 'companies' variable here
      this.items = companies;
    });
  }
}