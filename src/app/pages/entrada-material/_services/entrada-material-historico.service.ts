import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntradaMaterialHistorico } from '../_models/entrada-material-historico.model';
@Injectable({
  providedIn: 'root',
})
export class EntradaMaterialHistoricoService {
  baseURL = `${environment.apiUrl}/entradamaterial`;
  constructor(private http: HttpClient) {}

  listarTodos(entrada_id: number): Observable<EntradaMaterialHistorico[]> {
    return this.http.get<EntradaMaterialHistorico[]>(`${this.baseURL}/historico/${entrada_id}`);
  }

  salvarObservacao(obeservacao: EntradaMaterialHistorico): Observable<EntradaMaterialHistorico> {
    return this.http.post<EntradaMaterialHistorico>(`${this.baseURL}/historico`, obeservacao);
  }
}
