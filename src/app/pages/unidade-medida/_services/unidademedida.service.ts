import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { UnidadeMedida } from '../_models/unidademedida.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnidadeMedidaService {
  baseURL = `${environment.apiLegacyUrl}/unidademedida`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<UnidadeMedida[]> {
    return this.http.get<UnidadeMedida[]>(this.baseURL);
  }

  listarTodosBancoBase(): Observable<UnidadeMedida[]> {
    return this.http.get<UnidadeMedida[]>(`${this.baseURL}/base`);
  }

  consultarPorId(id: number): Observable<UnidadeMedida> {
    return this.http.get<UnidadeMedida>(`${this.baseURL}/${id}`);
  }

  editar(id: number, unidadeMedida: UnidadeMedida): Observable<UnidadeMedida> {
    return this.http.put<UnidadeMedida>(`${this.baseURL}/${id}`, unidadeMedida);
  }

  criar(unidadeMedida: UnidadeMedida): Observable<UnidadeMedida> {
    return this.http.post<UnidadeMedida>(`${this.baseURL}`, unidadeMedida);
  }

  deletar(id: number): Observable<UnidadeMedida> {
    return this.http.delete<UnidadeMedida>(`${this.baseURL}/${id}`);
  }
}
