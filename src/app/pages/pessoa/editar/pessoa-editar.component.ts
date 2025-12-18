import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@pages/shared/services/base.service';
import Swal from 'sweetalert2';
import { Pessoa, PessoaGestao } from '../_models/pessoa.model';
import { Usuario } from '../_models/usuario.model';
import { PessoaService } from '../_services/pessoa.service';
import { validarCPF } from '@pages/shared/directives/cpf.validator';
import { Cargo } from '@pages/cargo/_models/cargo.model';
import { CargoService } from '@pages/cargo/_services/cargo.service';
import { PessoaGestaoService } from '../_services/pessoa-gestao.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-pessoa-editar',
  templateUrl: './pessoa-editar.component.html',
  styleUrls: ['./pessoa-editar.component.scss'],
})
export class PessoaEditarComponent implements OnInit {
  pessoa: Pessoa;
  editarPessoaForm: FormGroup;
  gestaoForm: FormGroup;
  id: number;
  usuarios: Usuario[];
  imgFile: any = 'https://i.stack.imgur.com/l60Hf.png';
  file: File;
  cargos: Cargo[];
  pessoaGestao: PessoaGestao[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private baseService: BaseService,
    private pessoaGestaoService: PessoaGestaoService,
    private cargoService: CargoService
  ) {}

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.cargoService.listarTodos().subscribe({
      next: (cargos) => {
        this.cargos = cargos;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.editarPessoaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(80)]],
      cpf: ['', [Validators.maxLength(14), Validators.required]],
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
    this.gestaoForm = this.fb.group({
      data_inicio: [''],
      data_fim: [''],
      ultima_gestao: [false],
      gpessoa_id: this.id,
    });

    this.pessoaService.consultarPorId(this.id).subscribe({
      next: async (pessoa) => {
        const pessoaUsuario: Usuario = {
          id: pessoa.usuario_id,
          nome: pessoa.usuario_nome!,
        };
        await this.listarUsuario();
        this.usuarios.push(pessoaUsuario);

        pessoa.nascimento = this.baseService.formatDate(pessoa.nascimento);
        this.editarPessoaForm.patchValue(pessoa);
        this.editarPessoaForm.controls.responsavel.setValue(pessoa.responsavel ? 1 : 0);
        this.editarPessoaForm.get('responsavel')!.updateValueAndValidity();
        if (pessoa.assinatura) {
          this.imgFile = pessoa.assinatura;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.listarPorPessoa();
  }

  listarPorPessoa() {
    this.pessoaGestaoService.listarGestaoPorPessoa(this.id!).subscribe({
      next: (pessoaGestao) => {
        this.pessoaGestao = pessoaGestao;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public trackItem(index: number, item: PessoaGestao) {
    return item.id;
  }
  async listarUsuario(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pessoaService.listarUsuarios().subscribe({
        next: (usuarios) => {
          this.usuarios = usuarios;
          resolve();
        },
        error: (error) => {
          console.log(error);
          reject();
        },
      });
    });
  }

  setCPFValidator() {
    const cpfControl = this.editarPessoaForm.get('cpf')!;
    if (cpfControl.value.length > 0) {
      cpfControl.setValidators([Validators.maxLength(14), validarCPF()]);
    } else {
      cpfControl.clearValidators();
    }
    cpfControl.updateValueAndValidity();
  }

  salvar() {
    Swal.showLoading();

    let formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('cpf', this.editarPessoaForm.get('cpf')!.value);
    if (this.editarPessoaForm.get('rg')!.value) {
      formData.append('rg', this.editarPessoaForm.get('rg')!.value);
    }
    if (this.editarPessoaForm.get('celular')!.value) {
      formData.append('celular', this.editarPessoaForm.get('celular')!.value);
    }
    if (this.editarPessoaForm.get('orgao_expeditor_rg')!.value) {
      formData.append('orgao_expeditor_rg', this.editarPessoaForm.get('orgao_expeditor_rg')!.value);
    }
    if (this.editarPessoaForm.get('nascimento')!.value) {
      formData.append('nascimento', this.editarPessoaForm.get('nascimento')!.value);
    }
    formData.append('nome', this.editarPessoaForm.get('nome')!.value);
    formData.append('tipo', this.editarPessoaForm.get('tipo')!.value);
    if (this.editarPessoaForm.get('responsavel')!.value) {
      formData.append('responsavel', this.editarPessoaForm.get('responsavel')!.value);
    }
    if (this.editarPessoaForm.get('usuario_id')!.value) {
      formData.append('usuario_id', this.editarPessoaForm.get('usuario_id')!.value);
    }
    formData.append('sexo_id', this.editarPessoaForm.get('sexo_id')!.value);
    formData.append('foto', this.editarPessoaForm.get('foto')!.value);
    if (this.editarPessoaForm.get('email')!.value) {
      formData.append('email', this.editarPessoaForm.get('email')!.value);
    }
    if (this.editarPessoaForm.get('assinatura')!.value) {
      formData.append('assinatura', this.editarPessoaForm.get('assinatura')!.value);
      formData.append('file', this.file);
    }

    if (this.editarPessoaForm.get('fiscal_contrato')!.value) {
      formData.append('fiscal_contrato', this.editarPessoaForm.get('fiscal_contrato')!.value);
    }
    if (this.editarPessoaForm.get('gcargo_id')!.value) {
      formData.append('gcargo_id', this.editarPessoaForm.get('gcargo_id')!.value);
    }

    this.pessoaService.editar(this.id, formData).subscribe({
      next: () => {
        Swal.fire('Atualizado!', 'Registro atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/pessoa']);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  adicionarDataVigencia() {
    Swal.showLoading();
    const pessoaGestao: PessoaGestao = {
      data_inicio: this.gestaoForm.value.data_inicio,
      data_fim: this.gestaoForm.value.data_fim,
      ultima_gestao: false,
      gpessoa_id: this.id!,
    };
    this.pessoaGestaoService.criar(pessoaGestao).subscribe({
      next: () => {
        this.listarPorPessoa();
        Swal.fire('Data de vigência adicionada!', 'Data de vigência adicionada com sucesso!', 'success');
      },
      error: (error) => {
        console.log(error);
      },
    });
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
