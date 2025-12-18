import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SolicitanteMaterial } from '../_models/solicitante-material.model';
import { SolicitanteService } from '../_services/solicitante-material.service';

@Component({
  selector: 'app-solicitante-material-criar',
  templateUrl: './solicitante-material-criar.component.html',
  styleUrls: ['./solicitante-material-criar.component.scss'],
})
export class SolicitanteCriarComponent implements OnInit {
  solicitante: SolicitanteMaterial;
  criarSolicitanteForm: FormGroup;

  constructor(private fb: FormBuilder, private solicitanteService: SolicitanteService, private route: Router) {}

  ngOnInit(): void {
    this.criarSolicitanteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      cpf: ['', [Validators.required, Validators.maxLength(15)]],
      rg: ['', [Validators.maxLength(15)]],
      telefone: ['', [Validators.maxLength(15)]],
    });
  }

  criar() {
    Swal.showLoading();
    const solicitante: SolicitanteMaterial = {
      nome: this.criarSolicitanteForm.get('nome')!.value,
      cpf: this.criarSolicitanteForm.get('cpf')!.value,
      rg: this.criarSolicitanteForm.get('rg')!.value,
      telefone: this.criarSolicitanteForm.get('telefone')!.value,
      ativo: 1,
    };
    this.solicitanteService.criar(solicitante).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Solicitante de Material criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/solicitante/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
