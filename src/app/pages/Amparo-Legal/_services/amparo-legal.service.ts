import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AmparoLegal } from '../_models/amparo-legal.model';

@Injectable({
  providedIn: 'root',
})
export class AmparoLegalService {
  baseURL = `${environment.apiLegacyUrl}/amparolegal`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<AmparoLegal[]> {
    return this.http.get<AmparoLegal[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<AmparoLegal> {
    return this.http.get<AmparoLegal>(`${this.baseURL}/${id}`);
  }

  editar(id: number, amaparolegal: AmparoLegal): Observable<AmparoLegal> {
    return this.http.put<AmparoLegal>(`${this.baseURL}/${id}`, amaparolegal);
  }

  criar(amaparolegal: AmparoLegal): Observable<AmparoLegal> {
    return this.http.post<AmparoLegal>(`${this.baseURL}`, amaparolegal);
  }

  deletar(id: number): Observable<AmparoLegal> {
    return this.http.delete<AmparoLegal>(`${this.baseURL}/${id}`);
  }
}
