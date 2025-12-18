import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContratacaoLoteFornecedor } from '../_models/contratacao-lote-fornecedor.model';
import {
  ContratacaoFornecedorItemAtualizarResultado,
  ContratacaoFornecedorItemDesclassficado,
  ContratacaoFornecedorItemPreco,
  ContratacaoLoteFornecedorItem,
} from '../_models/contratacao-lote-fornecedor-item.model';
import { ContratacaoFornecedorCertidao } from '../_models/contratacao.model';
@Injectable({
  providedIn: 'root',
})
export class ContratacaoFornecedorService {
  baseURL = `${environment.apiLegacyUrl}/contratacaofornecedor`;
  constructor(private http: HttpClient) {}

  listarContratacaoFornecedorItemPorLoteFornecedor(
    lote_id: number,
    fornecedor_id: number
  ): Observable<ContratacaoLoteFornecedorItem[]> {
    return this.http.get<ContratacaoLoteFornecedorItem[]>(
      `${this.baseURL}/lote/fornecedor/${lote_id}/${fornecedor_id}`
    );
  }

  listarContratacaoFornecedorItemPorLoteVencedor(lote_id: number): Observable<ContratacaoLoteFornecedorItem[]> {
    return this.http.get<ContratacaoLoteFornecedorItem[]>(`${this.baseURL}/lote/vencedor/${lote_id}`);
  }

  listarContratacaoFornecedorValorTotal(
    contratacao_id: number,
    lote_id: number,
    criterio_julgamento: number
  ): Observable<ContratacaoLoteFornecedorItem[]> {
    return this.http.get<ContratacaoLoteFornecedorItem[]>(
      `${this.baseURL}/fornecedores/valortotal/${contratacao_id}/${lote_id}/${criterio_julgamento}`
    );
  }

  listarContratacaoFornecedorItemPorLoteProduto(
    lote_id: number,
    produto_id: number
  ): Observable<ContratacaoLoteFornecedorItem[]> {
    return this.http.get<ContratacaoLoteFornecedorItem[]>(`${this.baseURL}/lote/produto/${lote_id}/${produto_id}`);
  }

  listarFornecedoresItem(contratacao_id: number): Observable<ContratacaoLoteFornecedorItem[]> {
    return this.http.get<ContratacaoLoteFornecedorItem[]>(`${this.baseURL}/fornecedores/item/${contratacao_id}`);
  }

  listarContratacaoFornecedorVencedor(contratacao_id: number): Observable<ContratacaoLoteFornecedorItem[]> {
    return this.http.get<ContratacaoLoteFornecedorItem[]>(`${this.baseURL}/vencedores/${contratacao_id}`);
  }

  salvarContratacaoFornecedor(contratacaoFornecedor: ContratacaoLoteFornecedor): Observable<ContratacaoLoteFornecedor> {
    return this.http.post<ContratacaoLoteFornecedor>(`${this.baseURL}`, contratacaoFornecedor);
  }

  salvarContratacaoFornecedorCredenciamento(
    contratacaoFornecedor: ContratacaoLoteFornecedor
  ): Observable<ContratacaoLoteFornecedor> {
    return this.http.post<ContratacaoLoteFornecedor>(`${this.baseURL}/credenciamento`, contratacaoFornecedor);
  }

  salvarContratacaoCredenciamentoFornecedorItemValor(
    contratacaoFornecedor: ContratacaoFornecedorItemPreco
  ): Observable<ContratacaoFornecedorItemPreco> {
    return this.http.post<ContratacaoFornecedorItemPreco>(
      `${this.baseURL}/credenciamento/valoritem`,
      contratacaoFornecedor
    );
  }

  salvarContratacaoFornecedorTodosLotes(
    contratacaoFornecedor: ContratacaoLoteFornecedor
  ): Observable<ContratacaoLoteFornecedor> {
    return this.http.post<ContratacaoLoteFornecedor>(`${this.baseURL}/todoslotes`, contratacaoFornecedor);
  }

  salvarContratacaoFornecedorAlgunsLotes(
    contratacaoFornecedor: ContratacaoLoteFornecedor
  ): Observable<ContratacaoLoteFornecedor> {
    return this.http.post<ContratacaoLoteFornecedor>(`${this.baseURL}/algunslotes`, contratacaoFornecedor);
  }

  deletarContratacaoFornecedorLote(contratacao_id: number, fornecedor_id: number, lote_id: number): Observable<number> {
    return this.http.delete<number>(`${this.baseURL}/${contratacao_id}/${fornecedor_id}/${lote_id}`);
  }

  deletarContratacaoFornecedorTodosLotes(
    contratacaoLoteFornecedor: Partial<ContratacaoLoteFornecedor>
  ): Observable<number> {
    return this.http.delete<number>(
      `${this.baseURL}/todoslotes/${contratacaoLoteFornecedor.contratacao_id}/${contratacaoLoteFornecedor.gfornecedor_id}`
    );
  }

