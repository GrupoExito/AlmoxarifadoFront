import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PcaSimplificadoHistorico } from '../_models/pca-simplificado-historico.model';

@Injectable({
  providedIn: 'root',
})
export class PcaSimplificadoHistoricoService {
  baseURL = `${environment.apiLegacyUrl}/pcasimplificadohistorico`;
  constructor(private http: HttpClient) {}

  listarTodos(pca_id: number): Observable<PcaSimplificadoHistorico[]> {
    return this.http.get<PcaSimplificadoHistorico[]>(`${this.baseURL}/${pca_id}`);
  }

  salvarObservacao(obeservacao: PcaSimplificadoHistorico): Observable<PcaSimplificadoHistorico> {
    return this.http.post<PcaSimplificadoHistorico>(`${this.baseURL}/observacao`, obeservacao);
  }
}
