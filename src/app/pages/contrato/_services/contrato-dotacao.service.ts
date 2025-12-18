import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContratoDotacao } from '../_models/contrato-dotacao.model';

@Injectable({
  providedIn: 'root',
})
export class ContratoDotacaoService {
  baseURL = `${environment.apiLegacyUrl}/contratodotacao`;
  constructor(private http: HttpClient) {}

  listarTodos(contrato_id: number): Observable<ContratoDotacao[]> {
    return this.http.get<ContratoDotacao[]>(`${this.baseURL}/${contrato_id}`);
  }

  post(solicitacaoDespesaDotacao: ContratoDotacao[]): Observable<ContratoDotacao[]> {
    return this.http.post<ContratoDotacao[]>(`${this.baseURL}`, solicitacaoDespesaDotacao);
  }

  deletar(id: number): Observable<ContratoDotacao> {
    return this.http.delete<ContratoDotacao>(`${this.baseURL}/${id}`);
  }

  importarContratoDotacao(contrato_id: number): Observable<ContratoDotacao[]> {
    return this.http.get<ContratoDotacao[]>(`${this.baseURL}/contrato/dotacao/importar/${contrato_id}`);
  }
}
