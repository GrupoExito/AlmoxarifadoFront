import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Fundamento } from '../_models/fundamento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FundamentoService {
  baseURL = `${environment.apiLegacyUrl}/fundamento`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Fundamento[]> {
    return this.http.get<Fundamento[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Fundamento> {
    return this.http.get<Fundamento>(`${this.baseURL}/${id}`);
  }

  editar(id: number, Fundamento: Fundamento): Observable<Fundamento> {
    return this.http.put<Fundamento>(`${this.baseURL}/${id}`, Fundamento);
  }

  criar(Fundamento: Fundamento): Observable<Fundamento> {
    return this.http.post<Fundamento>(`${this.baseURL}`, Fundamento);
  }

  deletar(id: number): Observable<Fundamento> {
    return this.http.delete<Fundamento>(`${this.baseURL}/${id}`);
  }
}
