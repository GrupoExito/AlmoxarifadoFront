import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { SubFuncaoGoverno } from '../_models/subfuncaogoverno.model';
import { SubFuncaoGovernoService } from '../_services/subfuncaogoverno.service';

@Component({
  selector: 'app-sub-funcao-governo-listar',
  templateUrl: './sub-funcao-governo-listar.component.html',
  styleUrls: ['./sub-funcao-governo-listar.component.scss'],
})
export class SubFuncaoGovernoListarComponent implements OnInit, OnDestroy {
  constructor(private subfuncaoGovernoService: SubFuncaoGovernoService) {}

  subfuncoesGoverno: SubFuncaoGoverno[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.subfuncaoGovernoService.listarTodos().subscribe({
      next: (SubFuncoesGoverno) => {
        this.subfuncoesGoverno = SubFuncoesGoverno;
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

  public trackItem(index: number, item: SubFuncaoGoverno) {
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
        this.subfuncaoGovernoService.deletar(id).subscribe({
          next: () => {
            this.subfuncoesGoverno = this.subfuncoesGoverno.filter((subfuncaoGoverno) => subfuncaoGoverno.id != id);
            Swal.fire('Excluído!', 'Subfunção de governo excluída!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir esta Subfunção de governo!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }
}
