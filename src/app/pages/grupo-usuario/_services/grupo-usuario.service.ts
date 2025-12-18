import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrupoUsuario } from '../_models/grupo-usuario.model';

@Injectable({
  providedIn: 'root',
})
export class GrupoUsuarioService {
  baseURL = `${environment.apiLegacyUrl}/GrupoUsuario`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<GrupoUsuario[]> {
    return this.http.get<GrupoUsuario[]>(this.baseURL);
  }

  listarTodosPorCliente(): Observable<GrupoUsuario[]> {
    return this.http.get<GrupoUsuario[]>(`${this.baseURL}/porcliente`);
  }

  consultarPorId(id: number): Observable<GrupoUsuario> {
    return this.http.get<GrupoUsuario>(`${this.baseURL}/${id}`);
  }

  editar(id: number, GrupoUsuario: GrupoUsuario): Observable<GrupoUsuario> {
    return this.http.put<GrupoUsuario>(`${this.baseURL}/${id}`, GrupoUsuario);
  }

  criar(GrupoUsuario: GrupoUsuario): Observable<GrupoUsuario> {
    return this.http.post<GrupoUsuario>(`${this.baseURL}`, GrupoUsuario);
  }

  deletar(id: number): Observable<GrupoUsuario> {
    return this.http.delete<GrupoUsuario>(`${this.baseURL}/${id}`);
  }
}
