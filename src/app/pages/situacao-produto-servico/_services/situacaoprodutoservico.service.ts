import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { CriarSituacaoProdutoServico, SituacaoProdutoServico } from '../_models/situacaoprodutoservico.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SituacaoProdutoServicoService {
  baseURL = `${environment.apiLegacyUrl}/situacaoprodutoservico`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<SituacaoProdutoServico[]> {
    return this.http.get<SituacaoProdutoServico[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<SituacaoProdutoServico> {
    return this.http.get<SituacaoProdutoServico>(`${this.baseURL}/${id}`);
  }

  editar(id: number, situacaoProdutoServico: SituacaoProdutoServico): Observable<SituacaoProdutoServico> {
    return this.http.put<SituacaoProdutoServico>(`${this.baseURL}/${id}`, situacaoProdutoServico);
  }

  criar(situacaoProdutoServico: CriarSituacaoProdutoServico): Observable<SituacaoProdutoServico> {
    return this.http.post<SituacaoProdutoServico>(`${this.baseURL}`, situacaoProdutoServico);
  }

  deletar(id: number): Observable<SituacaoProdutoServico> {
    return this.http.delete<SituacaoProdutoServico>(`${this.baseURL}/${id}`);
  }
}
