import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { FonteRecurso } from '../_models/fonte-recurso.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FonteRecursoService {
  baseURL = `${environment.apiLegacyUrl}/FonteRecurso`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<FonteRecurso[]> {
    return this.http.get<FonteRecurso[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<FonteRecurso> {
    return this.http.get<FonteRecurso>(`${this.baseURL}/${id}`);
  }

  editar(id: number, FonteRecurso: FonteRecurso): Observable<FonteRecurso> {
    return this.http.put<FonteRecurso>(`${this.baseURL}/${id}`, FonteRecurso);
  }

  criar(FonteRecurso: FonteRecurso): Observable<FonteRecurso> {
    return this.http.post<FonteRecurso>(`${this.baseURL}`, FonteRecurso);
  }

  deletar(id: number): Observable<FonteRecurso> {
    return this.http.delete<FonteRecurso>(`${this.baseURL}/${id}`);
  }
}
