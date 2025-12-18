import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ImpressaoDocumentoSD,
  RelatorioSDDetalhada,
  RelatorioSDPorSecretaria,
  RelatorioSDPorStatus,
  RelatorioSDResumida,
} from '../_models/relatorio.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioSDService {
  baseURL = `${environment.apiLegacyUrl}/relatoriosd`;
  constructor(private http: HttpClient) {}

  gerarSDPorSecretaria(relatorio: RelatorioSDPorSecretaria): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/sdporsecretaria`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarSDPorStatus(relatorio: RelatorioSDPorStatus): Observable<RelatorioSDPorStatus> {
    return this.http.post<RelatorioSDPorStatus>(`${this.baseURL}/sdporstatus`, relatorio);
  }

  gerarSDResumida(relatorio: RelatorioSDResumida): Observable<RelatorioSDResumida> {
    return this.http.post<RelatorioSDResumida>(`${this.baseURL}/sdresumida`, relatorio);
  }

  gerarSDDetalhada(relatorio: RelatorioSDDetalhada): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/sddetalhada`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  download(documento: ImpressaoDocumentoSD): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }

  assinarDocumento(documento: ImpressaoDocumentoSD): Observable<any> {
    return this.http.post(`${this.baseURL}/assinardocumento`, documento);
  }
}
