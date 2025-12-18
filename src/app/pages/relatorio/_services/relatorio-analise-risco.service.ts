import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpressaoDocumentoAnaliseRisco } from '../_models/relatorio-analise-risco.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioAnaliseRiscoService {
  baseURL = `${environment.apiLegacyUrl}/relatorioanaliserisco`;
  constructor(private http: HttpClient) {}

  download(documento: ImpressaoDocumentoAnaliseRisco): Observable<ArrayBuffer> {
    console.log(`${this.baseURL}/impressao`);
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }
}
