import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permissao } from '../_models/permissao.model';

@Injectable({
  providedIn: 'root',
})
export class PermissaoService {
  baseURL = `${environment.apiLegacyUrl}/permissao`;
  constructor(private http: HttpClient) {}

  listarPermissaoPorPagina(grupo_usuario_id: number, pagina_id: number): Observable<Permissao[]> {
    return this.http.get<Permissao[]>(`${this.baseURL}/${grupo_usuario_id}/${pagina_id}`);
  }

  alterarPermissao(grupo_usuario_id: number, permissao: Permissao): Observable<Permissao> {
    return this.http.post<Permissao>(`${this.baseURL}/${grupo_usuario_id}`, permissao);
  }

  // editar(id: number, GrupoUsuario: GrupoUsuario): Observable<GrupoUsuario> {
  //   return this.http.put<GrupoUsuario>(`${this.baseURL}/${id}`, GrupoUsuario);
  // }

  // criar(GrupoUsuario: GrupoUsuario): Observable<GrupoUsuario> {
  //   return this.http.post<GrupoUsuario>(`${this.baseURL}`, GrupoUsuario);
  // }

  // deletar(id: number): Observable<GrupoUsuario> {
  //   return this.http.delete<GrupoUsuario>(`${this.baseURL}/${id}`);
  // }
}
