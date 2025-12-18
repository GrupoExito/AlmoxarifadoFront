import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { TRData, TRDataEtapasHeader } from '../_models/termo-referencia-data.model';
import {
  ImpressaoDocumentoTermoReferenciaDTO,
  TermoReferencia,
  TermoReferenciaItens,
} from '../_models/termo-referencia.model';

@Injectable({
  providedIn: 'root',
})
export class TermoReferenciaService {
  private routeId: number | null = null;
  public trData = new BehaviorSubject<TRData | null>(null);
  public trDataEtapasHeader = new BehaviorSubject<Partial<TRDataEtapasHeader> | null>(null);
  data$ = this.trData.asObservable();
  dataEtapasHeader$ = this.trDataEtapasHeader.asObservable();
  baseURL = `${environment.apiLegacyUrl}/termoreferencia`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<TermoReferencia[]> {
    return this.http.get<TermoReferencia[]>(this.baseURL);
  }

  consultarTermoReferencia(id: number): Observable<TermoReferencia> {
    return this.http.get<TermoReferencia>(`${this.baseURL}/${id}`);
  }

  consultartrQuantidade(id: number): Observable<TRDataEtapasHeader> {
    return this.http.get<TRDataEtapasHeader>(`${this.baseURL}/quantidade/${id}`);
  }

  consultartrPrecoReferencial(id: number): Observable<TermoReferenciaItens[]> {
    return this.http.get<TermoReferenciaItens[]>(`${this.baseURL}/precoreferencial/${id}`);
  }

  criar(termoReferencia: TermoReferencia): Observable<TermoReferencia> {
    return this.http.post<TermoReferencia>(`${this.baseURL}`, termoReferencia);
  }

  deletar(id: number): Observable<TermoReferencia> {
    return this.http.delete<TermoReferencia>(`${this.baseURL}/${id}`);
  }

  editar(id: number, termoReferencia: TermoReferencia): Observable<TermoReferencia> {
    return this.http.put<TermoReferencia>(`${this.baseURL}/${id}`, termoReferencia);
  }

  setTR(trData: TRData | null) {
    this.trData.next(trData);
  }

  setEtapasHeader(dataEtapasHeader: Partial<TRDataEtapasHeader> | null) {
    this.trDataEtapasHeader.forEach((data) => {
      if (data && dataEtapasHeader) {
        Object.keys(data).forEach((props) => {
          if (!dataEtapasHeader.hasOwnProperty(props)) {
            dataEtapasHeader[props as keyof TRDataEtapasHeader] = data[props as keyof TRDataEtapasHeader];
          }
        });
      }
    });

    this.trDataEtapasHeader.next(dataEtapasHeader);
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

  filtrar(parameters: any): Observable<TermoReferencia[]> {
    return this.http.get<TermoReferencia[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }

  downloadImpresso(tr: ImpressaoDocumentoTermoReferenciaDTO): Observable<ArrayBuffer> {
    return this.http.post(`${environment.apiLegacyUrl}/relatoriotermoreferencia/impressao`, tr, {
      responseType: 'arraybuffer',
    });
  }
}
