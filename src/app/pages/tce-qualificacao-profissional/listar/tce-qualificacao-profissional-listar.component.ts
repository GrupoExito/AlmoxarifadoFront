import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { TceQualificacaoProfissional } from '../_models/tce-qualificacao-profissional.model';
import { TceQualificacaoProfissionalService } from '../_services/tce-qualificacao-profissional.service';

@Component({
  selector: 'app-tce-qualificacao-profissional-listar',
  templateUrl: './tce-qualificacao-profissional-listar.component.html',
  styleUrls: ['./tce-qualificacao-profissional-listar.component.scss'],
})
export class TceQualificacaoProfissionalListarComponent implements OnInit, OnDestroy {
  constructor(private tceQualificacaoProfissionalService: TceQualificacaoProfissionalService) {}

  tceQualificacaoProfissional: TceQualificacaoProfissional[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.tceQualificacaoProfissionalService.listarTodos().subscribe({
      next: (tceQualificacaoProfissional) => {
        this.tceQualificacaoProfissional = tceQualificacaoProfissional;
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
        this.tceQualificacaoProfissionalService.deletar(id).subscribe({
          next: () => {
            this.tceQualificacaoProfissional = this.tceQualificacaoProfissional.filter((tceQualificacaoProfissional) => tceQualificacaoProfissional.id != id);
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

  public trackItem(index: number, item: TceQualificacaoProfissional) {
    return item.id;
  }
}