import { Component,OnInit } from '@angular/core';
import { PoPageDynamicTableActions } from '@po-ui/ng-templates';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent  implements OnInit {

  //property definition

  readonly actions: PoPageDynamicTableActions = {
    new: '/documentation/po-page-dynamic-edit',
    remove: true,
    removeAll: true
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Manager5 - Table-Basic' }]
  };

  //fields definition
  fields: Array<any> = [
    { property: 'cfunction', key: true,  filter: true },
    { property: 'reducedCode', label: 'reducedCode', filter: true},
    { property: 'company', label: 'company', filter: true },
    { property: 'abbreviation',label: 'abbreviation', filter: true },
    
  ];

  ngOnInit(): void {
    // Inicialize sua classe aqui
  }
}
