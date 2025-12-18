import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { CentroCusto } from '../_models/centro-custo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CentroCustoService {
  baseURL = `${environment.apiLegacyUrl}/CentroCusto`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<CentroCusto[]> {
    return this.http.get<CentroCusto[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<CentroCusto> {
    return this.http.get<CentroCusto>(`${this.baseURL}/${id}`);
  }

  editar(id: number, CentroCusto: CentroCusto): Observable<CentroCusto> {
    return this.http.put<CentroCusto>(`${this.baseURL}/${id}`, CentroCusto);
  }

  criar(CentroCusto: CentroCusto): Observable<CentroCusto> {
    return this.http.post<CentroCusto>(`${this.baseURL}`, CentroCusto);
  }

  deletar(id: number): Observable<CentroCusto> {
    return this.http.delete<CentroCusto>(`${this.baseURL}/${id}`);
  }
}
