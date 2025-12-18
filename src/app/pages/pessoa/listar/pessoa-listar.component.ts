import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Pessoa } from '../_models/pessoa.model';
import { PessoaService } from '../_services/pessoa.service';

@Component({
  selector: 'app-pessoa-listar',
  templateUrl: './pessoa-listar.component.html',
  styleUrls: ['./pessoa-listar.component.scss'],
})
export class PessoaListarComponent implements OnInit, OnDestroy {
  constructor(private pessoaService: PessoaService) {}

  pessoas: Pessoa[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.pessoaService.listarTodos().subscribe({
      next: (pessoas) => {
        this.pessoas = pessoas;
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
        this.pessoaService.deletar(id).subscribe({
          next: () => {
            this.pessoas = this.pessoas.filter((pessoa) => pessoa.id != id);
            Swal.fire('Excluído!', 'Pessoa excluído!', 'success');
          },
          error: (err) => {
            Swal.fire({
              title: 'Algo deu errado!',
              icon: 'error',
              html: err.error.message,
            });
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  public trackItem(index: number, item: Pessoa) {
    return item.id;
  }
}
