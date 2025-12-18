import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { TipoProduto } from '../_models/tipoproduto.model';
import { TipoProdutoService } from '../_services/tipoproduto.service';

@Component({
  selector: 'app-tipo-produto-listar',
  templateUrl: './tipo-produto-listar.component.html',
  styleUrls: ['./tipo-produto-listar.component.scss'],
})
export class TipoProdutoListarComponent implements OnInit, OnDestroy {
  constructor(private tipoProdutoService: TipoProdutoService) {}

  tipoProdutos: TipoProduto[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.tipoProdutoService.listarTodos().subscribe({
      next: (tipoProdutos) => {
        this.tipoProdutos = tipoProdutos;
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

  public trackItem(index: number, item: TipoProduto) {
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
        this.tipoProdutoService.deletar(id).subscribe({
          next: () => {
            this.tipoProdutos = this.tipoProdutos.filter((tipoProduto) => tipoProduto.id != id);
            Swal.fire('Excluído!', 'Tipos Produtos/Servições excluído!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir este Tipo de Produto!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }
}
