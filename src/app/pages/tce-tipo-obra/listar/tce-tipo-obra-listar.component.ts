import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { TceTipoObraService } from '../_services/tce-tipo-obra.service';
import { TceTipoObra } from '../_models/tce-tipo-obra.model';


@Component({
  selector: 'app-tce-tipo-obra-listar',
  templateUrl: './tce-tipo-obra-listar.component.html',
  styleUrls: ['./tce-tipo-obra-listar.component.scss'],
})
export class TceTipoObraListarComponent implements OnInit, OnDestroy {
  constructor(private tceTipoObraService: TceTipoObraService) {}

  tceTipoObra: TceTipoObra[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.tceTipoObraService.listarTodos().subscribe({
      next: (tceTipoObra) => {
        this.tceTipoObra = tceTipoObra;
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
        this.tceTipoObraService.deletar(id).subscribe({
          next: () => {
            this.tceTipoObra = this.tceTipoObra.filter((tceTipoObra) => tceTipoObra.id != id);
            Swal.fire('Excluído!', 'Tipo Obra excluído!', 'success');
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

  public trackItem(index: number, item: TceTipoObra) {
    return item.id;
  }
}