import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organizacao } from '../_models/organizacao.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizacaoService {
  baseURL = `${environment.apiLegacyUrl}/organizacao`;
  constructor(private http: HttpClient) {}

  consultarOrganizacao(): Observable<Organizacao> {
    return this.http.get<Organizacao>(`${this.baseURL}`);
  }

  consultarPorId(id: number): Observable<Organizacao> {
    return this.http.get<Organizacao>(`${this.baseURL}/${id}`);
  }

  consultarBrasaoPorId(id: number): Observable<Blob> {
    return this.http.get(`${this.baseURL}/brasao/${id}`, { responseType: 'blob' });
  }

  editar(id: number, organizacao: FormData): Observable<Organizacao> {
    return this.http.put<Organizacao>(`${this.baseURL}/${id}`, organizacao);
  }
}
