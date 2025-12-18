import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Convenio } from '../_models/convenio.model';
import { ConvenioData, ConvenioDataEtapasHeader } from '../_models/convenio-data.model';

@Injectable({
  providedIn: 'root',
})
export class ConvenioService {
  public convenioData = new BehaviorSubject<ConvenioData | null>(null);
  public convenioDataEtapasHeader = new BehaviorSubject<Partial<ConvenioDataEtapasHeader> | null>(null);
  data$ = this.convenioData.asObservable();
  dataEtapasHeader$ = this.convenioDataEtapasHeader.asObservable();
  baseURL = `${environment.apiLegacyUrl}/Convenio`;
  private routeId: number | null = null;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Convenio[]> {
    return this.http.get<Convenio[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Convenio> {
    return this.http.get<Convenio>(`${this.baseURL}/${id}`);
  }

  editar(id: number, convenio: Partial<Convenio>): Observable<Convenio> {
    return this.http.put<Convenio>(`${this.baseURL}/${id}`, convenio);
  }

  criar(convenio: Convenio): Observable<Convenio> {
    return this.http.post<Convenio>(`${this.baseURL}`, convenio);
  }

  deletar(id: number): Observable<Convenio> {
    return this.http.delete<Convenio>(`${this.baseURL}/${id}`);
  }
  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }
  setConvenio(convenioData: ConvenioData | null) {
    this.convenioData.next(convenioData);
  }

  setEtapasHeader(dataEtapasHeader: ConvenioDataEtapasHeader | null) {
    this.convenioDataEtapasHeader.next(dataEtapasHeader);
  }

  filtrar(parameters: any): Observable<Convenio[]> {
    return this.http.get<Convenio[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }
}





