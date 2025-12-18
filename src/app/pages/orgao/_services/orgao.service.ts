import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Orgao } from '../_models/orgao.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrgaoService {
  baseURL = `${environment.apiLegacyUrl}/orgao`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Orgao[]> {
    return this.http.get<Orgao[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Orgao> {
    return this.http.get<Orgao>(`${this.baseURL}/${id}`);
  }

  editar(id: number, orgao: Orgao): Observable<Orgao> {
    return this.http.put<Orgao>(`${this.baseURL}/${id}`, orgao);
  }

  criar(orgao: Orgao): Observable<Orgao> {
    return this.http.post<Orgao>(`${this.baseURL}`, orgao);
  }

  deletar(id: number): Observable<Orgao> {
    return this.http.delete<Orgao>(`${this.baseURL}/${id}`);
  }
}
