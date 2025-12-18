import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotificacaoFornecedor } from '../_models/notificacao-fornecedor.model';
import { NotificacaoFornecedorService } from '../_services/notificacao-fornecedor.service';
import { Fornecedor } from '@pages/fornecedor/_models/fornecedor.model';
import { FornecedorService } from '@pages/fornecedor/_services/fornecedor.service';


@Component({
  selector: 'app-notificacao-fornecedor-criar',
  templateUrl: './notificacao-fornecedor-criar.component.html',
  styleUrls: ['./notificacao-fornecedor-criar.component.scss'],
})
export class NotificacaoFornecedorCriarComponent implements OnInit {
  notificacao: NotificacaoFornecedor;
  criarNotificacaoFornecedorForm: FormGroup;
  fornecedores: Fornecedor[];

  constructor(private fb: FormBuilder, private fornecedorService: FornecedorService, private notificacaoService: NotificacaoFornecedorService, private route: Router) {}

  ngOnInit(): void {
    this.carregarDropdownFornecedor();

    this.criarNotificacaoFornecedorForm = this.fb.group({
      fornecedor_id: ['', [Validators.required, Validators.maxLength(50)]],
      data_notificacao: ['', [Validators.required]],
      observacao: ['', [Validators.required,Validators.maxLength(3000)]],
    });
  }

  carregarDropdownFornecedor(): void {
    this.fornecedorService.listarTodos().subscribe({
      next: (fornecedores) => {
        this.fornecedores = fornecedores;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  criar() {
    Swal.showLoading();
    const notificacao: NotificacaoFornecedor = {
      fornecedor_id: this.criarNotificacaoFornecedorForm.get('fornecedor_id')!.value,
      data_notificacao: this.criarNotificacaoFornecedorForm.get('data_notificacao')!.value,
      observacao: this.criarNotificacaoFornecedorForm.get('observacao')!.value,
    };
    this.notificacaoService.criar(notificacao).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Notificação de Fornecedor criada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/notificacaofornecedor']);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
