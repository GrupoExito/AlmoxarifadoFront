import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModeloDocumentoService } from '@pages/modelo-documento/_services/modelo-documento.service';
import { Subscription } from 'rxjs';
import { FluxoService } from '@pages/shared/services/fluxo.service';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { AlmoxarifadoService } from '../_services/almoxarifado.service';
import { ADataEtapasHeader, Almoxarifado } from '../_models/almoxarifado.model';

@Component({
  selector: 'app-almoxarifado-etapa',
  templateUrl: './almoxarifado-etapa.component.html',
  styleUrls: ['./almoxarifado-etapa.component.scss'],
})
export class AlmoxarifadoEtapaComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  token: AuthToken | null;
  aQuantidade: ADataEtapasHeader | null = null;
  almoxarifado: Almoxarifado;
  id: number | null = null;
  closeResult = '';
  subscription1: Subscription;
  usuario_id: number = 1;

  ngOnInit(): void {
    console.log('Etapas');
    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }

    this.id = this.almoxarifadoService.getRouteId();

    this.almoxarifadoService.dataEtapasHeader$.subscribe((quantidade) => {
      this.aQuantidade = quantidade;
      console.log(quantidade, 'quantidade header');
    });

    this.almoxarifadoService.dataEtapasHeader$.subscribe((quantidade) => {
      this.aQuantidade = quantidade;
      console.log(quantidade, 'quantidade header');
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
}
