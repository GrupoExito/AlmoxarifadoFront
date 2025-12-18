import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  ResponsavelPlanejamento } from '../_models/responsavel-planejamento.model';

@Injectable({
  providedIn: 'root',
})
export class ResponsavelPlanejamentoService {
  baseURL = `${environment.apiLegacyUrl}/responsavelplanejamento`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ResponsavelPlanejamento[]> {
    return this.http.get<ResponsavelPlanejamento[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<ResponsavelPlanejamento> {
    return this.http.get<ResponsavelPlanejamento>(`${this.baseURL}/${id}`);
  }

  editar(id: number, responsavelPlanejamento: ResponsavelPlanejamento): Observable<ResponsavelPlanejamento> {
    return this.http.put<ResponsavelPlanejamento>(`${this.baseURL}/${id}`, responsavelPlanejamento);
  }

  criar(responsavelPlanejamento: ResponsavelPlanejamento): Observable<ResponsavelPlanejamento> {
    return this.http.post<ResponsavelPlanejamento>(`${this.baseURL}`, responsavelPlanejamento);
  }

  deletar(id: number): Observable<ResponsavelPlanejamento> {
    return this.http.delete<ResponsavelPlanejamento>(`${this.baseURL}/${id}`);
  }
}
