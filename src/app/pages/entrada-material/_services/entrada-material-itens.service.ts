import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntradaMaterialItem } from '../_models/entrada-material-itens.model';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';

@Injectable({
  providedIn: 'root',
})
export class EntradaMaterialItemService {
  baseURL = `${environment.apiUrl}/entradamaterialitem`;
  constructor(private http: HttpClient) {}

  listarItemPorEntrada(entrada_id: number): Observable<EntradaMaterialItem[]> {
    console.log('listarItemPorEntrada2', entrada_id);
    return this.http.get<EntradaMaterialItem[]>(`${this.baseURL}/${entrada_id}`);
  }

  criar(entradaMaterialItem: EntradaMaterialItem): Observable<EntradaMaterialItem> {
    return this.http.post<EntradaMaterialItem>(`${this.baseURL}`, entradaMaterialItem);
  }


  deletar(id: number): Observable<EntradaMaterialItem> {
    return this.http.delete<EntradaMaterialItem>(`${this.baseURL}/${id}`);
  }

  atualizarQuantidadeitem(entradaItem: any): Observable<EntradaMaterialItem[]> {
    return this.http.put<EntradaMaterialItem[]>(`${this.baseURL}/quantidade`, entradaItem);
  }

  listarItensSaidas(saida_id: number): Observable<ProdutoServico[]> {
    return this.http.get<ProdutoServico[]>(`${this.baseURL}/saida/${saida_id}`);
  }

  listarTodosItensPorPedidoCompra(itens: EntradaMaterialItem[]): Observable<EntradaMaterialItem[]> {
    return this.http.post<EntradaMaterialItem[]>(`${this.baseURL}/todositenspedidocompra`, itens);
  }

  adicionarTodosItensPorPedidoCompra(pedido_compra_id: number, entrada_id: number): Observable<void> {
    return this.http.post<void>(`${this.baseURL}/adicionartodositenspedidocompra/${pedido_compra_id}/${entrada_id}`, null);
  }
}
