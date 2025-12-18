import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CotacaoFornecedor } from '../_models/cotacao-fornecedor.model';
import {
  CotacaoFornecedorItem,
  CotacaoFornecedorItemPreco,
  CotacaoFornecedorItemPrecoPorLink,
  CotacaoFornecedorSaldoPorLote,
} from '../_models/cotacao-fornecedor-item.model';
@Injectable({
  providedIn: 'root',
})
export class CotacaoFornecedorService {
  baseURL = `${environment.apiLegacyUrl}/cotacaofornecedor`;
  constructor(private http: HttpClient) {}

  listarFornecedores(cotacao_id: number): Observable<CotacaoFornecedor[]> {
    return this.http.get<CotacaoFornecedor[]>(`${this.baseURL}/fornecedores/${cotacao_id}`);
  }

  listarFornecedoresItem(cotacao_id: number): Observable<CotacaoFornecedorItem[]> {
    return this.http.get<CotacaoFornecedorItem[]>(`${this.baseURL}/fornecedores/item/${cotacao_id}`);
  }

  salvarCotacaoFornecedor(cotacaoFornecedor: CotacaoFornecedor): Observable<CotacaoFornecedor> {
    return this.http.post<CotacaoFornecedor>(`${this.baseURL}`, cotacaoFornecedor);
  }

  salvarCotacaoFornecedorTodosLotes(cotacaoFornecedor: CotacaoFornecedor): Observable<CotacaoFornecedor> {
    return this.http.post<CotacaoFornecedor>(`${this.baseURL}/todoslotes`, cotacaoFornecedor);
  }

  deletarCotacaoFornecedorLote(cotacao_id: number, fornecedor_id: number): Observable<CotacaoFornecedorItem> {
    return this.http.delete<CotacaoFornecedorItem>(`${this.baseURL}/${cotacao_id}/${fornecedor_id}`);
  }

  atualizarPrecoCotacaoFornecedor(
    cotacaoFornecedor: CotacaoFornecedorItemPreco
  ): Observable<CotacaoFornecedorItemPreco> {
    return this.http.put<CotacaoFornecedorItemPreco>(`${this.baseURL}/preco`, cotacaoFornecedor);
  }

  listarFornecedorItensLotePorLink(uuid: string): Observable<CotacaoFornecedorItem[]> {
    return this.http.get<CotacaoFornecedorItem[]>(`${this.baseURL}/itensporlink/${uuid}`);
  }

  listarLotesFornecedorCotacao(fornecedor_id: number, cotacao_id: number): Observable<CotacaoFornecedorItem[]> {
    return this.http.get<CotacaoFornecedorItem[]>(`${this.baseURL}/lotes/fornecedor/${fornecedor_id}/${cotacao_id}`);
  }

  atualizarPrecoCotacaoFornecedorLink(
    cotacaoFornecedor: CotacaoFornecedorItemPrecoPorLink
  ): Observable<CotacaoFornecedorItemPrecoPorLink> {
    return this.http.post<CotacaoFornecedorItemPrecoPorLink>(`${this.baseURL}/itensporlink`, cotacaoFornecedor);
  }

  gerarLinkPrecoCotacaoFornecedor(cotacaoFornecedorLote: CotacaoFornecedorItem): Observable<CotacaoFornecedorItem> {
    return this.http.post<CotacaoFornecedorItem>(`${this.baseURL}/gerarlink`, cotacaoFornecedorLote);
  }

  ConsultarSaldoPorLote(cotacao_id: number, fornecedor_id: number): Observable<CotacaoFornecedorSaldoPorLote[]> {
    return this.http.get<CotacaoFornecedorSaldoPorLote[]>(
      `${this.baseURL}/SaldoPorLote/${cotacao_id}/${fornecedor_id}`
    );
  }

  importarValoresDFD(cotacao_id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/fornecedor/importarvaloredfd/${cotacao_id}`);
  }
}
