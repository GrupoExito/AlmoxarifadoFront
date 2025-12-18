import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { TceQualificacaoProfissional } from '../_models/tce-qualificacao-profissional.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TceQualificacaoProfissionalService {
  baseURL = `${environment.apiLegacyUrl}/tcequalificacaoprofissional`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<TceQualificacaoProfissional[]> {
    return this.http.get<TceQualificacaoProfissional[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<TceQualificacaoProfissional> {
    return this.http.get<TceQualificacaoProfissional>(`${this.baseURL}/${id}`);
  }

  editar(id: number, TceQualificacaoProfissional: TceQualificacaoProfissional): Observable<TceQualificacaoProfissional> {
    return this.http.put<TceQualificacaoProfissional>(`${this.baseURL}/${id}`, TceQualificacaoProfissional);
  }

  criar(TceQualificacaoProfissional: TceQualificacaoProfissional): Observable<TceQualificacaoProfissional> {
    return this.http.post<TceQualificacaoProfissional>(`${this.baseURL}`, TceQualificacaoProfissional);
  }

  deletar(id: number): Observable<TceQualificacaoProfissional> {
    return this.http.delete<TceQualificacaoProfissional>(`${this.baseURL}/${id}`);
  }

  download(modelo: TceQualificacaoProfissional, id: number): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/download/${id}`, modelo, {
      responseType: 'arraybuffer',
    });
  }
}
