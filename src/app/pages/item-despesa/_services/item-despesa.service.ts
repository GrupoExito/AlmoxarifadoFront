import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { ItemDespesa } from '../_models/item-despesa.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemDespesaService {
  baseURL = `${environment.apiLegacyUrl}/ItemDespesa`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ItemDespesa[]> {
    return this.http.get<ItemDespesa[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<ItemDespesa> {
    return this.http.get<ItemDespesa>(`${this.baseURL}/${id}`);
  }

  editar(id: number, ItemDespesa: ItemDespesa): Observable<ItemDespesa> {
    return this.http.put<ItemDespesa>(`${this.baseURL}/${id}`, ItemDespesa);
  }

  criar(ItemDespesa: ItemDespesa): Observable<ItemDespesa> {
    return this.http.post<ItemDespesa>(`${this.baseURL}`, ItemDespesa);
  }

  deletar(id: number): Observable<ItemDespesa> {
    return this.http.delete<ItemDespesa>(`${this.baseURL}/${id}`);
  }
}
