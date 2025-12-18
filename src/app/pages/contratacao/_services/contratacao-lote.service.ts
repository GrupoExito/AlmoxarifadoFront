import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContratacaoLote } from '../_models/contratacao-lote.model';
import { ContratacaoLoteItem } from '../_models/contratacao-lote-item.model';

@Injectable({
  providedIn: 'root',
})
export class ContratacaoLoteService {
  baseURL = `${environment.apiLegacyUrl}/contratacaolote`;
  constructor(private http: HttpClient) {}

  deletarLote(id: number): Observable<ContratacaoLote> {
    return this.http.delete<ContratacaoLote>(`${this.baseURL}/${id}`);
  }

  criarLote(contratacaoLote: ContratacaoLote): Observable<ContratacaoLote> {
    return this.http.post<ContratacaoLote>(`${this.baseURL}`, contratacaoLote);
  }

  listarLotes(contratacao_id: number): Observable<ContratacaoLote[]> {
    return this.http.get<ContratacaoLote[]>(`${this.baseURL}/${contratacao_id}`);
  }

  listarItensSemLote(contratacao_id: number): Observable<ContratacaoLoteItem[]> {
    return this.http.get<ContratacaoLoteItem[]>(`${this.baseURL}/itens/semlote/${contratacao_id}`);
  }

  listarItensComLote(lote_id: number): Observable<ContratacaoLoteItem[]> {
    return this.http.get<ContratacaoLoteItem[]>(`${this.baseURL}/itens/comlote/${lote_id}`);
  }

  listarLotesContratacaoPorDFD(sd_id: number): Observable<ContratacaoLote[]> {
    return this.http.get<ContratacaoLote[]>(`${this.baseURL}/dfd/lotes/${sd_id}`);
  }

  adicionarItemLote(item: ContratacaoLoteItem[]): Observable<ContratacaoLoteItem> {
    return this.http.post<ContratacaoLoteItem>(`${this.baseURL}/item/adicionar`, item);
  }

  removerItemLote(item: number[]): Observable<ContratacaoLoteItem> {
    return this.http.post<ContratacaoLoteItem>(`${this.baseURL}/item/excluir`, item);
  }

  editarLote(contratacaoLote: { id: number; descricao_lote: string }): Observable<ContratacaoLote> {
    return this.http.put<ContratacaoLote>(`${this.baseURL}`, contratacaoLote);
  }

  importarItensDFD(contratacao_id: number): Observable<ContratacaoLoteItem[]> {
    return this.http.get<ContratacaoLoteItem[]>(`${this.baseURL}/importaritensdfd/${contratacao_id}`);
  }
}
