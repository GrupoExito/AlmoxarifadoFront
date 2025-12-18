import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContratoHistorico } from '../_models/contrato-historico.model';

@Injectable({
  providedIn: 'root',
})
export class ContratoHistoricoService {
  baseURL = `${environment.apiLegacyUrl}/contratohistorico`;
  constructor(private http: HttpClient) {}

  listarTodos(sd_id: number): Observable<ContratoHistorico[]> {
    return this.http.get<ContratoHistorico[]>(`${this.baseURL}/${sd_id}`);
  }

  salvarObservacao(obeservacao: ContratoHistorico): Observable<ContratoHistorico> {
    return this.http.post<ContratoHistorico>(`${this.baseURL}/observacao`, obeservacao);
  }
}
