import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoCompraSaldo } from '../_models/pedido-compra.model';
import { PedidoCompraEntrada, PedidoCompraSaldoItem } from '../_models/pedido-compra-view.model';

@Injectable({ providedIn: 'root' })
export class PedidoCompraService {
  baseURL = `${environment.apiUrl}/pedidocompra`;

  constructor(private http: HttpClient) {}

  listarSaldoItens(pedido_compra_id: number): Observable<PedidoCompraSaldoItem[]> {
    return this.http.get<PedidoCompraSaldoItem[]>(`${this.baseURL}/saldoitens/${pedido_compra_id}`);
  }

  listarPorFiltro(pedido_compra_id: number, fornecedor_id: number, parcial: number): Observable<PedidoCompraSaldo[]> {
    return this.http.get<PedidoCompraSaldo[]>(
      `${this.baseURL}/saldo/${pedido_compra_id}/${fornecedor_id}/${parcial}`
    );
  }

  listarEntradas(pedido_compra_id: number): Observable<PedidoCompraEntrada[]> {
    return this.http.get<PedidoCompraEntrada[]>(`${this.baseURL}/entradas/${pedido_compra_id}`);
  }

}
