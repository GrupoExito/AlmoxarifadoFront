/* eslint-disable prettier/prettier */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { dtOptions } from '@pages/shared/globals';
import { DataTableDirective } from 'angular-datatables';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { TermoReferenciaService } from '../_services/termo-referencia.service';
import { TermoReferencia } from '../_models/termo-referencia.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-termo-referencia-listar',
  templateUrl: './termo-referencia-listar.component.html',
  styleUrls: ['./termo-referencia-listar.component.scss'],
})
export class TermoReferenciaListarComponent implements OnInit, OnDestroy {
  constructor(
    private termoReferenciaService: TermoReferenciaService,
    private secretariaService: SecretariaFundoService,
    private authService: AuthService,
    private route: Router
  ) {}

  token: AuthToken | null;
  dtTrigger = new Subject<any>();
  dtOptions: any = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  @ViewChild('acc') acc: NgbAccordion;
  termoreferencia: TermoReferencia[];
  usuario_id: number = 1;
  filtroAccordion: boolean = false;
  filtroButton: boolean = false;
  exercicios: Exercicio[];
  exercicioSelecionado: string = '';
  exercicioSDSelecionado: string = '';
  secretarias: SecretariaFundo[];
  secretariaSDSelecionada: string = '';
  numeroSelecionado: string = '';
  dataInicialSelecionado: string = '';
  dataFinalSelecionado: string = '';
  sdSelecionada: string = '';
  objetoSelecionado: string = '';
  statusSelecionado: string = '';
  numeroPASelecionado: string = '';

  ngOnInit(): void {
    console.log('Listar');
    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }

    this.dtOptions = dtOptions;
    this.termoReferenciaService.listarTodos().subscribe({
      next: (sd) => {
        this.termoreferencia = sd;
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
        this.termoReferenciaService.deletar(id).subscribe({
          next: () => {
            this.termoreferencia = this.termoreferencia.filter((sd) => sd.id != id);
            Swal.fire('Excluído!', 'TR excluído!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir esse TR!', 'error');
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

    this.termoReferenciaService.listarTodosExercicio().subscribe({
      next: (exercicios) => {
        this.exercicios = exercicios;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.secretariaService.listarTodos().subscribe({
      next: (secretarias) => {
        this.secretarias = secretarias;
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
      exercicio: this.exercicioSelecionado,
      numero: this.numeroSelecionado,
      exercicioSD: this.exercicioSDSelecionado,
      secretariaSD: this.secretariaSDSelecionada,
      sd: this.sdSelecionada,
      data_inicial:
        data_inicial[0] != ''
          ? data_inicial[2] + '-' + data_inicial[1] + '-' + data_inicial[0]
          : this.dataInicialSelecionado,
      data_final:
        data_final[0] != '' ? data_final[2] + '-' + data_final[1] + '-' + data_final[0] : this.dataFinalSelecionado,
      objeto: this.objetoSelecionado,
      status: this.statusSelecionado,
      numeroPA: this.numeroPASelecionado,
    };

    this.termoReferenciaService.filtrar(parameters).subscribe({
      next: (TR) => {
        this.termoreferencia = TR;
        this.rerender();
        Swal.close();
      },
      error: () => {
        Swal.fire('Algo deu errado!', 'Não foi possivel filtrar TRs!', 'error');
      },
    });
  }

  limparFiltros() {
    this.exercicioSelecionado = '';
    this.numeroSelecionado = '';
    this.exercicioSDSelecionado = '';
    this.secretariaSDSelecionada = '';
    this.sdSelecionada = '';
    this.dataInicialSelecionado = '';
    this.dataFinalSelecionado ='';
    this.objetoSelecionado = '';
    this.statusSelecionado = '';
  }

  doubleClickRedicionar(termoreferencia: TermoReferencia) {
    this.route.navigate(['/termoreferencial/view', termoreferencia.id, 'cadastro']);
  }

  public trackItem(index: number, item: TermoReferencia) {
    return item.id;
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
