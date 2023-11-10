import { Component, OnInit, ViewChild } from '@angular/core';

import { PoModalAction, PoSelectOption, PoTableAction } from '@po-ui/ng-components';

import { PoTableColumn } from '@po-ui/ng-components';

import { NgForm } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { PoBreadcrumb, PoDynamicViewField, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { Company } from '../company.interface';
import { TableTransportService } from '../services/table-transport.service';

interface ExtendedNavigationExtras extends NavigationExtras {
  reload: boolean;
}

@Component({
  selector: 'app-table-transport',
  templateUrl: './table-transport.component.html',
  providers: [TableTransportService]
})
export class TableTransportComponent implements OnInit {
  
  //propriedades da classe
  @ViewChild('updateModal') updateModal!: PoModalComponent;
  @ViewChild('optionsForm', { static: true }) form: NgForm | undefined;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent | undefined;

  columns: Array<PoTableColumn> = [];
  items: Array<any> = [];
  poTable: any;
  valueFields: any;
  cfunction: any;
  company: any;
  abbreviation:any;
  active:any;

  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Close',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => {
      this.confirmUpdate();
      console.log('confirm');
    },
    label: 'Confirm'
  };

  //metodos
  constructor(private transportService: TableTransportService,private poNotification: PoNotificationService) {
    // Não chame o método `document.querySelector('po-modal')` no construtor.
  }
  
  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Configurar:' }]
  };

  actions: Array<PoTableAction> = [
    {
      label: 'Editar',
      action: this.onClickUpdModal.bind(this),
      icon: 'po-icon po-icon-edit'
    }
  ];

  private onClickUpdModal(fields: any) {
        
    this.valueFields = fields;
    this.cfunction = this.valueFields['cfunction'];
    this.company = this.valueFields['company'];
    this.abbreviation = this.valueFields['abbreviation'];
    this.active = this.valueFields['active'];
    this.active = this.valueFields['active'] === 'Y' ? true : false
    console.log('onClickUpdModal - ' + this.valueFields['active'])
    console.log('onClickUpdModal - ' + this.active)
    this.updateModal.open();
  }

  readonly statusOptions: Array<PoSelectOption> = [
    { label: 'Ativo', value: 'Y' },
    { label: 'Bloqueado', value: 'N' }
  ];

  ngOnInit() {
    this.columns = this.transportService.getColumns();
    let companies: Company[]; 

    this.transportService.getItems().pipe(
      map((response: any) => response.companies)
    ).subscribe((items) => {
      companies = items; 
      this.items = companies;
    });

  }

  readonly updateFields: Array<PoDynamicViewField> = [
    { property: 'cfunction' },
    { property: 'reducedCode' },
    { property: 'company' },
    { property: 'abbreviation' },
    { property: 'description' },
    { property: 'cnpj' },
    { property: 'active' }
  ];

  closeModal() {
    this.form?.reset();
    this.poModal?.close();
  }

  confirmUpdate() {
    console.log('confirmUpdate');
    const json = {
      itens: [
        {
          cFunction: this.cfunction,
          cCompany: this.company,
          cAbbreviation:  this.abbreviation,
          cActive: this.active ? 'Y' : 'N'         
        }
      ]
    };
    console.log('confirmUpdate - ' + this.active)
    console.log(json);
    this.form?.reset();
    this.poModal?.close();

    this.transportService.patchItems(json).subscribe({
      next: () => {
        // O patch foi concluído com sucesso.
        this.poNotification.success('Alteração realizada com sucesso!');
        window.location.reload();
      },
      error: (error) => {
        // O patch não foi concluído com sucesso.
        this.poNotification.error('Erro ao realizar a alteração.');
        window.location.reload();
      }
    });
    
  }
}


