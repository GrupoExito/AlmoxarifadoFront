import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { CotacaoSolicitacaoDespesa } from '../_models/cotacao-sd.model';

@Injectable({
  providedIn: 'root',
})
export class CotacaoSolicitacaoDespesaService {
  private routeId: number | null = null;
  baseURL = `${environment.apiLegacyUrl}/cotacaosolicitacaodespesa`;
  constructor(private http: HttpClient) {}

  listarTodos(cotacao_id: number): Observable<CotacaoSolicitacaoDespesa[]> {
    return this.http.get<CotacaoSolicitacaoDespesa[]>(`${this.baseURL}/${cotacao_id}`);
  }

  criar(cotacaoSd: CotacaoSolicitacaoDespesa): Observable<CotacaoSolicitacaoDespesa> {
    return this.http.post<CotacaoSolicitacaoDespesa>(`${this.baseURL}`, cotacaoSd);
  }

  deletar(cotacao_id: number, sd_id: number): Observable<CotacaoSolicitacaoDespesa> {
    return this.http.delete<CotacaoSolicitacaoDespesa>(`${this.baseURL}/${cotacao_id}/${sd_id}`);
  }
}
