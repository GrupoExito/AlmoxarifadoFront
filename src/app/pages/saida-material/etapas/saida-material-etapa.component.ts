import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModeloDocumento } from '@pages/modelo-documento/_models/modelo-documento.model';
import { ModeloDocumentoService } from '@pages/modelo-documento/_services/modelo-documento.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { SetorFluxo, StatusFluxo } from '@pages/shared/models/fluxo.model';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { SaidaMaterialService } from '../_services/saida-material.service';
import { SaidaMaterial } from '../_models/saida-material.model';
import { SaidaMaterialHistoricoService } from '../_services/saida-material-historico.service';
import { SaidaMaterialHistorico } from '../_models/saida-material-historico.model';
import { DocumentoSaida, ImpressaoDocumentoSaida } from '@pages/relatorio/_models/relatorio-saida-material.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { BaseService } from '@pages/shared/services/base.service';
import { SMDataEtapasHeader } from '../_models/saida-material-data.model';
import { SaidaMaterialItemService } from '../_services/saida-material-itens.service';
import { SaidaMaterialItem } from '../_models/saida-material-itens.model';
import { Router } from '@angular/router';
import { FiltroRelatorioDTO } from '@pages/relatorio/_models/relatorio-entrada-material.model';

@Component({
  selector: 'app-saida-material-etapa',
  templateUrl: './saida-material-etapa.component.html',
  styleUrls: ['./saida-material-etapa.component.scss'],
})
export class SaidaMaterialEtapaComponent implements OnInit {
  constructor(
    private saidaMaterialService: SaidaMaterialService,
    private saidaMaterialItemService: SaidaMaterialItemService,
    private modalService: NgbModal,
    private modeloDocumentoService: ModeloDocumentoService,
    private relatorioService: RelatorioAlmoxarifadoService,
    private authService: AuthService,
    private saidaHistoricoService: SaidaMaterialHistoricoService,
    private baseService: BaseService,
    private route: Router
  ) {}

  token: AuthToken | null;
  eMQuantidade: SMDataEtapasHeader | null = null;
  saidaMaterial: SaidaMaterial;
  saidaMaterialItem: SaidaMaterialItem[];
  id: number | null = null;
  status: string | null = '-';
  closeResult = '';
  impressoes: ModeloDocumento[];
  selectedImpressao: number = 0;
  selectedStatus: number = 0;
  selectedSetor: number = 0;
  statusExterno: boolean = false;
  setores: SetorFluxo[];
  statusFluxos: StatusFluxo[];
  observacao: string = '';
  subscription1: Subscription;
  usuario_id: number = 1;
  saidaRecente: SaidaMaterialHistorico;
  valorTotalSaida: number;

  ngOnInit(): void {
    console.log('Etapas');
    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }
    this.id = this.saidaMaterialService.getRouteId();

    this.saidaMaterialService.data$.subscribe((emdata) => {
      this.saidaMaterial = emdata?.saidaMaterial!;
    });

    this.modeloDocumentoService.listarTodos().subscribe({
      next: (impressoes) => {
        this.impressoes = impressoes.filter((impressao) => impressao.tipo == '4');
      },
      error: (error) => {
        console.log(error);
      },
    });

    if (this.id) {
      this.saidaHistoricoService.listarTodos(this.id!).subscribe({
        next: (historico) => {
          this.saidaRecente = historico[historico.length - 1]!;
        },
        error: (error) => {
          console.log(error);
        },
      });

      this.saidaMaterialService.dataEtapasHeader$.subscribe((quantidade) => {
        this.eMQuantidade = quantidade;
        console.log(quantidade, 'quantidade header');
      });
    }

    this.saidaMaterialItemService.listarItemPorSaida(this.id!).subscribe({
      next: (saidaMaterialItem) => {
        this.saidaMaterialItem = saidaMaterialItem;
        this.calcvalorTotalSaida();
        this.saidaMaterialService.smDataEtapasHeader.next({
          quantidade_itens: saidaMaterialItem.length,
          valorTotal: this.valorTotalSaida,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });

    console.log(this.eMQuantidade, 'eMQuantidade');
    console.log(this.saidaMaterial, 'saidaMaterial');
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
      //impressao_nome: DocumentoSaida[enumPos],
      id: this.id!,
    };
    if (this.selectedImpressao == 0) {
      Swal.fire('Erro!', 'Selecione um documento', 'info');
      return;
    }
    this.relatorioService.downloadSaida(documento).subscribe({
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

  calcvalorTotalSaida() {
    if (this.saidaMaterialItem) {
      this.valorTotalSaida = this.saidaMaterialItem.reduce((accumulator, object) => {
        return accumulator + object.valor! * object.quantidade!;
      }, 0);
    } else {
      this.valorTotalSaida = 0;
    }
  }

  duplicarSaida() {
    this.saidaMaterialService.duplicarSaida(this.id!).subscribe({
      next: () => {
        Swal.fire('Sucesso!', 'Saída duplicada', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/saidamaterial/listar']);
          }
        });
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
