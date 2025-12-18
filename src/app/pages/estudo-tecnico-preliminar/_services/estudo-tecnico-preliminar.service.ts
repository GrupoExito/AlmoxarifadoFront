import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { EstudoTecnicoPreliminar } from '../_models/estudo-tecnico-preliminar.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { ETPData, ETPDataEtapasHeader } from '../_models/estudo-tecnico-preliminar-data.model';

@Injectable({
  providedIn: 'root',
})
export class EstudoTecnicoPreliminarService {
  private routeId: number | null = null;
  public etpData = new BehaviorSubject<ETPData | null>(null);
  public etpDataEtapasHeader = new BehaviorSubject<ETPDataEtapasHeader | null>(null);
  data$ = this.etpData.asObservable();
  dataEtapasHeader$ = this.etpDataEtapasHeader.asObservable();
  baseURL = `${environment.apiLegacyUrl}/estudotecnicopreliminar`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<EstudoTecnicoPreliminar[]> {
    return this.http.get<EstudoTecnicoPreliminar[]>(this.baseURL);
  }

  listarTodosComPad(): Observable<EstudoTecnicoPreliminar[]> {
    return this.http.get<EstudoTecnicoPreliminar[]>(`${this.baseURL}/pad`);
  }

  listarEtpResponsaveis(etp_id: number): Observable<{ etp_id: number; responsavel_membro_id: number }[]> {
    return this.http.get<{ etp_id: number; responsavel_membro_id: number }[]>(`${this.baseURL}/responsaveis/${etp_id}`);
  }

  consultarEstudoTecnicoPreliminar(id: number): Observable<EstudoTecnicoPreliminar> {
    return this.http.get<EstudoTecnicoPreliminar>(`${this.baseURL}/${id}`);
  }

  consultarETPQuantidade(id: number): Observable<ETPDataEtapasHeader> {
    return this.http.get<ETPDataEtapasHeader>(`${this.baseURL}/quantidade/${id}`);
  }

  criar(processoAdministrativo: EstudoTecnicoPreliminar): Observable<EstudoTecnicoPreliminar> {
    return this.http.post<EstudoTecnicoPreliminar>(`${this.baseURL}`, processoAdministrativo);
  }

  deletar(id: number): Observable<EstudoTecnicoPreliminar> {
    return this.http.delete<EstudoTecnicoPreliminar>(`${this.baseURL}/${id}`);
  }

  cancelar(sd_id: number, usuario_id: number): Observable<EstudoTecnicoPreliminar> {
    return this.http.delete<EstudoTecnicoPreliminar>(`${this.baseURL}/cancelar/${sd_id}/${usuario_id}`);
  }

  reativar(sd_id: number, usuario_id: number): Observable<EstudoTecnicoPreliminar> {
    return this.http.get<EstudoTecnicoPreliminar>(`${this.baseURL}/reativar/${sd_id}/${usuario_id}`);
  }

  editar(id: number, processoAdministrativo: EstudoTecnicoPreliminar): Observable<EstudoTecnicoPreliminar> {
    return this.http.put<EstudoTecnicoPreliminar>(`${this.baseURL}/${id}`, processoAdministrativo);
  }

  setETP(etpData: ETPData | null) {
    this.etpData.next(etpData);
  }

  setEtapasHeader(dataEtapasHeader: ETPDataEtapasHeader | null) {
    this.etpDataEtapasHeader.next(dataEtapasHeader);
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

  filtrar(parameters: any): Observable<EstudoTecnicoPreliminar[]> {
    return this.http.get<EstudoTecnicoPreliminar[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }
}
