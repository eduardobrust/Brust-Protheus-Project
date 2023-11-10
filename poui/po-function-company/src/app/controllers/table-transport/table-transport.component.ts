import { Component, OnInit } from '@angular/core';

import { PoSelectOption, PoTableAction } from '@po-ui/ng-components';

import { PoTableColumn } from '@po-ui/ng-components';

import { PoBreadcrumb } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { Company } from '../company.interface';
import { TableTransportService } from '../services/table-transport.service';
import { PoModalComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-table-transport',
  templateUrl: './table-transport.component.html',
  providers: [TableTransportService]
})
export class TableTransportComponent implements OnInit {
  columns: Array<PoTableColumn> = [];
  items: Array<any> = [];
  poTable: any;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Configurar:' }]
  };

  actions: Array<PoTableAction> = [
    {
      action: (row: any) => {
        console.log(row); 
      },
      icon: 'po-icon po-icon-edit',
      label: 'Editar',
    },
  ];

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
}
