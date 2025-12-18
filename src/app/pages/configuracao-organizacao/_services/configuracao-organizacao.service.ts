import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfiguracaoOrganizacao } from '../_models/configuracao-organizacao.model';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracaoOrganizacaoService {
  baseURL = `${environment.apiLegacyUrl}/organizacao`;
  constructor(private http: HttpClient) {}

  ListarConfiguracao(parameters: any): Observable<ConfiguracaoOrganizacao[]> {
    return this.http.get<ConfiguracaoOrganizacao[]>(`${this.baseURL}/configuracao`, {
      params: parameters,
    });
  }

  AlterarConfiguracao(configuracao: ConfiguracaoOrganizacao): Observable<ConfiguracaoOrganizacao> {
    return this.http.put<ConfiguracaoOrganizacao>(`${this.baseURL}/configuracao`, configuracao);
  }
}
