import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { CatalogoProduto, ResImagemCatalogoProduto } from '../_models/catalogo-produto.model';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class CatalogoProdutoService {
  baseURL = `${environment.apiLegacyUrl}/catalogoproduto`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<CatalogoProduto[]> {
    return this.http.get<CatalogoProduto[]>(this.baseURL);
  }

  searchItems(pagina: number, tamanho_pagina: number, pesquisar_item: string): Observable<CatalogoProduto[]> {
    return of(query).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.listarTodosPaginado(pagina, tamanho_pagina, pesquisar_item))
    );
  }

  listarTodosPaginado(pagina: number, tamanho_pagina: number, pesquisar_item: string): Observable<CatalogoProduto[]> {
    return this.http.get<CatalogoProduto[]>(
      `${this.baseURL}/paginado/${pagina}/${tamanho_pagina}?pesquisar_item=${pesquisar_item}`
    );
  }

  consultarPorId(id: number): Observable<CatalogoProduto> {
    return this.http.get<CatalogoProduto>(`${this.baseURL}/${id}`);
  }

  editar(id: number, CatalogoProduto: FormData): Observable<CatalogoProduto> {
    return this.http.put<CatalogoProduto>(`${this.baseURL}/${id}`, CatalogoProduto);
  }

  criar(CatalogoProduto: FormData): Observable<CatalogoProduto> {
    return this.http.post<CatalogoProduto>(`${this.baseURL}`, CatalogoProduto);
  }

  deletar(id: number): Observable<CatalogoProduto> {
    return this.http.delete<CatalogoProduto>(`${this.baseURL}/${id}`);
  }

  deletarImagem(id: number): Observable<CatalogoProduto> {
    return this.http.delete<CatalogoProduto>(`${this.baseURL}/imagem/${id}`);
  }

  listarImagemCatalogoProduto(id: number): Observable<ResImagemCatalogoProduto> {
    return this.http.get<ResImagemCatalogoProduto>(`${this.baseURL}/imagem/${id}`);
  }

  filtrar(parameters: any): Observable<CatalogoProduto[]> {
    return this.http.get<CatalogoProduto[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }

  loadImage(): Observable<Blob> {
    return this.http.get(`http://localhost:4200/assets/media/logos/logo-compraagil.svg`, {
      responseType: 'blob',
    });
  }
}
