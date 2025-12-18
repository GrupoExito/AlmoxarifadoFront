import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjetoAtividade } from '../_models/projetoatividade.model';

@Injectable({
  providedIn: 'root',
})
export class ProjetoAtividadeService {
  baseURL = `${environment.apiLegacyUrl}/projetoatividade`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ProjetoAtividade[]> {
    return this.http.get<ProjetoAtividade[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<ProjetoAtividade> {
    return this.http.get<ProjetoAtividade>(`${this.baseURL}/${id}`);
  }

  editar(id: number, projetoatividade: ProjetoAtividade): Observable<ProjetoAtividade> {
    return this.http.put<ProjetoAtividade>(`${this.baseURL}/${id}`, projetoatividade);
  }

  criar(projetoatividade: ProjetoAtividade): Observable<ProjetoAtividade> {
    return this.http.post<ProjetoAtividade>(`${this.baseURL}`, projetoatividade);
  }

  deletar(id: number): Observable<ProjetoAtividade> {
    return this.http.delete<ProjetoAtividade>(`${this.baseURL}/${id}`);
  }
}
