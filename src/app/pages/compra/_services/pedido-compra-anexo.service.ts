import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoCompraAnexo } from '../_models/pedido-compra-item.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoCompraAnexoService {
  baseURL = `${environment.apiLegacyUrl}/pedidocompraanexo`;
  constructor(private http: HttpClient) {}

  listarTodos(pedido_compra_id: number): Observable<PedidoCompraAnexo[]> {
    return this.http.get<PedidoCompraAnexo[]>(`${this.baseURL}/${pedido_compra_id}`);
  }

  salvarAnexo(anexo: FormData): Observable<PedidoCompraAnexo> {
    return this.http.post<PedidoCompraAnexo>(`${this.baseURL}`, anexo);
  }

  download(sd_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${sd_id}`, {
      responseType: 'arraybuffer',
    });
  }

  deletar(id: number): Observable<PedidoCompraAnexo> {
    return this.http.delete<PedidoCompraAnexo>(`${this.baseURL}/${id}`);
  }
}
