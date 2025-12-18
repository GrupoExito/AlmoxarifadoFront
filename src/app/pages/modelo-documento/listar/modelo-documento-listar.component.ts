import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ModeloDocumento, TipoModelo } from '../_models/modelo-documento.model';
import { ModeloDocumentoService } from '../_services/modelo-documento.service';

@Component({
  selector: 'app-modelo-documento-listar',
  templateUrl: './modelo-documento-listar.component.html',
  styleUrls: ['./modelo-documento-listar.component.scss'],
})
export class ModeloDocumentoListarComponent implements OnInit, OnDestroy {
  constructor(private modeloDocumentoService: ModeloDocumentoService) {}

  modeloDocumento: ModeloDocumento[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.modeloDocumentoService.listarTodos().subscribe({
      next: (modeloDocumento) => {
        this.modeloDocumento = modeloDocumento;
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

  public trackItem(index: number, item: ModeloDocumento) {
    return item.id;
  }

  visualizarTipo(id: string): string {
    const tipo = parseInt(id, 10);
    return TipoModelo[tipo];
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
        this.modeloDocumentoService.deletar(id).subscribe({
          next: () => {
            this.modeloDocumento = this.modeloDocumento.filter((modelo) => modelo.id != id);
            Swal.fire('Excluído!', 'Modelo excluído!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir este modelo!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }
}
