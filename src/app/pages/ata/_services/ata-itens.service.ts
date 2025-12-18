import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtaItem, AtaItemAdicionar } from '../_models/ata-item.model';

@Injectable({
  providedIn: 'root',
})
export class AtaItemService {
  baseURL = `${environment.apiLegacyUrl}/ataitem`;
  constructor(private http: HttpClient) {}

  listarItemAta(ata_id: number): Observable<AtaItem[]> {
    return this.http.get<AtaItem[]>(`${this.baseURL}/${ata_id}`);
  }

  listarItemParaAdicionarAta(ata_id: number): Observable<AtaItemAdicionar[]> {
    return this.http.get<AtaItemAdicionar[]>(`${this.baseURL}/adicionandoitem/${ata_id}`);
  }
}
