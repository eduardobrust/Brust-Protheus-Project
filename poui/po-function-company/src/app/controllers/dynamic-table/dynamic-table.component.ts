import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableOptions } from '@po-ui/ng-templates';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent  implements OnInit {

  //property definition

  readonly actions: PoPageDynamicTableActions = {
    new: '/documentation/po-page-dynamic-edit',
    edit: '/documentation/po-page-dynamic-edit',
    removeAll: true
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Manager - Function x Company' }]
  };

  //fields definition
  fields: Array<any> = [
    { property: 'cfunction', label: 'Function',key: true,  filter: true },
    { property: 'reducedCode', label: 'Reduce Code', filter: true},
    { property: 'company', label: 'Company', filter: true },
    { property: 'abbreviation',label: 'Abbreviation', filter: true }
    
  ];

  onLoad(): PoPageDynamicTableOptions {
    return {
      fields: [
        { property: 'cfunction', label: 'Function',key: true,  filter: true },
        { property: 'reducedCode', label: 'Reduce Code', filter: true},
        { property: 'company', label: 'Company', filter: true },
        { property: 'abbreviation',label: 'Abbreviation', filter: true }
      ]
    };
  }

  ngOnInit(): void {
    // Inicialize sua classe aqui
  }
}
