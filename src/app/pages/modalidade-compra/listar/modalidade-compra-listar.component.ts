import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ModalidadeCompra } from '../_models/modalidade-compra.model';
import { ModalidadeCompraService } from '../_service/modalidade-compra.service';

@Component({
  selector: 'app-modalidade-compra-listar',
  templateUrl: './modalidade-compra-listar.component.html',
  styleUrls: ['./modalidade-compra-listar.component.scss'],
})
export class ModalidadeCompraListarComponent implements OnInit, OnDestroy {
  constructor(private modalidadeCompraService: ModalidadeCompraService) {}

  modalidadesCompra: ModalidadeCompra[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.modalidadeCompraService.listarTodos().subscribe({
      next: (ModalidadeCompra) => {
        this.modalidadesCompra = ModalidadeCompra;
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

  public trackItem(index: number, item: ModalidadeCompra) {
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
        this.modalidadeCompraService.deletar(id).subscribe({
          next: () => {
            this.modalidadesCompra = this.modalidadesCompra.filter((modalidadeCompra) => modalidadeCompra.id != id);
            Swal.fire('Excluído!', 'Modalidade excluída!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir esta modalidade!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }
}
