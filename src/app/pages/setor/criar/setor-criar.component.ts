import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import Swal from 'sweetalert2';
import { Setor } from '../_models/setor.model';
import { SetorService } from '../_services/setor.service';

@Component({
  selector: 'app-setor-criar',
  templateUrl: './setor-criar.component.html',
  styleUrls: ['./setor-criar.component.scss'],
})
export class SetorCriarComponent implements OnInit {
  setor: Setor;
  criarSetorForm: FormGroup;
  secretarias: SecretariaFundo[];

  constructor(
    private fb: FormBuilder,
    private setorService: SetorService,
    private secretariaFundoService: SecretariaFundoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.secretariaFundoService.listarTodos().subscribe({
      next: (secretarias) => {
        this.secretarias = secretarias;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.criarSetorForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      secretaria_id: ['', Validators.required],
    });
  }

  criar() {
    Swal.showLoading();
    const setor: Setor = {
      nome: this.criarSetorForm.get('nome')!.value.trim(),
      secretaria_id: this.criarSetorForm.get('secretaria_id')!.value,
    };
    this.setorService.criar(setor).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Setor criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/setor/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
