import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoCertidao } from '../_models/tipocertidao.model';
import { TipoCertidaoService } from '../_services/tipocertidao.service';

@Component({
  selector: 'app-tipo-certidao-criar',
  templateUrl: './tipo-certidao-criar.component.html',
  styleUrls: ['./tipo-certidao-criar.component.scss'],
})
export class TipoCertidaoCriarComponent implements OnInit {
  TipoCertidao: TipoCertidao;
  criarTipoCertidaoForm: FormGroup;

  constructor(private fb: FormBuilder, private tipoCertidaoService: TipoCertidaoService, private route: Router) {}

  ngOnInit(): void {
    this.criarTipoCertidaoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  criar() {
    Swal.showLoading();
    const TipoCertidao: TipoCertidao = {
      descricao: this.criarTipoCertidaoForm.get('descricao')!.value,
    };
    this.tipoCertidaoService.criar(TipoCertidao).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Tipo de certidão criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/tipocertidao/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
