import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { ModeloPlanejamento } from '../_models/modelo-planejamento.model';
import { Observable } from 'rxjs';
import { ModeloPlanejamentoProduto } from '../_models/modelo-planejamento-produto.model';

@Injectable({
  providedIn: 'root',
})
export class ModeloPlanejamentoService {
  baseURL = `${environment.apiLegacyUrl}/modeloplanejamento`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ModeloPlanejamento[]> {
    return this.http.get<ModeloPlanejamento[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<ModeloPlanejamento> {
    return this.http.get<ModeloPlanejamento>(`${this.baseURL}/${id}`);
  }

  editar(id: number, modeloPlanejamento: ModeloPlanejamento): Observable<ModeloPlanejamento> {
    return this.http.put<ModeloPlanejamento>(`${this.baseURL}/${id}`, modeloPlanejamento);
  }

  criar(modeloPlanejamento: ModeloPlanejamento): Observable<ModeloPlanejamento> {
    return this.http.post<ModeloPlanejamento>(`${this.baseURL}`, modeloPlanejamento);
  }

  deletar(id: number): Observable<ModeloPlanejamento> {
    return this.http.delete<ModeloPlanejamento>(`${this.baseURL}/${id}`);
  }

  listarModeloPlanejamentoProduto(modeloId: number): Observable<ModeloPlanejamentoProduto[]> {
    return this.http.get<ModeloPlanejamentoProduto[]>(`${this.baseURL}/produtos/${modeloId}`);
  }

  criarModeloPlanejamentoProduto(
    modeloPlanejamentoProduto: ModeloPlanejamentoProduto
  ): Observable<ModeloPlanejamentoProduto> {
    return this.http.post<ModeloPlanejamentoProduto>(`${this.baseURL}/produtos`, modeloPlanejamentoProduto);
  }

  deletarModeloPlanejamentoProduto(id: number): Observable<ModeloPlanejamentoProduto> {
    return this.http.delete<ModeloPlanejamentoProduto>(`${this.baseURL}/produtos/${id}`);
  }

  importarModeloPlanejamentoProduto(
    modeloPlanejamentoProduto: ModeloPlanejamentoProduto[]
  ): Observable<ModeloPlanejamentoProduto[]> {
    return this.http.post<ModeloPlanejamentoProduto[]>(`${this.baseURL}/produtos/importar`, modeloPlanejamentoProduto);
  }
}
