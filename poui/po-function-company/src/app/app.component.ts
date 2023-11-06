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
    { label: 'Manager', link: '/controllers/dynamic-table' },
    { label: 'Manager2', link: '/controllers/dynamic-table2' },
    { label: 'Manager3', link: '/controllers/dynamic-table3' },
    { label: 'Manager4', link: '/controllers/table-transport' }
  ];
}
