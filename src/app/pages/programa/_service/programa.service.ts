import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Programa } from '../_models/programa.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramaService {
  baseURL = `${environment.apiLegacyUrl}/Programa`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Programa[]> {
    return this.http.get<Programa[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Programa> {
    return this.http.get<Programa>(`${this.baseURL}/${id}`);
  }

  editar(id: number, Programa: Programa): Observable<Programa> {
    return this.http.put<Programa>(`${this.baseURL}/${id}`, Programa);
  }

  criar(Programa: Programa): Observable<Programa> {
    return this.http.post<Programa>(`${this.baseURL}`, Programa);
  }

  deletar(id: number): Observable<Programa> {
    return this.http.delete<Programa>(`${this.baseURL}/${id}`);
  }
}
