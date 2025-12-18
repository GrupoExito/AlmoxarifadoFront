import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Banco } from '../_models/banco.model';
import { BancoService } from '../_services/banco.service';

@Component({
  selector: 'app-banco-criar',
  templateUrl: './banco-criar.component.html',
  styleUrls: ['./banco-criar.component.scss'],
})
export class BancoCriarComponent implements OnInit {
  banco: Banco;
  criarBancoForm: FormGroup;

  constructor(private fb: FormBuilder, private bancoService: BancoService, private route: Router) {}

  ngOnInit(): void {
    this.criarBancoForm = this.fb.group({
      numero: ['', Validators.required],
      nome: ['', [Validators.required, Validators.maxLength(80)]],
    });
  }

  criar() {
    Swal.showLoading();
    const banco: Banco = {
      numero: this.criarBancoForm.get('numero')!.value,
      nome: this.criarBancoForm.get('nome')!.value,
    };
    this.bancoService.criar(banco).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Banco criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/banco/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
