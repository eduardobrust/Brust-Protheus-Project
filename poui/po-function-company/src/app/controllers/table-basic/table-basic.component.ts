import { Component, OnInit } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { TableBasicService } from '../services/table-basic.service';

@Component({
  selector: 'app-table-basic',
  template: `
    <po-table [p-columns]="columns" [p-items]="items">
      <ng-template po-table-column name="cfunction" label="Function" let-item>
        {{ item.cfunction }}
      </ng-template>
      <ng-template po-table-column name="reducedCode" label="reducedCode" let-item>
        {{ item.reducedCode }}
      </ng-template>
      <ng-template po-table-column name="company" label="company" let-item>
        {{ item.company }}
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
    const data = this.TableBasicService.list().subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.items = data;
        } else {
          this.items = data.companies;
        }
      },
      error: (error: any) => {
        console.error('Error retrieving data:', error);
      }
    });
  }

  initializeColumns() {
    this.columns = [
      { property: 'cfunction', label: 'Function' },
      { property: 'reducedCode', label: 'Reduced Code' },
      { property: 'company', label: 'Company' }
    ];
  }
}
