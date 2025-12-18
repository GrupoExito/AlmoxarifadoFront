import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtaHistorico } from '../_models/ata-historico.model';
@Injectable({
  providedIn: 'root',
})
export class AtaHistoricoService {
  baseURL = `${environment.apiLegacyUrl}/atahistorico`;
  constructor(private http: HttpClient) {}

  listarTodos(sd_id: number): Observable<AtaHistorico[]> {
    return this.http.get<AtaHistorico[]>(`${this.baseURL}/${sd_id}`);
  }

  salvarObservacao(obeservacao: AtaHistorico): Observable<AtaHistorico> {
    return this.http.post<AtaHistorico>(`${this.baseURL}/observacao`, obeservacao);
  }
}
