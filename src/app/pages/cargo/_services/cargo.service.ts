import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Cargo } from '../_models/cargo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  baseURL = `${environment.apiLegacyUrl}/Cargo`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.baseURL}/${id}`);
  }

  editar(id: number, Cargo: Cargo): Observable<Cargo> {
    return this.http.put<Cargo>(`${this.baseURL}/${id}`, Cargo);
  }

  criar(Cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(`${this.baseURL}`, Cargo);
  }

  deletar(id: number): Observable<Cargo> {
    return this.http.delete<Cargo>(`${this.baseURL}/${id}`);
  }
}
