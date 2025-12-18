import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrupoUsuario } from '../_models/grupousuario.model';

@Injectable({
  providedIn: 'root',
})
export class GrupoUsuarioService {
  baseURL = `${environment.apiLegacyUrl}/grupousuario`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<GrupoUsuario[]> {
    return this.http.get<GrupoUsuario[]>(this.baseURL);
  }

  listarTodosPorCliente(): Observable<GrupoUsuario[]> {
    return this.http.get<GrupoUsuario[]>(`${this.baseURL}/porcliente`);
  }
}
