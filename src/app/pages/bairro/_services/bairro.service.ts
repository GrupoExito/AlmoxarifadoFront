import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bairro } from '../_models/bairro.model';

@Injectable({
  providedIn: 'root',
})
export class BairroService {
  baseURL = `${environment.apiLegacyUrl}/bairro`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Bairro[]> {
    return this.http.get<Bairro[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Bairro> {
    return this.http.get<Bairro>(`${this.baseURL}/${id}`);
  }

  editar(id: number, bairro: Bairro): Observable<Bairro> {
    return this.http.put<Bairro>(`${this.baseURL}/${id}`, bairro);
  }

  criar(bairro: Bairro): Observable<Bairro> {
    return this.http.post<Bairro>(`${this.baseURL}`, bairro);
  }

  deletar(id: number): Observable<Bairro> {
    return this.http.delete<Bairro>(`${this.baseURL}/${id}`);
  }

  listarPorMunicipio(id: number): Observable<Bairro[]> {
    return this.http.get<Bairro[]>(`${this.baseURL}/municipios/${id}`);
  }
}
