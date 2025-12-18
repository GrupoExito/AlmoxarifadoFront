import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalidadeCompra } from '../_models/modalidade-compra.model';
import { ModalidadeCompraService } from '../_service/modalidade-compra.service';

@Component({
  selector: 'app-modalidade-compra-criar',
  templateUrl: './modalidade-compra-criar.component.html',
  styleUrls: ['./modalidade-compra-criar.component.scss'],
})
export class ModalidadeCompraCriarComponent implements OnInit {
  modalidadecompra: ModalidadeCompra;
  criarModalidadeCompraForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalidadeCompraService: ModalidadeCompraService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.criarModalidadeCompraForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      gmodalidade_tcm: ['', [Validators.maxLength(5)]],
      gmodalidade_tce: ['', [Validators.maxLength(5)]],
    });
  }

  criar() {
    Swal.showLoading();
    const modalidadeCompra: ModalidadeCompra = {
      descricao: this.criarModalidadeCompraForm.get('descricao')!.value,
      gmodalidade_tce: this.criarModalidadeCompraForm.get('gmodalidade_tce')!.value,
      gmodalidade_tcm: this.criarModalidadeCompraForm.get('gmodalidade_tcm')!.value,
    };
    this.modalidadeCompraService.criar(modalidadeCompra).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Modalidade criada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/modalidadecompra/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
