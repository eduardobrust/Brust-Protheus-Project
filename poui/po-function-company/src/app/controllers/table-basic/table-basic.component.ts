import { Component, OnInit } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { TableBasicService } from '../services/table-basic.service';

@Component({
  selector: 'app-sample-po-table-basic',
  template: `
    <po-table [p-columns]="columns" [p-items]="items">
      <ng-template po-table-column name="FKX_CODIGO" label="Código" let-item>
        {{ item.FKX_CODIGO }}
      </ng-template>
      <ng-template po-table-column name="FKX_DESCR" label="Descrição" let-item>
        {{ item.FKX_DESCR }}
      </ng-template>
      <ng-template po-table-column name="FKX_FCI" label="FCI" let-item>
        {{ item.FKX_FCI }}
      </ng-template>
    </po-table>
  `,
  styles: []
})
export class TableBasicComponent implements OnInit {
  columns: PoTableColumn[] = [];
  items: any[] = [];

  constructor(private TableBasicService: TableBasicService) {}

  ngOnInit() {
    this.loadItems();
    this.initializeColumns();
  }

  loadItems() {
    this.TableBasicService.list().subscribe({
      next: (data: any) => {
        this.items = data;
      },
      error: (error: any) => {
        console.error('Error retrieving data:', error);
      }
    });
  }
  

  initializeColumns() {
    this.columns = [
      { property: 'FKX_CODIGO', label: 'Código' },
      { property: 'FKX_DESCR', label: 'Descrição' },
      { property: 'FKX_FCI', label: 'FCI' }
    ];
  }
}
