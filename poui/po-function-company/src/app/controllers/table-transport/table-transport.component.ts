import { Component, OnInit, ViewChild } from '@angular/core';

import { PoModalAction, PoSelectOption, PoTableAction } from '@po-ui/ng-components';

import { PoTableColumn } from '@po-ui/ng-components';

import { NgForm } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { PoBreadcrumb, PoDynamicViewField, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { Company } from '../company.interface';
import { TableTransportService } from '../services/table-transport.service';
import { PoPageAction } from '@po-ui/ng-components';

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
  @ViewChild('pageModal') pageModal!: PoModalComponent;
  @ViewChild('optionsForm', { static: true }) form: NgForm | undefined;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent | undefined;

  columns: Array<PoTableColumn> = [];
  items: Array<any> = [];
  poTable: any;
  valueFields: any;
  cfunction: any;
  company: any;
  abbreviation: any;
  active: any;
  title: any;
  disabled: any;

  public readonly PageActions: Array<PoPageAction> = [
    { label: 'Incluir', action: this.onClickInsertModal.bind(this), icon: 'po-icon po-icon-plus' },
  ];

  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Close',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => {
      this.confirmModal();
    },
    label: 'Confirm'
  };

  readonly statusOptions: Array<PoSelectOption> = [
    { label: 'Ativo', value: 'Y' },
    { label: 'Inativo', value: 'N' }
  ];

  readonly updateFields: Array<PoDynamicViewField> = [
    { property: 'cfunction' },
    { property: 'reducedCode' },
    { property: 'company' },
    { property: 'abbreviation' },
    { property: 'description' },
    { property: 'cnpj' },
    { property: 'active' }
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Configurar:' }]
  };

  actions: Array<PoTableAction> = [
    {
      label: 'Editar',
      action: this.onClickEditdModal.bind(this),
      icon: 'po-icon po-icon-edit'
    }
  ];

  //metodos
  constructor(private transportService: TableTransportService, private poNotification: PoNotificationService) {
    // Não chame o método `document.querySelector('po-modal')` no construtor.
  }

  ngOnInit() {
    this.title = 'teste';
    this.disabled = true;
    this.columns = this.transportService.getColumns();
    let companies: Company[];

    this.transportService.getItems().pipe(
      map((response: any) => response.companies)
    ).subscribe((items) => {
      companies = items;
      this.items = companies;
    });

  }

  private onClickInsertModal(obj:any){
    this.title = "Incluir";
    this.disabled = false;
    this.active = 'Ativo';
    this.pageModal.open();
  }

  private onClickEditdModal(fields: any) {
    const label = this.actions[0].label;
    this.title = label;
    this.disabled = this.title === 'Editar' ? true : false;
    this.valueFields = fields;
    this.cfunction = this.valueFields['cfunction']; 
    this.company = this.valueFields['company'];
    this.abbreviation = this.valueFields['abbreviation'];

    if (this.title === 'Editar') {
      this.active = this.valueFields['active'] === 'Y' ? 'Ativo' : 'Inativo';
    } else {
      this.active = 'Ativo';
    }

    this.pageModal.open();
  }

  confirmModal() {
    const json = {
      itens: [
        {
          cFunction: this.cfunction,
          cCompany: this.company,
          cAbbreviation: this.abbreviation,
          cActive: this.active === 'Ativo' ? 'Y' : 'N'
        }
      ]
    };

    if (this.title === 'Editar') {
      this.confirmUpdate(json);
    } else {
      this.confirmInsert(json);
    }
    setTimeout(this.refresh, 2000); 
  }

  confirmInsert(json: any) {
    alert('cliquei no insert');
  }

  confirmUpdate(json: any) {

    this.active = undefined;
    this.form?.reset();
    this.poModal?.close();

    this.transportService.patchItems(json).subscribe({
      next: () => {
        // O patch foi concluído com sucesso.
        this.poNotification.success('Alteração realizada com sucesso!');
      },
      error: (error) => {
        // O patch não foi concluído com sucesso.
        this.poNotification.error('Erro ao realizar a alteração.');
      }
    });
  }

  closeModal() {
    this.form?.reset();
    this.poModal?.close();
  }

  refresh() {
    window.location.reload();
  }

}


