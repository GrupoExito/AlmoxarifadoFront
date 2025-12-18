import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContratoItem, ContratoItemVencedores } from '../_models/contrato-item.model';

@Injectable({
  providedIn: 'root',
})
export class ContratoItemService {
  baseURL = `${environment.apiLegacyUrl}/ContratoItem`;
  constructor(private http: HttpClient) {}

  listarTodos(contrato_id: number): Observable<ContratoItem[]> {
    return this.http.get<ContratoItem[]>(`${this.baseURL}/${contrato_id}`);
  }

  listarTodosItensVencedores(contrato_id: number): Observable<ContratoItemVencedores[]> {
    return this.http.get<ContratoItemVencedores[]>(`${this.baseURL}/vencedores/${contrato_id}`);
  }

  criarContratos(contratos: ContratoItem[]): Observable<ContratoItem[]> {
    return this.http.post<ContratoItem[]>(`${this.baseURL}`, contratos);
  }

  atualizarContratoItemQuantidade(
    contratoItem: Partial<ContratoItem>
  ): Observable<{ quantidade_disponivel: number; valor: number }> {
    return this.http.put<{ quantidade_disponivel: number; valor: number }>(`${this.baseURL}/quantidade`, contratoItem);
  }

  excluirContratoItem(id: number): Observable<ContratoItem> {
    return this.http.delete<ContratoItem>(`${this.baseURL}/${id}`);
  }

  excluirTodosContratoItem(contrato_id: number): Observable<ContratoItem> {
    return this.http.delete<ContratoItem>(`${this.baseURL}/todos/${contrato_id}`);
  }
}
