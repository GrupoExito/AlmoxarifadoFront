import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pessoa } from '../_models/pessoa.model';
import { Usuario } from '../_models/usuario.model';
import { PessoaService } from '../_services/pessoa.service';
import { validarCPF } from '@pages/shared/directives/cpf.validator';
import { CargoService } from '@pages/cargo/_services/cargo.service';
import { Cargo } from '@pages/cargo/_models/cargo.model';

@Component({
  selector: 'app-pessoa-criar',
  templateUrl: './pessoa-criar.component.html',
  styleUrls: ['./pessoa-criar.component.scss'],
})
export class PessoaCriarComponent implements OnInit {
  pessoa: Pessoa;
  criarPessoaForm: FormGroup;
  usuarios: Usuario[];
  imgFile: any = 'https://blackmantkd.com/wp-content/uploads/2017/04/default-image-620x600.jpg';
  file: File;

  cargos: Cargo[];

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private pessoaService: PessoaService,
    private cargoService: CargoService
  ) {}

  ngOnInit(): void {
    this.pessoaService.listarUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.cargoService.listarTodos().subscribe({
      next: (cargos) => {
        this.cargos = cargos;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.criarPessoaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(80)]],
      cpf: ['', [Validators.required, Validators.maxLength(14)]],
      rg: ['', [Validators.maxLength(14)]],
      telefone: ['', [Validators.maxLength(15)]],
      celular: ['', [Validators.maxLength(15)]],
      orgao_expeditor_rg: ['', [Validators.maxLength(20)]],
      nascimento: [''],
      tipo: ['', [Validators.required]],
      responsavel: [''],
      usuario_id: [''],
      sexo_id: ['', [Validators.required]],
      foto: ['', [Validators.maxLength(15)]],
      assinatura: ['', [Validators.maxLength(250)]],
      email: ['', [Validators.maxLength(50)]],
      fiscal_contrato: [''],
      gcargo_id: [''],
    });
  }

  salvar() {
    Swal.showLoading();

    let formData = new FormData();
    formData.append('cpf', this.criarPessoaForm.get('cpf')!.value);
    formData.append('rg', this.criarPessoaForm.get('rg')!.value);
    formData.append('telefone', this.criarPessoaForm.get('telefone')!.value);
    formData.append('celular', this.criarPessoaForm.get('celular')!.value);
    formData.append('orgao_expeditor_rg', this.criarPessoaForm.get('orgao_expeditor_rg')!.value);
    formData.append('nome', this.criarPessoaForm.get('nome')!.value);
    if (this.criarPessoaForm.get('nascimento')?.value! != '') {
      formData.append('nascimento', this.criarPessoaForm.get('nascimento')!.value);
    }
    formData.append('tipo', this.criarPessoaForm.get('tipo')!.value);
    formData.append('responsavel', this.criarPessoaForm.get('responsavel')!.value);
    formData.append('usuario_id', this.criarPessoaForm.get('usuario_id')!.value);
    formData.append('sexo_id', this.criarPessoaForm.get('sexo_id')!.value);
    formData.append('foto', this.criarPessoaForm.get('foto')!.value);
    formData.append('assinatura', this.criarPessoaForm.get('assinatura')!.value);
    formData.append('file', this.file);
    formData.append('email', this.criarPessoaForm.get('email')!.value);
    formData.append('gcargo_id', this.criarPessoaForm.get('gcargo_id')!.value);
    if (this.criarPessoaForm.get('fiscal_contrato')!.value) {
      formData.append('fiscal_contrato', this.criarPessoaForm.get('fiscal_contrato')!.value);
    }

    this.pessoaService.criar(formData).subscribe({
      next: () => {
        Swal.fire('Criado!', 'Pessoa criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/pessoa']);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  setCPFValidator() {
    const cpfControl = this.criarPessoaForm.get('cpf')!;
    if (cpfControl.value.length > 0) {
      cpfControl.setValidators([Validators.maxLength(14), validarCPF()]);
    } else {
      cpfControl.clearValidators();
    }
    cpfControl.updateValueAndValidity();
  }

  mostrarImagem(event: any) {
    if (event.target.files && event.target.files.length) {
      if (event.target.files[0]?.size > 3080173) {
        Swal.fire('Erro', 'Tamanho ultrapassa o valor de 3mbs', 'error');
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          this.imgFile = reader.result;
        };
        this.imgFile = event.target.files[0];
        this.file = event.target.files[0];
        Swal.fire('Sucesso', 'Anexado com sucesso', 'success');
      }
    }
  }
}
