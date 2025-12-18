import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SigaService } from '../_services/siga.service';
import { ClienteService } from '@pages/cliente/_services/cliente.service';
import { Cliente } from '@pages/cliente/_models/cliente.model';
import { AuthService } from 'src/app/modules/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-siga-importar',
  templateUrl: './siga-importar.component.html',
  styleUrls: ['./siga-importar.component.scss'],
})
export class SigaImportarComponent implements OnInit {
  constructor(
    private service: SigaService,
    private clienteService: ClienteService,
    private authService: AuthService,
    private route: Router,
    private fb: FormBuilder
  ) {}

  importarForm: FormGroup;
  clientes: Cliente[] = [];
  arquivo: FileList;

  ngOnInit(): void {
    if (this.authService.getDecodedAccessToken()?.id != 1) {
      Swal.fire('Erro', 'Acesso não autorizado', 'error').then(() => {
        this.route.navigate(['/dashboard']);
      });
    }

    this.importarForm = this.fb.group({
      cliente: ['', Validators.required],
      funcao_importacao: ['', Validators.required],
    });

    this.clienteService.listarTodos().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      },
      error: () => {},
    });
  }

  exportar(): void {
    Swal.showLoading();
    if (this.importarForm.invalid) {
      for (var i in this.importarForm.controls) {
        this.importarForm.controls[i].markAsTouched();
      }

      Swal.fire(
        'Campos inválidos',
        'Existem campos preenchidos de forma incorreta, revise os campos marcados por favor',
        'error'
      );
      return;
    }
    const rota = this.importarForm.get('funcao_importacao')!.value;
    let formData = new FormData();
    let file: File = this.arquivo[0];

    formData.append('file', file);
    formData.append('cliente', this.importarForm.get('cliente')!.value);

    this.service.importarArquivoSiga(rota, formData).subscribe({
      next: () => {
        Swal.fire('Sucesso!', 'Arquivo Importado', 'success');
      },
      error: (err) => {
        Swal.fire('Erro!', err.error.message, 'error').then(() => {
          if (err.error.erroExtracao) {
            Swal.fire('Erro!', err.error.erroExtracao, 'error');
          }
          if (err.error.erroInsert) {
            Swal.fire('Erro!', err.error.erroInsert, 'error');
          }
        });
      },
    });
  }

  selecionarArquivo(event: any) {
    this.arquivo = event.target.files;
    if (this.arquivo.length > 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Arquivo selecionado com sucesso',
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'warning',
        title: 'Nenhum arquivo selecionado.',
      });
    }
  }
}
