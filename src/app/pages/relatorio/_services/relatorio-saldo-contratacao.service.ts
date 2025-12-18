import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  RelatorioSaldoAtaSintetico,
  RelatorioSaldoProdutoAnalitico,
  RelatorioSaldoProdutoSintetico,
  RelatorioSaldoProdutoSinteticoFornecedor,
  RelatorioSaldoProdutoSinteticoLicitacao,
  RelatorioSaldoProdutoSinteticoSecretaria,
} from '../_models/relatorio-saldo.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioSaldoContratacaoService {
  baseURL = `${environment.apiLegacyUrl}/relatoriosaldoContratacao`;
  constructor(private http: HttpClient) {}

  gerarSaldoProdutoAnalitico(relatorio: RelatorioSaldoProdutoAnalitico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ProdutoAnalitico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarSaldoProdutoSintetico(relatorio: RelatorioSaldoProdutoSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ProdutoSintetico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarSaldoProdutoSinteticoFornecedor(relatorio: RelatorioSaldoProdutoSinteticoFornecedor): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ProdutoSinteticoFornecedor`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarSaldoProdutoSinteticoLicitacao(relatorio: RelatorioSaldoProdutoSinteticoLicitacao): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ProdutoSinteticoLicitacao`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarSaldoProdutoSinteticoSecretaria(relatorio: RelatorioSaldoProdutoSinteticoSecretaria): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ProdutoSinteticoSecretaria`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarSaldoLicitacaoExcel(relatorio: RelatorioSaldoProdutoSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/SaldoLicitacaoExcel`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarSaldoProdutoSinteticoAta(relatorio: RelatorioSaldoAtaSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ataSinteticoAta`, relatorio, {
      responseType: 'arraybuffer',
    });
  }
}
