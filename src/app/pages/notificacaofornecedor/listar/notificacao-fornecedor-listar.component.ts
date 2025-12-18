import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NotificacaoFornecedorService } from '../_services/notificacao-fornecedor.service';
import { NotificacaoFornecedor } from '../_models/notificacao-fornecedor.model';
import { Fornecedor } from '@pages/fornecedor/_models/fornecedor.model';
import { FornecedorService } from '@pages/fornecedor/_services/fornecedor.service';

@Component({
  selector: 'app-notificacao-fornecedor-listar',
  templateUrl: './notificacao-fornecedor-listar.component.html',
  styleUrls: ['./notificacao-fornecedor-listar.component.scss'],
})
export class NotificacaoFornecedorListarComponent implements OnInit, OnDestroy {
  constructor(private notificacaoFornecedorService: NotificacaoFornecedorService,
    private fornecedorService:FornecedorService
  ) {}

  fornecedores: Fornecedor[];
  notificacaoFornecedores: NotificacaoFornecedor[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.fornecedorService.listarTodos().subscribe({
      next: (fornecedores) => {
        this.fornecedores = fornecedores;
        this.dtTrigger.next(null);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.notificacaoFornecedorService.listarTodos().subscribe({
      next: (notificacaoFornecedores) => {
        this.notificacaoFornecedores = notificacaoFornecedores;
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
      text: 'Esta notificação será excluída!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#23b349',
      cancelButtonColor: '#eb2067',
    }).then((result) => {
      if (result.value) {
        this.notificacaoFornecedorService.deletar(id).subscribe({
          next: () => {
            const item = this.notificacaoFornecedores.find(s => s.id === id);
            this.notificacaoFornecedores.splice(this.notificacaoFornecedores.indexOf(item!), 1);
            Swal.fire('Excluído!', 'Notificação excluída!', 'success');
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

  public trackItem(index: number, item: NotificacaoFornecedor) {
    return item.id;
  }
}
