import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { TipoCertidao } from '../_models/tipocertidao.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoCertidaoService {
  baseURL = `${environment.apiLegacyUrl}/TipoCertidao`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<TipoCertidao[]> {
    return this.http.get<TipoCertidao[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<TipoCertidao> {
    return this.http.get<TipoCertidao>(`${this.baseURL}/${id}`);
  }

  editar(id: number, TipoCertidao: TipoCertidao): Observable<TipoCertidao> {
    return this.http.put<TipoCertidao>(`${this.baseURL}/${id}`, TipoCertidao);
  }

  criar(TipoCertidao: TipoCertidao): Observable<TipoCertidao> {
    return this.http.post<TipoCertidao>(`${this.baseURL}`, TipoCertidao);
  }

  deletar(id: number): Observable<TipoCertidao> {
    return this.http.delete<TipoCertidao>(`${this.baseURL}/${id}`);
  }

}
