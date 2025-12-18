import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Tsetor } from '../_models/tsetor.model';
import { Observable } from 'rxjs';
import { Usuario } from '@pages/pessoa/_models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class TsetorService {
  baseURL = `${environment.apiLegacyUrl}/tsetor`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Tsetor[]> {
    return this.http.get<Tsetor[]>(this.baseURL);
  }

  listarUsuariosAdicionados(id: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/usuarios/${id}`);
  }

  listarSetorUsuario(): Observable<Tsetor[]> {
    return this.http.get<Tsetor[]>(`${this.baseURL}/setorusuario`);
  }

  adicionarUsuarios(usuarios: number[], setor_id: number): Observable<Tsetor> {
    return this.http.post<Tsetor>(`${this.baseURL}/usuarios/${setor_id}`, usuarios);
  }

  deletarUsuario(usuario_id: number, setor_id: number): Observable<Tsetor> {
    return this.http.delete<Tsetor>(`${this.baseURL}/usuarios/${usuario_id}/${setor_id}`);
  }

  consultarPorId(id: number): Observable<Tsetor> {
    return this.http.get<Tsetor>(`${this.baseURL}/${id}`);
  }

  editar(id: number, tsetor: Tsetor): Observable<Tsetor> {
    return this.http.put<Tsetor>(`${this.baseURL}/${id}`, tsetor);
  }

  criar(tsetor: Tsetor): Observable<Tsetor> {
    return this.http.post<Tsetor>(`${this.baseURL}`, tsetor);
  }

  deletar(id: number): Observable<Tsetor> {
    return this.http.delete<Tsetor>(`${this.baseURL}/${id}`);
  }
}
