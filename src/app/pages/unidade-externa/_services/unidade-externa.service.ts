import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnidadeExterna } from '../_models/unidade-externa.model';

@Injectable({
  providedIn: 'root',
})
export class UnidadeExternaService {
  baseURL = `${environment.apiLegacyUrl}/UnidadeExterna`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<UnidadeExterna[]> {
    return this.http.get<UnidadeExterna[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<UnidadeExterna> {
    return this.http.get<UnidadeExterna>(`${this.baseURL}/${id}`);
  }

  editar(id: number, UnidadeExterna: UnidadeExterna): Observable<UnidadeExterna> {
    return this.http.put<UnidadeExterna>(`${this.baseURL}/${id}`, UnidadeExterna);
  }

  criar(UnidadeExterna: UnidadeExterna): Observable<UnidadeExterna> {
    return this.http.post<UnidadeExterna>(`${this.baseURL}`, UnidadeExterna);
  }

  deletar(id: number): Observable<UnidadeExterna> {
    return this.http.delete<UnidadeExterna>(`${this.baseURL}/${id}`);
  }
}
