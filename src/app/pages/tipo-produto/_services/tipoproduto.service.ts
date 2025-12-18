import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { CriarTipoProduto, TipoProduto } from '../_models/tipoproduto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoProdutoService {
  baseURL = `${environment.apiLegacyUrl}/tipoproduto`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<TipoProduto[]> {
    return this.http.get<TipoProduto[]>(this.baseURL);
  }

  listarTodosBancoBase(): Observable<TipoProduto[]> {
    return this.http.get<TipoProduto[]>(`${this.baseURL}/base`);
  }

  consultarPorId(id: number): Observable<TipoProduto> {
    return this.http.get<TipoProduto>(`${this.baseURL}/${id}`);
  }

  editar(id: number, tipoProduto: TipoProduto): Observable<TipoProduto> {
    return this.http.put<TipoProduto>(`${this.baseURL}/${id}`, tipoProduto);
  }

  criar(tipoProduto: CriarTipoProduto): Observable<TipoProduto> {
    return this.http.post<TipoProduto>(`${this.baseURL}`, tipoProduto);
  }

  deletar(id: number): Observable<TipoProduto> {
    return this.http.delete<TipoProduto>(`${this.baseURL}/${id}`);
  }
}
