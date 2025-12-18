import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoCompraItem } from '../_models/pedido-compra-item.model';
import { PedidoCompraDotacao } from '../_models/pedido-compra.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoCompraDotacaoService {
  baseURL = `${environment.apiLegacyUrl}/pedidocompradotacao`;
  constructor(private http: HttpClient) {}

  listarPedidoCompraDotacoes(pedido_compra_id: number): Observable<PedidoCompraDotacao[]> {
    return this.http.get<PedidoCompraDotacao[]>(`${this.baseURL}/${pedido_compra_id}`);
  }

  adicionarPedidoCompraDotacao(pedidoCompraDotacao: PedidoCompraDotacao[]): Observable<PedidoCompraDotacao> {
    return this.http.post<PedidoCompraDotacao>(`${this.baseURL}`, pedidoCompraDotacao);
  }

  excluirPedidoCompraDotacao(id: number): Observable<PedidoCompraItem> {
    return this.http.delete<PedidoCompraItem>(`${this.baseURL}/${id}`);
  }

  importaDotacao(id: number): Observable<PedidoCompraItem> {
    return this.http.get<PedidoCompraItem>(`${this.baseURL}/importar/dotacao/${id}`);
  }
}
