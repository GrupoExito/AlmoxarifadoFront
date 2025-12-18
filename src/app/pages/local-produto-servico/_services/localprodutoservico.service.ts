import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { LocalProdutoServico } from '../_models/localprodutoservico.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalProdutoServicoService {
  baseURL = `${environment.apiLegacyUrl}/localprodutoservico`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<LocalProdutoServico[]> {
    return this.http.get<LocalProdutoServico[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<LocalProdutoServico> {
    return this.http.get<LocalProdutoServico>(`${this.baseURL}/${id}`);
  }

  editar(id: number, localprodutoservico: LocalProdutoServico): Observable<LocalProdutoServico> {
    return this.http.put<LocalProdutoServico>(`${this.baseURL}/${id}`, localprodutoservico);
  }

  criar(localprodutoservico: LocalProdutoServico): Observable<LocalProdutoServico> {
    return this.http.post<LocalProdutoServico>(`${this.baseURL}`, localprodutoservico);
  }

  deletar(id: number): Observable<LocalProdutoServico> {
    return this.http.delete<LocalProdutoServico>(`${this.baseURL}/${id}`);
  }
}
