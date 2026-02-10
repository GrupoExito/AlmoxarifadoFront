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

  }

  public trackItem(index: number, item: SecretariaFundo) {
    return item.id;
  }
}
