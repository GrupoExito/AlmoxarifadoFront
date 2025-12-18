import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ImpressaoDocumentoCredenciamento,
  RelatorioCredenciamentoAnalitico,
  RelatorioCredenciamentoSintetico,
} from '../_models/relatorio-credenciamento.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioCredenciamentoService {
  baseURL = `${environment.apiLegacyUrl}/relatoriocredenciamento`;
  constructor(private http: HttpClient) {}

  credenciamentoSintetico(documento: RelatorioCredenciamentoSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/sintetico`, documento, {
      responseType: 'arraybuffer',
    });
  }

  credenciamentoAnalitico(documento: RelatorioCredenciamentoAnalitico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/analitico`, documento, {
      responseType: 'arraybuffer',
    });
  }

    download(documento: ImpressaoDocumentoCredenciamento): Observable<ArrayBuffer> {
      return this.http.post(`${this.baseURL}/impressao`, documento, {
        responseType: 'arraybuffer',
      });
    }
}
