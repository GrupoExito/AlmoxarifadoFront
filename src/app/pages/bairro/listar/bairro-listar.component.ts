import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Bairro } from '../_models/bairro.model';
import { BairroService } from '../_services/bairro.service';
import { dtOptions } from '@shared/globals';

@Component({
  selector: 'app-bairro-listar',
  templateUrl: './bairro-listar.component.html',
  styleUrls: ['./bairro-listar.component.scss'],
})
export class BairroListarComponent implements OnInit, OnDestroy {
  constructor(private bairroService: BairroService) {}

  bairros: Bairro[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.bairroService.listarTodos().subscribe({
      next: (bairros) => {
        this.bairros = bairros;
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
        this.bairroService.deletar(id).subscribe({
          next: () => {
            this.bairros = this.bairros.filter((bairro) => bairro.id != id);
            Swal.fire('Excluído!', 'Bairro excluído!', 'success');
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

  public trackItem(index: number, item: Bairro) {
    return item.id;
  }
}
