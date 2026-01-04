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
    console.log('parametros enviados', documento);
    return this.http.post(`${this.baseURL}/entrada/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }

  exportarEntrada(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/exportacao/entrada`, documento, {
      responseType: 'arraybuffer',
    });
  }

  downloadSaida(documento: ImpressaoDocumentoSaida): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao/saida`, documento, {
      responseType: 'arraybuffer',
    });
  }

  exportarSaida(documento: ImpressaoDocumentoSaida): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/exportacao/saida`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoEntradaMaterial(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/movimentacaoporentrada`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoEntradaMaterialFornecedor(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/movimentacaoentradaporfornecedor`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoEntradaMaterialData(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/movimentacaoentradapordata`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoSaidaMaterial(documento: RelatorioMovimentacaoSaida): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/movimentacaoporsaida`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoSaidaMaterialData(documento: RelatorioMovimentacaoSaida): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/movimentacaosaidapordata`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoSaidaMaterialSetor(documento: RelatorioMovimentacaoSaida): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/movimentacaosaidaporsetor`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoSaidaMaterialSetorResumido(documento: RelatorioMovimentacaoSaida): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/movimentacaosaidaporsetorResumido`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoSaidaMaterialPorCidadao(documento: RelatorioMovimentacaoSaidaPorCidadao): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/movimentacaosaidaporcidadaoResumido`, documento, {
      responseType: 'arraybuffer',
    });
  }

  transferenciaMaterial(documento: RelatorioTransferenciaMaterial): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/transferenciamaterial`, documento, {
      responseType: 'arraybuffer',
    });
  }

  MaterialEstoque(documento: RelatorioMaterialEstoque): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/materialestoque`, documento, {
      responseType: 'arraybuffer',
    });
  }

  MaterialEstoqueLoteDataValidade(documento: RelatorioMaterialEstoque): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/materialestoqueLoteDataValidade`, documento, {
      responseType: 'arraybuffer',
    });
  }

  BalanceteEstoque(documento: RelatorioBalanceteEstoque): Observable<ArrayBuffer> {
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

  MaterialEstoquePorSecretaria(documento: RelatorioMaterialEstoqueSecretaria): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/materialestoquesecretaria`, documento, {
      responseType: 'arraybuffer',
    });
  }

  Estoque(documento: RelatorioBalanceteEstoque): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/estoque`, documento, {
      responseType: 'arraybuffer',
    });
  }

  movimentacaoSaidaMaterialPorTipoItem(documento: RelatorioMovimentacaoSaidaPorItem): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/movimentacaosaidaportipoitem`, documento, {
      responseType: 'arraybuffer',
    });
  }

   movimentacaoEntradaMaterialPorTipoItem(documento: FiltroRelatorioDTO): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/movimentacaoentradaportipoitem`, documento, {
      responseType: 'arraybuffer',
    });
  }
}
