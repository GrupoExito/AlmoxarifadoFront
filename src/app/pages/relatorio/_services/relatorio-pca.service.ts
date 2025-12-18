import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpressaoDocumentoPCA } from '../_models/relatorio-pca.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioPcaService {
  baseURL = `${environment.apiLegacyUrl}/relatorioplanejamentocontratacao`;
  constructor(private http: HttpClient) {}

  download(documento: ImpressaoDocumentoPCA): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }
}
