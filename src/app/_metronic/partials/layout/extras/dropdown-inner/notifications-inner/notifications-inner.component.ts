import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '@pages/usuario/_services/usuario.service';
import {
  Area,
  AreaKey,
  Notificacao,
  NotificacaoMencao,
  NotificacaoMencaoResponse,
  SubTab,
} from './notifications.model';

@Component({
  selector: 'app-notifications-inner',
  templateUrl: './notifications-inner.component.html',
  styleUrls: ['./notifications-inner.component.scss'],
})
export class NotificationsInnerComponent implements OnInit {
  @HostBinding('class') class = 'menu menu-sub menu-sub-dropdown menu-column  w-425px w-md-475px shadow';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  areas: Area[] = [
    { key: 'DFD', label: 'DFD' },
    { key: 'PAD', label: 'PAD' },
    { key: 'CONTRATACAO', label: 'CONTRATAÇÃO' }, // label com acento é só visual
    { key: 'CONTRATO', label: 'CONTRATO' },
    { key: 'PEDIDO_COMPRA', label: 'PEDIDO COMPRA' },
  ];

  private LABEL_BY_KEY: Record<AreaKey, string> = {
    DFD: 'DFD',
    PAD: 'PAD',
    CONTRATACAO: 'CONTRATAÇÃO',
    CONTRATO: 'CONTRATO',
    PEDIDO_COMPRA: 'PEDIDO COMPRA',
  };

  activeArea: AreaKey = 'DFD';

  subTab: Record<AreaKey, SubTab> = {
    DFD: 'NAO_LIDAS',
    PAD: 'NAO_LIDAS',
    CONTRATACAO: 'NAO_LIDAS',
    CONTRATO: 'NAO_LIDAS',
    PEDIDO_COMPRA: 'NAO_LIDAS',
  };

  notificacoes: Notificacao[] = [];
  totalPendencias = 0;

  // contagens vindas do back (para badges)
  private countsByArea = new Map<AreaKey, { lidas: number; naoLidas: number }>();

  // ===== INIT =====
  ngOnInit(): void {
    this.usuarioService.listarNotificacaoMencao().subscribe({
      next: (res: NotificacaoMencaoResponse) => this.hidratarFromApi(res),
      error: (err) => console.error(err),
    });
  }

  // ===== View derivada =====
  get visibleList(): Notificacao[] {
    const area = this.activeArea;
    const tab = this.subTab[area];
    return this.notificacoes
      .filter((n) => n.area === area)
      .filter((n) => (tab === 'NAO_LIDAS' ? !n.mencao_lida : n.mencao_lida));
  }

  getCount(area: AreaKey, tipo: 'naoLidas' | 'lidas'): number {
    const c = this.countsByArea.get(area);
    if (c) return tipo === 'naoLidas' ? c.naoLidas : c.lidas; // usa contagem do back
    // fallback local (não deve precisar)
    const list = this.notificacoes.filter((n) => n.area === area);
    return tipo === 'naoLidas' ? list.filter((n) => !n.mencao_lida).length : list.filter((n) => n.mencao_lida).length;
  }

  trackById(_: number, n: Notificacao) {
    return n.id;
  }

  // ===== Ações =====
  setActiveArea(area: AreaKey): void {
    this.activeArea = area;
  }

  setSubTab(area: AreaKey, tab: SubTab): void {
    this.subTab[area] = tab;
  }

  marcarComoLida(n: Notificacao): void {
    const idx = this.notificacoes.findIndex((x) => x.id === n.id);
    if (idx < 0) return;
    if (this.notificacoes[idx].mencao_lida) return;

    this.notificacoes[idx].mencao_lida = true;

    const c = this.countsByArea.get(this.notificacoes[idx].area);
    if (c) {
      c.naoLidas = Math.max(0, c.naoLidas - 1);
      c.lidas += 1;
    }

    this.recalcularPendencias();
  }

  marcarTudoComoLido(area: AreaKey) {
    const c = this.countsByArea.get(area);
    const qtd = c?.naoLidas ?? this.getCount(area, 'naoLidas');
    if (qtd >= 10 && !confirm(`Marcar ${qtd} como lidas?`)) return;

    this.notificacoes.forEach((n) => {
      if (n.area === area) n.mencao_lida = true;
    });
    if (c) {
      c.lidas += c.naoLidas;
      c.naoLidas = 0;
    }

    this.recalcularPendencias();
  }

