import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CriarSituacaoProdutoServico, SituacaoProdutoServico } from '../_models/situacaoprodutoservico.model';
import { SituacaoProdutoServicoService } from '../_services/situacaoprodutoservico.service';

@Component({
  selector: 'app-situacao-produto-servico-criar',
  templateUrl: './situacao-produto-servico-criar.component.html',
  styleUrls: ['./situacao-produto-servico-criar.component.scss'],
})
export class SituacaoProdutoServicoCriarComponent implements OnInit {
  situacaoProdutoServico: SituacaoProdutoServico;
  criarSituacaoProdutoServicoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private situacaoProdutoServicoService: SituacaoProdutoServicoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.criarSituacaoProdutoServicoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  criar() {
    Swal.showLoading();
    const situacaoProdutoServico: CriarSituacaoProdutoServico = {
      descricao: this.criarSituacaoProdutoServicoForm.get('descricao')!.value,
    };
    this.situacaoProdutoServicoService.criar(situacaoProdutoServico).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Situação do Produto/Serviço criada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/situacaoprodutoservico/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
