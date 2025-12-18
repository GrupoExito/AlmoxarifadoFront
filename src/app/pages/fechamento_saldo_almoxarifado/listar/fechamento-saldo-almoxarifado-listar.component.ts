import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FechamentoSaldoAlmoxarifadoService } from '../_services/fechamento-saldo-almoxarifado.service';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { FechamentoSaldoAlmoxarifado } from '../_models/fechamento-saldo-almoxarifado.model';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';

@Component({
  selector: 'app-fechamento-saldo-almoxarifado-listar',
  templateUrl: './fechamento-saldo-almoxarifado-listar.component.html',
  styleUrls: ['./fechamento-saldo-almoxarifado-listar.component.scss'],
})
export class FechamentoSaldoAlmoxarifadoListarComponent implements OnInit, OnDestroy {
  constructor(private service: FechamentoSaldoAlmoxarifadoService,
    private almoxarifadoService:AlmoxarifadoService
  ) {}

  almoxarifados: Almoxarifado[];
  fechamentoSaldoAlmoxarifado: FechamentoSaldoAlmoxarifado[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.almoxarifadoService.listarTodos().subscribe({
      next: (almoxarifados) => {
        this.almoxarifados = almoxarifados;
        this.dtTrigger.next(null);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.service.listarTodos().subscribe({
      next: (item) => {
        this.fechamentoSaldoAlmoxarifado = item;
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

  detalhar(id: number = 0): void {
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
        /*this.notificacaoFornecedorService.deletar(id).subscribe({
          next: () => {
            const item = this.notificacaoFornecedores.find(s => s.id === id);
            this.notificacaoFornecedores.splice(this.notificacaoFornecedores.indexOf(item!), 1);
            Swal.fire('Excluído!', 'Notificação excluída!', 'success');
          },
          error: (err) => {
            Swal.fire('Algo deu errado!', err.error.message, 'error');
          },
        });*/
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  public trackItem(index: number, item: FechamentoSaldoAlmoxarifado) {
    return item.id;
  }
}
