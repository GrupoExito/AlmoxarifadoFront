import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContratacaoHistorico } from '../_models/contratacao-historico.model';
@Injectable({
  providedIn: 'root',
})
export class ContratacaoHistoricoService {
  baseURL = `${environment.apiLegacyUrl}/contratacaohistorico`;
  constructor(private http: HttpClient) {}

  listarTodos(sd_id: number): Observable<ContratacaoHistorico[]> {
    return this.http.get<ContratacaoHistorico[]>(`${this.baseURL}/${sd_id}`);
  }

  salvarObservacao(obeservacao: ContratacaoHistorico): Observable<ContratacaoHistorico> {
    return this.http.post<ContratacaoHistorico>(`${this.baseURL}/observacao`, obeservacao);
  }
}
