import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { ComissaoLicitacao } from '../_models/comissao-licitacao.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComissaoLicitacaoService {
  baseURL = `${environment.apiLegacyUrl}/comissaolicitacao`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ComissaoLicitacao[]> {
    return this.http.get<ComissaoLicitacao[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<ComissaoLicitacao> {
    return this.http.get<ComissaoLicitacao>(`${this.baseURL}/${id}`);
  }

  editar(id: number, comissaoLicitacao: ComissaoLicitacao): Observable<ComissaoLicitacao> {
    return this.http.put<ComissaoLicitacao>(`${this.baseURL}/${id}`, comissaoLicitacao);
  }

  criar(comissaoLicitacao: ComissaoLicitacao): Observable<ComissaoLicitacao> {
    return this.http.post<ComissaoLicitacao>(`${this.baseURL}`, comissaoLicitacao);
  }

  deletar(id: number): Observable<ComissaoLicitacao> {
    return this.http.delete<ComissaoLicitacao>(`${this.baseURL}/${id}`);
  }
}
