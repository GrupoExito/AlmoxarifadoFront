import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpressaoDocumentoContrato, RelatorioContratoAditivo, RelatorioContratoSintetico } from '../_models/relatorio.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioContratoService {
  baseURL = `${environment.apiLegacyUrl}/relatoriocontrato`;
  constructor(private http: HttpClient) {}

  gerarContratoSintetico(relatorio: RelatorioContratoSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/contratosintetico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarContratoAnalitico(relatorio: RelatorioContratoSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/contratoanalitico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarContratoAditivo(relatorio: RelatorioContratoAditivo): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/contratoaditivo`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  download(documento: ImpressaoDocumentoContrato): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }
}
