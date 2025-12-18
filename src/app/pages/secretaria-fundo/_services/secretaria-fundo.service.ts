import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecretariaFundo } from '../_models/secretaria-fundo.model';

@Injectable({
  providedIn: 'root',
})
export class SecretariaFundoService {
  baseURL = `${environment.apiLegacyUrl}/secretariafundo`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<SecretariaFundo[]> {
    return this.http.get<SecretariaFundo[]>(this.baseURL);
  }

  listarTodosPorUsuario(): Observable<SecretariaFundo[]> {
    return this.http.get<SecretariaFundo[]>(`${this.baseURL}/usuario`);
  }

  consultarPorId(id: number): Observable<SecretariaFundo> {
    return this.http.get<SecretariaFundo>(`${this.baseURL}/${id}`);
  }

  consultarSecretarioGestor(secretaria_id: number): Observable<{ pessoa_id: number }[]> {
    return this.http.get<{ pessoa_id: number }[]>(`${this.baseURL}/secretariogestor/${secretaria_id}`);
  }

  consultarUsuariosPermitidos(secretaria_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/usuariospermitidos/${secretaria_id}`);
  }

  editar(id: number, secretariafundo: SecretariaFundo): Observable<SecretariaFundo> {
    return this.http.put<SecretariaFundo>(`${this.baseURL}/${id}`, secretariafundo);
  }

  criar(secretariafundo: SecretariaFundo): Observable<SecretariaFundo> {
    return this.http.post<SecretariaFundo>(`${this.baseURL}`, secretariafundo);
  }

  deletar(id: number): Observable<SecretariaFundo> {
    return this.http.delete<SecretariaFundo>(`${this.baseURL}/${id}`);
  }

  listarPorUsuario(usuario_id: number): Observable<SecretariaFundo[]> {
    return this.http.get<SecretariaFundo[]>(`${this.baseURL}/usuario/${usuario_id}`);
  }

  listarComSd(): Observable<SecretariaFundo[]> {
    return this.http.get<SecretariaFundo[]>(`${this.baseURL}/sd`);
  }

  listarGestor(secretaria_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/responsavel/${secretaria_id}`);
  }
}
