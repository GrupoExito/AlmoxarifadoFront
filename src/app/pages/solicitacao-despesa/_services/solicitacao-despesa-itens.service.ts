import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoImportacao, SolicitacaoDespesaItens } from '../_models/solicitacao-despesa-itens.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitacaoDespesaItensService {
  baseURL = `${environment.apiLegacyUrl}/solicitacaodespesaitem`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<SolicitacaoDespesaItens[]> {
    return this.http.get<SolicitacaoDespesaItens[]>(`${this.baseURL}`);
  }

  consultarSDItensPorSDId(sd_id: number): Observable<SolicitacaoDespesaItens[]> {
    return this.http.get<SolicitacaoDespesaItens[]>(`${this.baseURL}/sd/${sd_id}`);
  }

  criar(sdItem: SolicitacaoDespesaItens): Observable<SolicitacaoDespesaItens> {
    return this.http.post<SolicitacaoDespesaItens>(`${this.baseURL}`, sdItem);
  }

  importarPlanejamentoItens(sdItem: SolicitacaoDespesaItens[]): Observable<SolicitacaoDespesaItens[]> {
    return this.http.post<SolicitacaoDespesaItens[]>(`${this.baseURL}/importar`, sdItem);
  }

  deletar(id: number): Observable<SolicitacaoDespesaItens> {
    return this.http.delete<SolicitacaoDespesaItens>(`${this.baseURL}/${id}`);
  }

  deletarTodosItens(sd_id: number): Observable<SolicitacaoDespesaItens> {
    return this.http.delete<SolicitacaoDespesaItens>(`${this.baseURL}/excluirtodos/${sd_id}`);
  }

  atualizarQuantidade(sdItem: any): Observable<SolicitacaoDespesaItens[]> {
    return this.http.put<SolicitacaoDespesaItens[]>(`${this.baseURL}/quantidade`, sdItem);
  }

  importarProduto(produtoImportacao: ProdutoImportacao[], sd_id: number): Observable<ProdutoImportacao[]> {
    return this.http.post<ProdutoImportacao[]>(`${this.baseURL}/importar/${sd_id}`, produtoImportacao);
  }

  downloadPlanilhaModelo(): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/planilhamodelo`, {
      responseType: 'arraybuffer',
    });
  }

  atualizarItemApostilamento(
    sd_id: number,
    gproduto_servico_id: number,
    quantidade: number
  ): Observable<SolicitacaoDespesaItens> {
    return this.http.put<SolicitacaoDespesaItens>(
      `${this.baseURL}/atualizaritem/${sd_id}/${gproduto_servico_id}/${quantidade}`,
      null
    );
  }

  deletarApostilamento(id: number): Observable<SolicitacaoDespesaItens> {
    return this.http.delete<SolicitacaoDespesaItens>(`${this.baseURL}/apostilamento/item/${id}`);
  }
}
