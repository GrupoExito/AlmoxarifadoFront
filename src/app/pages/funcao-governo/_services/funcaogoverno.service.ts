import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { FuncaoGoverno } from '../_models/funcaogoverno.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuncaoGovernoService {
  baseURL = `${environment.apiLegacyUrl}/funcaoGoverno`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<FuncaoGoverno[]> {
    return this.http.get<FuncaoGoverno[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<FuncaoGoverno> {
    return this.http.get<FuncaoGoverno>(`${this.baseURL}/${id}`);
  }

  editar(id: number, funcaoGoverno: FuncaoGoverno): Observable<FuncaoGoverno> {
    return this.http.put<FuncaoGoverno>(`${this.baseURL}/${id}`, funcaoGoverno);
  }

  criar(funcaoGoverno: FuncaoGoverno): Observable<FuncaoGoverno> {
    return this.http.post<FuncaoGoverno>(`${this.baseURL}`, funcaoGoverno);
  }

  deletar(id: number): Observable<FuncaoGoverno> {
    return this.http.delete<FuncaoGoverno>(`${this.baseURL}/${id}`);
  }
}
