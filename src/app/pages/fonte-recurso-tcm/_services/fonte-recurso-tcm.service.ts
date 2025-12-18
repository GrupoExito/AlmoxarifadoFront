import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { FonteRecursoTCM } from '../_models/fonte-recurso-tcm.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FonteRecursoTCMService {
  baseURL = `${environment.apiLegacyUrl}/fonterecursotcm`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<FonteRecursoTCM[]> {
    return this.http.get<FonteRecursoTCM[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<FonteRecursoTCM> {
    return this.http.get<FonteRecursoTCM>(`${this.baseURL}/${id}`);
  }

  editar(id: number, FonteRecursoTCM: FonteRecursoTCM): Observable<FonteRecursoTCM> {
    return this.http.put<FonteRecursoTCM>(`${this.baseURL}/${id}`, FonteRecursoTCM);
  }

  criar(FonteRecursoTCM: FonteRecursoTCM): Observable<FonteRecursoTCM> {
    return this.http.post<FonteRecursoTCM>(`${this.baseURL}`, FonteRecursoTCM);
  }

  deletar(id: number): Observable<FonteRecursoTCM> {
    return this.http.delete<FonteRecursoTCM>(`${this.baseURL}/${id}`);
  }
}
