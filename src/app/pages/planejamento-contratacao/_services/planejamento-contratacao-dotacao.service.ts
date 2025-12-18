import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanejamentoContratacaoDotacao } from '../_models/planejamento-contratacao-dotacao.model';

@Injectable({
  providedIn: 'root',
})
export class PlanejamentoContratacaoDotacaoService {
  baseURL = `${environment.apiLegacyUrl}/planejamentocontratacaodotacao`;
  constructor(private http: HttpClient) {}

  listarTodos(sd_id: number): Observable<PlanejamentoContratacaoDotacao[]> {
    return this.http.get<PlanejamentoContratacaoDotacao[]>(`${this.baseURL}/${sd_id}`);
  }

  post(planejamentoContratacaoDotacao: PlanejamentoContratacaoDotacao[]): Observable<PlanejamentoContratacaoDotacao[]> {
    return this.http.post<PlanejamentoContratacaoDotacao[]>(`${this.baseURL}`, planejamentoContratacaoDotacao);
  }

  deletar(id: number): Observable<PlanejamentoContratacaoDotacao> {
    return this.http.delete<PlanejamentoContratacaoDotacao>(`${this.baseURL}/${id}`);
  }
}
