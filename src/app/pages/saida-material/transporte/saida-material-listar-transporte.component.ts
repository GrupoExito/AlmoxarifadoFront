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
  selector: 'app-saida-material-listar-transporte',
  templateUrl: './saida-material-listar-transporte.component.html',
})
export class SaidaMaterialListarTransporteComponent implements OnInit, OnDestroy {
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

      this.saidaMateriaLService.listarPorStatusEmTrasnporte().subscribe({
        next: (saidasMaterial) => {
          this.saidasMaterial = saidasMaterial;
          this.dtTrigger.next(null);
        },
        error: (error) => {
          console.log(error);
        },
      });

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public trackItem(index: number, item: SaidaMaterial) {
    return item.id;
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
        this.saidaMateriaLService.enviarSolicitacao(id).subscribe({
          next: () => {
            this.saidasMaterial = this.saidasMaterial.filter((saidasMaterial) => saidasMaterial.id != id);
            Swal.fire('Enviado!', 'Solicitação da Saida Material foi enviada!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel enviar esta Saida de Material!', 'error');
          },
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
    const data_inicial = this.dataInicialSelecionado.split('-');
    const data_final = this.dataFinalSelecionado.split('-');
    const parameters = {
      secretaria: this.secretariaSelecionada,
      almoxarifado: this.almoxarifadoSelecionado,
      produto: this.ItemSelecionado,
      setor: this.setorSelecionado,
      solicitante: this.solicitanteSelecionado,
      id: this.idSelecionado,
      tipo: this.tipoSelecionado,
      status: this.statusSelecionado,
      data_inicial:
        data_inicial[0] != ''
          ? data_inicial[2] + '-' + data_inicial[1] + '-' + data_inicial[0]
          : this.dataInicialSelecionado,
      data_final:
        data_final[0] != '' ? data_final[2] + '-' + data_final[1] + '-' + data_final[0] : this.dataFinalSelecionado,
    };
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

  private isoHojeLocal(): string {
  // yyyy-MM-dd para usar em input type="date" e validar max
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

private limparCPF(cpf: string): string {
  return (cpf || '').replace(/\D/g, '');
}

private cpfValidoBasico(cpf: string): boolean {
  // validação básica: 11 dígitos e não repetidos. (Se quiser, dá pra colocar o algoritmo completo.)
  const c = this.limparCPF(cpf);
  if (c.length !== 11) return false;
  if (/^(\d)\1+$/.test(c)) return false;
  return true;
}

abrirModalFinalizarTransporte(saida: SaidaMaterial): void {
  const hoje = this.isoHojeLocal();

  Swal.fire({
    title: 'Finalizar transporte',
    html: `
      <div class="text-start">
        <label class="form-label">Código validador do transporte</label>
        <input id="sw_codigo_transporte" class="form-control mb-3" type="text" placeholder="Ex: ${saida?.id}-1232026" />

        <label class="form-label">Nome de quem recebeu</label>
        <input id="sw_nome" class="form-control mb-3" type="text" placeholder="Nome completo" />

        <label class="form-label">CPF</label>
        <input id="sw_cpf" class="form-control mb-3" type="text" placeholder="000.000.000-00" />

        <label class="form-label">Data de recebimento</label>
        <input id="sw_data" class="form-control" type="date" max="${hoje}" />
        <small class="text-muted d-block mt-1">A data não pode ser futura.</small>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Salvar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#23b349',
    cancelButtonColor: '#eb2067',
    focusConfirm: false,
    preConfirm: () => {
      const codigo_transporte = (document.getElementById('sw_codigo_transporte') as HTMLInputElement)?.value?.trim();
      const nome = (document.getElementById('sw_nome') as HTMLInputElement)?.value?.trim();
      const cpf = (document.getElementById('sw_cpf') as HTMLInputElement)?.value?.trim();
      const dataStr = (document.getElementById('sw_data') as HTMLInputElement)?.value; // yyyy-MM-dd

      if (!codigo_transporte) {
        Swal.showValidationMessage('Informe o código validador do transporte.');
        return;
      }
      if (!nome) {
        Swal.showValidationMessage('Informe o nome de quem recebeu.');
        return;
      }
      if (!cpf || !this.cpfValidoBasico(cpf)) {
        Swal.showValidationMessage('Informe um CPF válido.');
        return;
      }
      if (!dataStr) {
        Swal.showValidationMessage('Informe a data de recebimento.');
        return;
      }

      // valida "não futura"
      // dataStr já vem yyyy-MM-dd, então comparar string com hoje funciona (mesmo formato)
      if (dataStr > hoje) {
        Swal.showValidationMessage('A data de recebimento não pode ser futura.');
        return;
      }

      const codigoLista = (saida.codigo_transporte || '').trim();

        // valida se confere com o da listagem
        if (codigoLista && codigo_transporte !== codigoLista) {
          Swal.showValidationMessage('O código de transporte não confere. Verifique a Guia de saída.');
          return;
        }

      return {
        codigo_transporte,
        nome,
        cpf: this.limparCPF(cpf),
        data_recebimento: dataStr, // manda como yyyy-MM-dd (API pode tratar)
      };
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const payload = result.value;

      Swal.showLoading();

      this.saidaMateriaLService
        .finalizarTransporte(saida.id!, payload.data_recebimento, payload.nome, payload.cpf, payload.codigo_transporte)
        .subscribe({
          next: () => {
            // se quiser remover da lista:
            this.saidasMaterial = this.saidasMaterial.filter((x) => x.id !== saida.id);
            this.rerender();

            Swal.fire('Sucesso!', 'Transporte finalizado com sucesso.', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possível finalizar o transporte.', 'error');
          },
        });
    }
  });
}
}