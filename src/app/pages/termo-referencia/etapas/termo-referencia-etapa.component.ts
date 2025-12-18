import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModeloDocumento } from '@pages/modelo-documento/_models/modelo-documento.model';
import { ModeloDocumentoService } from '@pages/modelo-documento/_services/modelo-documento.service';
import { RelatorioProcessoAdministrativoService } from '@pages/relatorio/_services/relatorio-processo-administrativo.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { FluxoService } from '@pages/shared/services/fluxo.service';
import { Status } from '@pages/shared/models/fluxo.model';
import { AuthService } from 'src/app/modules/auth';
import { FormBuilder } from '@angular/forms';
import { TermoReferenciaService } from '../_services/termo-referencia.service';
import { TRDataEtapasHeader } from '../_models/termo-referencia-data.model';
import { ImpressaoDocumentoTermoReferenciaDTO, TermoReferencia } from '../_models/termo-referencia.model';
import { TermoReferenciaFluxoComponent } from '../fluxo-termo-referencia/termo-referencia-fluxo.component';
import { TermoReferenciaHistoricoService } from '../_services/termo-referencia-historico.service';
import { ConfiguracaoOrganizacaoService } from '@pages/configuracao-organizacao/_services/configuracao-organizacao.service';

@Component({
  selector: 'app-termo-referencia-etapa',
  templateUrl: './termo-referencia-etapa.component.html',
  styleUrls: ['./termo-referencia-etapa.component.scss'],
})
export class TermoReferenciaEtapaComponent extends TermoReferenciaFluxoComponent implements OnInit {
  constructor(
    protected termoReferenciaService: TermoReferenciaService,
    protected modalService: NgbModal,
    protected fluxoService: FluxoService,
    protected route: Router,
    protected historicoService: TermoReferenciaHistoricoService,
    protected authService: AuthService,
    protected fb: FormBuilder,
    private modeloDocumentoService: ModeloDocumentoService,
    private relatorioService: RelatorioProcessoAdministrativoService,
    private configuracaoOrganizacaoService: ConfiguracaoOrganizacaoService
  ) {
    super(termoReferenciaService, modalService, fluxoService, route, historicoService, authService, fb);
  }

  trQuantidade: Partial<TRDataEtapasHeader> | null;
  termoReferencia: TermoReferencia;
  impressoes: ModeloDocumento[];
  selectedImpressao: number = 0;
  subscription1: Subscription;
  impressoInformacaoDotacao: boolean | undefined = false;

  ngOnInit(): void {
    console.log('Etapas');
    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }

    this.id = this.termoReferenciaService.getRouteId();
    this.termoReferenciaService.data$.subscribe((paData) => {
      this.termoReferencia = paData?.termoReferencia!;
      this.status = Status[paData?.termoReferencia.flstatus_id!];
      this.selectedSetor = paData?.termoReferencia.flsetor_id!;
      if (this.termoReferencia) {
        this.listarFluxo();
      }
    });

    this.consultarConfiguracaoImpresso();

    this.termoReferenciaService.dataEtapasHeader$.forEach((paDataHeader) => {
      this.trQuantidade = paDataHeader;
    });

    this.modeloDocumentoService.listarTodos().subscribe({
      next: (impressoes) => {
        this.impressoes = impressoes.filter((impressao) => impressao.tipo == '4');
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.fluxoService.listarSetorFluxo().subscribe({
      next: (setores) => {
        this.setores = setores;
      },
      error: (error) => {
        console.log(error);
      },
    });

    if (this.termoReferencia) {
      this.historicoService.listarTodos(this.id!).subscribe({
        next: (historico) => {
          this.historicos = historico;
          this.historicoRecente = this.historicos[this.historicos.length - 1]!;
          // this.selectedSetor = this.historicoRecente.flsetor_id!;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  open(content: any) {
    this.listarFluxo();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  imprimir() {
    Swal.showLoading();
    if (this.selectedImpressao == 0) {
      Swal.fire('Erro!', 'Selecione um documento', 'info');
      return;
    }

    const impressoTR: ImpressaoDocumentoTermoReferenciaDTO = {
      tr_id: this.id!,
      impressao_id: this.selectedImpressao,
      impressao_nome: 'Impresso Termo Referencia',
    };

    this.termoReferenciaService.downloadImpresso(impressoTR).subscribe({
      next: (res) => {
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Termo_referencia_' + this.id + '.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        Swal.close();
        Swal.fire('Sucesso!', 'Impressão gerada com sucesso!', 'success');
        this.modalService.dismissAll(0);
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  async consultarConfiguracaoImpresso(): Promise<void> {
    const parameters = {
      nome_tela: 'tr',
    };
    return new Promise((resolve, reject) => {
      this.configuracaoOrganizacaoService.ListarConfiguracao(parameters).subscribe({
        next: (configuracaoIA) => {
          this.impressoInformacaoDotacao = configuracaoIA.find(
            (impresso) => impresso.nome_campo == 'impresso_informacao_dotacao'
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
}
