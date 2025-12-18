import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanejamentoContratacaoHistorico } from '../_models/planejamento-contratacao-historico.model';
@Injectable({
  providedIn: 'root',
})
export class PlanejamentoContratacaoHistoricoService {
  baseURL = `${environment.apiLegacyUrl}/planejamentocontratacaoHistorico`;
  constructor(private http: HttpClient) {}

  listarTodos(pca_id: number): Observable<PlanejamentoContratacaoHistorico[]> {
    return this.http.get<PlanejamentoContratacaoHistorico[]>(`${this.baseURL}/${pca_id}`);
  }

  salvarObservacao(obeservacao: PlanejamentoContratacaoHistorico): Observable<PlanejamentoContratacaoHistorico> {
    return this.http.post<PlanejamentoContratacaoHistorico>(`${this.baseURL}/observacao`, obeservacao);
  }
}
