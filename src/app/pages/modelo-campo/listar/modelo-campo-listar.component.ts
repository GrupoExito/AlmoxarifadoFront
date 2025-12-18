import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ModeloCampo } from '../_models/modelo-campo.model';
import { ModeloCampoService } from '../_services/modelo-campo.service';

@Component({
  selector: 'app-modelo-campo-listar',
  templateUrl: './modelo-campo-listar.component.html',
  styleUrls: ['./modelo-campo-listar.component.scss'],
})
export class ModeloCampoListarComponent implements OnInit, OnDestroy {
  constructor(private modeloCampoService: ModeloCampoService) {}

  modeloCampo: ModeloCampo[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.modeloCampoService.listarTodos().subscribe({
      next: (modeloCampo) => {
        this.modeloCampo = modeloCampo;
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

  public trackItem(index: number, item: ModeloCampo) {
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
        this.modeloCampoService.deletar(id).subscribe({
          next: () => {
            this.modeloCampo = this.modeloCampo.filter((modeloCampo) => modeloCampo.id != id);
            Swal.fire('Excluído!', 'modelo excluído!', 'success');
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
