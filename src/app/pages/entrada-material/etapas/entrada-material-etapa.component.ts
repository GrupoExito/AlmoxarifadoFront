import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModeloDocumento } from '@pages/modelo-documento/_models/modelo-documento.model';
import { ModeloDocumentoService } from '@pages/modelo-documento/_services/modelo-documento.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { FluxoService } from '@pages/shared/services/fluxo.service';
import { SetorFluxo, StatusFluxo } from '@pages/shared/models/fluxo.model';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { EntradaMaterialService } from '../_services/entrada-material.service';
import { EMDataEtapasHeader } from '../_models/entrada-material-data.model';
import { EntradaMaterial } from '../_models/entrada-material.model';
import { EntradaMaterialHistoricoService } from '../_services/entrada-material-historico.service';
import { EntradaMaterialHistorico } from '../_models/entrada-material-historico.model';
import { FiltroRelatorioDTO } from '@pages/relatorio/_models/relatorio-entrada-material.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { BaseService } from '@pages/shared/services/base.service';
import { EntradaMaterialItemService } from '../_services/entrada-material-itens.service';
import { EntradaMaterialItem } from '../_models/entrada-material-itens.model';


@Component({
  selector: 'app-entrada-material-etapa',
  templateUrl: './entrada-material-etapa.component.html',
  styleUrls: ['./entrada-material-etapa.component.scss'],
})
export class EntradaMaterialEtapaComponent implements OnInit, OnDestroy {
  constructor(
    private entradaMaterialService: EntradaMaterialService,
    private entradaMaterialItemService: EntradaMaterialItemService,
    private entradaHistoricoService: EntradaMaterialHistoricoService,
    private modalService: NgbModal,
    private modeloDocumentoService: ModeloDocumentoService,
    private relatorioService: RelatorioAlmoxarifadoService,
    private fluxoService: FluxoService,
    private route: Router,
    private authService: AuthService,
    private baseService: BaseService
  ) {}

  subHeader?: Subscription;
  token: AuthToken | null;
  eMQuantidade: EMDataEtapasHeader | null = null;
  entradaMaterial: EntradaMaterial | null = null;
  entradaMaterialItem: EntradaMaterialItem[];
  id: number | null = null;
  status: string | null = '-';
  closeResult = '';
  impressoes: ModeloDocumento[];
  entradaRecente: EntradaMaterialHistorico;
  selectedImpressao: number = 0;
  selectedStatus: number = 0;
  selectedSetor: number = 0;
  statusExterno: boolean = false;
  setores: SetorFluxo[];
  statusFluxos: StatusFluxo[];
  observacao: string = '';
  subscription1: Subscription;
  usuario_id: number = 1;
  valorTotalEntrada: number;

  ngOnInit(): void {
    console.log('Etapas');
    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }

    this.id = this.entradaMaterialService.getRouteId();

    console.log('ID da entrada de material:', this.id);

this.subHeader = this.entradaMaterialService.emDataEtapasHeader.subscribe((h) => {
  if (!h) return;

  // atualiza o objeto que o HTML usa
  this.eMQuantidade = {
    ...(this.eMQuantidade ?? ({} as any)),
    ...h,
  };
});


    this.entradaMaterialService.consultarPorId(this.id!).subscribe({
      next: (entrada) => {
        this.entradaMaterial = entrada;
      },
    });

    /*this.modeloDocumentoService.listarTodos().subscribe({
      next: (impressoes) => {
        this.impressoes = impressoes.filter((impressao) => impressao.tipo == '4');
      },
      error: (error) => {
        console.log(error);
      },
    });*/

    if (this.id) {
      this.entradaHistoricoService.listarTodos(this.id!).subscribe({
        next: (historico) => {
          this.entradaRecente = historico[historico.length - 1]!;
        },
        error: (error) => {
          console.log(error);
        },
      });

      this.entradaMaterialService.consultarEntradaQuantidade(this.id!).subscribe((quantidade) => {
        this.eMQuantidade = quantidade;
      });

    }

    this.entradaMaterialItemService.listarItemPorEntrada(this.id!).subscribe({
      next: (entradaMaterialItem) => {
        this.entradaMaterialItem = entradaMaterialItem;
        this.calcvalorTotalEntrada();
        this.entradaMaterialService.emDataEtapasHeader.next({
          quantidade_itens: entradaMaterialItem.length,
          valorTotal: this.valorTotalEntrada,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  imprimir() {
    Swal.showLoading();
    const enumPos = Number(this.selectedImpressao) - 1;
    let documento: FiltroRelatorioDTO = {
      //impressao_id: this.selectedImpressao,
      //impressao_nome: DocumentoEntrada[enumPos],
      id: this.id!,
    };
    if (this.selectedImpressao == 0) {
      Swal.fire('Erro!', 'Selecione um documento', 'info');
      return;
    }
    this.relatorioService.downloadEntrada(documento).subscribe({
      next: (res) => {
        this.baseService.relatorioMensagemModoImpressao(res);
        this.modalService.dismissAll(0);
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  calcvalorTotalEntrada() {
    if (this.entradaMaterialItem) {
      this.valorTotalEntrada = this.entradaMaterialItem.reduce((accumulator, object) => {
        return accumulator + object.valor_unitario! * object.quantidade!;
      }, 0);
    } else {
      this.valorTotalEntrada = 0;
    }
  }

  ngOnDestroy(): void {
    this.subHeader?.unsubscribe();
  }
}
