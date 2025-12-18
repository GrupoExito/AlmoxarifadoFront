import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fluxo, SetorFluxo, StatusFluxo, FluxoPedidoCompra } from '@pages/shared/models/fluxo.model';

@Injectable({
  providedIn: 'root',
})
export class FluxoService {
  baseURL = `${environment.apiLegacyUrl}/fluxo`;
  constructor(private http: HttpClient) {}

  alterarStatusOuSetor(fluxo: Fluxo): Observable<Fluxo> {
    return this.http.post<Fluxo>(`${this.baseURL}/fluxo`, fluxo);
  }

  alterarStatusPedidoCompra(status: FluxoPedidoCompra): Observable<Fluxo> {
    return this.http.post<Fluxo>(`${this.baseURL}/statuspedidocompra`, status);
  }

  listarSetorFluxo(): Observable<SetorFluxo[]> {
    return this.http.get<SetorFluxo[]>(`${this.baseURL}/setorfluxo`);
  }

  listarStatusFluxo(): Observable<StatusFluxo[]> {
    return this.http.get<StatusFluxo[]>(`${this.baseURL}/statusfluxo`);
  }

  solucionarPendencia(fluxo: Fluxo): Observable<Fluxo> {
    return this.http.post<Fluxo>(`${this.baseURL}/fluxo/solucionarpendencia`, fluxo);
  }

  alterarStatusOuSetorAditivoRenovacao(fluxo: Fluxo): Observable<Fluxo> {
    return this.http.post<Fluxo>(`${this.baseURL}/fluxo/aditivorenovacao`, fluxo);
  }

  alterarSaldoContratoAditivoReajusteValor(fluxo: Fluxo): Observable<Fluxo> {
    return this.http.post<Fluxo>(`${this.baseURL}/fluxo/saldoreajustevalor`, fluxo);
  }
}
