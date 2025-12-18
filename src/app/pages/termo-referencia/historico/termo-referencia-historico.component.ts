import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FluxoService } from '@pages/shared/services/fluxo.service';
import { Status } from '@pages/shared/models/fluxo.model';
import { TermoReferenciaService } from '../_services/termo-referencia.service';
import { TermoReferenciaFluxoComponent } from '../fluxo-termo-referencia/termo-referencia-fluxo.component';
import { TermoReferenciaHistoricoService } from '../_services/termo-referencia-historico.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-termo-referencia-historico',
  templateUrl: './termo-referencia-historico.component.html',
})
export class TermoReferenciaHistoricoComponent extends TermoReferenciaFluxoComponent implements OnInit {
  constructor(
    protected termoReferenciaService: TermoReferenciaService,
    protected modalService: NgbModal,
    protected fluxoService: FluxoService,
    protected route: Router,
    protected historicoService: TermoReferenciaHistoricoService,
    protected authService: AuthService,
    protected fb: FormBuilder
  ) {
    super(termoReferenciaService, modalService, fluxoService, route, historicoService, authService, fb);
  }

  ngOnInit(): void {
    console.log('Histórico');
    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }

    this.id = this.termoReferenciaService.getRouteId();

    this.historicoForm = this.fb.group({
      historico: ['', [Validators.required]],
      pendencia: [],
    });

    this.termoReferenciaService.data$.subscribe((trData) => {
      this.termoReferencia = trData?.termoReferencia!;
      this.status = Status[trData?.termoReferencia.flstatus_id!];
      this.selectedSetor = trData?.termoReferencia.flsetor_id!;
      this.listarFluxo();
    });

    this.fluxoService.listarSetorFluxo().subscribe({
      next: (setores) => {
        this.setores = setores;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.historicoService.listarTodos(this.id!).subscribe({
      next: (historico) => {
        this.historicos = historico;
        console.log(historico);
        this.historicoRecente = this.historicos[this.historicos.length - 1]!;
        this.selectedSetor = this.historicoRecente.flsetor_id!;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
