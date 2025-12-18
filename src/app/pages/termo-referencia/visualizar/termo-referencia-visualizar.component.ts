import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@pages/shared/services/base.service';
import { combineLatestWith, Subscription } from 'rxjs';
import { TermoReferenciaService } from '../_services/termo-referencia.service';
import { TRDataEtapasHeader } from '../_models/termo-referencia-data.model';
import { SetorService } from '@pages/setor/_services/setor.service';
import { ModeloDocumentoService } from '@pages/modelo-documento/_services/modelo-documento.service';
import { Status, StatusDisponiveisTermoReferencia } from '@pages/shared/models/fluxo.model';
import { PermissaoStatusTermoReferencia } from '../_models/permissao-status-termo-referencia.model';

@Component({
  selector: 'app-termo-referencia-visualizar',
  templateUrl: './termo-referencia-visualizar.component.html',
})
export class TermoReferenciaVisualizarComponent implements OnInit, OnDestroy {
  constructor(
    private termoReferenciaService: TermoReferenciaService,
    private routeActive: ActivatedRoute,
    private baseService: BaseService,
    private setorService: SetorService,
    private modeloDocumentoService: ModeloDocumentoService,
    private route: Router
  ) {}

  trQuantidade: TRDataEtapasHeader | null = null;
  visualizarForm: FormGroup;
  id: number;
  subscription1: Subscription;
  ready: boolean = false;
  flstatus_id: number | null = null;

  ngOnInit(): void {
    console.log('Visualizar');
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.termoReferenciaService.setRouteId(this.id);
    const tr$ = this.termoReferenciaService.consultarTermoReferencia(this.id);
    const exercicio$ = this.termoReferenciaService.listarTodosExercicio();
    const setor$ = this.setorService.listarTodos();
    const modelo$ = this.modeloDocumentoService.listarTodos();
    const trQuantidade$ = this.termoReferenciaService.consultartrQuantidade(this.id);

    this.subscription1 = tr$
      .pipe(combineLatestWith(exercicio$, trQuantidade$, setor$, modelo$))
      .subscribe(([tr, exercicios, trQuantidade, setor, modelo]) => {
        tr.data_tr = this.baseService.formatDate(tr.data_tr!);
        this.flstatus_id = tr.flstatus_id!;

        this.termoReferenciaService.setTR({
          exercicios: exercicios,
          termoReferencia: tr,
          setores: setor,
          modelos: modelo,
          permissaoStatus: this.listarPermissaoStatus(),
        });

        this.termoReferenciaService.trDataEtapasHeader.next(trQuantidade);
        this.ready = true;
      });
  }

  listarPermissaoStatus() {
    const todosStatus = Status[this.flstatus_id!];
    const todosPossiveisDFD = Object.values(StatusDisponiveisTermoReferencia);
    const statusAtual = todosPossiveisDFD.find((value) => value == todosStatus);
    if (!statusAtual) {
      return [];
    }
    return PermissaoStatusTermoReferencia[statusAtual!];
  }

  ngOnDestroy(): void {
    console.log('Destroy');
    this.termoReferenciaService.setEtapasHeader(null);
    this.termoReferenciaService.setTR(null);
    this.termoReferenciaService.setRouteId(null);
    this.subscription1.unsubscribe();
  }
}
