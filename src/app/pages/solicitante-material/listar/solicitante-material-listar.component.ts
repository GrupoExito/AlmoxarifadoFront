import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { SolicitanteService } from '../_services/solicitante-material.service';
import { SolicitanteMaterial } from '../_models/solicitante-material.model';

@Component({
  selector: 'app-solicitante-material-listar',
  templateUrl: './solicitante-material-listar.component.html',
  styleUrls: ['./solicitante-material-listar.component.scss'],
})
export class SolicitanteListarComponent implements OnInit, OnDestroy {
  constructor(private solicitanteService: SolicitanteService) {}

  solicitantes: SolicitanteMaterial[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.solicitanteService.listarTodos().subscribe({
      next: (solicitante) => {
        this.solicitantes = solicitante;
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
      text: 'Este solicitante será desabilitado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#23b349',
      cancelButtonColor: '#eb2067',
    }).then((result) => {
      if (result.value) {
        this.solicitanteService.deletar(id).subscribe({
          next: () => {
            const item = this.solicitantes.find(s => s.id === id);
            if (item) item.ativo = 0;
            Swal.fire('Excluído!', 'Solicitante desabilitado!', 'success');
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

  public trackItem(index: number, item: SolicitanteMaterial) {
    return item.id;
  }
}
