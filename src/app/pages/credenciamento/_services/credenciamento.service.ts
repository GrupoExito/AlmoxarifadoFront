import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContratacaoCredenciamento } from '../_models/contratacao-credenciamento.model';
import { CredenciamentoData } from '../_models/credenciamento-data.model';
import { ContratacaoFornecedorItemAtualizarResultado } from '@pages/contratacao/_models/contratacao-lote-fornecedor-item.model';

@Injectable({
  providedIn: 'root',
})
export class CredenciamentoService {
  private routeId: number | null = null;
  public credenciamentoData = new BehaviorSubject<CredenciamentoData | null>(null);
  data$ = this.credenciamentoData.asObservable();
  baseURL = `${environment.apiLegacyUrl}/credenciamento`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ContratacaoCredenciamento[]> {
    return this.http.get<ContratacaoCredenciamento[]>(this.baseURL);
  }

  criar(contratacaoCredenciamento: ContratacaoCredenciamento): Observable<ContratacaoCredenciamento> {
    return this.http.post<ContratacaoCredenciamento>(`${this.baseURL}`, contratacaoCredenciamento);
  }

  editar(
    id: number,
    contratacaoCredenciamento: Partial<ContratacaoCredenciamento>
  ): Observable<ContratacaoCredenciamento> {
    return this.http.put<ContratacaoCredenciamento>(`${this.baseURL}/${id}`, contratacaoCredenciamento);
  }

  consultarCredenciamento(id: number): Observable<ContratacaoCredenciamento> {
    return this.http.get<ContratacaoCredenciamento>(`${this.baseURL}/${id}`);
  }

  atualizarVencedorResultadoCredenciamento(
    atualizarResultado: ContratacaoFornecedorItemAtualizarResultado
  ): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseURL}/vencedores/selecionarvencedor`, atualizarResultado);
  }

  setCredenciamento(credenciamentoData: CredenciamentoData | null) {
    this.credenciamentoData.next(credenciamentoData);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  filtrar(parameters: any): Observable<ContratacaoCredenciamento[]> {
    return this.http.get<ContratacaoCredenciamento[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }
}
