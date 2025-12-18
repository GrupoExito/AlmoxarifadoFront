import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Banco } from '@pages/banco/_models/banco.model';
import { BancoService } from '@pages/banco/_services/banco.service';
import { Estado } from '@pages/municipio/_models/estado.model';
import { MunicipioService } from '@pages/municipio/_services/municipio.service';
import { Empresa } from '@pages/shared/models/empresa.model';
import { Estados } from '@pages/shared/models/estados.enum';
import Swal from 'sweetalert2';
import { Fornecedor } from '../_models/fornecedor.model';
import { FornecedorService } from '../_services/fornecedor.service';
import { validarCPF } from '@pages/shared/directives/cpf.validator';
import { validarCNPJ } from '@pages/shared/directives/cnpj.validator';

@Component({
  selector: 'app-fornecedor-criar',
  templateUrl: './fornecedor-criar.component.html',
  styleUrls: ['./fornecedor-criar.component.scss'],
})
export class FornecedorCriarComponent implements OnInit {
  fornecedor: Fornecedor;
  criarFornecedorForm: FormGroup;
  estados: Estado[];
  bancos: Banco[];
  empresa: Empresa;
  atividade_principal = '';
  atividades_secundarias = '';
  validarPessoaFisica: boolean = true;

  constructor(
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private route: Router,
    private municipioService: MunicipioService,
    private bancoService: BancoService
  ) {}

