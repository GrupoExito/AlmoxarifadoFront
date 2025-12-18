import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Setor } from '../_models/setor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SetorService {
  baseURL = `${environment.apiLegacyUrl}/setor`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Setor[]> {
    return this.http.get<Setor[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Setor> {
    return this.http.get<Setor>(`${this.baseURL}/${id}`);
  }

  editar(id: number, setor: Setor): Observable<Setor> {
    return this.http.put<Setor>(`${this.baseURL}/${id}`, setor);
  }

  criar(setor: Setor): Observable<Setor> {
    return this.http.post<Setor>(`${this.baseURL}`, setor);
  }

  deletar(id: number): Observable<Setor> {
    return this.http.delete<Setor>(`${this.baseURL}/${id}`);
  }

  listarPorSecretaria(id_secretaria: number): Observable<Setor[]> {
    return this.http.get<Setor[]>(`${this.baseURL}/secretaria/${id_secretaria}`);
  }
}
