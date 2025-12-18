import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessoAdministrativoHistorico } from '../_models/processo-administrativo-historico.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessoAdministrativoHistoricoService {
  baseURL = `${environment.apiLegacyUrl}/processoadministrativohistorico`;
  constructor(private http: HttpClient) {}

  listarTodos(sd_id: number): Observable<ProcessoAdministrativoHistorico[]> {
    return this.http.get<ProcessoAdministrativoHistorico[]>(`${this.baseURL}/${sd_id}`);
  }

  salvarObservacao(obeservacao: ProcessoAdministrativoHistorico): Observable<ProcessoAdministrativoHistorico> {
    return this.http.post<ProcessoAdministrativoHistorico>(`${this.baseURL}/observacao`, obeservacao);
  }
}
