import { Component, OnInit } from '@angular/core';

import { PoSelectOption } from '@po-ui/ng-components';

import { PoTableColumn } from '@po-ui/ng-components';

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