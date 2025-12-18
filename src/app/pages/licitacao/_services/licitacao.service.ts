import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContratacaoLicitacao } from '../_models/contratacao-licitacao.model';
import { LicitacaoData } from '../_models/licitacao-data.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';

@Injectable({
  providedIn: 'root',
})
export class LicitacaoService {
  private routeId: number | null = null;
  public licitacaoData = new BehaviorSubject<LicitacaoData | null>(null);
  data$ = this.licitacaoData.asObservable();
  baseURL = `${environment.apiLegacyUrl}/licitacao`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ContratacaoLicitacao[]> {
    return this.http.get<ContratacaoLicitacao[]>(this.baseURL);
  }

  consultarLicitacao(id: number): Observable<ContratacaoLicitacao> {
    return this.http.get<ContratacaoLicitacao>(`${this.baseURL}/${id}`);
  }

  listarContratacaoSecretaria(contratacao_id: number): Observable<{ gsecretaria_fundo_id: number }[]> {
    return this.http.get<{ gsecretaria_fundo_id: number }[]>(`${this.baseURL}/secretarias/${contratacao_id}`);
  }

  editar(id: number, contratacaoLicitacao: Partial<ContratacaoLicitacao>): Observable<ContratacaoLicitacao> {
    return this.http.put<ContratacaoLicitacao>(`${this.baseURL}/${id}`, contratacaoLicitacao);
  }

  filtrar(parameters: any): Observable<ContratacaoLicitacao[]> {
    return this.http.get<ContratacaoLicitacao[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }

  criar(contratacaoLicitacao: ContratacaoLicitacao): Observable<ContratacaoLicitacao> {
    return this.http.post<ContratacaoLicitacao>(`${this.baseURL}`, contratacaoLicitacao);
  }

  setLicitacao(licitacaoData: LicitacaoData | null) {
    this.licitacaoData.next(licitacaoData);
  }

  listarTodosExercicio(): Observable<Exercicio[]> {
    return this.http.get<Exercicio[]>(`${environment.apiLegacyUrl}/shared/exercicio`);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  setPregaoCriterioTitulo(criterio_julgamento: number) {
    switch (criterio_julgamento) {
      case 1:
        return 'Menor Preço Unitário';
      case 2:
        return 'Menor Preço Global';
      case 3:
        return 'Menor Preço por Lote';
      default:
        return '';
    }
  }

  listarItensBB(filtro: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiLegacyUrl}/bancobrasil/mercadorias`, {
      params: { filtro },
    });
  }

  vincularItemBB(IdProdutoServico: number, codigobb: number): Observable<any> {
    return this.http.put(`${environment.apiLegacyUrl}/bancobrasil/selecionar-mercadoria`, {
      IdProdutoServico,
      codigobb,
    });
  }

  enviarAtaParaPncp(idContratacao: number, fornecedorId: number): Observable<any> {
    const url = `${environment.apiLegacyUrl}/Contratacao/pncp/ata/${idContratacao}/${fornecedorId}`;
    return this.http.post(url, {});
  }
}
