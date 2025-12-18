import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ModeloPlanejamento } from '../_models/modelo-planejamento.model';
import { ModeloPlanejamentoService } from '../_services/modelo-planejamento.service';

@Component({
  selector: 'app-modelo-planejamento-listar',
  templateUrl: './modelo-planejamento-listar.component.html',
  styleUrls: ['./modelo-planejamento-listar.component.scss'],
})
export class ModeloPlanejamentoListarComponent implements OnInit, OnDestroy {
  constructor(private modeloPlanejamentoService: ModeloPlanejamentoService) {}

  modelosPlanejamento: ModeloPlanejamento[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.modeloPlanejamentoService.listarTodos().subscribe({
      next: (modelosPlanejamento) => {
        this.modelosPlanejamento = modelosPlanejamento;
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

  public trackItem(index: number, item: ModeloPlanejamento) {
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
        this.modeloPlanejamentoService.deletar(id).subscribe({
          next: () => {
            this.modelosPlanejamento = this.modelosPlanejamento.filter(
              (modeloPlanejamento) => modeloPlanejamento.id != id
            );
            Swal.fire('Excluído!', 'Modelo planejamento excluído!', 'success');
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
}