  descartar(n: Notificacao): void {
    const wasUnread = !n.mencao_lida;
    this.notificacoes = this.notificacoes.filter((x) => x.id !== n.id);
    const c = this.countsByArea.get(n.area);
    if (c) {
      if (wasUnread) c.naoLidas = Math.max(0, c.naoLidas - 1);
      else c.lidas = Math.max(0, c.lidas - 1);
    }
    this.recalcularPendencias();
  }

  abrirNotificacao(n: Notificacao): void {
    /* navegação/ação */
    let rota = '';

    switch (n.area) {
      case 'DFD':
        rota = '/solicitacaodespesa/view';
        break;
      case 'PAD':
        rota = '/processoadministrativo/view';
        break;
      case 'CONTRATACAO':
        rota = '/licitacao/view';
        break;
      case 'CONTRATO':
        rota = '/contrato/view';
        break;
      case 'PEDIDO_COMPRA':
        rota = '/pedidocompra/view';
        break;
      default:
        break;
    }

    this.route.navigate([rota, n.area_id, 'historico']);
    return;
  }

  verTodas(area: AreaKey): void {
    /* navegação/ação */
    console.log(area);
  }

  private recalcularPendencias(): void {
    // pode usar o valor do back (res.total_pendencias), mas recalculamos para refletir interações locais
    this.totalPendencias = this.notificacoes.filter((n) => !n.mencao_lida).length;
  }

  // ===== Mapeamento API -> UI =====
  private hidratarFromApi(res: NotificacaoMencaoResponse) {
    this.totalPendencias = res.total_pendencias ?? 0;
    this.countsByArea.clear();

    const flat: Notificacao[] = [];

    for (const g of res.areas || []) {
      const areaKey = this.assertAreaKey(g.area);

      // contagens para badges
      this.countsByArea.set(areaKey, {
        lidas: g.lidas ?? 0,
        naoLidas: g.nao_lidas ?? 0,
      });

      // não lidas primeiro
      for (const it of g.nao_lidas_items || []) {
        flat.push(this.mapServerItem(it));
      }
      // depois lidas
      for (const it of g.lidas_items || []) {
        flat.push(this.mapServerItem(it));
      }
    }

    // ordenar por data_mencao desc (se quiser)
    flat.sort((a, b) => {
      const da = a.data_mencao ? Date.parse(this.coerceIso(a.data_mencao)) : 0;
      const db = b.data_mencao ? Date.parse(this.coerceIso(b.data_mencao)) : 0;
      return db - da;
    });

    this.notificacoes = flat;
  }

  private mapServerItem(s: NotificacaoMencao): Notificacao {
    const areaKey = this.assertAreaKey(s.area);
    return {
      id: s.id,
      area_id: s.area_id,
      area: areaKey,
      areaLabel: this.LABEL_BY_KEY[areaKey], // label bonitinho na UI
      titulo: s.titulo,
      descricao: s.descricao ?? '',
      tempo: this.formatTempo(s.data_mencao),
      mencao_lida: s.mencao_lida, // já boolean
      usuario_id: s.usuario_id,
      usuario_nome: s.usuario_nome,
      usuario_criacao_id: s.usuario_criacao_id,
      usuario_criacao_nome: s.usuario_criacao_nome,
      pendencia: s.pendencia, // já boolean
      tipo: s.pendencia ? 'aviso' : 'info',
      icone: s.pendencia ? 'alerta' : 'padrao',
      data_mencao: s.data_mencao,
    };
  }

  private assertAreaKey(a: string): AreaKey {
    // Back garante um destes cinco valores; mantemos um fallback seguro
    if (a === 'DFD' || a === 'PAD' || a === 'CONTRATACAO' || a === 'CONTRATO' || a === 'PEDIDO_COMPRA') {
      return a;
    }
    return 'DFD';
  }

  private coerceIso(s: string): string {
    // se vier "YYYY-MM-DD HH:mm:ss.SSS", vira ISO "YYYY-MM-DDTHH:mm:ss.SSS"
    return s.includes('T') ? s : s.replace(' ', 'T');
  }

  private formatTempo(dateStr: string): string {
    const d = new Date(this.coerceIso(dateStr));
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    if (isNaN(diffMs)) return '';

    const m = Math.floor(diffMs / 60000);
    if (m < 1) return 'agora';
    if (m < 60) return `há ${m} min`;
    const h = Math.floor(m / 60);
    if (h < 24) return `há ${h} h`;
    const dyy = Math.floor(h / 24);
    return dyy === 1 ? 'há 1 dia' : `há ${dyy} dias`;
  }

  constructor(protected usuarioService: UsuarioService, private route: Router) {}
}
