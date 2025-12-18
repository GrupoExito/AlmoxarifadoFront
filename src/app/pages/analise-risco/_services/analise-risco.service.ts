import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnaliseRisco } from '../_models/analise-risco.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { ARData, ARDataEtapasHeader } from '../_models/analise-risco-data.model';
import { AnaliseRiscoRisco } from '../_models/analise-risco-risco.model';
import { CriarAnaliseRiscoIA } from '../_models/analise-risco-ia.model';
//import { SolicitacaoDespesaDFD } from '../_models/dfd.model';
//import { StatusFluxo } from '../_models/fluxo.model';

@Injectable({
  providedIn: 'root',
})
export class AnaliseRiscoService {
  private routeId: number | null = null;
  public analiseRiscoData = new BehaviorSubject<ARData | null>(null);
  public analiseRiscoDataEtapasHeader = new BehaviorSubject<ARDataEtapasHeader | null>(null);
  data$ = this.analiseRiscoData.asObservable();
  dataEtapasHeader$ = this.analiseRiscoDataEtapasHeader.asObservable();
  baseURL = `${environment.apiLegacyUrl}/analiserisco`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<AnaliseRisco[]> {
    return this.http.get<AnaliseRisco[]>(this.baseURL);
  }

  listarTodosRiscos(analise_risco_id: number, fase: number): Observable<AnaliseRiscoRisco[]> {
    return this.http.get<AnaliseRiscoRisco[]>(`${this.baseURL}/riscos/${analise_risco_id}/${fase}`);
  }

  consultarAnaliseRisco(id: number): Observable<AnaliseRisco> {
    return this.http.get<AnaliseRisco>(`${this.baseURL}/${id}`);
  }

  consultarARQuantidade(id: number): Observable<ARDataEtapasHeader> {
    return this.http.get<ARDataEtapasHeader>(`${this.baseURL}/quantidade/${id}`);
  }

  criar(processoAdministrativo: AnaliseRisco): Observable<AnaliseRisco> {
    return this.http.post<AnaliseRisco>(`${this.baseURL}`, processoAdministrativo);
  }

  deletar(id: number): Observable<AnaliseRisco> {
    return this.http.delete<AnaliseRisco>(`${this.baseURL}/${id}`);
  }

  editar(id: number, analiseRisco: AnaliseRisco): Observable<AnaliseRisco> {
    return this.http.put<AnaliseRisco>(`${this.baseURL}/${id}`, analiseRisco);
  }

  setAR(analiseRiscoData: ARData | null) {
    this.analiseRiscoData.next(analiseRiscoData);
  }

  setEtapasHeader(dataEtapasHeader: ARDataEtapasHeader | null) {
    this.analiseRiscoDataEtapasHeader.next(dataEtapasHeader);
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

  criarAnaliseRiscoRisco(processoAdministrativo: AnaliseRiscoRisco): Observable<AnaliseRiscoRisco> {
    return this.http.post<AnaliseRiscoRisco>(`${this.baseURL}/risco`, processoAdministrativo);
  }

  editarAnaliseRiscoRisco(
    id: number,
    analiseRiscoRisco: AnaliseRiscoRisco,
    fase: number
  ): Observable<AnaliseRiscoRisco> {
    return this.http.put<AnaliseRiscoRisco>(`${this.baseURL}/risco/${id}/${fase}`, analiseRiscoRisco);
  }

  deletarAnaliseRiscoRisco(id: number): Observable<AnaliseRiscoRisco> {
    return this.http.delete<AnaliseRiscoRisco>(`${this.baseURL}/risco/${id}`);
  }

  filtrar(parameters: any): Observable<AnaliseRisco[]> {
    return this.http.get<AnaliseRisco[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }

  criarAnaliseComIA(criarAnaliseRiscoIA: CriarAnaliseRiscoIA): Observable<AnaliseRisco> {
    return this.http.post<AnaliseRisco>(`${this.baseURL}/geracaoia`, criarAnaliseRiscoIA);
  }
}
