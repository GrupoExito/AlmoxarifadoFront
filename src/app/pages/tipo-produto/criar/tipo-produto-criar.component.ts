import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CriarTipoProduto, TipoProduto } from '../_models/tipoproduto.model';
import { TipoProdutoService } from '../_services/tipoproduto.service';

@Component({
  selector: 'app-tipo-produto-criar',
  templateUrl: './tipo-produto-criar.component.html',
  styleUrls: ['./tipo-produto-criar.component.scss'],
})
export class TipoProdutoCriarComponent implements OnInit {
  tipoProduto: TipoProduto[];
  criarTipoProdutoForm: FormGroup;

  constructor(private fb: FormBuilder, private tipoProdutoService: TipoProdutoService, private route: Router) {}

  ngOnInit(): void {
    this.criarTipoProdutoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(30)]],
      servicoMaterial: ['', [Validators.required, Validators.maxLength(1)]],
    });

    this.tipoProdutoService.listarTodos().subscribe({
      next: (tiposProduto) => {
        this.tipoProduto = tiposProduto;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  criar() {
    Swal.showLoading();
    const tipoProduto: CriarTipoProduto = {
      descricao: this.criarTipoProdutoForm.get('descricao')!.value,
      servicoMaterial: this.criarTipoProdutoForm.get('servicoMaterial')!.value,
    };
    this.tipoProdutoService.criar(tipoProduto).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Tipos Produtos/Serviços criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/tipoproduto/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
