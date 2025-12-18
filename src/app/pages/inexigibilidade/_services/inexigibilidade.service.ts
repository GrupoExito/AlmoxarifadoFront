import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContratacaoInexigibilidade } from '../_models/contratacao-inexigibilidade.model';
import { InexigibilidadeData } from '../_models/inexigibilidade-data.model';
import { ContratacaoFornecedorItemAtualizarResultado } from '@pages/contratacao/_models/contratacao-lote-fornecedor-item.model';

@Injectable({
  providedIn: 'root',
})
export class InexigibilidadeService {
  private routeId: number | null = null;
  public inexigibilidadeData = new BehaviorSubject<InexigibilidadeData | null>(null);
  data$ = this.inexigibilidadeData.asObservable();
  baseURL = `${environment.apiLegacyUrl}/inexigibilidade`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ContratacaoInexigibilidade[]> {
    return this.http.get<ContratacaoInexigibilidade[]>(this.baseURL);
  }

  criar(contratacaoInexigibilidade: ContratacaoInexigibilidade): Observable<ContratacaoInexigibilidade> {
    return this.http.post<ContratacaoInexigibilidade>(`${this.baseURL}`, contratacaoInexigibilidade);
  }

  editar(
    id: number,
    contratacaoInexigibilidade: Partial<ContratacaoInexigibilidade>
  ): Observable<ContratacaoInexigibilidade> {
    return this.http.put<ContratacaoInexigibilidade>(`${this.baseURL}/${id}`, contratacaoInexigibilidade);
  }

  consultarInexigibilidade(id: number): Observable<ContratacaoInexigibilidade> {
    return this.http.get<ContratacaoInexigibilidade>(`${this.baseURL}/${id}`);
  }

  atualizarVencedorResultadoInexigibilidade(
    atualizarResultado: ContratacaoFornecedorItemAtualizarResultado
  ): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseURL}/vencedores/selecionarvencedor`, atualizarResultado);
  }

  setInexigibilidade(inexigibilidadeData: InexigibilidadeData | null) {
    this.inexigibilidadeData.next(inexigibilidadeData);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  filtrar(parameters: any): Observable<ContratacaoInexigibilidade[]> {
    return this.http.get<ContratacaoInexigibilidade[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }
}
