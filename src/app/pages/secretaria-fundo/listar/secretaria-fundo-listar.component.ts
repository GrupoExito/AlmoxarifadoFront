import { Component, OnDestroy, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { SecretariaFundo } from '../_models/secretaria-fundo.model';
import { SecretariaFundoService } from '../_services/secretaria-fundo.service';

@Component({
  selector: 'app-secretaria-fundo-listar',
  templateUrl: './secretaria-fundo-listar.component.html',
  styleUrls: ['./secretaria-fundo-listar.component.scss'],
})
export class SecretariaFundoListarComponent implements OnInit, OnDestroy {
  constructor(private secretariaFundoService: SecretariaFundoService) {}

  secretariaFundos: SecretariaFundo[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.secretariaFundoService.listarTodos().subscribe({
      next: (secretariaFundos) => {
        this.secretariaFundos = secretariaFundos;
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
        this.secretariaFundoService.deletar(id).subscribe({
          next: () => {
            this.secretariaFundos = this.secretariaFundos.filter((secretariaFundo) => secretariaFundo.id != id);
            Swal.fire('Excluído!', 'Secretaria/Fundo excluída!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir esta secretaria/fundo!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  public trackItem(index: number, item: SecretariaFundo) {
    return item.id;
  }
}
