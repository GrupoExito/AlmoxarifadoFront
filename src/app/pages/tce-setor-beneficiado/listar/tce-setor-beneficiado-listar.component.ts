import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { TceSetorBeneficiadoService } from '../_services/tce-setor-beneficiado.service';
import { TceSetorBeneficiado } from '../_models/tce-setor-beneficiado.model';


@Component({
  selector: 'app-tce-setor-beneficiado-listar',
  templateUrl: './tce-setor-beneficiado-listar.component.html',
  styleUrls: ['./tce-setor-beneficiado-listar.component.scss'],
})
export class TceSetorBeneficiadoListarComponent implements OnInit, OnDestroy {
  constructor(private tceSetorBeneficiadoService: TceSetorBeneficiadoService) {}

  tceSetorBeneficiado: TceSetorBeneficiado[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.tceSetorBeneficiadoService.listarTodos().subscribe({
      next: (tceSetorBeneficiado) => {
        this.tceSetorBeneficiado = tceSetorBeneficiado;
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
        this.tceSetorBeneficiadoService.deletar(id).subscribe({
          next: () => {
            this.tceSetorBeneficiado = this.tceSetorBeneficiado.filter((tceSetorBeneficiado) => tceSetorBeneficiado.id != id);
            Swal.fire('Excluído!', 'Setor Beneficiado excluído!', 'success');
          },
          error: (err) => {
            Swal.fire('Algo deu errado!', err.error.message, 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  public trackItem(index: number, item: TceSetorBeneficiado) {
    return item.id;
  }
}