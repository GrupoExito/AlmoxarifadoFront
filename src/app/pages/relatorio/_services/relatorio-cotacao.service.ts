import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpressaoDocumentoCotacao } from '../_models/relatorio-cotacao.model';
import { ExportacaoDocumentoCotacao } from '../_models/exportacao-cotacao.model';

@Injectable({
  providedIn: 'root',
})

export class RelatorioCotacaoService {
  baseURL = `${environment.apiLegacyUrl}/relatoriocotacao`;
  constructor(private http: HttpClient) {}

  download(documento: ImpressaoDocumentoCotacao): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }


  exportar(documento: ExportacaoDocumentoCotacao): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/exportacao`, documento, {
      responseType: 'arraybuffer',
    });
  }

  assinarDocumento(documento: ImpressaoDocumentoCotacao): Observable<any> {
    return this.http.post(`${this.baseURL}/assinardocumento`, documento);
  }
}
