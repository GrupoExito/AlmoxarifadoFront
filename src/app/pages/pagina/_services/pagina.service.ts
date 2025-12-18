import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Pagina } from '../_models/pagina.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginaService {
  baseURL = `${environment.apiLegacyUrl}/pagina`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Pagina[]> {
    return this.http.get<Pagina[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Pagina> {
    return this.http.get<Pagina>(`${this.baseURL}/${id}`);
  }

  editar(id: number, Pagina: Pagina): Observable<Pagina> {
    return this.http.put<Pagina>(`${this.baseURL}/${id}`, Pagina);
  }

  criar(Pagina: Pagina): Observable<Pagina> {
    return this.http.post<Pagina>(`${this.baseURL}`, Pagina);
  }

  deletar(id: number): Observable<Pagina> {
    return this.http.delete<Pagina>(`${this.baseURL}/${id}`);
  }
}
