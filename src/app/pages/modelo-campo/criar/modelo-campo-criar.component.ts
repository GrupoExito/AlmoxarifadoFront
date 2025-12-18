import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModeloCampo } from '../_models/modelo-campo.model';
import { ModeloCampoService } from '../_services/modelo-campo.service';

@Component({
  selector: 'app-modelo-campo-criar',
  templateUrl: './modelo-campo-criar.component.html',
  styleUrls: ['./modelo-campo-criar.component.scss'],
})
export class ModeloCampoCriarComponent implements OnInit {
  modelocampo: ModeloCampo;
  criarModeloCampoForm: FormGroup;
  tipo: number = 0;

  constructor(private fb: FormBuilder, private modeloCampoService: ModeloCampoService, private route: Router) {}

  ngOnInit(): void {
    this.criarModeloCampoForm = this.fb.group({
      tipo: [''],
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      nome_tabela_view: ['', [Validators.required, Validators.maxLength(50)]],
      campo_resultado: ['', [Validators.required, Validators.maxLength(25)]],
      campo_filtro: ['', [Validators.required, Validators.maxLength(25)]],
      alinhamento: ['', [Validators.maxLength(50)]],
      formatacao: ['', [Validators.maxLength(50)]],
      coluna_view: ['', [Validators.maxLength(200)]],
      coluna_arquivo: ['', [Validators.maxLength(200)]],
    });
  }

  Lista() {
    if (this.tipo == 2) {
      this.criarModeloCampoForm.controls.coluna_arquivo.setValue('');
      this.criarModeloCampoForm.controls.coluna_view.setValue('');
      this.criarModeloCampoForm.controls.alinhamento.setValue('');
      this.criarModeloCampoForm.controls.formatacao.setValue('');
    }
  }

  criar() {
    Swal.showLoading();
    const modeloCampo: ModeloCampo = {
      tipo: this.criarModeloCampoForm.get('tipo')!.value,
      titulo: this.criarModeloCampoForm.get('titulo')!.value,
      nome_tabela_view: this.criarModeloCampoForm.get('nome_tabela_view')!.value,
      campo_resultado: this.criarModeloCampoForm.get('campo_resultado')!.value,
      campo_filtro: this.criarModeloCampoForm.get('campo_filtro')!.value,
      alinhamento: this.criarModeloCampoForm.get('alinhamento')!.value,
      formatacao: this.criarModeloCampoForm.get('formatacao')!.value,
      coluna_view: this.criarModeloCampoForm.get('coluna_view')!.value,
      coluna_arquivo: this.criarModeloCampoForm.get('coluna_arquivo')!.value,
    };
    console.log(modeloCampo);

    this.modeloCampoService.criar(modeloCampo).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Modelo criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/modelocampo/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
