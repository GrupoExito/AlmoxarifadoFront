import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoCompraHistorico } from '../_models/pedido-compra-historico.model';
@Injectable({
  providedIn: 'root',
})
export class PedidoCompraHistoricoService {
  baseURL = `${environment.apiLegacyUrl}/pedidocomprahistorico`;
  constructor(private http: HttpClient) {}

  listarTodos(sd_id: number): Observable<PedidoCompraHistorico[]> {
    return this.http.get<PedidoCompraHistorico[]>(`${this.baseURL}/${sd_id}`);
  }

  salvarObservacao(obeservacao: PedidoCompraHistorico): Observable<PedidoCompraHistorico> {
    return this.http.post<PedidoCompraHistorico>(`${this.baseURL}/observacao`, obeservacao);
  }
}
