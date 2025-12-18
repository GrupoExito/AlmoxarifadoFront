import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaidaMaterialHistorico } from '../_models/saida-material-historico.model';
@Injectable({
  providedIn: 'root',
})
export class SaidaMaterialHistoricoService {
  baseURL = `${environment.apiUrl}/saidamaterial`;
  constructor(private http: HttpClient) {}

  listarTodos(saida_id: number): Observable<SaidaMaterialHistorico[]> {
    return this.http.get<SaidaMaterialHistorico[]>(`${this.baseURL}/historico/${saida_id}`);
  }

  salvarObservacao(obeservacao: SaidaMaterialHistorico): Observable<SaidaMaterialHistorico> {
    return this.http.post<SaidaMaterialHistorico>(`${this.baseURL}/historico`, obeservacao);
  }
}
