import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FluxoService } from '../../shared/services/fluxo.service';
import {
  SetorFluxo,
  FluxoEntidade,
  Status,
  StatusFluxo,
  StatusTransicaoTermoReferencia,
  StatusDisponiveisTermoReferencia,
  FluxoTermoReferencia,
} from '@pages/shared/models/fluxo.model';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TermoReferenciaService } from '../_services/termo-referencia.service';
import { TermoReferencia } from '../_models/termo-referencia.model';
import { TermoReferenciaHistoricoService } from '../_services/termo-referencia-historico.service';
import { TermoReferenciaHistorico } from '../_models/termo-referencia-historico.model';

@Component({
  selector: 'app-termo-referencia-fluxo',
  templateUrl: './termo-referencia-fluxo.component.html',
  styleUrls: ['./termo-referencia-fluxo.component.scss'],
})
export class TermoReferenciaFluxoComponent implements OnInit {
  constructor(
    protected termoReferenciaService: TermoReferenciaService,
    protected modalService: NgbModal,
    protected fluxoService: FluxoService,
    protected route: Router,
    protected historicoService: TermoReferenciaHistoricoService,
    protected authService: AuthService,
    protected fb: FormBuilder
  ) {}

  token: AuthToken | null;
  termoReferencia: TermoReferencia | undefined;
  id: number | null = null;
  status: string | null = '-';
  statusExterno: boolean = false;
  historicoRecente: TermoReferenciaHistorico | undefined;
  selectedSetor: number = 0;
  selectedStatusTermoReferencia: number = 0;
  alterarStatus: number = 0;
  gerarPendencia: number = 0;
  observacao: string = '';
  setores: SetorFluxo[];
  usuario_id: number = 1;
  historicos: TermoReferenciaHistorico[];
  historico_id: number = 0;
  historicoForm: FormGroup;
  statusFluxos: StatusFluxo[];

  ngOnInit(): void {
    console.log('Fluxo');
  }

  listarFluxo() {
    this.fluxoService.listarStatusFluxo().subscribe({
      next: (statusFluxos) => {
        const todosStatus = Object.values(StatusDisponiveisTermoReferencia);
        const statusAtual = todosStatus.find((value) => value == this.status);

        if (statusAtual) {
          const transicoesValidas = this.listarTransicoesStatusValidas(statusAtual);
          this.statusFluxos = statusFluxos.filter((value) =>
            Object.values(transicoesValidas).toString().includes(value.descricao)
          );
        } else {
          const status: StatusFluxo = {
            id: this.termoReferencia?.flstatus_id,
            descricao: this.status!,
          };
          this.statusFluxos = [status];
          this.selectedStatusTermoReferencia = this.termoReferencia?.flstatus_id ?? 0;
          this.statusExterno = true;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  listarTransicoesStatusValidas(statusAtual: StatusDisponiveisTermoReferencia): StatusDisponiveisTermoReferencia[] {
    return StatusTransicaoTermoReferencia[statusAtual];
  }

  public get enumStatus(): typeof Status {
    return Status;
  }

  open(content: any, historico_id: number) {
    this.historico_id = historico_id;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  enviarTr() {
    Swal.showLoading();

    if (this.alterarStatus == 1 && this.selectedStatusTermoReferencia == 0) {
      Swal.fire('Erro!', 'Selecione o status', 'error');
      return;
    }

    if (this.selectedSetor == 0) {
      Swal.fire('Erro!', 'Selecione o setor', 'error');
      return;
    }
    if (this.gerarPendencia == 1) {
      Swal.fire('Atenção!', 'Adicione observação para gerar pendência', 'warning');
      return;
    }
    
    const fluxo: FluxoTermoReferencia = {
      termo_referencia_id: this.id!,
      gusuario_id: this.usuario_id,
      observacao: this.observacao,
      status_id: this.alterarStatus ? this.selectedStatusTermoReferencia : this.termoReferencia?.flstatus_id!,
      setor_id: this.selectedSetor,
      entidade: FluxoEntidade.TermoReferencia,
      pendencia: !!this.gerarPendencia,
    };

    this.fluxoService.alterarStatusOuSetor(fluxo).subscribe({
      next: () => {
        this.route
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.route.navigate(['/termoreferencial/view', this.id!, 'historico']));
        this.modalService.dismissAll(0);
        Swal.fire('Sucesso!', 'Status ou Setor alterado', 'success');
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  solucionarPendencia() {
    Swal.showLoading();

    if (this.selectedSetor == 0) {
      Swal.fire('Erro!', 'Selecione o setor', 'error');
      return;
    }

    const fluxo: FluxoTermoReferencia = {
      termo_referencia_id: this.id!,
      gusuario_id: this.usuario_id,
      observacao: this.observacao,
      status_id: this.alterarStatus ? this.selectedStatusTermoReferencia : this.termoReferencia?.flstatus_id!,
      setor_id: this.selectedSetor,
      entidade: FluxoEntidade.TermoReferencia,
      pendencia: !!this.gerarPendencia,
      pendencia_resolvida: true,
      tr_historico_pai: this.historico_id,
    };

    this.fluxoService.solucionarPendencia(fluxo).subscribe({
      next: () => {
        this.historicoService.listarTodos(this.id!).subscribe({
          next: (historico) => {
            this.route
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.route.navigate(['/termoreferencial/view', this.id!, 'historico']));
            this.modalService.dismissAll(0);
            this.historicos = historico;
            Swal.fire('Sucesso!', 'Status ou Setor alterado', 'success');
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  criar() {
    Swal.showLoading();
    const termoReferenciaHistorico: TermoReferenciaHistorico = {
      termo_referencia_id: this.id!,
      historico: this.historicoForm.get('historico')!.value,
      gusuario_id: this.usuario_id,
      pendencia: !!this.gerarPendencia,
      flstatus_id: this.termoReferencia?.flstatus_id!,
      flsetor_id: this.historicos[this.historicos.length - 1].flsetor_id!,
    };

    this.historicoService.salvarObservacao(termoReferenciaHistorico).subscribe({
      next: () => {
        Swal.fire('Criado!', 'Observação adicionada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.historicoService.listarTodos(this.id!).subscribe({
              next: (historico) => {
                this.historicoForm.controls.historico.setValue('');
                this.historicos = historico;
                this.termoReferenciaService.setEtapasHeader({ quantidade_historico: historico.length });
              },
              error: (error) => {
                console.log(error);
              },
            });
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
