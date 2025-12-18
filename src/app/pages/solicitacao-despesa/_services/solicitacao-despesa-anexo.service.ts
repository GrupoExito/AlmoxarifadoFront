import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitacaoDespesaAnexo } from '../_models/solicitacao-despesa-anexo.model';
@Injectable({
  providedIn: 'root',
})
export class SolicitacaoDespesaAnexoService {
  baseURL = `${environment.apiLegacyUrl}/solicitacaodespesaanexo`;
  constructor(private http: HttpClient) {}

  listarTodos(sd_id: number): Observable<SolicitacaoDespesaAnexo[]> {
    return this.http.get<SolicitacaoDespesaAnexo[]>(`${this.baseURL}/${sd_id}`);
  }

  salvarAnexo(planejamento: FormData): Observable<SolicitacaoDespesaAnexo> {
    return this.http.post<SolicitacaoDespesaAnexo>(`${this.baseURL}`, planejamento);
  }

  download(sd_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${sd_id}`, {
      responseType: 'arraybuffer',
    });
  }
  
  deletar(id: number): Observable<SolicitacaoDespesaAnexo> {
    return this.http.delete<SolicitacaoDespesaAnexo>(`${this.baseURL}/${id}`);
  }
}
