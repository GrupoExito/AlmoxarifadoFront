import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UnidadeMedida } from '../_models/unidademedida.model';
import { UnidadeMedidaService } from '../_services/unidademedida.service';

@Component({
  selector: 'app-unidade-medida-criar',
  templateUrl: './unidade-medida-criar.component.html',
  styleUrls: ['./unidade-medida-criar.component.scss'],
})
export class UnidadeMedidaCriarComponent implements OnInit {
  unidadeMedida: UnidadeMedida;
  criarUnidadeMedidaForm: FormGroup;

  constructor(private fb: FormBuilder, private unidadeMedidaService: UnidadeMedidaService, private route: Router) {}

  ngOnInit(): void {
    this.criarUnidadeMedidaForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(30)]],
      sigla: ['', [Validators.required, Validators.maxLength(3)]],
      descricao_banco_preco: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  criar() {
    Swal.showLoading();
    const unidadeMedida: UnidadeMedida = {
      descricao: this.criarUnidadeMedidaForm.get('descricao')!.value,
      sigla: this.criarUnidadeMedidaForm.get('sigla')!.value,
      descricao_banco_preco: this.criarUnidadeMedidaForm.get('descricao_banco_preco')!.value,
    };
    this.unidadeMedidaService.criar(unidadeMedida).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Unidade de medida criada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/unidademedida/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
