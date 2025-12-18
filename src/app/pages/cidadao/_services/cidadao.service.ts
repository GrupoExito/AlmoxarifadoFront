import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cidadao } from '../_models/cidadao.model';

@Injectable({
  providedIn: 'root',
})

export class CidadaoService {
  baseURL = `${environment.apiLegacyUrl}/cidadao`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Cidadao[]> {
    return this.http.get<Cidadao[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Cidadao> {
    return this.http.get<Cidadao>(`${this.baseURL}/${id}`);
  }

  editar(id: number, cidadao: Cidadao): Observable<Cidadao> {
    return this.http.put<Cidadao>(`${this.baseURL}/${id}`, cidadao);
  }

  criar(cidadao: Cidadao): Observable<Cidadao> {
    return this.http.post<Cidadao>(`${this.baseURL}`, cidadao);
  }

  deletar(id: number): Observable<Cidadao> {
    return this.http.delete<Cidadao>(`${this.baseURL}/${id}`);
  }
}
