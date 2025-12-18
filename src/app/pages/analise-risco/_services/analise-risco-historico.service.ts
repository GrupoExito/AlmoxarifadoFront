import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnaliseRiscoHistorico } from '../_models/analise-risco-historico.model';
@Injectable({
  providedIn: 'root',
})
export class AnaliseRiscoHistoricoService {
  baseURL = `${environment.apiLegacyUrl}/AnaliseRiscoHistorico`;
  constructor(private http: HttpClient) {}

  listarTodos(pca_id: number): Observable<AnaliseRiscoHistorico[]> {
    return this.http.get<AnaliseRiscoHistorico[]>(`${this.baseURL}/${pca_id}`);
  }

  salvarObservacao(obeservacao: AnaliseRiscoHistorico): Observable<AnaliseRiscoHistorico> {
    return this.http.post<AnaliseRiscoHistorico>(`${this.baseURL}/observacao`, obeservacao);
  }
}
