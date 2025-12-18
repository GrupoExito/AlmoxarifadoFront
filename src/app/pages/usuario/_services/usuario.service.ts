import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { PedidoCompraAssinaturaDigitalizadaUsuario } from '@pages/compra/_models/pedido-compra.model';
import { EstudoTecnicoPreliminarMembrosPlanejamentoUsuario } from '@pages/estudo-tecnico-preliminar/_models/estudo-tecnico-preliminar.model';
import { DFDFiscalResponsavelTecnicoUsuario } from '@pages/solicitacao-despesa/_models/solicitacao-despesa.model';
import { Observable } from 'rxjs';
import {
  AreaKey,
  NotificacaoMencaoResponse,
} from 'src/app/_metronic/partials/layout/extras/dropdown-inner/notifications-inner/notifications.model';
import { ClienteMunicipio } from 'src/app/modules/auth/models/cliente.model';
import { Usuario, VincularUsuarioClienteDTO } from '../_models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseURL = `${environment.apiLegacyUrl}/usuario`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseURL);
  }

  listarNotificacaoMencao(): Observable<NotificacaoMencaoResponse> {
    return this.http.get<NotificacaoMencaoResponse>(`${this.baseURL}/notificacaomencao`);
  }

  mencionarUsuarios(mention: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/mentiouser`, mention);
  }

  consultarPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/${id}`);
  }

  editar(id?: number, usuario?: Usuario): Observable<Usuario> {
    if (!usuario?.dataLimiteAcesso) {
      delete usuario?.dataLimiteAcesso;
    }

    return this.http.put<Usuario>(`${this.baseURL}/${id}`, usuario);
  }

  editarSenha(id?: number, usuario?: Usuario): Observable<Usuario> {
    if (!usuario?.dataLimiteAcesso) {
      delete usuario?.dataLimiteAcesso;
    }

    return this.http.put<Usuario>(`${this.baseURL}/alterarsenha/${id}`, usuario);
  }

  criar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseURL}`, usuario);
  }

  deletar(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.baseURL}/${id}`);
  }

  listarPorSecretaria(id_secretaria: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/secretaria/${id_secretaria}`);
  }

  listarTodosMunicipios(): Observable<ClienteMunicipio[]> {
    return this.http.get<ClienteMunicipio[]>(`${this.baseURL}/listarmunicipio`);
  }

  consultarMunicipiosPorUsuario(id: number): Observable<ClienteMunicipio[]> {
    return this.http.get<ClienteMunicipio[]>(`${this.baseURL}/${id}`);
  }

  cadastrarAssinatura(assinatura: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/salvarassinatura`, assinatura);
  }

  consultarAssinaturaId(): Observable<Blob> {
    return this.http.get(`${this.baseURL}/assinatura`, { responseType: 'blob' });
  }

  listarUsuarioResponsavelPlanejamentoETP(
    etp_id: number
  ): Observable<EstudoTecnicoPreliminarMembrosPlanejamentoUsuario[]> {
    return this.http.get<EstudoTecnicoPreliminarMembrosPlanejamentoUsuario[]>(
      `${this.baseURL}/usuarioresponsavelplanejamento/etp/${etp_id}`
    );
  }

  listarUsuarioFiscalResponsavelTecnicoDFD(dfd_id: number): Observable<DFDFiscalResponsavelTecnicoUsuario[]> {
    return this.http.get<DFDFiscalResponsavelTecnicoUsuario[]>(
      `${this.baseURL}/usuarioresponsavelplanejamento/dfd/${dfd_id}`
    );
  }

  listarUsuariosPodemAssinarPedidoCompra(
    pedido_compra_id: number
  ): Observable<PedidoCompraAssinaturaDigitalizadaUsuario[]> {
    return this.http.get<PedidoCompraAssinaturaDigitalizadaUsuario[]>(
      `${this.baseURL}/usuarioassinaturadigitalizada/pedidocompra/${pedido_compra_id}`
    );
  }

  listarUsuarioResponsavelCotacao(cotacao_id: number): Observable<DFDFiscalResponsavelTecnicoUsuario[]> {
    return this.http.get<DFDFiscalResponsavelTecnicoUsuario[]>(
      `${this.baseURL}/usuarioresponsavel/cotacao/${cotacao_id}`
    );
  }

  vincularUsuarioCliente(dto: VincularUsuarioClienteDTO): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/inserirusuariocliente`, dto);
  }

  /** Labels bonitos para UI (se precisar montar título com acento/espaço) */
  readonly AREA_LABEL_BY_KEY: Record<AreaKey, string> = {
    DFD: 'DFD',
    PAD: 'PAD',
    CONTRATACAO: 'CONTRATAÇÃO',
    CONTRATO: 'CONTRATO',
    PEDIDO_COMPRA: 'PEDIDO COMPRA',
  };

  /** Título padrão da menção (Slack-like) */
  buildMentionTitle(
    pendencia: boolean,
    area: AreaKey,
    areaId: number | string,
    autor: string,
    customLabel?: string
  ): string {
    const label = customLabel ?? this.AREA_LABEL_BY_KEY[area] ?? area;
    return `Menção ${pendencia ? 'com pendência ' : ''}na ${label} ${areaId} criada por ${autor}`;
  }

  /** Extrai @usernames do texto, evitando capturar partes de e-mail (foo@bar.com) */
  extractUsernames(text: string): string[] {
    if (!text) return [];
    const out: string[] = [];
    const re = /@([a-z0-9._-]{2,})/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      const user = m[1];
      const prev = text[m.index - 1]; // char antes do '@'
      const validBoundary = !prev || /\s|[([{\-+*.,;:!?]/.test(prev);
      const after = text[m.index + m[0].length]; // char depois do @username
      const looksLikeEmail = after === '.'; // evita foo@bar.com
      if (validBoundary && !looksLikeEmail) out.push(user);
    }
    return out;
  }

  /**
   * A partir do TEXTO e dos chips de menções válidas,
   * retorna a lista de IDs de usuários que realmente estão mencionados no texto (sem duplicatas).
   */
  collectMentionIdsFromText(text: string, chips: any[]): number[] {
    const inText = new Set(this.extractUsernames(text)); // usernames presentes no texto
    const ids = (chips || [])
      .filter((c) => !!c && inText.has(c.username)) // mantém só quem ainda está no texto
      .map((c) => c.usuario_id)
      .filter((id): id is number => typeof id === 'number');
    return Array.from(new Set(ids)); // dedup
  }

  /**
   * Constrói o payload da menção; retorna null se não houver nenhum usuário válido no texto.
   * (Ajuda a não fazer chamadas vazias à API de menções.)
   */
  buildMentionRequest(args: {
    area: AreaKey;
    area_id: number;
    descricao: string;
    pendencia: boolean;
    usuario_criacao_id: number;
    titulo: string;
    chips: any[];
  }): any | null {
    const usuarios_ids = this.collectMentionIdsFromText(args.descricao, args.chips);
    if (!usuarios_ids.length) return null;

    return {
      area: args.area,
      area_id: args.area_id,
      descricao: args.descricao,
      pendencia: args.pendencia,
      usuario_criacao_id: args.usuario_criacao_id,
      usuarios_ids,
      titulo: args.titulo,
    };
  }
}
