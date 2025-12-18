import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntradaMaterialItem } from '../_models/entrada-material-itens.model';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';

@Injectable({
  providedIn: 'root',
})
export class EntradaMaterialItemLegacyService {
  baseURL = `${environment.apiUrl}/entradamaterialitem`;
  constructor(private http: HttpClient) {}

  /*ListarPedidoCompraItens(pedido_despesa_id: number): Observable<ProdutoServico[]> {
    return this.http.get<ProdutoServico[]>(`${this.baseURL}/pedidoCompra/${pedido_despesa_id}`);
  }*/

  ListarPedidoCompraItens(pedido_despesa_id: number): Observable<ProdutoServico[]> {
    return this.http.get<ProdutoServico[]>(`${this.baseURL}/todositenspedidocompra/${pedido_despesa_id}`);
  }
}
