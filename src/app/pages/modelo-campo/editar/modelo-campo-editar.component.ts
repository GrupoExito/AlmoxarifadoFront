import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@pages/shared/services/base.service';
import Swal from 'sweetalert2';
import { ModeloCampo } from '../_models/modelo-campo.model';
import { ModeloCampoService } from '../_services/modelo-campo.service';

@Component({
  selector: 'app-modelo-campo-editar',
  templateUrl: './modelo-campo-editar.component.html',
  styleUrls: ['./modelo-campo-editar.component.scss'],
})
export class ModeloCampoEditarComponent implements OnInit {
  modeloCampo: ModeloCampo;
  editarModeloCampoForm: FormGroup;
  id: number;
  tipo: number = 2;

  constructor(
    private fb: FormBuilder,
    private modeloCampoService: ModeloCampoService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarModeloCampoForm = this.fb.group({
      tipo: ['', [Validators.required, Validators.maxLength(5)]],
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      nome_tabela_view: ['', [Validators.required, Validators.maxLength(50)]],
      campo_resultado: ['', [Validators.required, Validators.maxLength(25)]],
      campo_filtro: ['', [Validators.required, Validators.maxLength(25)]],
      alinhamento: ['', [Validators.maxLength(50)]],
      formatacao: ['', [Validators.maxLength(50)]],
      coluna_view: ['', [Validators.maxLength(200)]],
      coluna_arquivo: ['', [Validators.maxLength(200)]],
    });

    this.modeloCampoService.consultarPorId(this.id).subscribe({
      next: (modelocampo) => {
        this.editarModeloCampoForm.patchValue(modelocampo);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  Lista() {
    if (this.tipo == 2) {
      this.editarModeloCampoForm.controls.coluna_arquivo.setValue('');
      this.editarModeloCampoForm.controls.coluna_view.setValue('');
      this.editarModeloCampoForm.controls.alinhamento.setValue('');
      this.editarModeloCampoForm.controls.formatacao.setValue('');
    }
  }

  editar() {
    Swal.showLoading();
    const modeloCampo: ModeloCampo = {
      id: this.id,
      tipo: this.editarModeloCampoForm.get('tipo')!.value,
      titulo: this.editarModeloCampoForm.get('titulo')!.value,
      nome_tabela_view: this.editarModeloCampoForm.get('nome_tabela_view')!.value,
      campo_resultado: this.editarModeloCampoForm.get('campo_resultado')!.value,
      campo_filtro: this.editarModeloCampoForm.get('campo_filtro')!.value,
      alinhamento: this.editarModeloCampoForm.get('alinhamento')!.value,
      formatacao: this.editarModeloCampoForm.get('formatacao')!.value,
      coluna_arquivo: this.editarModeloCampoForm.get('coluna_arquivo')!.value,
      coluna_view: this.editarModeloCampoForm.get('coluna_view')!.value,
    };

    console.log(modeloCampo);

    this.modeloCampoService.editar(this.id, modeloCampo).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Modelo atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/modelocampo/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
