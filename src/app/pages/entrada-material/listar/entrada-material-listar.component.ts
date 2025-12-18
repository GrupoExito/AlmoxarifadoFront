import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { EntradaMaterialService } from '../_services/entrada-material.service';
import { EntradaMaterial, ItemMovimentacao } from '../_models/entrada-material.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { FornecedorService } from '@pages/fornecedor/_services/fornecedor.service';
import { Fornecedor } from '@pages/fornecedor/_models/fornecedor.model';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { DataTableDirective } from 'angular-datatables';
import { ContratacaoService } from '@pages/contratacao/_services/contratacao.service';
import { StatusFluxo } from '@pages/shared/models/fluxo.model';
import { ConfiguracaoOrganizacaoService } from '@pages/configuracao-organizacao/_services/configuracao-organizacao.service';

@Component({
  selector: 'app-entrada-material-listar',
  templateUrl: './entrada-material-listar.component.html',
  styleUrls: ['./entrada-material-listar.component.scss'],
})
export class EntradaMateriaListarComponent implements OnInit, OnDestroy {
  constructor(
    private entradaMateriaLService: EntradaMaterialService,
    private secretaria: SecretariaFundoService,
    private almoxarifado: AlmoxarifadoService,
    private fornecedor: FornecedorService,
    private contratacaoService: ContratacaoService,
    private configuracaoOrganizacaoService: ConfiguracaoOrganizacaoService
  ) {}

  dtTrigger = new Subject<any>();
  dtOptions: any = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  entradasMaterial: EntradaMaterial[];
  secretarias: SecretariaFundo[];
  almoxarifados: Almoxarifado[];
  fornecedores: Fornecedor[];
  itensMovimentacao: ItemMovimentacao[];
  statusFluxo: StatusFluxo[];

  secretariaSelecionada: string = '';
  almoxarifadoSelecionado: string = '';
  fornecedorSelecionado: string = '';
  ItemSelecionado: string = '';
  Nota: string = '';
  idSelecionado: string = '';
  tipoSelecionado: string = '';
  statusSelecionado: string = '';
  dataInicialSelecionado: string = '';
  dataFinalSelecionado: string = '';
  filtroButton: boolean = false;
  filtroAccordion: boolean = false;
  usuario_id: number = 1;
  entradaMaterial: EntradaMaterial;
  entradaAlmoxarifadoUsuario: boolean | undefined = false;

  async ngOnInit(): Promise<void> {
    this.dtOptions = dtOptions;
    this.dtOptions.order = [2, 'asc'];
    await this.consultarConfiguracaoUsuario();

    if (this.entradaAlmoxarifadoUsuario) {
      this.entradaMateriaLService.listarPorUsuario(this.usuario_id).subscribe({
        next: (entradasMaterial) => {
          this.entradasMaterial = entradasMaterial;
          this.dtTrigger.next(null);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.entradaMateriaLService.listarTodos().subscribe({
        next: (entradasMaterial) => {
          this.entradasMaterial = entradasMaterial;
          this.dtTrigger.next(null);
          console.log(entradasMaterial, 'entradas');
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

  public trackItem(index: number, item: EntradaMaterial) {
    return item.id;
  }

  // deletar(id: number = 0): void {
  //   Swal.fire({
  //     title: 'Tem certeza?',
  //     text: 'Você não será capaz de recuperar esta informação!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Sim',
  //     cancelButtonText: 'Não',
  //     confirmButtonColor: '#23b349',
  //     cancelButtonColor: '#eb2067',
  //   }).then((result) => {
  //     if (result.value) {
  //       this.entradaMateriaLService.deletar(id,this.entradaMaterial.usuario_cancelamento_id!).subscribe({
  //         next: () => {
  //           this.entradasMaterial = this.entradasMaterial.filter((entradasMaterial) => entradasMaterial.id != id);
  //           Swal.fire('Excluído!', 'Entrada Material foi cancelada!', 'success');
  //         },
  //         error: () => {
  //           Swal.fire('Algo deu errado!', 'Não foi possivel excluir este Entrada Material!', 'error');
  //         },
  //       });
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire('Cancelado!', 'A informação está segura!', 'error');
  //     }
  //   });
  // }

 confirmar(id: number = 0): void {
     Swal.fire({
       title: 'Tem certeza?',
       text: 'Você não será capaz de adicionar itens!',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Sim',
       cancelButtonText: 'Não',
       confirmButtonColor: '#23b349',
       cancelButtonColor: '#eb2067',
     }).then((result) => {
       if (result.value) {
         this.entradaMateriaLService.alterarStatusEntradaMaterial(id,2).subscribe({
           next: () => {
             //this.entradasMaterial = this.entradasMaterial.filter((entradasMaterial) => entradasMaterial.id != id);
            const entrada = this.entradasMaterial.find(e => e.id === id);
            if (entrada) {
              entrada.status_id = 2;
              entrada.status = 'Confirmado';
            }

             Swal.fire('Confirmado!', 'Entrada Material foi confirmada!', 'success');
           },
           error: () => {
             Swal.fire('Algo deu errado!', 'Não foi possivel confirmar esta Entrada Material!', 'error');
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

    this.almoxarifado.listarTodos().subscribe({
      next: (almoxarifados) => {
        this.almoxarifados = almoxarifados;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.fornecedor.listarTodos().subscribe({
      next: (fornecedores) => {
        this.fornecedores = fornecedores;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.entradaMateriaLService.listarItemMovimentacao().subscribe({
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
      nota: this.Nota,
      fornecedor: this.fornecedorSelecionado,
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

    this.entradaMateriaLService.filtrar(parameters).subscribe({
      next: (entradaMaterial) => {
        this.entradasMaterial = entradaMaterial;
        this.rerender();
        Swal.close();
      },
      error: () => {
        Swal.fire('Algo deu errado!', 'Não foi possivel filtrar as Entradas!', 'error');
      },
    });
  }

  limparFiltros() {
    this.secretariaSelecionada = '';
    this.almoxarifadoSelecionado = '';
    this.ItemSelecionado = '';
    this.fornecedorSelecionado = '';
    this.idSelecionado = '';
    this.tipoSelecionado = '';
    this.statusSelecionado = '';
    this.dataInicialSelecionado = '';
    this.dataFinalSelecionado = '';
  }

  async consultarConfiguracaoUsuario(): Promise<void> {
    const parameters = {
      nome_tela: 'entrada_almoxarifado',
    };

    return new Promise((resolve, reject) => {
      this.configuracaoOrganizacaoService.ListarConfiguracao(parameters).subscribe({
        next: (configuracaoUsuario) => {
          this.entradaAlmoxarifadoUsuario = configuracaoUsuario.find(
            (usuario) => usuario.nome_campo == 'entrada_almoxarifado_usuario'
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
