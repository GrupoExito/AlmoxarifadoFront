import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UnidadeMedida } from '../_models/unidademedida.model';
import { UnidadeMedidaService } from '../_services/unidademedida.service';

@Component({
  selector: 'app-unidade-medida-editar',
  templateUrl: './unidade-medida-editar.component.html',
  styleUrls: ['./unidade-medida-editar.component.scss'],
})
export class UnidadeMedidaEditarComponent implements OnInit {
  unidadeMedida: UnidadeMedida;
  editarUnidadeMedidaForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private unidadeMedidaService: UnidadeMedidaService,
    private routeActive: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarUnidadeMedidaForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(30)]],
      sigla: ['', [Validators.required, Validators.maxLength(3)]],
      descricao_banco_preco: ['', [Validators.required, Validators.maxLength(20)]],
    });

    this.unidadeMedidaService.consultarPorId(this.id).subscribe({
      next: (unidadeMedida) => {
        this.editarUnidadeMedidaForm.patchValue(unidadeMedida);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const unidadeMedida: UnidadeMedida = {
      id: this.id,
      descricao: this.editarUnidadeMedidaForm.get('descricao')!.value,
      sigla: this.editarUnidadeMedidaForm.get('sigla')!.value,
      descricao_banco_preco: this.editarUnidadeMedidaForm.get('descricao_banco_preco')!.value,
    };
    this.unidadeMedidaService.editar(this.id, unidadeMedida).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Unidade de medida atualizada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/unidademedida/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
