import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpressaoDocumentoPcaUnificado } from '../_models/relatorio-pca-unificado.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioPcaUnificadoService {
  baseURL = `${environment.apiLegacyUrl}/RelatorioPCAUnificado`;
  constructor(private http: HttpClient) {}

  download(documento: ImpressaoDocumentoPcaUnificado): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }
  // imprimirRelatorioPCAAnalitico(documento: any): Observable<ArrayBuffer> {
  //   return this.http.post(`${this.baseURL}/impressaopca/analitico`, documento, {
  //     responseType: 'arraybuffer',
  //   });
  // }

  // imprimirRelatorioPCASintetico(documento: any): Observable<ArrayBuffer> {
  //   return this.http.post(`${this.baseURL}/impressaopca/sintetico`, documento, {
  //     responseType: 'arraybuffer',
  //   });
  // }
}