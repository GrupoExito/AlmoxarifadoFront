import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { TceTipoServicoService } from '../_services/tce-tipo-servico.service';
import { TceTipoServico } from '../_models/tce-tipo-servico.model';

@Component({
  selector: 'app-tce-tipo-servico-listar',
  templateUrl: './tce-tipo-servico-listar.component.html',
  styleUrls: ['./tce-tipo-servico-listar.component.scss'],
})
export class TceTipoServicoListarComponent implements OnInit, OnDestroy {
  constructor(private tceTipoServicoService: TceTipoServicoService) {}

  tceTipoServico: TceTipoServico[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.tceTipoServicoService.listarTodos().subscribe({
      next: (tceTipoServico) => {
        this.tceTipoServico = tceTipoServico;
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
        this.tceTipoServicoService.deletar(id).subscribe({
          next: () => {
            this.tceTipoServico = this.tceTipoServico.filter((tceTipoServico) => tceTipoServico.id != id);
            Swal.fire('Excluído!', 'Tipo Serviço excluído!', 'success');
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

  public trackItem(index: number, item: TceTipoServico) {
    return item.id;
  }
}