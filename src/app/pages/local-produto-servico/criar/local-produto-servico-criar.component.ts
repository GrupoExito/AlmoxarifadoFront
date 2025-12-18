import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LocalProdutoServico } from '../_models/localprodutoservico.model';
import { LocalProdutoServicoService } from '../_services/localprodutoservico.service';

@Component({
  selector: 'app-local-produto-servico-criar',
  templateUrl: './local-produto-servico-criar.component.html',
  styleUrls: ['./local-produto-servico-criar.component.scss'],
})
export class LocalProdutoServicoCriarComponent implements OnInit {
  localprodutoservico: LocalProdutoServico;
  criarLocalProdutoServicoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private localprodutoservicoService: LocalProdutoServicoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.criarLocalProdutoServicoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      endereco: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  criar() {
    Swal.showLoading();
    const localprodutoservico: LocalProdutoServico = {
      descricao: this.criarLocalProdutoServicoForm.get('descricao')!.value,
      endereco: this.criarLocalProdutoServicoForm.get('endereco')!.value,
    };
    this.localprodutoservicoService.criar(localprodutoservico).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Local de Produto e Serviço criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/localprodutoservico/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
