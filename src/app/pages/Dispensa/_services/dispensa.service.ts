import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DispensaData } from '../_models/dispensa-data.model';
import { ContratacaoDispensa } from '../_models/contratacao-dispensa.model';

@Injectable({
  providedIn: 'root',
})
export class DispensaService {
  private routeId: number | null = null;
  public dispensaData = new BehaviorSubject<DispensaData | null>(null);
  data$ = this.dispensaData.asObservable();
  baseURL = `${environment.apiLegacyUrl}/dispensa`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ContratacaoDispensa[]> {
    return this.http.get<ContratacaoDispensa[]>(this.baseURL);
  }

  criar(contratacaoDispensa: ContratacaoDispensa): Observable<ContratacaoDispensa> {
    return this.http.post<ContratacaoDispensa>(`${this.baseURL}`, contratacaoDispensa);
  }

  editar(id: number, contratacaoDispensa: Partial<ContratacaoDispensa>): Observable<ContratacaoDispensa> {
    return this.http.put<ContratacaoDispensa>(`${this.baseURL}/${id}`, contratacaoDispensa);
  }

  consultarDispensa(id: number): Observable<ContratacaoDispensa> {
    return this.http.get<ContratacaoDispensa>(`${this.baseURL}/${id}`);
  }

  setDispensa(dispensaData: DispensaData | null) {
    this.dispensaData.next(dispensaData);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  filtrar(parameters: any): Observable<ContratacaoDispensa[]> {
    return this.http.get<ContratacaoDispensa[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }
}
