import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitacaoDespesaDotacao } from '../_models/solicitacao-despesa-dotacao.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitacaoDespesaDotacaoService {
  baseURL = `${environment.apiLegacyUrl}/solicitacaodespesadotacao`;
  constructor(private http: HttpClient) {}

  listarTodos(sd_id: number): Observable<SolicitacaoDespesaDotacao[]> {
    return this.http.get<SolicitacaoDespesaDotacao[]>(`${this.baseURL}/${sd_id}`);
  }

  post(solicitacaoDespesaDotacao: SolicitacaoDespesaDotacao[]): Observable<SolicitacaoDespesaDotacao[]> {
    return this.http.post<SolicitacaoDespesaDotacao[]>(`${this.baseURL}`, solicitacaoDespesaDotacao);
  }

  deletar(id: number, sd_id: number): Observable<SolicitacaoDespesaDotacao> {
    return this.http.delete<SolicitacaoDespesaDotacao>(`${this.baseURL}/${id}/${sd_id}`);
  }
}
