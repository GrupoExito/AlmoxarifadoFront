import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import { TipoObjetoService } from '../_services/tipo-objeto.service';
import { TipoObjeto } from '@pages/solicitacao-despesa/_models/tipo-objeto.model';
import { TipoObjetoDTO } from '../_models/tipo-objeto.model';

@Component({
  selector: 'app-tipo-objeto-listar',
  templateUrl: './tipo-objeto-listar.component.html',
  styleUrls: ['./tipo-objeto-listar.component.scss'],
})
export class TipoObjetoListarComponent implements OnInit, OnDestroy {
  constructor(private tiposObjetoservice: TipoObjetoService) {}

  tiposObjeto: TipoObjetoDTO[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.dtOptions.order = [2, 'asc'];

    this.tiposObjetoservice.listarTodos().subscribe({
      next: (tiposObjeto) => {
        this.tiposObjeto = tiposObjeto;
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

  public trackItem(index: number, item: TipoObjetoDTO) {
    return item.id;
  }

  // deletar(id: number = 0): void {
  //   Swal.fire({
  //     title: 'Tem certeza?',
  //     text: 'Você não será capaz de recuperar esta informação!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Sim',
  //     cancelButtonText: 'Não',
  //     confirmButtonColor: '#23b349',
  //     cancelButtonColor: '#eb2067',
  //   }).then((result) => {
  //     if (result.value) {
  //       this.tiposObjetoservice.deletar(id).subscribe({
  //         next: () => {
  //           this.tiposObjeto = this.tiposObjeto.filter((tipo)Objeto => tipo.Objetoid != id);
  //           Swal.fire('Excluído!', 'TipoObjeto excluído!', 'success');
  //         },
  //         error: () => {
  //           Swal.fire('Algo deu errado!', 'Não foi possivel excluir este tipo!Objeto', 'error');
  //         },
  //       });
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire('Cancelado!', 'A informação está segura!', 'error');
  //     }
  //   });
  // }
}
