import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { ModalidadeCompra } from '../_models/modalidade-compra.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalidadeCompraService {
  baseURL = `${environment.apiLegacyUrl}/modalidadecompra`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ModalidadeCompra[]> {
    return this.http.get<ModalidadeCompra[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<ModalidadeCompra> {
    return this.http.get<ModalidadeCompra>(`${this.baseURL}/${id}`);
  }

  editar(id: number, ModalidadeCompra: ModalidadeCompra): Observable<ModalidadeCompra> {
    return this.http.put<ModalidadeCompra>(`${this.baseURL}/${id}`, ModalidadeCompra);
  }

  criar(ModalidadeCompra: ModalidadeCompra): Observable<ModalidadeCompra> {
    return this.http.post<ModalidadeCompra>(`${this.baseURL}`, ModalidadeCompra);
  }

  deletar(id: number): Observable<ModalidadeCompra> {
    return this.http.delete<ModalidadeCompra>(`${this.baseURL}/${id}`);
  }
}
