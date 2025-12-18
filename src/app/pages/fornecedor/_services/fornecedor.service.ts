import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Fornecedor } from '../_models/fornecedor.model';
import { Observable } from 'rxjs';
import { Empresa } from '@pages/shared/models/empresa.model';
import { FornecedorCertidao } from '../_models/certidao.model';
import { ImpressaoDocumentoFornecedor } from '@pages/relatorio/_models/relatorio.model';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  baseURL = `${environment.apiLegacyUrl}/fornecedor`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.baseURL}/${id}`);
  }

  editar(id: number, fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.baseURL}/${id}`, fornecedor);
  }

  criar(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(`${this.baseURL}`, fornecedor);
  }

  deletar(id: number): Observable<Fornecedor> {
    return this.http.delete<Fornecedor>(`${this.baseURL}/${id}`);
  }

  consultarEmpresaPorCNPJ(cnpj: string): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.baseURL}/cnpj/${cnpj}`);
  }

  consultarEnderecoPorCEP(cep: string): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.baseURL}/cep/${cep}`);
  }

  listarFornecedorCertidao(fornecedorId: number): Observable<FornecedorCertidao[]> {
    return this.http.get<FornecedorCertidao[]>(`${this.baseURL}/certidoes/${fornecedorId}`);
  }

  criarFornecedorCertidao(fornecedorCertidao: FormData): Observable<FornecedorCertidao> {
    return this.http.post<FornecedorCertidao>(`${this.baseURL}/certidao`, fornecedorCertidao);
  }

  deletarFornecedorCertidao(id: number): Observable<FornecedorCertidao> {
    return this.http.delete<FornecedorCertidao>(`${this.baseURL}/certidao/${id}`);
  }

  listarFornecedorCotacaoComLote(cotacao_id: number): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.baseURL}/cotacao/lote/${cotacao_id}`);
  }

  listarFornecedorContratacaoComLote(contratacao_id: number): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.baseURL}/contratacao/lote/${contratacao_id}`);
  }

  listarFornecedoresComAta(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.baseURL}/comata`);
  }

  downloadCertidao(certidao_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/certidao/download/${certidao_id}`, {
      responseType: 'arraybuffer',
    });
  }

  impressaoCRC(crc: ImpressaoDocumentoFornecedor): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressaoCRC`, crc, {
      responseType: 'arraybuffer',
    });
  }
}
