import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Endereco } from '../_models/endereco.model';
import { EnderecoService } from '../_services/endereco.service';
import { dtOptions } from '@shared/globals';

@Component({
  selector: 'app-endereco-listar',
  templateUrl: './endereco-listar.component.html',
})
export class EnderecoListarComponent implements OnInit, OnDestroy {
  constructor(private bairroService: EnderecoService) {}

  enderecos: Endereco[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.bairroService.listarTodos().subscribe({
      next: (endereco) => {
        this.enderecos = endereco;
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
        this.bairroService.deletar(id).subscribe({
          next: () => {
            this.enderecos = this.enderecos.filter((endereco) => endereco.id != id);
            Swal.fire('Excluído!', 'Endereco excluído!', 'success');
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

  public trackItem(index: number, item: Endereco) {
    return item.id;
  }
}
