import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipio } from '../_models/municipio.model';

@Injectable({
  providedIn: 'root',
})
export class MunicipioService {
  baseURL = `${environment.apiLegacyUrl}/municipio`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Municipio> {
    return this.http.get<Municipio>(`${this.baseURL}/${id}`);
  }

  editar(id: number, municipio: Municipio): Observable<Municipio> {
    return this.http.put<Municipio>(`${this.baseURL}/${id}`, municipio);
  }

  criar(municipio: Municipio): Observable<Municipio> {
    return this.http.post<Municipio>(`${this.baseURL}`, municipio);
  }

  deletar(id: number): Observable<Municipio> {
    return this.http.delete<Municipio>(`${this.baseURL}/${id}`);
  }

  listarEstados(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/estados`);
  }
}
