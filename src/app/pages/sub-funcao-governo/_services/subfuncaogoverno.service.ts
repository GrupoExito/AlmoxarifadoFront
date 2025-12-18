import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { SubFuncaoGoverno } from '../_models/subfuncaogoverno.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubFuncaoGovernoService {
  baseURL = `${environment.apiLegacyUrl}/subfuncaoGoverno`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<SubFuncaoGoverno[]> {
    return this.http.get<SubFuncaoGoverno[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<SubFuncaoGoverno> {
    return this.http.get<SubFuncaoGoverno>(`${this.baseURL}/${id}`);
  }

  editar(id: number, subfuncaoGoverno: SubFuncaoGoverno): Observable<SubFuncaoGoverno> {
    return this.http.put<SubFuncaoGoverno>(`${this.baseURL}/${id}`, subfuncaoGoverno);
  }

  criar(subfuncaoGoverno: SubFuncaoGoverno): Observable<SubFuncaoGoverno> {
    return this.http.post<SubFuncaoGoverno>(`${this.baseURL}`, subfuncaoGoverno);
  }

  deletar(id: number): Observable<SubFuncaoGoverno> {
    return this.http.delete<SubFuncaoGoverno>(`${this.baseURL}/${id}`);
  }
}
