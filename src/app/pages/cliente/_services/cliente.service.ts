import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../_models/cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  baseURL = `${environment.apiLegacyUrl}/Cliente`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseURL}/${id}`);
  }

  editar(id: number, Cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseURL}/${id}`, Cliente);
  }

  criar(Cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseURL}`, Cliente);
  }

  deletar(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.baseURL}/${id}`);
  }
}
