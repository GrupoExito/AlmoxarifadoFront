import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setor } from '@pages/setor/_models/setor.model';
import { FechamentoSaldoAlmoxarifado } from '../_models/fechamento-saldo-almoxarifado.model';

@Injectable({
  providedIn: 'root',
})
export class FechamentoSaldoAlmoxarifadoService {
  baseURL = `${environment.apiUrl}/fechamentosaldoalmoxarifado`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<FechamentoSaldoAlmoxarifado[]> {
    return this.http.get<FechamentoSaldoAlmoxarifado[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<FechamentoSaldoAlmoxarifado> {
    return this.http.get<FechamentoSaldoAlmoxarifado>(`${this.baseURL}/${id}`);
  }

  criar(fechamento: FechamentoSaldoAlmoxarifado): Observable<FechamentoSaldoAlmoxarifado> {
    console.log(fechamento);
    return this.http.post<FechamentoSaldoAlmoxarifado>(`${this.baseURL}`, fechamento);
  }

}
