import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ContratacaoPregaoLanceMargens,
  Pregao,
  PregaoFornecedor,
  PregaoLanceMenorValorItem,
  PregaoLancePreco,
} from '../_models/pregao-fornecedor.model';

@Injectable({
  providedIn: 'root',
})
export class PregaoService {
  baseURL = `${environment.apiLegacyUrl}/pregao`;
  constructor(private http: HttpClient) {}

  consultarPregao(contratacao_id: number): Observable<Pregao> {
    return this.http.get<Pregao>(`${this.baseURL}/${contratacao_id}`);
  }

  listarPregaoFornecedor(contratacao_id: number): Observable<PregaoFornecedor[]> {
    return this.http.get<PregaoFornecedor[]>(`${this.baseURL}/fornecedor/${contratacao_id}`);
  }

  consultarPregaoFornecedor(contratacao_id: number, gfornecedor_id: number): Observable<PregaoFornecedor> {
    return this.http.get<PregaoFornecedor>(`${this.baseURL}/fornecedor/${contratacao_id}/${gfornecedor_id}`);
  }

  consultarLancesGlobal(parameters: any): Observable<PregaoLanceMenorValorItem[]> {
    return this.http.get<PregaoLanceMenorValorItem[]>(`${this.baseURL}/consultar/lance/global`, {
      params: parameters,
    });
  }

  carregarLancesItem(parameters: any): Observable<PregaoLanceMenorValorItem[]> {
    return this.http.get<PregaoLanceMenorValorItem[]>(`${this.baseURL}/carregar/lance/item`, {
      params: parameters,
    });
  }

  carregarLancesLote(parameters: any): Observable<PregaoLanceMenorValorItem[]> {
    return this.http.get<PregaoLanceMenorValorItem[]>(`${this.baseURL}/carregar/lance/lote`, {
      params: parameters,
    });
  }

  carregarLancesGlobal(parameters: any): Observable<PregaoLanceMenorValorItem[]> {
    return this.http.get<PregaoLanceMenorValorItem[]>(`${this.baseURL}/carregar/lance/global`, {
      params: parameters,
    });
  }

  consultarLancesItem(parameters: any): Observable<PregaoLanceMenorValorItem[]> {
    return this.http.get<PregaoLanceMenorValorItem[]>(`${this.baseURL}/consultar/lance/item`, {
      params: parameters,
    });
  }

  consultarLancesLote(parameters: any): Observable<PregaoLanceMenorValorItem[]> {
    return this.http.get<PregaoLanceMenorValorItem[]>(`${this.baseURL}/consultar/lance/lote`, {
      params: parameters,
    });
  }

  criar(contratacao_id: number, pregaoFornecedor: PregaoFornecedor): Observable<PregaoFornecedor> {
    return this.http.post<PregaoFornecedor>(`${this.baseURL}/fornecedor/${contratacao_id}`, pregaoFornecedor);
  }

  exportar(contratacao_id: number, contratacao: any): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/exportar/itens/${contratacao_id}`, contratacao, {
      responseType: 'arraybuffer',
    });
  }

  importar(importacaoPrimeiroLance: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.baseURL}/importar/itens`, importacaoPrimeiroLance);
  }

  atualizarLanceInicial(lanceInicial: Partial<PregaoLancePreco>): Observable<PregaoLancePreco> {
    return this.http.post<PregaoLancePreco>(`${this.baseURL}/lance/inicial`, lanceInicial);
  }

  inserirLancePregaoMenorPreco(lances: Partial<PregaoLancePreco>[]): Observable<PregaoLancePreco> {
    return this.http.post<PregaoLancePreco>(`${this.baseURL}/lance/menorpreco`, lances);
  }

  selecionarVencedorItem(pregaoLance: Partial<PregaoLanceMenorValorItem>): Observable<PregaoLanceMenorValorItem> {
    return this.http.post<PregaoLanceMenorValorItem>(`${this.baseURL}/lance/menorprecoitem/vencedor`, pregaoLance);
  }

  selecionarVencedorLote(pregaoLance: Partial<PregaoLanceMenorValorItem>): Observable<PregaoLanceMenorValorItem> {
    return this.http.post<PregaoLanceMenorValorItem>(`${this.baseURL}/lance/menorprecolote/vencedor`, pregaoLance);
  }

  selecionarVencedorGlobal(pregaoLance: Partial<PregaoLanceMenorValorItem>): Observable<PregaoLanceMenorValorItem> {
    return this.http.post<PregaoLanceMenorValorItem>(`${this.baseURL}/lance/menorprecoglobal/vencedor`, pregaoLance);
  }

  atualizarPregaoFornecedor(id: number, pregaoFornecedor: PregaoFornecedor): Observable<PregaoFornecedor> {
    return this.http.put<PregaoFornecedor>(`${this.baseURL}/fornecedor/${id}`, pregaoFornecedor);
  }

  atualizarPregaoSituacao(pregaoFornecedor: any): Observable<PregaoLanceMenorValorItem> {
    return this.http.put<PregaoLanceMenorValorItem>(`${this.baseURL}/situacao`, pregaoFornecedor);
  }

  atualizarPregaoObservacao(pregaoFornecedor: any): Observable<PregaoLanceMenorValorItem> {
    return this.http.put<PregaoLanceMenorValorItem>(`${this.baseURL}/observacao`, pregaoFornecedor);
  }

  alterarContratacaoPregaoMargens(margem: ContratacaoPregaoLanceMargens): Observable<ContratacaoPregaoLanceMargens> {
    return this.http.put<ContratacaoPregaoLanceMargens>(`${this.baseURL}/margem`, margem);
  }

  deletarFornecedorPregao(
    contratacao_id: number,
    gfornecedor_id: number,
    criterio: number
  ): Observable<PregaoFornecedor[]> {
    return this.http.delete<PregaoFornecedor[]>(
      `${this.baseURL}/fornecedor/${contratacao_id}/${gfornecedor_id}/${criterio}`
    );
  }

  alterarSituacaoPregao(contratacao_id: number, situacao_pregao: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}/${contratacao_id}/situacaopregao/${situacao_pregao}`);
  }
}
