import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AtaData, AtaHeaderData } from '../_models/ata-data.model';
import { Ata, AtaHeader } from '../_models/ata.model';
import { AtaItem } from '../_models/ata-item.model';
import { PedidoCompra } from '@pages/compra/_models/pedido-compra.model';

@Injectable({
  providedIn: 'root',
})
export class AtaService {
  private routeId: number | null = null;
  public ataData = new BehaviorSubject<AtaData | null>(null);
  public ataHeader = new BehaviorSubject<AtaHeader | null>(null);
  data$ = this.ataData.asObservable();
  ataHeader$ = this.ataHeader.asObservable();

  public ataDataHeader = new BehaviorSubject<AtaHeaderData | null>(null);

  baseURL = `${environment.apiLegacyUrl}/ata`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Ata[]> {
    return this.http.get<Ata[]>(this.baseURL);
  }

  consultarAta(ata_id: number): Observable<Ata> {
    return this.http.get<Ata>(`${this.baseURL}/${ata_id}`);
  }

  criar(ata: Partial<Ata>): Observable<Ata> {
    return this.http.post<Ata>(`${this.baseURL}`, ata);
  }

  editar(ata: Partial<Ata>): Observable<Ata> {
    return this.http.put<Ata>(`${this.baseURL}`, ata);
  }

  deletar(ata_id: number): Observable<Ata> {
    return this.http.delete<Ata>(`${this.baseURL}/${ata_id}`);
  }

  setAta(ataData: AtaData | null) {
    this.ataData.next(ataData);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  setAtaHeader(ataHeader: AtaHeaderData | null): void {
    this.ataDataHeader.next(ataHeader);
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  filtrar(parameters: any): Observable<Ata[]> {
    return this.http.get<Ata[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }

  adicionarTodosItensAta(ataItem: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/itens`, ataItem);
  }

  deletarTodosItensAta(ata_id: number): Observable<AtaItem[]> {
    return this.http.delete<AtaItem[]>(`${this.baseURL}/itens/${ata_id}`);
  }

  adicionarItemAta(ataItem: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/item`, ataItem);
  }

  excluirAtaItem(ata_id: number, gproduto_servico_id: number): Observable<AtaItem[]> {
    return this.http.delete<AtaItem[]>(`${this.baseURL}/item/${ata_id}/${gproduto_servico_id}`);
  }

  listarTodosItens(ata_id: number): Observable<AtaItem[]> {
    return this.http.get<AtaItem[]>(`${this.baseURL}/listaritens/${ata_id}`);
  }

  setEtapasHeader(dataEtapasHeader: AtaHeader | null) {
    this.ataHeader.next(dataEtapasHeader);
  }

  listarqtdAta(ata_id: number): Observable<AtaHeader> {
    return this.http.get<AtaHeader>(`${this.baseURL}/quantidade/${ata_id}`);
  }

   listarAtaPedidoCompra(ata_id: number): Observable<PedidoCompra[]> {
    return this.http.get<PedidoCompra[]>(`${this.baseURL}/compras/${ata_id}`);
  }
}
