import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Contrato,
  ContratoAcompanhamentoQuantidade,
  ContratoFornecedorCertidao,
  ContratoHeader,
  ContratoSecretaria,
  TipoContrato,
} from '../_models/contrato.model';
import { ContratoData } from '../_models/contrato-data.model';
import { ContratoHistorico } from '../_models/contrato-historico.model';
import { Aditivo } from '@pages/aditivo/_models/aditivo.model';
import { ListarContratosFornecedor } from '@pages/licitacao/_models/contratacao-licitacao.model';
import { PedidoCompra } from '@pages/compra/_models/pedido-compra.model';

@Injectable({
  providedIn: 'root',
})
export class ContratoService {
  private routeId: number | null = null;
  public contratoData = new BehaviorSubject<ContratoData | null>(null);
  public contratoHeader = new BehaviorSubject<ContratoHeader | null>(null);
  data$ = this.contratoData.asObservable();
  contratoHeader$ = this.contratoHeader.asObservable();
  baseURL = `${environment.apiLegacyUrl}/Contrato`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(this.baseURL);
  }

  listarTipoContrato(): Observable<TipoContrato[]> {
    return this.http.get<TipoContrato[]>(`${this.baseURL}/tipocontrato`);
  }

  listarContratoAditivos(contrato_id: number): Observable<Aditivo[]> {
    return this.http.get<Aditivo[]>(`${this.baseURL}/aditivos/${contrato_id}`);
  }

  listarContratoSecretarias(contrato_id: number): Observable<ContratoSecretaria[]> {
    return this.http.get<ContratoSecretaria[]>(`${this.baseURL}/secretaria/${contrato_id}`);
  }

  listarContratosFornecedor(fornecedor_id: number, contratacao_id: number): Observable<ListarContratosFornecedor[]> {
    return this.http.get<ListarContratosFornecedor[]>(`${this.baseURL}/fornecedor/${fornecedor_id}/${contratacao_id}`);
  }

  listarContratoPedidoCompra(contrato_id: number): Observable<PedidoCompra[]> {
    return this.http.get<PedidoCompra[]>(`${this.baseURL}/compras/${contrato_id}`);
  }

  criar(Contrato: Partial<Contrato>): Observable<Partial<Contrato>> {
    return this.http.post<Partial<Contrato>>(`${this.baseURL}`, Contrato);
  }

  atualizar(Contrato: Partial<Contrato>): Observable<Partial<Contrato>> {
    return this.http.put<Partial<Contrato>>(`${this.baseURL}`, Contrato);
  }

  consultarContrato(id: number): Observable<Contrato> {
    return this.http.get<Contrato>(`${this.baseURL}/${id}`);
  }

  setContrato(contratoData: ContratoData | null) {
    this.contratoData.next(contratoData);
  }

  setEtapasHeader(dataEtapasHeader: ContratoHeader | null) {
    this.contratoHeader.next(dataEtapasHeader);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  listarTodosHistoricos(contrato_id: number): Observable<ContratoHistorico[]> {
    return this.http.get<ContratoHistorico[]>(`${this.baseURL}/historico/${contrato_id}`);
  }

  salvarObservacao(obeservacao: ContratoHistorico): Observable<ContratoHistorico> {
    return this.http.post<ContratoHistorico>(`${this.baseURL}/historico/observacao`, obeservacao);
  }

  listarqtdcontrato(contrato_id: number): Observable<ContratoHeader> {
    return this.http.get<ContratoHeader>(`${this.baseURL}/quantidade/${contrato_id}`);
  }

  listarAcompanhamentoContratoFiltro(tipo_acompanhamento: number): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.baseURL}/acompanhamento/${tipo_acompanhamento}`);
  }

  listarAcompanhamentoContrato(): Observable<ContratoAcompanhamentoQuantidade> {
    return this.http.get<ContratoAcompanhamentoQuantidade>(`${this.baseURL}/acompanhamento/quantidades`);
  }

  listarAcompanhamentoContratoDashboardApp(): Observable<ContratoAcompanhamentoQuantidade> {
    return this.http.get<ContratoAcompanhamentoQuantidade>(`${this.baseURL}/acompanhamento/quantidades?bd=BD_POJUCA`);
  }

  listarContratosPorMes(ano: number): Observable<{ month: number; items: any[] }[]> {
    return this.http.get<{ month: number; items: any[] }[]>(`${this.baseURL}/quantidades/pormes/${ano}`);
  }

  listarContratoFornecedorCertidao(contrato_id: number): Observable<ContratoFornecedorCertidao[]> {
    return this.http.get<ContratoFornecedorCertidao[]>(`${this.baseURL}/certidao/${contrato_id}`);
  }

  inserirContratoFornecedorCertidao(certidao: ContratoFornecedorCertidao): Observable<ContratoFornecedorCertidao> {
    return this.http.post<ContratoFornecedorCertidao>(`${this.baseURL}/certidao`, certidao);
  }

  importarContratoFornecedorCertidao(
    contrato_id: number,
    fornecedor_id: number
  ): Observable<ContratoFornecedorCertidao> {
    return this.http.get<ContratoFornecedorCertidao>(
      `${this.baseURL}/importarcertidao/${contrato_id}/${fornecedor_id}`
    );
  }

  consultarContratoDashboard(): Observable<
    {
      contrato_id: number;
      modalidade_compra_id: number;
      data_validade: string;
      valor_total: number;
    }[]
  > {
    return this.http.get<
      {
        contrato_id: number;
        modalidade_compra_id: number;
        data_validade: string;
        valor_total: number;
      }[]
    >(`${this.baseURL}/contratodashboard`);
  }

  filtrar(parameters: any): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }

  sincronizarContratoPNCP(contratacao_id: number, contrato_id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/pncp/contrato/${contratacao_id}/${contrato_id}`);
  }

  deletarCertidaoFornecedor(contrato_Fornecedor_certidao_id: number): Observable<ContratoFornecedorCertidao> {
    return this.http.delete<ContratoFornecedorCertidao>(
      `${this.baseURL}/excluircertidaofornecedor/${contrato_Fornecedor_certidao_id}`
    );
  }
}
