import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Banco } from '../_models/banco.model';
import { BancoService } from '../_services/banco.service';

@Component({
  selector: 'app-banco-listar',
  templateUrl: './banco-listar.component.html',
  styleUrls: ['./banco-listar.component.scss'],
})
export class BancoListarComponent implements OnInit, OnDestroy {
  constructor(private bancoService: BancoService) {}

  bancos: Banco[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.dtOptions.order = [2, 'asc'];

    this.bancoService.listarTodos().subscribe({
      next: (bancos) => {
        this.bancos = bancos;
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

  public trackItem(index: number, item: Banco) {
    return item.id;
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
        this.bancoService.deletar(id).subscribe({
          next: () => {
            this.bancos = this.bancos.filter((banco) => banco.id != id);
            Swal.fire('Excluído!', 'Banco excluído!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir este banco!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }
}
