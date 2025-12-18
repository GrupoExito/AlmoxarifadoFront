import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoServico, ProdutoServicoEstoqueAlmoxarifado } from '../_models/produto-servico.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoEstoqueAlmoxarifadoService {
  baseURL = `${environment.apiUrl}/produtoservico/estoque_almoxarifado`;
  constructor(private http: HttpClient) {}

  listarPorId(id: number): Observable<ProdutoServicoEstoqueAlmoxarifado[]> {
    return this.http.get<ProdutoServicoEstoqueAlmoxarifado[]>(`${this.baseURL}/${id}`);
  }

  editar(id: number, ProdutoEstoqueAlmoxarifado: any): Observable<ProdutoServicoEstoqueAlmoxarifado> {
    return this.http.put<ProdutoServicoEstoqueAlmoxarifado>(`${this.baseURL}/${id}`, ProdutoEstoqueAlmoxarifado);
  }

  criar(
    ProdutoServicoEstoqueAlmoxarifado: ProdutoServicoEstoqueAlmoxarifado
  ): Observable<ProdutoServicoEstoqueAlmoxarifado> {
    return this.http.post<ProdutoServicoEstoqueAlmoxarifado>(`${this.baseURL}`, ProdutoServicoEstoqueAlmoxarifado);
  }

  deletar(id: number): Observable<ProdutoServicoEstoqueAlmoxarifado> {
    return this.http.delete<ProdutoServicoEstoqueAlmoxarifado>(`${this.baseURL}/${id}`);
  }
}
