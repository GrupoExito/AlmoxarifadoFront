import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { TceTipoObra } from '../_models/tce-tipo-obra.model';

@Injectable({
  providedIn: 'root',
})
export class TceTipoObraService {
  baseURL = `${environment.apiLegacyUrl}/tcetipoobra`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<TceTipoObra[]> {
    return this.http.get<TceTipoObra[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<TceTipoObra> {
    return this.http.get<TceTipoObra>(`${this.baseURL}/${id}`);
  }

  editar(id: number, TceTipoObra: TceTipoObra): Observable<TceTipoObra> {
    return this.http.put<TceTipoObra>(`${this.baseURL}/${id}`, TceTipoObra);
  }

  criar(TceTipoObra: TceTipoObra): Observable<TceTipoObra> {
    return this.http.post<TceTipoObra>(`${this.baseURL}`, TceTipoObra);
  }

  deletar(id: number): Observable<TceTipoObra> {
    return this.http.delete<TceTipoObra>(`${this.baseURL}/${id}`);
  }

  download(modelo: TceTipoObra, id: number): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/download/${id}`, modelo, {
      responseType: 'arraybuffer',
    });
  }
}
