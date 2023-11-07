import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { TableBasicService } from '../services/table-basic.service';

@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styles: []
})
export class TableBasicComponent implements OnInit {
  columns: PoTableColumn[] = [];
  items: any[] = [];
  
  public tableItems = [];

  public readonly breadcrumb: PoBreadcrumb = {
    
    items: [{ label: 'Home', link: '/' }, { label: 'Function x Company' }]
  };

  public pageActions: PoPageAction[] = [
    { label: "New Function x Company", url: "/controllers/table-basic", icon: "po-icon-plus-circle" },
    { label: "Update Function x Company", url: "/controllers/table-basic", icon: "po-icon-delete" }
  ]

  public tableColumns: PoTableColumn[] = [
    { property: 'cfunction', label: 'Rotina' },
    { property: 'reducedCode', label: 'Codigo Reduzido' },
    { property: 'company', label: 'Filial' },
    { property: 'abbreviation', label: 'Sigla' }
  ]

  public readonly tableActions: Array<PoTableAction> = [
    {
      label: 'Editar',
      icon: 'po-icon-edit',
      //action: (row: any) => this.router.navigate(["/controllers/", row.id, "edit"])
    }
  ];

  get hasSelectedItems(): boolean {
    return this.tableItems.filter( (item: any) => item.$selected).length > 0;
  }

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
      { property: 'cfunction', label: 'Rotina' },
      { property: 'reducedCode', label: 'Codigo Reduzido' },
      { property: 'company', label: 'Filial' },
      { property: 'abbreviation', label: 'Sigla' }
    ];
  }
}
