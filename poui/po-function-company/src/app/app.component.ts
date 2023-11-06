import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/controllers/home' },
    { label: 'Manager1 - Dynamic-Basic', link: '/controllers/dynamic-table' },
    { label: 'Manager2 - Dynamic-users', link: '/controllers/dynamic-table2' },
    { label: 'Manager3 - Dynamic-Brust', link: '/controllers/dynamic-table3' },
    { label: 'Manager4 - Table-transport', link: '/controllers/table-transport' },
    { label: 'Manager5 - Table-Basic', link: '/controllers/table-basic' }
  ];
}
