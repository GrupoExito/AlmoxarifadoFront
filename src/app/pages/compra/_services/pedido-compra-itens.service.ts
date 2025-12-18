import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ListaPedidoCompraItemAtaSimplificado,
  ListaPedidoCompraItemContrato,
  ListaPedidoCompraItemContratoSimplificado,
  ListaPedidoCompraItemDFDSimplificado,
  ListaPedidoCompraItemSD,
  PedidoCompraItem,
  PedidoCompraItemQuantidade,
  PedidoCompraItemQuantidadeDFD,
} from '../_models/pedido-compra-item.model';
import { Saldo, SaldoItemPedidoCompraPorContrato } from '../_models/saldo.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoCompraItemService {
  baseURL = `${environment.apiLegacyUrl}/pedidocompraitem`;
  constructor(private http: HttpClient) {}

  listarItemPedidoCompra(pedido_compra_id: number): Observable<PedidoCompraItem[]> {
    return this.http.get<PedidoCompraItem[]>(`${this.baseURL}/${pedido_compra_id}`);
  }

  listarItensPedidoCompraSD(sd_id: number): Observable<ListaPedidoCompraItemSD[]> {
    return this.http.get<ListaPedidoCompraItemSD[]>(`${this.baseURL}/porsd/${sd_id}`);
  }

  listarItensPedidoCompraContrato(contrato_id: number): Observable<ListaPedidoCompraItemContrato[]> {
    return this.http.get<ListaPedidoCompraItemContrato[]>(`${this.baseURL}/porcontrato/${contrato_id}`);
  }

  listarItensPedidoCompraContratoSimplificado(
    contrato_id: number
  ): Observable<ListaPedidoCompraItemContratoSimplificado[]> {
    return this.http.get<ListaPedidoCompraItemContratoSimplificado[]>(
      `${this.baseURL}/porcontrato/item/adicaosimplificado/${contrato_id}`
    );
  }

  listarItensPedidoCompraContratoValorSimplificado(
    contrato_id: number
  ): Observable<ListaPedidoCompraItemContratoSimplificado[]> {
    return this.http.get<ListaPedidoCompraItemContratoSimplificado[]>(
      `${this.baseURL}/porcontrato/valor/adicaosimplificado/${contrato_id}`
    );
  }

  listarItensPedidoCompraDFDSimplificado(sd_id: number): Observable<ListaPedidoCompraItemDFDSimplificado[]> {
    return this.http.get<ListaPedidoCompraItemDFDSimplificado[]>(`${this.baseURL}/pordfd/adicaosimplificado/${sd_id}`);
  }

  listarItensPedidoCompraAtaSimplificado(sd_id: number): Observable<ListaPedidoCompraItemAtaSimplificado[]> {
    return this.http.get<ListaPedidoCompraItemAtaSimplificado[]>(`${this.baseURL}/porata/adicaosimplificado/${sd_id}`);
  }

  listarPedidoCompraItemSaldoPorContrato(
    pedido_compra_id: number,
    produto_id: number,
    sd_id: number
  ): Observable<PedidoCompraItemQuantidade> {
    return this.http.get<PedidoCompraItemQuantidade>(
      `${this.baseURL}/saldo/contrato/${pedido_compra_id}/${produto_id}/${sd_id}`
    );
  }

  listarPedidoCompraItemSaldoPorDFD(
    pedido_compra_id: number,
    produto_id: number,
    sd_id: number
  ): Observable<PedidoCompraItemQuantidadeDFD> {
    return this.http.get<PedidoCompraItemQuantidadeDFD>(
      `${this.baseURL}/saldo/dfd/${pedido_compra_id}/${produto_id}/${sd_id}`
    );
  }

  adicionarItemPedidoCompra(pedidoCompraItem: Partial<PedidoCompraItem>): Observable<PedidoCompraItem[]> {
    return this.http.post<PedidoCompraItem[]>(`${this.baseURL}`, pedidoCompraItem);
  }

  adicionarTodosItemPedidoCompra(
    pedido_compra_id: number,
    pedidoCompraItens: Partial<ListaPedidoCompraItemContratoSimplificado>[]
  ): Observable<PedidoCompraItem> {
    return this.http.post<PedidoCompraItem>(
      `${this.baseURL}/adicionartodos/porcontrato/${pedido_compra_id}`,
      pedidoCompraItens
    );
  }

  adicionarTodosItemPedidoCompraDFD(
    pedido_compra_id: number,
    pedidoCompraItens: ListaPedidoCompraItemDFDSimplificado[]
  ): Observable<PedidoCompraItem> {
    return this.http.post<PedidoCompraItem>(
      `${this.baseURL}/adicionartodos/pordfd/${pedido_compra_id}`,
      pedidoCompraItens
    );
  }

  atualizarQuantidadePedidoCompraItem(pedidoCompraItem: Partial<PedidoCompraItem>): Observable<PedidoCompraItem> {
    return this.http.put<PedidoCompraItem>(`${this.baseURL}/atualizar/quantidade`, pedidoCompraItem);
  }

  excluirPedidoCompraItem(id: number): Observable<PedidoCompraItem> {
    return this.http.delete<PedidoCompraItem>(`${this.baseURL}/${id}`);
  }

  excluirTodosItensPedido(id: number): Observable<PedidoCompraItem> {
    return this.http.delete<PedidoCompraItem>(`${this.baseURL}/excluirtodos/${id}`);
  }

  consultarSaldoPedido(consultarSaldo: {
    pedido_compra_id: number;
    gproduto_servico_id: number;
    sd_id: number;
    contrato_id: number;
  }): Observable<Saldo> {
    return this.http.post<Saldo>(`${environment.apiLegacyUrl}/saldo/contratacao`, consultarSaldo);
  }

  consultarSaldoPedidoPorContrato(consultarSaldo: {
    pedido_compra_id: number;
    gproduto_servico_id: number;
    sd_id: number;
    contrato_id: number;
  }): Observable<SaldoItemPedidoCompraPorContrato> {
    return this.http.post<SaldoItemPedidoCompraPorContrato>(`${environment.apiLegacyUrl}/saldo/contratoitem`, consultarSaldo);
  }
}
