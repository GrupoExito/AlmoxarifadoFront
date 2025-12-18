import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CotacaoHistorico } from '../_models/cotacao-historico.model';
@Injectable({
  providedIn: 'root',
})
export class CotacaoHistoricoService {
  baseURL = `${environment.apiLegacyUrl}/cotacaohistorico`;
  constructor(private http: HttpClient) {}

  listarTodos(cotacao_id: number): Observable<CotacaoHistorico[]> {
    return this.http.get<CotacaoHistorico[]>(`${this.baseURL}/${cotacao_id}`);
  }

  salvarObservacao(observacao: CotacaoHistorico): Observable<CotacaoHistorico> {
    return this.http.post<CotacaoHistorico>(`${this.baseURL}/observacao`, observacao);
  }
}
