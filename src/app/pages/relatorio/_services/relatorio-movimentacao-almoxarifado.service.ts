import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiltroRelatorioDTO } from '../_models/relatorio-entrada-material.model';
import {
  ImpressaoDocumentoSaida,
  RelatorioMovimentacaoSaida,
  RelatorioMovimentacaoSaidaPorCidadao,
  RelatorioMovimentacaoSaidaPorItem,
} from '../_models/relatorio-saida-material.model';
import {
  ExtratoMovimentacao,
  RelatorioBalanceteEstoque,
  RelatorioMaterialEstoque,
  RelatorioMaterialEstoqueSecretaria,
  RelatorioTransferenciaMaterial,
} from '../_models/relatorio-almoxarifado.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioAlmoxarifadoService {
  baseURL = `${environment.apiUrl}/relatorio`;
  constructor(private http: HttpClient) {}

  downloadEntrada(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/entrada/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }

  exportarEntrada(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/exportacao/entrada`, documento, {
      responseType: 'arraybuffer',
    });
  }

  downloadSaida(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/saida/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }

  exportarSaida(documento: ImpressaoDocumentoSaida): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/exportacao/saida`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoEntradaMaterial(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    console.log('relatorio entrada', documento);
    return this.http.post(`${this.baseURL}/entrada`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoEntradaMaterialFornecedor(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/entrada/porfornecedor`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoEntradaMaterialData(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/entrada/pordata`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoSaidaMaterial(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/saida`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoSaidaMaterialData(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/saida/pordata`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoSaidaMaterialSetor(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/saida/porsetor`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoSaidaMaterialSetorResumido(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/saida/porsetorresumido`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoSaidaMaterialPorCidadao(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/movimentacaosaidaporcidadaoResumido`, documento, {
      responseType: 'arraybuffer',
    });
  }

  transferenciaMaterial(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/transferencia`, documento, {
      responseType: 'arraybuffer',
    });
  }

  MaterialEstoque(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/estoque/material`, documento, {
      responseType: 'arraybuffer',
    });
  }

  MaterialEstoqueLoteDataValidade(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/estoque/loteedatavalidade`, documento, {
      responseType: 'arraybuffer',
    });
  }

  BalanceteEstoque(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/balanceteestoque`, documento, {
      responseType: 'arraybuffer',
    });
  }

  MaterialEstoqueMinimo(documento: RelatorioMaterialEstoque): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/materialestoqueminimo`, documento, {
      responseType: 'arraybuffer',
    });
  }

  EstoqueMovimentacao(documento: ExtratoMovimentacao): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/extratomovimentacao`, documento, {
      responseType: 'arraybuffer',
    });
  }

  EstoqueExcel(documento: RelatorioBalanceteEstoque): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/estoqueexcel`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoSaidaMaterialExcel(documento: RelatorioMovimentacaoSaida): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/movimentacaoporsaidaexcel`, documento, {
      responseType: 'arraybuffer',
    });
  }

  BalanceteEstoqueExcel(documento: RelatorioBalanceteEstoque): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/balanceteestoqueExcel`, documento, {
      responseType: 'arraybuffer',
    });
  }

  BalanceteEstoqueLoteDatavalidade(documento: RelatorioBalanceteEstoque): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/movimentacaoestoquelotedatavalidade`, documento, {
      responseType: 'arraybuffer',
    });
  }

  MaterialEstoqueZerado(documento: RelatorioMaterialEstoque): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/materialestoquezerado`, documento, {
      responseType: 'arraybuffer',
    });
  }

  MaterialEstoquePorSecretaria(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/estoque/porsecretaria`, documento, {
      responseType: 'arraybuffer',
    });
  }

  Estoque(documento: RelatorioBalanceteEstoque): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/estoque`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoSaidaMaterialPorTipoItem(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/saida/poritem`, documento, {
      responseType: 'arraybuffer',
    });
  }

   movimentacaoEntradaMaterialPorTipoItem(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/entrada/poritem`, documento, {
      responseType: 'arraybuffer',
    });
  }
}
