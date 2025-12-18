import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setor } from '@pages/setor/_models/setor.model';
import { NotificacaoFornecedor } from '../_models/notificacao-fornecedor.model';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoFornecedorService {
  baseURL = `${environment.apiUrl}/notificacaofornecedor`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<NotificacaoFornecedor[]> {
    return this.http.get<NotificacaoFornecedor[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<NotificacaoFornecedor> {
    return this.http.get<NotificacaoFornecedor>(`${this.baseURL}/${id}`);
  }

  editar(id: number, NotificacaoFornecedor: NotificacaoFornecedor): Observable<NotificacaoFornecedor> {
    return this.http.put<NotificacaoFornecedor>(`${this.baseURL}/${id}`, NotificacaoFornecedor);
  }

  criar(notificacaoFornecedor: NotificacaoFornecedor): Observable<NotificacaoFornecedor> {
    console.log(notificacaoFornecedor);
    return this.http.post<NotificacaoFornecedor>(`${this.baseURL}`, notificacaoFornecedor);
  }

  deletar(id: number): Observable<NotificacaoFornecedor> {
    return this.http.delete<NotificacaoFornecedor>(`${this.baseURL}/${id}`);
  }

}
