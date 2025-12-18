import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { SituacaoProdutoServico } from '../_models/situacaoprodutoservico.model';
import { SituacaoProdutoServicoService } from '../_services/situacaoprodutoservico.service';

@Component({
  selector: 'app-situacao-produto-servico-listar',
  templateUrl: './situacao-produto-servico-listar.component.html',
  styleUrls: ['./situacao-produto-servico-listar.component.scss'],
})
export class SituacaoProdutoServicoListarComponent implements OnInit, OnDestroy {
  constructor(private situacaoProdutoServicoService: SituacaoProdutoServicoService) {}

  situacaoProdutoServicos: SituacaoProdutoServico[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.situacaoProdutoServicoService.listarTodos().subscribe({
      next: (situacaoProdutoServicos) => {
        this.situacaoProdutoServicos = situacaoProdutoServicos;
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

  public trackItem(index: number, item: SituacaoProdutoServico) {
    return item.id;
  }

  deletar(id: number): void {
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
        this.situacaoProdutoServicoService.deletar(id).subscribe({
          next: () => {
            this.situacaoProdutoServicos = this.situacaoProdutoServicos.filter(
              (situacaoProdutoServico) => situacaoProdutoServico.id != id
            );
            Swal.fire('Excluído!', 'Situação Produtos/Serviços excluída!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir esta Situação!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }
}
