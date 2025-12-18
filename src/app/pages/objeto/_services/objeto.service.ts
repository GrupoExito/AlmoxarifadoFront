import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { CriarObjeto, Objeto } from '../_models/objeto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObjetoService {
  baseURL = `${environment.apiLegacyUrl}/objeto`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Objeto[]> {
    return this.http.get<Objeto[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Objeto> {
    return this.http.get<Objeto>(`${this.baseURL}/${id}`);
  }

  editar(id: number, objeto: Objeto): Observable<Objeto> {
    return this.http.put<Objeto>(`${this.baseURL}/${id}`, objeto);
  }

  criar(objeto: CriarObjeto): Observable<Objeto> {
    return this.http.post<Objeto>(`${this.baseURL}`, objeto);
  }

  deletar(id: number): Observable<Objeto> {
    return this.http.delete<Objeto>(`${this.baseURL}/${id}`);
  }
}
