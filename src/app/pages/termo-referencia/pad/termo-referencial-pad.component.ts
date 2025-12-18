import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { dtOptions } from '@pages/shared/globals';
import { DataTableDirective } from 'angular-datatables';
import { TermoReferenciaService } from '../_services/termo-referencia.service';
import { EnumPermissaoStatusTermoReferencia } from '../_models/permissao-status-termo-referencia.model';
import { TermoReferenciaPAD } from '../_models/termo-referencia-pad.model';
import { ProcessoAdministrativo } from '@pages/processo-administrativo/_models/processo-administrativo.model';
import { ProcessoAdministrativoService } from '@pages/processo-administrativo/_services/processo-administrativo.service';
import { TermoReferenciaPADService } from '../_services/termo-referencia-pad.service';
import { ProcessoAdministrativoSDs } from '@pages/processo-administrativo/_models/processo-administrativo-sds.model';
import { Status } from '@pages/shared/models/fluxo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-termo-referencial-pad',
  templateUrl: './termo-referencial-pad.component.html',
})
export class TermoReferenciaPadComponent implements OnInit, OnDestroy {
  constructor(
    private termoReferenciaPadService: TermoReferenciaPADService,
    private termoReferenciaService: TermoReferenciaService,
    private processoAdministrativoService: ProcessoAdministrativoService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  termoReferenciaPA: TermoReferenciaPAD[];
  termoReferenciaPad: TermoReferenciaPAD;
  processoAdministrativos: ProcessoAdministrativo[];
  processoAdministrativoSDs: ProcessoAdministrativoSDs[];
  sdForm: FormGroup;
  id: number | null;
  dtTrigger = new Subject<any>();
  dtOptions: any = {};
  permissaoStatus: number[];

  selectedProcessoAdministrativo: number;
  inputPADisabled = true;

  ngOnInit(): void {
    console.log('PAD');
    this.dtOptions = dtOptions;
    this.id = this.termoReferenciaService.getRouteId();
    this.termoReferenciaPadService.consultarTermoReferenciaPorPad(this.id!).subscribe({
      next: (termoReferencia) => {
        if (termoReferencia) {
          this.inputPADisabled = true;
          this.processoAdministrativos = [termoReferencia];
          this.selectedProcessoAdministrativo = termoReferencia.pad_id!;
        } else {
          this.inputPADisabled = false;
          this.processoAdministrativoService.listarTodos().subscribe({
            next: (processoAdministrativos) => {
              this.processoAdministrativos = processoAdministrativos.filter(
                (pa) => pa.flstatus_id === Status.Autorizado
              );
            },
            error: () => {},
          });
        }
      },
      error: () => {},
    });

    this.termoReferenciaPadService.listarSdPorProcessoAdm(this.id!).subscribe({
      next: (TermoReferenciaPAD) => {
        this.termoReferenciaPA = TermoReferenciaPAD;
        this.dtTrigger.next(null);
      },
      error: () => {
        Swal.fire('Erro!', 'Processo administrativo já foi inserida.', 'error');
      },
    });

    this.termoReferenciaService.data$.forEach((data) => {
      this.permissaoStatus = data?.permissaoStatus!;
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  adicionar() {
    Swal.showLoading();
    const termoReferenciaPAD: TermoReferenciaPAD = {
      pad_id: this.selectedProcessoAdministrativo,
      termo_referencia_id: this.id!,
    };

    this.termoReferenciaPadService.criar(termoReferenciaPAD).subscribe({
      next: (cotacao) => {
        if (cotacao) {
          this.inputPADisabled = true;
          Swal.fire('Adicionado!', 'Processo administratitvo cadastrado!', 'success').then((result) => {
            if (result.value) {
              this.route
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => this.route.navigate(['termoreferencial', 'view', this.id!, 'pad']));
            }
          });
        } else {
          this.inputPADisabled = false;
        }
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  deletar(): void {
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
        this.termoReferenciaPadService.deletar(this.id!).subscribe({
          next: () => {
            this.inputPADisabled = false;
            Swal.fire('Excluído!', 'Processo administrativo excluído!', 'success').then(() => {
              this.route
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => this.route.navigate(['termoreferencial', 'view', this.id!, 'pad']));
            });
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir esse PA!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

  public trackItem(index: number, item: TermoReferenciaPAD) {
    return item.id;
  }

  public get enumPermissaoStatusTermoReferencia(): typeof EnumPermissaoStatusTermoReferencia {
    return EnumPermissaoStatusTermoReferencia;
  }
}
