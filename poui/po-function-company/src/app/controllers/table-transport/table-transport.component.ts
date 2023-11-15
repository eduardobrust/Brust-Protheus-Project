import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { PoModalAction, PoSelectOption, PoTableAction } from '@po-ui/ng-components';

import { PoTableColumn } from '@po-ui/ng-components';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { PoBreadcrumb, PoDynamicViewField, PoModalComponent, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
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
  @ViewChild('pageModal') pageModal!: PoModalComponent;
  @ViewChild('optionsForm', { static: true }) form: NgForm | undefined;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent | undefined;

  modalForm!: FormGroup;

  columns: Array<PoTableColumn> = [];
  items: Array<any> = [];
  poTable: any;
  valueFields: any;
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
  constructor(private transportService: TableTransportService, 
    private poNotification: PoNotificationService,
    private fb: FormBuilder,
    @Inject(Router) private router: Router) {
  }

  ngOnInit() {
    this.title = 'teste';
    this.disabled = true;
    this.columns = this.transportService.getColumns();
    let companies: Company[];

    this.modalForm = this.fb.group({
      cfunction: ['', [Validators.required, Validators.pattern(/^[^ ]+$/), Validators.maxLength(50)]],
      company: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/), Validators.maxLength(6)]],
      abbreviation: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/), Validators.maxLength(10)]],
      active: ['', [Validators.required]]
    });

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
    this.modalForm.setValue({
      cfunction: '',
      company: '',
      abbreviation: '',
      active: 'Ativo',
    });
    this.pageModal.open();
  }

  private onClickEditdModal(fields: any) {
    const label = this.actions[0].label;
    this.title = label;
    this.disabled = this.title === 'Editar' ? true : false;
    this.valueFields = fields;
    this.modalForm.setValue({
      cfunction: this.valueFields['cfunction'],
      company: this.valueFields['company'],
      abbreviation: this.valueFields['abbreviation'],
      active: this.title === 'Editar' ? this.valueFields['active'] === 'Y' ? 'Ativo' : 'Inativo' : 'Ativo'
    }); 
    
    this.pageModal.open();
  }

  confirmModal() {
    if (this.modalForm.valid) {
      const json = {
        itens: [
          {
            cFunction: String(this.modalForm.value.cfunction).toUpperCase(),
            cCompany: this.modalForm.value.company,
            cAbbreviation: String(this.modalForm.value.abbreviation).toUpperCase(),
            cActive: this.modalForm.value.active === 'Ativo' ? 'Y' : 'N'
          }
        ]
      };
  
      if (this.title === 'Editar') {
        this.confirmUpdate(json);
      } else {
        this.confirmInsert(json);
      }
      setTimeout(this.refresh, 2000);
    } else {
      this.poNotification.error('Campos do Formulário inválidos.Favor revisar!');
    }
  }

  confirmInsert(json: any) {

    this.poModal?.close();
    this.transportService.postItems(json).subscribe({
      next: () => {
        // O insert foi concluído com sucesso.
        this.poNotification.success('Inserção realizada com sucesso!');
      },
      error: (error) => {
        // O insert não foi concluído com sucesso.
        this.poNotification.error('Erro ao realizar a inserção.');
      }
    });
  }

  confirmUpdate(json: any) {

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
    console.log('rodei o refresh-inicio');

    this.router.navigateByUrl('/controllers/home', { skipLocationChange: false });
    this.router.navigateByUrl('/controllers/table-transport', { skipLocationChange: false });
     
    console.log('rodei o refresh-fim');
  }

}


