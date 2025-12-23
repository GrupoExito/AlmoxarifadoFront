import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PedidoCompraData, PedidoCompraHeaderData } from '../_models/pedido-compra-data.model';
import {
  FiltrarPedidoCompra,
  PedidoCompra,
  PedidoCompraListarSD,
  PedidoCompraNota,
  RetornoPedidoCompraListarSD,
} from '../_models/pedido-compra.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoCompraService {
  private routeId: number | null = null;
  public pedidoCompraData = new BehaviorSubject<PedidoCompraData | null>(null);
  data$ = this.pedidoCompraData.asObservable();
  private filtros: FiltrarPedidoCompra = new FiltrarPedidoCompra();

  public pedidoCompraDataHeader = new BehaviorSubject<PedidoCompraHeaderData | null>(null);

  baseURL = `${environment.apiUrl}/pedidocompra`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<PedidoCompra[]> {
    return this.http.get<PedidoCompra[]>(this.baseURL);
  }

  listarTodosPorFornecedor(fornecedor_id: number): Observable<PedidoCompra[]> {
    return this.http.get<PedidoCompra[]>(`${this.baseURL}/todos/${fornecedor_id}`);
  }

  listarTodosComSaldo(fornecedor_id: number): Observable<PedidoCompra[]> {
    return this.http.get<PedidoCompra[]>(`${this.baseURL}/${fornecedor_id}`);
  }

  listarItens(pedido_compra_id: number): Observable<PedidoCompra[]> {
    return this.http.get<PedidoCompra[]>(`${this.baseURL}/itens/${pedido_compra_id}`);
  }

  criar(pedidoCompra: Partial<PedidoCompra>): Observable<PedidoCompra> {
    return this.http.post<PedidoCompra>(`${this.baseURL}`, pedidoCompra);
  }

  editar(pedidoCompra: Partial<PedidoCompra>): Observable<PedidoCompra> {
    return this.http.put<PedidoCompra>(`${this.baseURL}`, pedidoCompra);
  }

  deletar(pedido_compra_id: number): Observable<PedidoCompra> {
    return this.http.delete<PedidoCompra>(`${this.baseURL}/${pedido_compra_id}`);
  }

  consultarPedidoCompra(id: number): Observable<PedidoCompra> {
    return this.http.get<PedidoCompra>(`${this.baseURL}/${id}`);
  }

  consultarPedidoCompraPorSD(id: number): Observable<PedidoCompra> {
    return this.http.get<PedidoCompra>(`${this.baseURL}/porsd/${id}`);
  }

  consultarPedidoCompraPorAta(id: number): Observable<PedidoCompra> {
    return this.http.get<PedidoCompra>(`${this.baseURL}/porata/${id}`);
  }

  consultarPedidoCompraSimplificado(id: number): Observable<PedidoCompra> {
    return this.http.get<PedidoCompra>(`${this.baseURL}/simplificado/${id}`);
  }

  consultarPedidoCompraPorContrato(id: number): Observable<PedidoCompra> {
    return this.http.get<PedidoCompra>(`${this.baseURL}/porcontrato/${id}`);
  }

  listarSDPedidoCompra(pedidoCompraListarSD: PedidoCompraListarSD): Observable<RetornoPedidoCompraListarSD[]> {
    return this.http.post<RetornoPedidoCompraListarSD[]>(`${this.baseURL}/sds`, pedidoCompraListarSD);
  }

  listarItensPedidoCompraSD(): Observable<PedidoCompra[]> {
    return this.http.get<PedidoCompra[]>(this.baseURL);
  }

  listarItensPedidoCompraContrato(): Observable<PedidoCompra[]> {
    return this.http.get<PedidoCompra[]>(this.baseURL);
  }

  setPedidoCompra(pedidoCompraData: PedidoCompraData | null) {
    this.pedidoCompraData.next(pedidoCompraData);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  setPedidoCompraHeader(pedidoHeader: PedidoCompraHeaderData | null): void {
    this.pedidoCompraDataHeader.next(pedidoHeader);
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  // listarPedidoCompraHeader(pedido_compra_id: number): Observable<PedidoCompraHeaderData> {
  //   return this.http.get<PedidoCompraHeaderData>(`${this.baseURL}/quantidade/${pedido_compra_id}`);
  // }

  filtrar(parameters: any): Observable<PedidoCompra[]> {
    return this.http.get<PedidoCompra[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }

  listarPedidoCompraAlmoxarifado(): Observable<PedidoCompra[]> {
    return this.http.get<PedidoCompra[]>(`${this.baseURL}/almoxarifado`);
  }

  duplicarPedidoCompra(pedido_id: number): Observable<PedidoCompra> {
    return this.http.get<PedidoCompra>(`${this.baseURL}/duplicar/${pedido_id}`);
  }

  salvarPedidoCompraNota(pedidoNota: PedidoCompraNota): Observable<PedidoCompraNota> {
    return this.http.post<PedidoCompraNota>(`${this.baseURL}/nota/fiscal`, pedidoNota);
  }

  consultarPedidoCompraNota(pedido_id: number): Observable<PedidoCompraNota[]> {
    return this.http.get<PedidoCompraNota[]>(`${this.baseURL}/notafiscal/${pedido_id}`);
  }

  deletarNotaFiscal(nota_id: number): Observable<PedidoCompraNota> {
    return this.http.delete<PedidoCompraNota>(`${this.baseURL}/excluirnotafiscal/${nota_id}`);
  }

  setFiltros(filtros: FiltrarPedidoCompra): void {
    this.filtros = { ...this.filtros, ...filtros };
  }

  getFiltros(): FiltrarPedidoCompra {
    return this.filtros;
  }

  clearFiltros(): void {
    this.filtros = new FiltrarPedidoCompra();
  }
}
