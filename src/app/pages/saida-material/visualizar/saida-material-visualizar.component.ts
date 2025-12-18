import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@pages/shared/services/base.service';
import { combineLatestWith, Subscription } from 'rxjs';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { CentroCustoService } from '@pages/centro-custo/_services/centro-custo.service';
import { SolicitanteService } from '@pages/solicitante-material/_services/solicitante-material.service';
import { SetorService } from '@pages/setor/_services/setor.service';
import { SaidaMaterialService } from '../_services/saida-material.service';
import { UnidadeExternaService } from '@pages/unidade-externa/_services/unidade-externa.service';
import { SMDataEtapasHeader } from '../_models/saida-material-data.model';
import { CidadaoService } from '@pages/cidadao/_services/cidadao.service';

@Component({
  selector: 'app-saida-material-visualizar',
  templateUrl: './saida-material-visualizar.component.html',
})
export class SaidaMaterialVisualizarComponent implements OnInit, OnDestroy {
  constructor(
    private saidaMaterialService: SaidaMaterialService,
    private secretariaService: SecretariaFundoService,
    private almoxarifadoService: AlmoxarifadoService,
    private solicitanteService: SolicitanteService,
    private setorService: SetorService,
    private centroCustoService: CentroCustoService,
    private unidadeExternaService: UnidadeExternaService,
    private routeActive: ActivatedRoute,
    private baseService: BaseService,
    private cidadaoService: CidadaoService,
    private route: Router
  ) {}

  emQuantidade: SMDataEtapasHeader | null = null;
  visualizarForm: FormGroup;
  id: number;
  subscription1: Subscription;
  ready: boolean = false;
  flstatus_id: number | null = null;

  ngOnInit(): void {
    console.log('Visualizar');
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.saidaMaterialService.setRouteId(this.id);
    const saida$ = this.saidaMaterialService.consultarPorId(this.id);
    const secretaria$ = this.secretariaService.listarTodos();
    const almoxarifado$ = this.almoxarifadoService.listarTodos();
    const solicitante$ = this.solicitanteService.listarTodos();
    const setor$ = this.setorService.listarTodos();
    const centroCusto$ = this.centroCustoService.listarTodos();
    const unidadeExterna$ = this.unidadeExternaService.listarTodos();
    const cidadao$ = this.cidadaoService.listarTodos();
    const saidaQuantidade$ = this.saidaMaterialService.consultarSaidaQuantidade(this.id);

    this.subscription1 = saida$
      .pipe(
        combineLatestWith(
          secretaria$,
          solicitante$,
          setor$,
          centroCusto$,
          almoxarifado$,
          saidaQuantidade$,
          unidadeExterna$,
          cidadao$
        )
      )
      .subscribe(
        ([
          saida,
          secretaria,
          solicitante,
          setor,
          centrocusto,
          almoxarifado,
          saidaQuantidade,
          unidadeExterna,
          cidadao,
        ]) => {
          saida.data_solicitacao = this.baseService.formatDate(saida.data_solicitacao!);
          this.saidaMaterialService.setEtapasHeader(saidaQuantidade);
          this.saidaMaterialService.smDataEtapasHeader.subscribe((quantidade) => {
            this.emQuantidade = quantidade;
          });
          this.saidaMaterialService.setSaida({
            secretarias: secretaria,
            solicitantes: solicitante,
            almoxarifados: almoxarifado,
            setores: setor,
            centrosCusto: centrocusto,
            saidaMaterial: saida,
            unidadesExterna: unidadeExterna,
            //cidadaos: cidadao,
          });
          this.ready = true;
        }
      );
  }

  ngOnDestroy(): void {
    console.log('Destroy');
    this.saidaMaterialService.setEtapasHeader(null);
    // this.saidaMaterialService.setPA(null);
    this.saidaMaterialService.setRouteId(null);
    this.subscription1.unsubscribe();
  }
}
