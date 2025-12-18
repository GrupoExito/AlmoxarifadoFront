import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { ComissaoLicitacaoMembros } from '../_models/comissao-licitacao-membros.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComissaoLicitacaoMembrosService {
  baseURL = `${environment.apiLegacyUrl}/comissaolicitacaomembros`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ComissaoLicitacaoMembros[]> {
    return this.http.get<ComissaoLicitacaoMembros[]>(this.baseURL);
  }

  listarTodosPorComissao(comissao_id: number): Observable<ComissaoLicitacaoMembros[]> {
    return this.http.get<ComissaoLicitacaoMembros[]>(`${this.baseURL}/comissao/${comissao_id}`);
  }

  consultarPorId(id: number): Observable<ComissaoLicitacaoMembros> {
    return this.http.get<ComissaoLicitacaoMembros>(`${this.baseURL}/${id}`);
  }

  editar(id: number, comissaoLicitacao: ComissaoLicitacaoMembros): Observable<ComissaoLicitacaoMembros> {
    return this.http.put<ComissaoLicitacaoMembros>(`${this.baseURL}/${id}`, comissaoLicitacao);
  }

  criar(comissaoLicitacao: ComissaoLicitacaoMembros): Observable<ComissaoLicitacaoMembros> {
    return this.http.post<ComissaoLicitacaoMembros>(`${this.baseURL}`, comissaoLicitacao);
  }

  deletar(id: number): Observable<ComissaoLicitacaoMembros> {
    return this.http.delete<ComissaoLicitacaoMembros>(`${this.baseURL}/${id}`);
  }
}
