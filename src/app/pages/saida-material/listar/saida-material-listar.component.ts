import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { SaidaMaterialService } from '../_services/saida-material.service';
import { SaidaMaterial } from '../_models/saida-material.model';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { ItemMovimentacao } from '@pages/entrada-material/_models/entrada-material.model';
import { StatusFluxo } from '@pages/shared/models/fluxo.model';
import { Setor } from '@pages/setor/_models/setor.model';
import { SolicitanteMaterial } from '@pages/solicitante-material/_models/solicitante-material.model';
import { DataTableDirective } from 'angular-datatables';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { SetorService } from '@pages/setor/_services/setor.service';
import { SolicitanteService } from '@pages/solicitante-material/_services/solicitante-material.service';
import { ConfiguracaoOrganizacaoService } from '@pages/configuracao-organizacao/_services/configuracao-organizacao.service';

@Component({
  selector: 'app-saida-material-listar',
  templateUrl: './saida-material-listar.component.html',
  styleUrls: ['./saida-material-listar.component.scss'],
})
export class SaidaMateriaListarComponent implements OnInit, OnDestroy {
  constructor(
    private saidaMateriaLService: SaidaMaterialService,
    private secretaria: SecretariaFundoService,
    private almoxarifado: AlmoxarifadoService,
    private setor: SetorService,
    private solicitanteMaterial: SolicitanteService,
    private configuracaoOrganizacaoService: ConfiguracaoOrganizacaoService
  ) {}

  dtTrigger = new Subject<any>();
  dtOptions: any = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  saidasMaterial: SaidaMaterial[];
  secretarias: SecretariaFundo[];
  almoxarifados: Almoxarifado[];
  setores: Setor[];
  solicitantes: SolicitanteMaterial[];
  itensMovimentacao: ItemMovimentacao[];
  statusFluxo: StatusFluxo[];

  secretariaSelecionada: string = '';
  almoxarifadoSelecionado: string = '';
  setorSelecionado: string = '';
  solicitanteSelecionado: string = '';
  ItemSelecionado: string = '';
  idSelecionado: string = '';
  tipoSelecionado: string = '';
  statusSelecionado: string = '';
  dataInicialSelecionado: string = '';
  dataFinalSelecionado: string = '';
  filtroButton: boolean = false;
  filtroAccordion: boolean = false;
  saidaAlmoxarifadoUsuario: boolean | undefined = false;
  usuario_id: number = 1;

