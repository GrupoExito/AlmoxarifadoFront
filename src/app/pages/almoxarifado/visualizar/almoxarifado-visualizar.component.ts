import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@pages/shared/services/base.service';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { ADataEtapasHeader } from '../_models/almoxarifado.model';

@Component({
  selector: 'app-almoxarifado-visualizar',
  templateUrl: './almoxarifado-visualizar.component.html',
})
export class AlmoxarifadoVisualizarComponent implements OnInit, OnDestroy {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private routeActive: ActivatedRoute,
    private baseService: BaseService,
    private route: Router
  ) {}

  aQuantidade: ADataEtapasHeader | null = null;
  visualizarForm: FormGroup;
  id: number;
  ready: boolean = false;

  ngOnInit(): void {
    console.log('Visualizar');
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.almoxarifadoService.setRouteId(this.id);

    this.almoxarifadoService.consultarPorId(this.id).subscribe({
      next: (almoxarifado) => {
        this.almoxarifadoService.setAlmoxarifado({
          almoxarifados: almoxarifado,
        });
        this.ready = true;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnDestroy(): void {
    console.log('Destroy');
    this.almoxarifadoService.setRouteId(null);
  }
}
