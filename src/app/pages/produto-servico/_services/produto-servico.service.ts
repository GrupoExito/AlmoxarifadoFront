import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import {
  ProdutoServico,
  ProdutoServicoCompras,
  ProdutoServicoContratacao,
  ProdutoServicoSaldo,
} from '../_models/produto-servico.model';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class ProdutoServicoService {
  baseURL = `${environment.apiLegacyUrl}/produtoservico`;
  baseURLAlmoxarifado = `${environment.apiUrl}/entradamaterialitem`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ProdutoServico[]> {
    return this.http.get<ProdutoServico[]>(this.baseURL);
  }

  searchItems(pagina: number, tamanho_pagina: number, pesquisar_item: string): Observable<ProdutoServico[]> {
    return of(query).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.listarTodosPaginado(pagina, tamanho_pagina, pesquisar_item)) // Adjust parameters as needed
    );
  }

  listarTodosPaginado(pagina: number, tamanho_pagina: number, pesquisar_item: string): Observable<ProdutoServico[]> {
    return this.http.get<ProdutoServico[]>(
      `${this.baseURL}/paginado/${pagina}/${tamanho_pagina}?pesquisar_item=${pesquisar_item}`
    );
  }

  listarProdutoServicoContratacao(produto_id: number): Observable<ProdutoServicoContratacao[]> {
    return this.http.get<ProdutoServicoContratacao[]>(`${this.baseURL}/contratacao/${produto_id}`);
  }

  listarProdutoServicoCompras(produto_id: number): Observable<ProdutoServicoCompras[]> {
    return this.http.get<ProdutoServicoCompras[]>(`${this.baseURL}/compras/${produto_id}`);
  }

  listarProdutoServicoSaldo(produto_id: number): Observable<ProdutoServicoSaldo[]> {
    return this.http.get<ProdutoServicoSaldo[]>(`${this.baseURL}/saldo/${produto_id}`);
  }

  consultarPorId(id: number): Observable<ProdutoServico> {
    return this.http.get<ProdutoServico>(`${this.baseURL}/${id}`);
  }

  consultarPorCodigoBarra(codigobarra: string): Observable<ProdutoServico> {
    return this.http.get<ProdutoServico>(`${this.baseURL}/codigobarra/${codigobarra}`);
  }

  editar(id: number, ProdutoServico: ProdutoServico): Observable<ProdutoServico> {
    return this.http.put<ProdutoServico>(`${this.baseURLAlmoxarifado}/produtoservicofracionamento/${id}`, ProdutoServico);
  }

  criar(ProdutoServico: ProdutoServico): Observable<ProdutoServico> {
    return this.http.post<ProdutoServico>(`${this.baseURL}`, ProdutoServico);
  }

  deletar(id: number): Observable<ProdutoServico> {
    return this.http.delete<ProdutoServico>(`${this.baseURL}/${id}`);
  }

  importarProduto(modeloProduto: ProdutoServico[]): Observable<ProdutoServico[]> {
    return this.http.post<ProdutoServico[]>(`${this.baseURL}/importar`, modeloProduto);
  }

  filtrar(parameters: any): Observable<ProdutoServico[]> {
    return this.http.get<ProdutoServico[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }

  listarItensAlmoxarifado(): Observable<ProdutoServico[]> {
    return this.http.get<ProdutoServico[]>(`${this.baseURL}/almoxarifado`);
  }

  searchItemsPorNome(pesquisar_item: string): Observable<ProdutoServico[]> {
    return this.http.get<ProdutoServico[]>(`${this.baseURL}/pequisarpordescricao/${pesquisar_item}`);
  }
}
