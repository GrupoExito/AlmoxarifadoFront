import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChamadaPublicaData } from '../_models/chamada-publica-data.model';
import { ContratacaoFornecedorItemAtualizarResultado } from '@pages/contratacao/_models/contratacao-lote-fornecedor-item.model';
import { ContratacaoChamadaPublica } from '../_models/contratacao-chamada-publica.model';

@Injectable({
  providedIn: 'root',
})
export class ChamadaPublicaService {
  private routeId: number | null = null;
  public chamadaPublicaData = new BehaviorSubject<ChamadaPublicaData | null>(null);
  data$ = this.chamadaPublicaData.asObservable();
  baseURL = `${environment.apiLegacyUrl}/chamadapublica`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ContratacaoChamadaPublica[]> {
    return this.http.get<ContratacaoChamadaPublica[]>(this.baseURL);
  }

  criar(contratacaoChamadaPublica: ContratacaoChamadaPublica): Observable<ContratacaoChamadaPublica> {
    return this.http.post<ContratacaoChamadaPublica>(`${this.baseURL}`, contratacaoChamadaPublica);
  }

  editar(
    id: number,
    contratacaoChamadaPublica: Partial<ContratacaoChamadaPublica>
  ): Observable<ContratacaoChamadaPublica> {
    return this.http.put<ContratacaoChamadaPublica>(`${this.baseURL}/${id}`, contratacaoChamadaPublica);
  }

  consultarChamadaPublica(id: number): Observable<ContratacaoChamadaPublica> {
    return this.http.get<ContratacaoChamadaPublica>(`${this.baseURL}/${id}`);
  }

  atualizarVencedorResultadoChamadaPublica(
    atualizarResultado: ContratacaoFornecedorItemAtualizarResultado
  ): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseURL}/vencedores/selecionarvencedor`, atualizarResultado);
  }

  setChamadaPublica(chamadaPublicaData: ChamadaPublicaData | null) {
    this.chamadaPublicaData.next(chamadaPublicaData);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  filtrar(parameters: any): Observable<ContratacaoChamadaPublica[]> {
    return this.http.get<ContratacaoChamadaPublica[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }
}
