import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtualizacaoSistema } from '../_models/atualizacao-sistema.model';

@Injectable({
  providedIn: 'root',
})
export class AtualizacaoSistemaService {
  private routeId: number | null = null;
  baseURL = `${environment.apiLegacyUrl}/atualizacaosistema`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<AtualizacaoSistema[]> {
    return this.http.get<AtualizacaoSistema[]>(this.baseURL);
  }
  consultar(id: number): Observable<AtualizacaoSistema> {
    return this.http.get<AtualizacaoSistema>(`${this.baseURL}/${id}`);
  }
 }
