import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ImpressaoDocumentoLicitacao,
  RelatorioLicitacaoAnalitico,
  RelatorioLicitacaoFornecedor,
  RelatorioLicitacaoFornecedorAnalitico,
  RelatorioLicitacaoModalidade,
  RelatorioLicitacaoSintetico,
} from '../_models/relatorio-licitacao.model';
import { ExportacaoDocumentoLicitacao } from '../_models/exportacao-licitacao.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioLicitacaoService {
  baseURL = `${environment.apiLegacyUrl}/relatoriolicitacao`;
  constructor(private http: HttpClient) {}

  download(documento: ImpressaoDocumentoLicitacao): Observable<any> {
      return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }

  exportar(documento: ExportacaoDocumentoLicitacao): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/exportacao`, documento, {
      responseType: 'arraybuffer',
    });
  }

  licitacaoSintetico(documento: RelatorioLicitacaoSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/sintetico`, documento, {
      responseType: 'arraybuffer',
    });
  }

  licitacaoModalidade(documento: RelatorioLicitacaoModalidade): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/modalidade`, documento, {
      responseType: 'arraybuffer',
    });
  }

  licitacaoFornecedor(documento: RelatorioLicitacaoFornecedor): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/fornecedor`, documento, {
      responseType: 'arraybuffer',
    });
  }

  licitacaoAnalitico(documento: RelatorioLicitacaoAnalitico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/analitico`, documento, {
      responseType: 'arraybuffer',
    });
  }

  licitacaoFornecedorAnalitico(documento: RelatorioLicitacaoFornecedorAnalitico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/fornecedoranalitico`, documento, {
      responseType: 'arraybuffer',
    });
  }
}
