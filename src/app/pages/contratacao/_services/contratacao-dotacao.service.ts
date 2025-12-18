import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContratacaoDotacao } from '../_models/contratacao-dotacao.model';
import { ContratoDotacao } from '@pages/contrato/_models/contrato-dotacao.model';

@Injectable({
  providedIn: 'root',
})
export class ContratacaoDotacaoService {
  baseURL = `${environment.apiLegacyUrl}/contratacaodotacao`;
  constructor(private http: HttpClient) {}

  listarTodos(contratacao_id: number): Observable<ContratacaoDotacao[]> {
    return this.http.get<ContratacaoDotacao[]>(`${this.baseURL}/${contratacao_id}`);
  }

  post(solicitacaoDespesaDotacao: ContratacaoDotacao[]): Observable<ContratacaoDotacao[]> {
    return this.http.post<ContratacaoDotacao[]>(`${this.baseURL}`, solicitacaoDespesaDotacao);
  }

  deletar(id: number): Observable<ContratacaoDotacao> {
    return this.http.delete<ContratacaoDotacao>(`${this.baseURL}/${id}`);
  }

  importarContratacaoDotacao(contratacao_id: number, contrato_id: number): Observable<ContratoDotacao[]> {
    return this.http.get<ContratoDotacao[]>(
      `${this.baseURL}/contratacao/dotacao/importar/${contratacao_id}/${contrato_id}`
    );
  }

  importarDFDDotacao(contratacao_id: number): Observable<ContratacaoDotacao[]> {
    return this.http.get<ContratacaoDotacao[]>(`${this.baseURL}/dfd/dotacao/importar/${contratacao_id}`);
  }
}
