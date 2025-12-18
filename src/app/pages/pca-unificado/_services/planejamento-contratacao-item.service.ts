import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanejamentoContratacaoItem } from '../_models/pca-unificado-ffd.model';

@Injectable({
  providedIn: 'root',
})
export class PlanejamentoContratacaoItemService {
  baseURL = `${environment.apiLegacyUrl}/planejamentocontratacaoitem`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<PlanejamentoContratacaoItem[]> {
    return this.http.get<PlanejamentoContratacaoItem[]>(`${this.baseURL}`);
  }

  listarItensPCA(pca_id: number): Observable<PlanejamentoContratacaoItem[]> {
    return this.http.get<PlanejamentoContratacaoItem[]>(`${this.baseURL}/${pca_id}`);
  }

  adicionarItem(item: PlanejamentoContratacaoItem): Observable<PlanejamentoContratacaoItem> {
    return this.http.post<PlanejamentoContratacaoItem>(`${this.baseURL}`, item);
  }

  deletar(id: number): Observable<PlanejamentoContratacaoItem> {
    return this.http.delete<PlanejamentoContratacaoItem>(`${this.baseURL}/${id}`);
  }

  atualizarQuantidade(pca_item: any): Observable<PlanejamentoContratacaoItem> {
    return this.http.put<PlanejamentoContratacaoItem>(`${this.baseURL}/quantidade`, pca_item);
  }

  // importarPlanejamentoItens(sdItem: SolicitacaoDespesaItens[]): Observable<SolicitacaoDespesaItens[]> {
  //   return this.http.post<SolicitacaoDespesaItens[]>(`${this.baseURL}/importar`, sdItem);
  // }

  // importarProduto(produtoImportacao: ProdutoImportacao[], sd_id: number): Observable<ProdutoImportacao[]> {
  //   return this.http.post<ProdutoImportacao[]>(`${this.baseURL}/importar/${sd_id}`, produtoImportacao);
  // }

  // downloadPlanilhaModelo(): Observable<ArrayBuffer> {
  //   return this.http.get(`${this.baseURL}/download/planilhamodelo`, {
  //     responseType: 'arraybuffer',
  //   });
  // }
}