  atualizarPrecoContratacaoFornecedor(contratacaoFornecedor: ContratacaoFornecedorItemPreco): Observable<{
    valor: number;
    quantidade: number;
    quantidade_usada: number;
    quantidade_disponivel: number;
  }> {
    return this.http.put<{
      valor: number;
      quantidade: number;
      quantidade_usada: number;
      quantidade_disponivel: number;
    }>(`${this.baseURL}/preco`, contratacaoFornecedor);
  }

  atualizarMarcaContratacaoFornecedor(
    contratacaoFornecedor: ContratacaoFornecedorItemPreco
  ): Observable<ContratacaoFornecedorItemPreco> {
    return this.http.put<ContratacaoFornecedorItemPreco>(`${this.baseURL}/marca`, contratacaoFornecedor);
  }

  listarItemComMultiplosVencedores(contratacao_id: number): Observable<ContratacaoLoteFornecedorItem[]> {
    return this.http.get<ContratacaoLoteFornecedorItem[]>(`${this.baseURL}/item/vencedores/${contratacao_id}`);
  }

  listarContratacaoLotesFornecedor(
    fornecedor_id: number,
    contratacao_id: number
  ): Observable<ContratacaoLoteFornecedor[]> {
    return this.http.get<ContratacaoLoteFornecedor[]>(
      `${this.baseURL}/lotes/fornecedor/${fornecedor_id}/${contratacao_id}`
    );
  }

  listarContratacaoFornecedorCertidao(
    contratacao_id: number,
    fornecedor_id: number
  ): Observable<ContratacaoFornecedorCertidao[]> {
    return this.http.get<ContratacaoFornecedorCertidao[]>(
      `${this.baseURL}/certidao/${contratacao_id}/${fornecedor_id}`
    );
  }

  atualizarDesclassificadoFornecedorItem(
    item: ContratacaoFornecedorItemDesclassficado
  ): Observable<ContratacaoFornecedorItemDesclassficado> {
    return this.http.put<ContratacaoFornecedorItemDesclassficado>(`${this.baseURL}/desclassificado`, item);
  }

  classificacaoLoteFornecedorItem(fornecedor_id: number, lote_id: number, status: number): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/classificar/lote/${fornecedor_id}/${lote_id}/${status}`);
  }

  selecionarVencedorDeMultiplosVencedores(contratacao_lote_item: number, id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}/item/vencedores/selecionarvencedor/${contratacao_lote_item}/${id}`);
  }

  atualizarVencedorResultado(atualizarResultado: ContratacaoFornecedorItemAtualizarResultado): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseURL}/vencedores/selecionarvencedor`, atualizarResultado);
  }

  consultarContratacaoFornecedor(contratacao_id: number, fornecedor_id: number): Observable<ContratacaoLoteFornecedor> {
    return this.http.get<ContratacaoLoteFornecedor>(
      `${this.baseURL}/contratacao/fornecedor/${contratacao_id}/${fornecedor_id}`
    );
  }

  atualizarContratacaoFornecedor(item: ContratacaoLoteFornecedor): Observable<ContratacaoLoteFornecedor> {
    return this.http.put<ContratacaoLoteFornecedor>(`${this.baseURL}/contratacao/fornecedor`, item);
  }

  inserirContratacaoFornecedorCertidao(
    certidao: ContratacaoFornecedorCertidao
  ): Observable<ContratacaoFornecedorCertidao> {
    return this.http.post<ContratacaoFornecedorCertidao>(`${this.baseURL}/certidao`, certidao);
  }

importarContratacaoFornecedorCertidao(contratacao_id: number, fornecedor_id: number): Observable<ContratacaoFornecedorCertidao> {
  return this.http.get<ContratacaoFornecedorCertidao>(`${this.baseURL}/fornecedores/importarcertidao/${contratacao_id}/${fornecedor_id}`);
}

  importarFornecedorCotacao(contratacao_id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/fornecedores/importarcotacao/${contratacao_id}`);
  }

  importarValoresDFD(contratacao_id: number, fornecedor_id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/fornecedor/importarvaloredfd/${contratacao_id}/${fornecedor_id}`);
  }

  exportar(contratacao_id: number, modalidade: string, contratacao: any): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/exportar/itens/${contratacao_id}/${modalidade}`, contratacao, {
      responseType: 'arraybuffer',
    });
  }

  importar(importacaoPreco: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.baseURL}/importar/itens`, importacaoPreco);
  }

  deletarCertidaoFornecedor(contratacao_Fornecedor_certidao_id: number): Observable<ContratacaoFornecedorCertidao> {
    return this.http.delete<ContratacaoFornecedorCertidao>(
      `${this.baseURL}/excluircertidaofornecedor/${contratacao_Fornecedor_certidao_id}`
    );
  }
}
