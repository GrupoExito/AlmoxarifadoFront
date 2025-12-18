import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TermoReferenciaHistorico } from '../_models/termo-referencia-historico.model';

@Injectable({
  providedIn: 'root',
})
export class TermoReferenciaHistoricoService {
  baseURL = `${environment.apiLegacyUrl}/termoreferenciahistorico`;
  constructor(private http: HttpClient) {}

  listarTodos(sd_id: number): Observable<TermoReferenciaHistorico[]> {
    return this.http.get<TermoReferenciaHistorico[]>(`${this.baseURL}/${sd_id}`);
  }

  salvarObservacao(obeservacao: TermoReferenciaHistorico): Observable<TermoReferenciaHistorico> {
    return this.http.post<TermoReferenciaHistorico>(`${this.baseURL}/observacao`, obeservacao);
  }
}
