import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Cidadao } from '../_models/cidadao.model';
import { CidadaoService } from '../_services/cidadao.service';
import { dtOptions } from '@shared/globals';

@Component({
  selector: 'app-cidadao-listar',
  templateUrl: './cidadao-listar.component.html',
  styleUrls: ['./cidadao-listar.component.scss'],
})
export class CidadaoListarComponent implements OnInit, OnDestroy {
  constructor(private cidadaoService: CidadaoService) {}

  cidadaos: Cidadao[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.cidadaoService.listarTodos().subscribe({
      next: (cidadaos) => {
        this.cidadaos = cidadaos;
        console.log(cidadaos, 'cidadaos');
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
        this.cidadaoService.deletar(id).subscribe({
          next: () => {
            this.cidadaos = this.cidadaos.filter((cidadao) => cidadao.id != id);
            Swal.fire('Excluído!', 'Cidadao excluído!', 'success');
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

  public trackItem(index: number, item: Cidadao) {
    return item.id;
  }
}
