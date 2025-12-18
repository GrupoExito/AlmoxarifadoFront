import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ImpressaoDocumentoPedidoCompra,
  RelatorioPedidoCompraContratacao,
  RelatorioPedidoCompraLicitacaoSintetico,
  RelatorioPedidoCompraSaldoContratacao,
  RelatorioPedidoCompraSaldoContrato,
  RelatorioPedidoCompraSecretariaAnalitico,
  RelatorioPedidoCompraSecretariaSintetico,
  RelatorioPedidoCompraModalidade,
  RelatorioPedidoCompraFornecedorSintetico,
  RelatorioPedidoCompraFornecedorAnalitico,
  RelatorioPedidoCompraLicitacaoAnalitico,
  RelatorioPedidoCompraContratoSintetico,
  RelatorioPedidoCompraSetorSintetico,
  RelatorioPedidoCompraItem,
} from '../_models/relatorio-pedido-compra.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioPedidoCompraService {
  baseURL = `${environment.apiLegacyUrl}/relatoriopedidocompra`;
  constructor(private http: HttpClient) {}

  gerarPedidoCompraSecretariaSintetico(relatorio: RelatorioPedidoCompraSecretariaSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/comprasecretariasintetico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarPedidoCompraSecretariaAnalitico(relatorio: RelatorioPedidoCompraSecretariaAnalitico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/comprasecretariaanalitico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarPedidoCompraModalidade(relatorio: RelatorioPedidoCompraModalidade): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/compramodalidade`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarPedidoCompraFornecedorSintetico(relatorio: RelatorioPedidoCompraFornecedorSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/comprafornecedorsintetico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarPedidoCompraFornecedorAnalitico(relatorio: RelatorioPedidoCompraFornecedorAnalitico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/comprafornecedoranalitico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarPedidoCompraLicitacaoSintetico(relatorio: RelatorioPedidoCompraLicitacaoSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/compralicitacaosintetico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarPedidoCompraLicitacaoAnalitico(relatorio: RelatorioPedidoCompraLicitacaoAnalitico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/compralicitacaoanalitico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarPedidoCompraContratacao(relatorio: RelatorioPedidoCompraContratacao): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/compracontratacao`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarPedidoCompraContratoSintetico(relatorio: RelatorioPedidoCompraContratoSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/compracontratosintetico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarPedidoCompraSetorSintetico(relatorio: RelatorioPedidoCompraSetorSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/comprasetorsintetico`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

  gerarPedidoCompraSaldoContratacao(
    relatorio: RelatorioPedidoCompraSaldoContratacao
  ): Observable<RelatorioPedidoCompraSaldoContratacao> {
    return this.http.post<RelatorioPedidoCompraSaldoContratacao>(`${this.baseURL}/comprasaldocontratacao`, relatorio);
  }

  gerarPedidoCompraSaldoContrato(
    relatorio: RelatorioPedidoCompraSaldoContrato
  ): Observable<RelatorioPedidoCompraSaldoContrato> {
    return this.http.post<RelatorioPedidoCompraSaldoContrato>(`${this.baseURL}/comprasaldocontrato`, relatorio);
  }

  download(documento: ImpressaoDocumentoPedidoCompra): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }

  impressoPorFornecedor(documento: ImpressaoDocumentoPedidoCompra, fornecedorId: number): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressaoporfornecedor/${fornecedorId}`, documento, {
      responseType: 'arraybuffer',
    });
  }

  gerarPedidoCompraItem(relatorio: RelatorioPedidoCompraItem): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/compraitem`, relatorio, {
      responseType: 'arraybuffer',
    });
  }
}
