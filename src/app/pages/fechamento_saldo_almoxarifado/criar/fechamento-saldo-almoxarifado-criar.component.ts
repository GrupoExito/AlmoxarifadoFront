import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FechamentoSaldoAlmoxarifado } from '../_models/fechamento-saldo-almoxarifado.model';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { FechamentoSaldoAlmoxarifadoService } from '../_services/fechamento-saldo-almoxarifado.service';


@Component({
  selector: 'app-fechamento-saldo-almoxarifado-criar',
  templateUrl: './fechamento-saldo-almoxarifado-criar.component.html',
  styleUrls: ['./fechamento-saldo-almoxarifado-criar.component.scss'],
})
export class FechamentoSaldoAlmoxarifadoCriarComponent implements OnInit {
  fechamentoSaldoAlmoxarifado: FechamentoSaldoAlmoxarifado;
  criarFechamentoSaldoAlmoxarifadoForm: FormGroup;

  constructor(private fb: FormBuilder, private service: FechamentoSaldoAlmoxarifadoService, private almoxarifadoService: AlmoxarifadoService, private route: Router) {}

  ngOnInit(): void {
    this.criarFechamentoSaldoAlmoxarifadoForm = this.fb.group({
      data_fechamento: ['', [Validators.required]],
    });
  }

  criar() {
    Swal.showLoading();
    const fechamento: FechamentoSaldoAlmoxarifado = {
      data_fechamento: this.criarFechamentoSaldoAlmoxarifadoForm.get('data_fechamento')!.value,
      mais_atual: true,
    };
    this.service.criar(fechamento).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Fechamento de Saldo de Almoxarifado criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/fechamento-saldo-almoxarifado']);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
