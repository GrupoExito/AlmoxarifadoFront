import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Municipio } from '../_models/municipio.model';
import { MunicipioService } from '../_services/municipio.service';

@Component({
  selector: 'app-municipio-listar',
  templateUrl: './municipio-listar.component.html',
  styleUrls: ['./municipio-listar.component.scss'],
})
export class MunicipioListarComponent implements OnInit, OnDestroy {
  constructor(private municipioService: MunicipioService) {}

  municipios: Municipio[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.municipioService.listarTodos().subscribe({
      next: (municipios) => {
        this.municipios = municipios;
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
        this.municipioService.deletar(id).subscribe({
          next: () => {
            this.municipios = this.municipios.filter((municipio) => municipio.id != id);
            Swal.fire('Excluído!', 'Município excluído!', 'success');
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

  public trackItem(index: number, item: Municipio) {
    return item.id;
  }
}
