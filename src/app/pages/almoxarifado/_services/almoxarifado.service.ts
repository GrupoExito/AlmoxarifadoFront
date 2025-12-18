import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Almoxarifadocep } from '@pages/shared/models/almoxarifadocep.model';
import { AData, ADataEtapasHeader, Almoxarifado } from '../_models/almoxarifado.model';
import { ItemAlmoxarifado } from '../_models/itemAlmoxarifado.model';
import { UsuarioAlmoxarifado } from '../_models/usuarioAlmoxarifado.model';
import { Dashboard } from '../_models/Dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class AlmoxarifadoService {
  private routeId: number | null = null;
  public aData = new BehaviorSubject<AData | null>(null);
  public aDataEtapasHeader = new BehaviorSubject<ADataEtapasHeader | null>(null);
  //data$ = this.aData.asObservable();
  dataEtapasHeader$ = this.aDataEtapasHeader.asObservable();
  baseURL = `${environment.apiUrl}/almoxarifado`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Almoxarifado[]> {
    console.log('listar todos almoxarifado service');
    return this.http.get<Almoxarifado[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<Almoxarifado> {
    console.log('consultar por id almoxarifado service', id);
    return this.http.get<Almoxarifado>(`${this.baseURL}/${id}`);
  }

  consultarEnderecoPorCEP(cep: string): Observable<Almoxarifadocep> {
    return this.http.get<Almoxarifadocep>(`${this.baseURL}/cep/${cep}`);
  }

  editar(id: number, almoxarifado: Almoxarifado): Observable<Almoxarifado> {
    return this.http.put<Almoxarifado>(`${this.baseURL}/${id}`, almoxarifado);
  }

  criar(almoxarifado: Almoxarifado): Observable<Almoxarifado> {
    return this.http.post<Almoxarifado>(`${this.baseURL}`, almoxarifado);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/${id}`);
  }

  setAlmoxarifado(eMData: AData | null) {
    this.aData.next(eMData);
  }

  setEtapasHeader(dataEtapasHeader: ADataEtapasHeader | null) {
    this.aDataEtapasHeader.next(dataEtapasHeader);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  GetMaterialEstoque(id: number): Observable<ItemAlmoxarifado[]> {
    return this.http.get<ItemAlmoxarifado[]>(`${this.baseURL}/itemmaterial/${id}`);
  }

  GetMaterialEstoqueItem(almoxarifado_id: number, produto_servico_id: number): Observable<ItemAlmoxarifado[]> {
    return this.http.get<ItemAlmoxarifado[]>(`${this.baseURL}/item/${almoxarifado_id}/${produto_servico_id}`);
  }

 listarUsuariosAdicionados(id: number): Observable<UsuarioAlmoxarifado[]> {
    return this.http.get<UsuarioAlmoxarifado[]>(`${this.baseURL}/usuarios/${id}`);
  }

  listarAlmoxarifadoUsuario(): Observable<Almoxarifado[]> {
    return this.http.get<Almoxarifado[]>(`${this.baseURL}/almoxarifadousuario`);
  }

  adicionarUsuarios(usuarios: number[], almoxarifado_id: number): Observable<Almoxarifado> {
    return this.http.post<Almoxarifado>(`${this.baseURL}/usuarios/${almoxarifado_id}`, usuarios);
  }

  deletarUsuario(usuario_id: number, almoxarifado_id: number): Observable<Almoxarifado> {
    return this.http.delete<Almoxarifado>(`${this.baseURL}/usuarios/${usuario_id}/${almoxarifado_id}`);
  }

  alterarAutorizadorUsuario(usuario_id: number, almoxarifado_id: number, autorizador: boolean): Observable<void> {
    return this.http.put<void>(`${this.baseURL}/usuarios/${usuario_id}/${almoxarifado_id}`, autorizador);
  }

  GetDashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.baseURL}/dashboard`);
  }

  filtrar(parameters: any): Observable<Almoxarifado[]> {
      return this.http.get<Almoxarifado[]>(`${this.baseURL}/filtrar`, {
        params: parameters,
      });
    }
  

}
