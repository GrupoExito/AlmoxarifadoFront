import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TceSetorBeneficiado } from '../_models/tce-setor-beneficiado.model';
import { TceSetorBeneficiadoService } from '../_services/tce-setor-beneficiado.service';


@Component({
  selector: 'app-tce-setor-beneficiado-criar',
  templateUrl: './tce-setor-beneficiado-criar.component.html',
  styleUrls: ['tce-setor-beneficiado-criar.component.scss'],
})
export class TceSetorBeneficiadoCriarComponent implements OnInit {
  TceSetorBeneficiado: TceSetorBeneficiado;
  criarTceSetorBeneficiadoForm: FormGroup;

  constructor(private fb: FormBuilder, private tceSetorBeneficiadoService: TceSetorBeneficiadoService, private route: Router) {}

  ngOnInit(): void {
    this.criarTceSetorBeneficiadoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  criar() {
    Swal.showLoading();
    const tceSetorBeneficiado: TceSetorBeneficiado = {
      descricao: this.criarTceSetorBeneficiadoForm.get('descricao')!.value,
    };
    this.tceSetorBeneficiadoService.criar(tceSetorBeneficiado).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Setor criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/tceSetorBeneficiado/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}

