import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { UnidadeMedida } from '../_models/unidademedida.model';
import { UnidadeMedidaService } from '../_services/unidademedida.service';
import { dtOptions } from '@shared/globals';

@Component({
  selector: 'app-unidade-medida-listar',
  templateUrl: './unidade-medida-listar.component.html',
  styleUrls: ['./unidade-medida-listar.component.scss'],
})
export class UnidadeMedidaListarComponent implements OnInit, OnDestroy {
  constructor(private unidadeMedidaService: UnidadeMedidaService) {}

  unidadeMedidas: UnidadeMedida[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.unidadeMedidaService.listarTodos().subscribe({
      next: (unidadeMedidas) => {
        this.unidadeMedidas = unidadeMedidas;
        this.dtTrigger.next(null);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public trackItem(index: number, item: UnidadeMedida) {
    return item.id;
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
        this.unidadeMedidaService.deletar(id).subscribe({
          next: () => {
            this.unidadeMedidas = this.unidadeMedidas.filter((unidadeMedida) => unidadeMedida.id != id);
            Swal.fire('Excluído!', 'Unidade de medida excluída!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir esta unidade de medida!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }
}
