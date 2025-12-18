import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Orgao } from '../_models/orgao.model';
import { OrgaoService } from '../_services/orgao.service';

@Component({
  selector: 'app-orgao-listar',
  templateUrl: './orgao-listar.component.html',
  styleUrls: ['./orgao-listar.component.scss'],
})
export class OrgaoListarComponent implements OnInit, OnDestroy {
  constructor(private orgaoService: OrgaoService) {}

  orgaos: Orgao[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.orgaoService.listarTodos().subscribe({
      next: (orgaos) => {
        this.orgaos = orgaos;
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

  public trackItem(index: number, item: Orgao) {
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
        this.orgaoService.deletar(id).subscribe({
          next: () => {
            this.orgaos = this.orgaos.filter((orgao) => orgao.id != id);
            Swal.fire('Excluído!', 'Órgão excluído!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possível excluir este órgão!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  nomeTipoPoder(id: string): string {
    switch (id) {
      case '1':
        return 'Legislativo';
      case '2':
        return 'Executivo';
      case '3':
        return 'Executivo - Fundo';
      default:
        return '';
    }
  }
}
