import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProcessoAdministrativo } from '../_models/processo-administrativo.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { TipoDemanda } from '@pages/shared/models/tipoDemanda.model';
import { PAData, PADataEtapasHeader } from '../_models/processo-administrativo-data.model';
import { ProcessoAdministrativoItem } from '../_models/processo-administrativo-item.model';
import { ModalidadeCompra } from '@pages/modalidade-compra/_models/modalidade-compra.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessoAdministrativoService {
  private routeId: number | null = null;
  public paData = new BehaviorSubject<PAData | null>(null);
  public paDataEtapasHeader = new BehaviorSubject<PADataEtapasHeader | null>(null);
  data$ = this.paData.asObservable();
  dataEtapasHeader$ = this.paDataEtapasHeader.asObservable();
  baseURL = `${environment.apiLegacyUrl}/processoadministrativo`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ProcessoAdministrativo[]> {
    return this.http.get<ProcessoAdministrativo[]>(this.baseURL);
  }

  listarSemContratacao(): Observable<ProcessoAdministrativo[]> {
    return this.http.get<ProcessoAdministrativo[]>(`${this.baseURL}/semcontratacao`);
  }

  consultarProcessoAdministrativo(id: number): Observable<ProcessoAdministrativo> {
    return this.http.get<ProcessoAdministrativo>(`${this.baseURL}/${id}`);
  }

  consultarPAQuantidade(id: number): Observable<PADataEtapasHeader> {
    return this.http.get<PADataEtapasHeader>(`${this.baseURL}/quantidade/${id}`);
  }

  criar(processoAdministrativo: ProcessoAdministrativo): Observable<ProcessoAdministrativo> {
    return this.http.post<ProcessoAdministrativo>(`${this.baseURL}`, processoAdministrativo);
  }

  deletar(id: number): Observable<ProcessoAdministrativo> {
    return this.http.delete<ProcessoAdministrativo>(`${this.baseURL}/${id}`);
  }

  cancelar(sd_id: number, usuario_id: number): Observable<ProcessoAdministrativo> {
    return this.http.delete<ProcessoAdministrativo>(`${this.baseURL}/cancelar/${sd_id}/${usuario_id}`);
  }

  reativar(sd_id: number, usuario_id: number): Observable<ProcessoAdministrativo> {
    return this.http.get<ProcessoAdministrativo>(`${this.baseURL}/reativar/${sd_id}/${usuario_id}`);
  }

  editar(id: number, processoAdministrativo: ProcessoAdministrativo): Observable<ProcessoAdministrativo> {
    return this.http.put<ProcessoAdministrativo>(`${this.baseURL}/${id}`, processoAdministrativo);
  }

  setPA(paData: PAData | null) {
    this.paData.next(paData);
  }

  setEtapasHeader(dataEtapasHeader: PADataEtapasHeader | null) {
    this.paDataEtapasHeader.next(dataEtapasHeader);
  }

  listarTodosExercicio(): Observable<Exercicio[]> {
    return this.http.get<Exercicio[]>(`${environment.apiLegacyUrl}/shared/exercicio`);
  }

  listarTipoDemanda(): Observable<TipoDemanda[]> {
    return this.http.get<TipoDemanda[]>(`${environment.apiLegacyUrl}/shared/tipodemanda`);
  }

  listarModalidadeCompra(): Observable<ModalidadeCompra[]> {
    return this.http.get<ModalidadeCompra[]>(`${environment.apiLegacyUrl}/shared/modalidadecompra`);
  }

  listarProcessoAdmItem(id: number): Observable<ProcessoAdministrativoItem[]> {
    return this.http.get<ProcessoAdministrativoItem[]>(`${this.baseURL}/item/${id}`);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  filtrar(parameters: any): Observable<ProcessoAdministrativo[]> {
    return this.http.get<ProcessoAdministrativo[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }

  AtualizarPad(id: number): Observable<ProcessoAdministrativo> {
    return this.http.get<ProcessoAdministrativo>(`${this.baseURL}/cotacao/atualizar/${id}`);
  }
}
