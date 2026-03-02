import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DashboardQuadrimestreQuantitativos,
  DashboardQuantitativos,
  DashboardUltimosPedidos,
  DashboardUltimosProcessosContratacoes,
  DashboardUltimosProcessosContratos,
} from '../_model/DashboardQuantitativos.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseURL = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}


  listarProcessosTramitacao(id: number): Observable<DashboardQuantitativos[]> {
    return this.http.get<DashboardQuantitativos[]>(`${this.baseURL}/dashboard/processostramitacao/${id}`);
  }

  listarContratosVigentes(id: number): Observable<DashboardQuantitativos[]> {
    return this.http.get<DashboardQuantitativos[]>(`${this.baseURL}/dashboard/contratosvigentes/${id}`);
  }

  listarAtasVigentes(id: number): Observable<DashboardQuantitativos[]> {
    return this.http.get<DashboardQuantitativos[]>(`${this.baseURL}/dashboard/atasvigentes/${id}`);
  }

  listarComprasEmAndamento(id: number): Observable<DashboardQuantitativos[]> {
    return this.http.get<DashboardQuantitativos[]>(`${this.baseURL}/dashboard/comprasemandamento/${id}`);
  }

  listarComprasQuadrimestre(id: number): Observable<DashboardQuadrimestreQuantitativos[]> {
    return this.http.get<DashboardQuadrimestreQuantitativos[]>(`${this.baseURL}/dashboard/comprasquadrimestre/${id}`);
  }

  listarUltimasContratacoes(): Observable<DashboardUltimosProcessosContratacoes[]> {
    return this.http.get<DashboardUltimosProcessosContratacoes[]>(`${this.baseURL}/dashboard/contratacoes`);
  }

  listarUltimosContratos(): Observable<DashboardUltimosProcessosContratos[]> {
    return this.http.get<DashboardUltimosProcessosContratos[]>(`${this.baseURL}/dashboard/contratos`);
  }

  listarUltimosPedidos(): Observable<DashboardUltimosPedidos[]> {
    return this.http.get<DashboardUltimosPedidos[]>(`${this.baseURL}/dashboard/pedidos`);
  }
}
