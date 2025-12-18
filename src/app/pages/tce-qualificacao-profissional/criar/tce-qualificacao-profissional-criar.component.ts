import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TceQualificacaoProfissional } from '../_models/tce-qualificacao-profissional.model';
import { TceQualificacaoProfissionalService } from '../_services/tce-qualificacao-profissional.service';

@Component({
  selector: 'app-tce-qualificacao-profissional-criar',
  templateUrl: './tce-qualificacao-profissional-criar.component.html',
  styleUrls: ['tce-qualificacao-profissional-criar.component.scss'],
})
export class TceQualificacaoProfissionalCriarComponent implements OnInit {
  TceQualificacaoProfissional: TceQualificacaoProfissional;
  criarTceQualificacaoProfissionalForm: FormGroup;

  constructor(private fb: FormBuilder, private tceQualificacaoProfissionalService: TceQualificacaoProfissionalService, private route: Router) {}

  ngOnInit(): void {
    this.criarTceQualificacaoProfissionalForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  criar() {
    Swal.showLoading();
    const TceQualificacaoProfissional: TceQualificacaoProfissional = {
      descricao: this.criarTceQualificacaoProfissionalForm.get('descricao')!.value,
    };
    this.tceQualificacaoProfissionalService.criar(TceQualificacaoProfissional).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Qualificação Profissional criada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/tceQualificacaoProfissional/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}

