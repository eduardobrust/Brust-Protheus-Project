import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PoTableColumn } from '@po-ui/ng-components';
import { Company } from '../company.interface';
import { environment } from 'src/environments/environment';
import { AppComponent } from './../../app.component';

@Injectable({
  providedIn: 'root'
})
export class TableTransportService {
  private API: string;
  private authUrl: string; // URL para autenticação
  private token: string | null = null; // Armazena o token temporariamente

  constructor(private http: HttpClient, private appComponent: AppComponent) {
    // Define a URL base para autenticação usando environment.api_baseUrl
    this.authUrl = `${environment.api_baseUrl}api/oauth2/v1/token?grant_type=password`;

    // Define a URL base da API cApiFunctionCompany
    // Se appComponent.endPointProt estiver definido, usa ele; caso contrário, usa environment.api_baseUrl
    this.API = (this.appComponent.endPointProt !== undefined && this.appComponent.endPointProt !== null)
      ? `${this.appComponent.endPointProt}/tlpp/cfg/v1/cApiFunctionCompany`
      : `${environment.api_baseUrl}tlpp/cfg/v1/cApiFunctionCompany`;
  }

  // Método para obter o token de autenticação
  private getAuthToken(): Observable<string> {
    // Se já temos o token, retorna ele
    if (this.token) {
      return of(this.token);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('username', 'eduardo.brust'); // Substitua pelo username correto
    body.set('password', 'a12345'); // Substitua pela senha correta

    return this.http.post(this.authUrl, body.toString(), { headers }).pipe(
      map((response: any) => {
        const token = response.access_token;
        if (token) {
          this.token = token; // Armazena o token no serviço
          localStorage.setItem('access_token', token); // Opcional: armazena no localStorage
          return token;
        } else {
          throw new Error('Token não encontrado na resposta');
        }
      }),
      catchError((error) => {
        console.error('Erro ao obter o token:', error);
        return throwError(() => new Error('Falha na autenticação'));
      })
    );
  }

  // Método para criar os cabeçalhos com o token
  private getHeaders(): Observable<HttpHeaders> {
    return this.getAuthToken().pipe(
      map((token) => {
        return new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
      })
    );
  }

  // Método para obter as colunas da tabela
  getColumns(): Array<PoTableColumn> {
    return [
      {
        property: 'active',
        type: 'label',
        width: '8%',
        labels: [
          { value: 'Y', color: 'green', label: 'Ativo', icon: 'an an-lock-open' },
          { value: 'N', color: 'red', label: 'Inativo', icon: 'an an-lock' }
        ]
      },
      { property: 'cfunction', label: 'Rotina', visible: true },
      { property: 'reducedCode', label: 'Cod.Reduzido', width: '1%', visible: true },
      { property: 'company', label: 'Filial', width: '1%', visible: true },
      { property: 'abbreviation', label: 'Sigla', width: '1%', visible: true },
      { property: 'description', label: 'Nome Comercial', width: '25%', visible: true },
      { property: 'cnpj', label: 'CNPJ', width: '10%', visible: true }
    ];
  }

  // Método para obter os itens da API
  getItems(): Observable<Company[]> {
    const url = `${this.API}?cToken=tokenteste&cActive=*`;

    // Primeiro obtém o token, depois faz a requisição com o token no cabeçalho
    return this.getHeaders().pipe(
      switchMap((headers) => {
        return this.http.get<Company[]>(url, { headers }).pipe(
          catchError((error) => {
            console.error('Erro ao buscar itens:', error);
            return throwError(() => new Error('Falha ao buscar itens'));
          })
        );
      })
    );
  }

  // Método para atualizar itens (PATCH)
  patchItems(json: any): Observable<any> {
    const url = this.API;

    return this.getHeaders().pipe(
      switchMap((headers) => {
        return this.http.patch(url, json, { headers }).pipe(
          catchError((error) => {
            console.error('Erro ao atualizar itens:', error);
            return throwError(() => new Error('Falha ao atualizar itens'));
          })
        );
      })
    );
  }

  // Método para criar itens (POST)
  postItems(json: any): Observable<any> {
    const url = this.API;

    return this.getHeaders().pipe(
      switchMap((headers) => {
        return this.http.post(url, json, { headers }).pipe(
          catchError((error) => {
            console.error('Erro ao criar itens:', error);
            return throwError(() => new Error('Falha ao criar itens'));
          })
        );
      })
    );
  }
}