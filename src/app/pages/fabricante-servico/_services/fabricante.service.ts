import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fabricante } from '../_models/fabricante.model';

@Injectable({
  providedIn: 'root',
})
export class FabricanteService {
  baseURL = `${environment.apiLegacyUrl}/Fabricante`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Fabricante[]> {
    return this.http.get<Fabricante[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Fabricante> {
    return this.http.get<Fabricante>(`${this.baseURL}/${id}`);
  }

  editar(id: number, Fabricante: Fabricante): Observable<Fabricante> {
    return this.http.put<Fabricante>(`${this.baseURL}/${id}`, Fabricante);
  }

  criar(Fabricante: Fabricante): Observable<Fabricante> {
    return this.http.post<Fabricante>(`${this.baseURL}`, Fabricante);
  }

  deletar(id: number): Observable<Fabricante> {
    return this.http.delete<Fabricante>(`${this.baseURL}/${id}`);
  }
}
