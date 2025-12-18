import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { ModeloCampo } from '../_models/modelo-campo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModeloCampoService {
  baseURL = `${environment.apiLegacyUrl}/modelocampo`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ModeloCampo[]> {
    return this.http.get<ModeloCampo[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<ModeloCampo> {
    return this.http.get<ModeloCampo>(`${this.baseURL}/${id}`);
  }

  editar(id: number, ModeloCampo: ModeloCampo): Observable<ModeloCampo> {
    return this.http.put<ModeloCampo>(`${this.baseURL}/${id}`, ModeloCampo);
  }

  criar(ModeloCampo: ModeloCampo): Observable<ModeloCampo> {
    return this.http.post<ModeloCampo>(`${this.baseURL}`, ModeloCampo);
  }

  deletar(id: number): Observable<ModeloCampo> {
    return this.http.delete<ModeloCampo>(`${this.baseURL}/${id}`);
  }
}
