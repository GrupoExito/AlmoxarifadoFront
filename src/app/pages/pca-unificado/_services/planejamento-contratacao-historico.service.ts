import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PcaUnificadoHistorico } from '../_models/pca-unificado-historico.model';

@Injectable({
  providedIn: 'root',
})
export class PcaUnificadoHistoricoService {
  baseURL = `${environment.apiLegacyUrl}/pcaunificadohistorico`;
  constructor(private http: HttpClient) {}

  listarTodos(pca_id: number): Observable<PcaUnificadoHistorico[]> {
    return this.http.get<PcaUnificadoHistorico[]>(`${this.baseURL}/${pca_id}`);
  }

  salvarObservacao(obeservacao: PcaUnificadoHistorico): Observable<PcaUnificadoHistorico> {
    return this.http.post<PcaUnificadoHistorico>(`${this.baseURL}/observacao`, obeservacao);
  }
}
