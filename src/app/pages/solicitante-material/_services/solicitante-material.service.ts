import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitanteMaterial } from '../_models/solicitante-material.model';
import { Setor } from '@pages/setor/_models/setor.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitanteService {
  baseURL = `${environment.apiUrl}/SolicitanteMaterial`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<SolicitanteMaterial[]> {
    return this.http.get<SolicitanteMaterial[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<SolicitanteMaterial> {
    return this.http.get<SolicitanteMaterial>(`${this.baseURL}/${id}`);
  }

  editar(id: number, SolicitanteMaterial: SolicitanteMaterial): Observable<SolicitanteMaterial> {
    return this.http.put<SolicitanteMaterial>(`${this.baseURL}/${id}`, SolicitanteMaterial);
  }

  criar(SolicitanteMaterial: SolicitanteMaterial): Observable<SolicitanteMaterial> {
    return this.http.post<SolicitanteMaterial>(`${this.baseURL}`, SolicitanteMaterial);
  }

  deletar(id: number): Observable<SolicitanteMaterial> {
    return this.http.delete<SolicitanteMaterial>(`${this.baseURL}/${id}`);
  }

  ListarSetorPorSolicitante(solicitante_id: number) {
    return this.http.get<Setor[]>(`${this.baseURL}/setorporsolicitante/${solicitante_id}`);
  }

  ListarSolicitantePorSetor(setor_id: number) {
    return this.http.get<SolicitanteMaterial[]>(`${this.baseURL}/setor/solicitante/${setor_id}`);
  }
}
