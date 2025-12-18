import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  RelatorioSaldoContratoAnalitico,
  RelatorioSaldoContratoSinteticoSecretaria,
  RelatorioSaldoContratoSintetico,
  RelatorioSaldoContratoSinteticoContrato,
  RelatorioSaldoContratoSinteticoFornecedor,
  RelatorioSaldoContratoPorValor,
} from '../_models/relatorio-saldo.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioSaldoContratoService {
  baseURL = `${environment.apiLegacyUrl}/relatoriosaldoContrato`;
  constructor(private http: HttpClient) {}

  gerarSaldoContratoAnalitico(relatorio: RelatorioSaldoContratoAnalitico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ContratoAnalitico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarSaldoContratoSinteticoSecretaria(relatorio: RelatorioSaldoContratoSinteticoSecretaria): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ContratoSinteticoSecretaria`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarSaldoContratoSintetico(relatorio: RelatorioSaldoContratoSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ContratoSintetico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarSaldoContratoSinteticoFornecedor(relatorio: RelatorioSaldoContratoSinteticoFornecedor): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ContratoSinteticoFornecedor`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarSaldoContratoSinteticoContrato(relatorio: RelatorioSaldoContratoSinteticoContrato): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ContratoSinteticoContrato`, relatorio, {
      responseType: 'arraybuffer',
    });
  }
  
  gerarSaldoContratoPorValor(relatorio: RelatorioSaldoContratoPorValor): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ContratoPorValor`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  // download(documento: ImpressaoDocumentoPedidoCompra): Observable<ArrayBuffer> {
  //   return this.http.post(`${this.baseURL}/impressao`, documento, {
  //     responseType: 'arraybuffer',
  //   });
  // }
}
