import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { TipoCertidao } from '../_models/tipocertidao.model';
import { TipoCertidaoService } from '../_services/tipocertidao.service';

@Component({
  selector: 'app-tipo-certidao-listar',
  templateUrl: './tipo-certidao-listar.component.html',
  styleUrls: ['./tipo-certidao-listar.component.scss'],
})
export class TipoCertidaoListarComponent implements OnInit, OnDestroy {
  constructor(private tipoCertidaoService: TipoCertidaoService) {}

  tipoCertidaos: TipoCertidao[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.tipoCertidaoService.listarTodos().subscribe({
      next: (tipoCertidao) => {
        this.tipoCertidaos = tipoCertidao;
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
        this.tipoCertidaoService.deletar(id).subscribe({
          next: () => {
            this.tipoCertidaos = this.tipoCertidaos.filter((tipoCertidao) => tipoCertidao.id != id);
            Swal.fire('Excluído!', 'Tipo de certidão excluído!', 'success');
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

  public trackItem(index: number, item: TipoCertidao) {
    return item.id;
  }
}
