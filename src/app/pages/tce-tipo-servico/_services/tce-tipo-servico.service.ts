import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TceTipoServico } from '../_models/tce-tipo-servico.model';


@Injectable({
  providedIn: 'root',
})
export class TceTipoServicoService {
  baseURL = `${environment.apiLegacyUrl}/tcetiposervico`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<TceTipoServico[]> {
    return this.http.get<TceTipoServico[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<TceTipoServico> {
    return this.http.get<TceTipoServico>(`${this.baseURL}/${id}`);
  }

  editar(id: number, TceTipoServico: TceTipoServico): Observable<TceTipoServico> {
    return this.http.put<TceTipoServico>(`${this.baseURL}/${id}`, TceTipoServico);
  }

  criar(TceTipoServico: TceTipoServico): Observable<TceTipoServico> {
    return this.http.post<TceTipoServico>(`${this.baseURL}`, TceTipoServico);
  }

  deletar(id: number): Observable<TceTipoServico> {
    return this.http.delete<TceTipoServico>(`${this.baseURL}/${id}`);
  }

  download(modelo: TceTipoServico, id: number): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/download/${id}`, modelo, {
      responseType: 'arraybuffer',
    });
  }
}
