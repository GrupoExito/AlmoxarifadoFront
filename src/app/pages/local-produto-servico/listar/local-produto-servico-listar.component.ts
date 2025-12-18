import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { LocalProdutoServico } from '../_models/localprodutoservico.model';
import { LocalProdutoServicoService } from '../_services/localprodutoservico.service';

@Component({
  selector: 'app-local-produto-servico-listar',
  templateUrl: './local-produto-servico-listar.component.html',
  styleUrls: ['./local-produto-servico-listar.component.scss'],
})
export class LocalProdutoServicoListarComponent implements OnInit, OnDestroy {
  constructor(private localprodutoservicoService: LocalProdutoServicoService) {}

  locaisprodutoservico: LocalProdutoServico[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.localprodutoservicoService.listarTodos().subscribe({
      next: (locaisprodutoservico) => {
        this.locaisprodutoservico = locaisprodutoservico;
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

  public trackItem(index: number, item: LocalProdutoServico) {
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
        this.localprodutoservicoService.deletar(id).subscribe({
          next: () => {
            this.locaisprodutoservico = this.locaisprodutoservico.filter(
              (localprodutoservico) => localprodutoservico.id != id
            );
            Swal.fire('Excluído!', 'Local de Produto e Serviço excluído!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir este Local de Produto e Serviço!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }
}