  async ngOnInit(): Promise<void> {
    this.dtOptions = dtOptions;
    this.dtOptions.order = [2, 'asc'];
    await this.consultarConfiguracaoUsuario();

    if (this.saidaAlmoxarifadoUsuario) {
      this.saidaMateriaLService.listarPorUsuario(this.usuario_id).subscribe({
        next: (saidasMaterial) => {
          this.saidasMaterial = saidasMaterial;
          this.dtTrigger.next(null);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.saidaMateriaLService.listarTodos().subscribe({
        next: (saidasMaterial) => {
          this.saidasMaterial = saidasMaterial;
          this.dtTrigger.next(null);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public trackItem(index: number, item: SaidaMaterial) {
    return item.id;
  }

  deletar(id: number = 0): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não será capaz de recuperar esta informação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#23b349',
      cancelButtonColor: '#eb2067',
    }).then((result) => {
      if (result.value) {
        this.saidaMateriaLService.deletar(id).subscribe({
          next: () => {
            this.saidasMaterial = this.saidasMaterial.filter((saidasMaterial) => saidasMaterial.id != id);
            Swal.fire('Excluído!', 'Saida Material foi cancelada!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir este Saida Material!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

enviar(id: number = 0): void {
    Swal.fire({
      title: 'Tem certeza que deseja enviar?',
      text: 'Após envio você não será capaz de modificar esta solicitação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#23b349',
      cancelButtonColor: '#eb2067',
    }).then((result) => {
      if (result.value) {

this.saidaMateriaLService.consultarSaidaQuantidade(id).subscribe({
  next: (data) => {
    if (data.quantidade_itens > 0) {
        this.saidaMateriaLService.enviarSolicitacao(id).subscribe({
          next: () => {
            
            const item = this.saidasMaterial.find(sm => sm.id === id);

            if (item) {
              item.status_id = 2;
              item.status = 'Solicitado';
            }

            Swal.fire('Enviado!', 'Solicitação da Saida Material foi enviada!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel enviar esta Saida de Material!', 'error');
          },
        });
      
    }else{
      Swal.fire('Atenção!', 'Não é possível enviar uma saída sem itens!', 'warning');
    }
  }
    });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  openAccordion() {
    this.filtroButton = !this.filtroButton;

    if (this.filtroAccordion) {
      return;
    }
    this.filtroAccordion = true;

    this.secretaria.listarTodos().subscribe({
      next: (secretarias) => {
        this.secretarias = secretarias;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.almoxarifado.listarAtivos().subscribe({
      next: (almoxarifados) => {
        this.almoxarifados = almoxarifados;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.setor.listarTodos().subscribe({
      next: (setores) => {
        this.setores = setores;
        console.log(setores);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.solicitanteMaterial.listarTodos().subscribe({
      next: (solicitantes) => {
        this.solicitantes = solicitantes;
        console.log(solicitantes);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.saidaMateriaLService.listarItemMovimentacao().subscribe({
      next: (itemMovimentacao) => {
        this.itensMovimentacao = itemMovimentacao;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filtrar() {
    Swal.showLoading();

const parameters: Record<string, any> = {
      secretaria_id: this.secretariaSelecionada ?? null,
      almoxarifado_id: this.almoxarifadoSelecionado ?? null,
      status_id: this.statusSelecionado ?? null,
      setor_id: this.setorSelecionado ?? null,
      solicitante_id: this.solicitanteSelecionado ?? null,
      saida_id: this.idSelecionado ?? null,
      tipo_saida_id: this.tipoSelecionado ?? null,
      data_ini: this.toIsoDate(this.dataInicialSelecionado),
      data_fim: this.toIsoDate(this.dataFinalSelecionado),
    };

    Object.keys(parameters).forEach((k) => {
      const v = parameters[k];
      if (v === null || v === '' || v === undefined) {
        delete parameters[k];
      }
    });
    console.log(parameters);

    this.saidaMateriaLService.filtrar(parameters, this.usuario_id).subscribe({
      next: (saidasMaterial) => {
        this.saidasMaterial = saidasMaterial;
        this.rerender();
        Swal.close();
      },
      error: () => {
        Swal.fire('Algo deu errado!', 'Não foi possivel filtrar as saidas!', 'error');
      },
    });
  }

  private toIsoDate(value: any): string | null {
    if (!value) return null;

    // Se já vier yyyy-MM-dd
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

    // dd-MM-yyyy ou dd/MM/yyyy
    if (typeof value === 'string') {
      const m = value.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
      if (m) return `${m[3]}-${m[2]}-${m[1]}`;
    }

    // Date
    if (value instanceof Date && !isNaN(value.getTime())) {
      const y = value.getFullYear();
      const mm = String(value.getMonth() + 1).padStart(2, '0');
      const dd = String(value.getDate()).padStart(2, '0');
      return `${y}-${mm}-${dd}`;
    }

    return null;
  }

  limparFiltros() {
    this.secretariaSelecionada = '';
    this.almoxarifadoSelecionado = '';
    this.ItemSelecionado = '';
    this.setorSelecionado = '';
    this.solicitanteSelecionado = '';
    this.idSelecionado = '';
    this.tipoSelecionado = '';
    this.statusSelecionado = '';
    this.dataInicialSelecionado = '';
    this.dataFinalSelecionado = '';
  }

  async consultarConfiguracaoUsuario(): Promise<void> {
    const parameters = {
      nome_tela: 'saida_almoxarifado',
    };

    return new Promise((resolve, reject) => {
      this.configuracaoOrganizacaoService.ListarConfiguracao(parameters).subscribe({
        next: (configuracaoUsuario) => {
          this.saidaAlmoxarifadoUsuario = configuracaoUsuario.find(
            (usuario) => usuario.nome_campo == 'saida_almoxarifado_usuario'
          )?.valor_campo;
          resolve();
        },
        error: (error) => {
          console.log(error);
          reject(error);
        },
      });
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
}
