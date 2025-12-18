import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Setor } from '../_models/setor.model';
import { SetorService } from '../_services/setor.service';

@Component({
  selector: 'app-setor-listar',
  templateUrl: './setor-listar.component.html',
  styleUrls: ['./setor-listar.component.scss'],
})
export class SetorListarComponent implements OnInit, OnDestroy {
  constructor(private setorService: SetorService) {}

  setores: Setor[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.setorService.listarTodos().subscribe({
      next: (setores) => {
        this.setores = setores;
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
        this.setorService.deletar(id).subscribe({
          next: () => {
            this.setores = this.setores.filter((setor) => setor.id != id);
            Swal.fire('Excluído!', 'Setor excluído!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir este setor!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  public trackItem(index: number, item: Setor) {
    return item.id;
  }
}
