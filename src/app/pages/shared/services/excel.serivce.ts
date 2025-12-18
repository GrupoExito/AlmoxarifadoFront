import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  baseURL = `${environment.apiLegacyUrl}/excel`;
  constructor(private http: HttpClient) {}

  downloadPlanilhaFornecedorCotacao(cotacao_id: number, fornecedor_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/gerar/cotacao/${cotacao_id}/fornecedor/${fornecedor_id}`, {
      responseType: 'arraybuffer',
    });
  }

  downloadPlanilhaFornecedorLoteItensCotacao(
    cotacao_id: number,
    fornecedor_id: number,
    lote_id: number
  ): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/gerar/cotacao/${cotacao_id}/fornecedor/${fornecedor_id}/lote/${lote_id}`, {
      responseType: 'arraybuffer',
    });
  }

  downloadPlanilhaProcessoAdm(processo_adm_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/gerar/processo_adm/${processo_adm_id}`, {
      responseType: 'arraybuffer',
    });
  }

  importarPlanilhaFornecedorCotacao(
    importacaoCotacaoFornecedor: FormData,
    cotacao_id: number,
    fornecedor_id: number
  ): Observable<FormData> {
    return this.http.post<FormData>(
      `${this.baseURL}/importar/cotacao/${cotacao_id}/fornecedor/${fornecedor_id}`,
      importacaoCotacaoFornecedor
    );
  }
}
