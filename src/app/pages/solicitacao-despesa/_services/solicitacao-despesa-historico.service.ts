import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitacaoDespesaHistorico } from '../_models/solicitacao-despesa-historico.model';
@Injectable({
  providedIn: 'root',
})
export class SolicitacaoDespesaHistoricoService {
  baseURL = `${environment.apiLegacyUrl}/solicitacaodespesahistorico`;
  constructor(private http: HttpClient) {}

  listarTodos(sd_id: number): Observable<SolicitacaoDespesaHistorico[]> {
    return this.http.get<SolicitacaoDespesaHistorico[]>(`${this.baseURL}/${sd_id}`);
  }

  salvarObservacao(obeservacao: SolicitacaoDespesaHistorico): Observable<SolicitacaoDespesaHistorico> {
    return this.http.post<SolicitacaoDespesaHistorico>(`${this.baseURL}/observacao`, obeservacao);
  }
}
