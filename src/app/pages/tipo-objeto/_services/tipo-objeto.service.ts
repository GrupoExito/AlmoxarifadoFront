import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoObjetoDTO } from '../_models/tipo-objeto.model';

@Injectable({
  providedIn: 'root',
})
export class TipoObjetoService {
  baseURL = `${environment.apiLegacyUrl}/tipoobjeto`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<TipoObjetoDTO[]> {
    return this.http.get<TipoObjetoDTO[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<TipoObjetoDTO> {
    return this.http.get<TipoObjetoDTO>(`${this.baseURL}/${id}`);
  }

  criar(TipoObjetoDTO: TipoObjetoDTO): Observable<TipoObjetoDTO> {
    return this.http.post<TipoObjetoDTO>(`${this.baseURL}`, TipoObjetoDTO);
  }
}