  ngOnInit(): void {
    this.municipioService.listarEstados().subscribe({
      next: (estados) => {
        this.estados = estados;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.bancoService.listarTodos().subscribe({
      next: (bancos) => {
        this.bancos = bancos;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.criarFornecedorForm = this.fb.group({
      razao_social: ['', [Validators.required, Validators.maxLength(100)]],
      tipo_pessoa: ['', [Validators.required]],
      fantasia: ['', [Validators.maxLength(50)]],
      cnpj_cpf: ['', [Validators.required, Validators.maxLength(18)]],
      inscricao_estadual: ['', [Validators.maxLength(20)]],
      endereco: ['', [Validators.maxLength(80)]],
      cidade: ['', [Validators.maxLength(40)]],
      bairro: ['', [Validators.maxLength(40)]],
      uf_id: [''],
      porte_empresa: ['', [Validators.required]],
      cep: ['', [Validators.maxLength(10)]],
      telefone: ['', [Validators.maxLength(15)]],
      email: ['', [Validators.maxLength(50), Validators.email]],
      inscricao_municipal: ['', [Validators.maxLength(20)]],
      obs: ['', [Validators.maxLength(255)]],
      data_cadastro: [''],
      responsavel: ['', [Validators.maxLength(50)]],
      responsavel_cpf: ['', [Validators.maxLength(11)]],
      registro_medico: ['', [Validators.maxLength(10)]],
      tipo: ['', Validators.maxLength(1)],
      codigo_gru: ['', [Validators.maxLength(10)]],
      banco_id: [''],
      agencia: ['', [Validators.maxLength(10)]],
      conta_bancaria: ['', [Validators.maxLength(10)]],
      tipo_conta: ['', [Validators.maxLength(1)]],
      pis_pasep_nit: ['', [Validators.maxLength(20)]],
      registro_geral: ['', [Validators.maxLength(15)]],
      orgao_exp: ['', [Validators.maxLength(10)]],
      atividade_principal: ['', Validators.maxLength(7000)],
      atividade_secundaria: ['', Validators.maxLength(7000)],
      micro_empresa: [''],
    });
    this.validarPorteEmpresa()
  }

  validarPorteEmpresa() {
    const tipo_pessoa = this.criarFornecedorForm.get('tipo_pessoa')!.value;

    if (tipo_pessoa == 'F') {
      this.criarFornecedorForm.get('porte_empresa')?.clearValidators();
      this.criarFornecedorForm.get('porte_empresa')?.setValue('');
      this.validarPessoaFisica = false;
    } else {
      this.criarFornecedorForm.get('porte_empresa')?.setValidators([Validators.required]);
      this.validarPessoaFisica = true;
    }
  }


  setCNPJouCPFValidator() {
    const control = this.criarFornecedorForm.get('cnpj_cpf')!;
    if (control.value.length > 0 && control.value.length < 12) {
      control.setValidators([validarCPF()]);
    } else if (control.value.length > 11) {
      control.clearValidators();
      control.setValidators([validarCNPJ()]);
    } else {
      control.clearValidators();
    }
    control.updateValueAndValidity();

    if (!control.invalid) {
      this.consultarEmpresa(control.value);
    }
  }

  getMaskCNPJouCPF(): string {
    const tipoPessoa = this.criarFornecedorForm.get('tipo_pessoa')!.value;

    return tipoPessoa === 'F' ? '000.000.000-00' : '00.000.000/0000-00';
  }

  setCPFResponsavelValidator() {
    const cpfControl = this.criarFornecedorForm.get('responsavel_cpf')!;
    if (cpfControl.value.length > 0) {
      cpfControl.setValidators([Validators.maxLength(11), validarCPF()]);
    } else {
      cpfControl.clearValidators();
    }
    cpfControl.updateValueAndValidity();
  }

  criar() {
    Swal.showLoading();
    const fornecedor: Fornecedor = {
      razao_social: this.criarFornecedorForm.get('razao_social')!.value,
      tipo_pessoa: this.criarFornecedorForm.get('tipo_pessoa')!.value,
      fantasia: this.criarFornecedorForm.get('fantasia')!.value,
      cnpj_cpf: this.criarFornecedorForm.get('cnpj_cpf')!.value,
      inscricao_estadual: this.criarFornecedorForm.get('inscricao_estadual')!.value,
      endereco: this.criarFornecedorForm.get('endereco')!.value,
      cidade: this.criarFornecedorForm.get('cidade')!.value,
      bairro: this.criarFornecedorForm.get('bairro')!.value,
      cep: this.criarFornecedorForm.get('cep')!.value,
      telefone: this.criarFornecedorForm.get('telefone')!.value,
      email: this.criarFornecedorForm.get('email')!.value,
      inscricao_municipal: this.criarFornecedorForm.get('inscricao_municipal')!.value,
      obs: this.criarFornecedorForm.get('obs')!.value,
      data_cadastro: this.criarFornecedorForm.get('data_cadastro')!.value,
      responsavel: this.criarFornecedorForm.get('responsavel')!.value,
      responsavel_cpf: this.criarFornecedorForm.get('responsavel_cpf')!.value,
      registro_medico: this.criarFornecedorForm.get('registro_medico')!.value,
      tipo: this.criarFornecedorForm.get('tipo')!.value,
      codigo_gru: this.criarFornecedorForm.get('codigo_gru')!.value,
      agencia: this.criarFornecedorForm.get('agencia')!.value,
      conta_bancaria: this.criarFornecedorForm.get('conta_bancaria')!.value,
      tipo_conta: this.criarFornecedorForm.get('tipo_conta')!.value,
      pis_pasep_nit: this.criarFornecedorForm.get('pis_pasep_nit')!.value,
      registro_geral: this.criarFornecedorForm.get('registro_geral')!.value,
      orgao_exp: this.criarFornecedorForm.get('orgao_exp')!.value,
      atividade_principal: this.criarFornecedorForm.get('atividade_principal')!.value,
      atividade_secundaria: this.criarFornecedorForm.get('atividade_secundaria')!.value,
      porte_empresa: parseInt(this.criarFornecedorForm.get('porte_empresa')!.value, 10) || 0,
    };

    // Tratamento para o relacionamento com a tabela <ESTADO>
    if (this.criarFornecedorForm.get('uf_id')!.value) {
      fornecedor.uf_id = this.criarFornecedorForm.get('uf_id')!.value;
    }

    // Tratamento para o relacionamento com a tabela <BANCO>
    if (this.criarFornecedorForm.get('banco_id')!.value) {
      fornecedor.banco_id = this.criarFornecedorForm.get('banco_id')!.value;
    }

    if (this.criarFornecedorForm.get('porte_empresa')!.value == 1) {
      fornecedor.micro_empresa = '1';
    } else {
      fornecedor.micro_empresa = '0';
    }

    this.fornecedorService.criar(fornecedor).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Fornecedor criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/fornecedor/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  consultarEmpresa(cpf_cnpj: string) {
    cpf_cnpj = cpf_cnpj.replace(/\.|-|\//g, '');
    if (cpf_cnpj.length == 14) {
      this.fornecedorService.consultarEmpresaPorCNPJ(cpf_cnpj).subscribe({
        next: (empresa) => {
          this.empresa = empresa;
          this.criarFornecedorForm.get('cep')?.setValue(empresa.cep);
          this.criarFornecedorForm.get('bairro')?.setValue(empresa.bairro);
          this.criarFornecedorForm.get('razao_social')?.setValue(empresa.nome);
          this.criarFornecedorForm.get('fantasia')?.setValue(empresa.fantasia);
          this.criarFornecedorForm.get('cidade')?.setValue(empresa.municipio);
          this.criarFornecedorForm.get('endereco')?.setValue(empresa.logradouro + ', ' + empresa.numero);
          this.criarFornecedorForm.get('email')?.setValue(empresa.email);

          this.criarFornecedorForm.get('uf_id')?.setValue(Estados[empresa.uf]);

          empresa.atividade_principal.forEach((element) => {
            this.atividade_principal = element.code + ' - ' + element.text + '\n' + this.atividade_principal + '\n';
          });
          this.criarFornecedorForm.get('atividade_principal')?.setValue(this.atividade_principal);

          empresa.atividades_secundarias.forEach((element) => {
            this.atividades_secundarias =
              element.code + ' - ' + element.text + '\n' + this.atividades_secundarias + '\n';
          });
          this.criarFornecedorForm.get('atividade_secundaria')?.setValue(this.atividades_secundarias);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  consultarCep(cep: string) {
    cep = cep.replace(/\.|-|\//g, '');
    if (cep.length == 8) {
      this.fornecedorService.consultarEnderecoPorCEP(cep).subscribe({
        next: (empresa) => {
          this.empresa = empresa;
          this.criarFornecedorForm.get('cep')?.setValue(empresa.cep);
          this.criarFornecedorForm.get('bairro')?.setValue(empresa.bairro);
          this.criarFornecedorForm.get('cidade')?.setValue(empresa.localidade);
          this.criarFornecedorForm.get('endereco')?.setValue(empresa.logradouro);
          this.criarFornecedorForm.get('uf_id')?.setValue(Estados[empresa.uf]);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
