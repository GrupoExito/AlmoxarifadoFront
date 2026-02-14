import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  // ItemLoteDatavalidade,
  ListarItemDisponivel,
  ListarLoteDatavalidade,
  LoteLinha,
  SaidaMaterialItem,
  SaldoItemGeral,
  SaldoItemLoteDatavalidade,
  // SaltoItemLoteDatavalidade,
} from '../_models/saida-material-itens.model';
import { PedidoCompraItem } from '@pages/compra/_models/pedido-compra-item.model';

@Injectable({
  providedIn: 'root',
})
export class SaidaMaterialItemService {
  baseURL = `${environment.apiUrl}/SaidaMaterialItem`;
  constructor(private http: HttpClient) {}

  listarItemPorSaida(saida_id: number): Observable<SaidaMaterialItem[]> {
    return this.http.get<SaidaMaterialItem[]>(`${this.baseURL}/${saida_id}`);
  }

  listarLotesPorProdutoSaida(produtoId: number, saidaId: number): Observable<LoteLinha[]> {
    return this.http.get<LoteLinha[]>(`${this.baseURL}/lotes/${saidaId}/${produtoId}`);
  }

  listarItensComSaldo(almoxarifado_id: number, secretaria_id: number): Observable<SaidaMaterialItem[]> {
    return this.http.get<SaidaMaterialItem[]>(`${this.baseURL}/saldo/${almoxarifado_id}/${secretaria_id}`);
  }

  criar(itens: SaidaMaterialItem[]): Observable<void> {
    return this.http.post<void>(`${this.baseURL}`, itens);
  }

  deletar(id: number): Observable<SaidaMaterialItem> {
    return this.http.delete<SaidaMaterialItem>(`${this.baseURL}/${id}`);
  }

  atualizarQuantidadeitem(saidaItem: any): Observable<SaidaMaterialItem[]> {
    return this.http.put<SaidaMaterialItem[]>(`${this.baseURL}/quantidade`, saidaItem);
  }

  autorizar(itens: { id: number; quantidade: number }[]): Observable<void> {
    return this.http.put<void>(`${this.baseURL}/autorizar`, itens);
  }

  consultarUltimoValorEntrada(saidaMaterialItem: SaidaMaterialItem): Observable<SaidaMaterialItem> {
    return this.http.post<SaidaMaterialItem>(`${this.baseURL}/ConsultarValorEntrada`, saidaMaterialItem);
  }

  listarItemDisponivel(saida_id: number): Observable<ListarItemDisponivel[]> {
    return this.http.get<ListarItemDisponivel[]>(`${this.baseURL}/itensdisponivel/${saida_id}`);
  }

  ConsultarSaldoGeral(almoxarifado_id: number, produto_id: number): Observable<SaldoItemGeral> {
    return this.http.get<SaldoItemGeral>(`${this.baseURL}/saldogeral/${almoxarifado_id}/${produto_id}`);
  }

  listarLoteDataValidade(almoxarifado_id: number, produto_id: number): Observable<ListarLoteDatavalidade[]> {
    return this.http.get<ListarLoteDatavalidade[]>(`${this.baseURL}/loteDatavalidade/${almoxarifado_id}/${produto_id}`);
  }

  ConsultarSaldoPorLoteData(
    saldoItemLoteDatavalidade: SaldoItemLoteDatavalidade
  ): Observable<SaldoItemLoteDatavalidade> {
    return this.http.post<SaldoItemLoteDatavalidade>(`${this.baseURL}/saldoporlotedata`, saldoItemLoteDatavalidade);
  }

  InserirPedidoCompraItens(id: number, pedido_id: number, almoxarifado_id: number): Observable<PedidoCompraItem> {
    return this.http.get<PedidoCompraItem>(
      `${this.baseURL}/PedidoItensAlmoxarifado/${id}/${pedido_id}/${almoxarifado_id}`
    );
  }
}
