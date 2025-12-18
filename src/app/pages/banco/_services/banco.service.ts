import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Banco } from '../_models/banco.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BancoService {
  baseURL = `${environment.apiLegacyUrl}/banco`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Banco[]> {
    return this.http.get<Banco[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Banco> {
    return this.http.get<Banco>(`${this.baseURL}/${id}`);
  }

  editar(id: number, banco: Banco): Observable<Banco> {
    return this.http.put<Banco>(`${this.baseURL}/${id}`, banco);
  }

  criar(banco: Banco): Observable<Banco> {
    return this.http.post<Banco>(`${this.baseURL}`, banco);
  }

  deletar(id: number): Observable<Banco> {
    return this.http.delete<Banco>(`${this.baseURL}/${id}`);
  }
}
