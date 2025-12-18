import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Banco } from '@pages/banco/_models/banco.model';
import { BancoService } from '@pages/banco/_services/banco.service';
import { Estado } from '@pages/municipio/_models/estado.model';
import { MunicipioService } from '@pages/municipio/_services/municipio.service';
import { Empresa } from '@pages/shared/models/empresa.model';
import { Estados } from '@pages/shared/models/estados.enum';
import { BaseService } from '@shared/services/base.service';
import Swal from 'sweetalert2';
import { Fornecedor } from '../_models/fornecedor.model';
import { FornecedorService } from '../_services/fornecedor.service';
import { validarCNPJ } from '@pages/shared/directives/cnpj.validator';
import { validarCPF } from '@pages/shared/directives/cpf.validator';

@Component({
  selector: 'app-fornecedor-editar',
  templateUrl: './fornecedor-editar.component.html',
  styleUrls: ['./fornecedor-editar.component.scss'],
})
export class FornecedorEditarComponent implements OnInit {
  fornecedor: Fornecedor;
  editarFornecedorForm: FormGroup;
  id: number;
  estados: Estado[];
  bancos: Banco[];
  empresa: Empresa;
  atividade_principal = '';
  atividades_secundarias = '';
  validarPessoaFisica: boolean = true;

  constructor(
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private bancoService: BancoService,
    private municipioService: MunicipioService,
    private baseService: BaseService
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

    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarFornecedorForm = this.fb.group({
      razao_social: ['', [Validators.required, Validators.maxLength(100)]],
      tipo_pessoa: ['', [Validators.required, Validators.maxLength(1)]],
      fantasia: ['', [Validators.maxLength(50)]],
      cnpj_cpf: ['', [Validators.required, Validators.maxLength(18)]],
      inscricao_estadual: ['', [Validators.maxLength(20)]],
      endereco: ['', [Validators.maxLength(80)]],
      cidade: ['', [Validators.maxLength(40)]],
      bairro: ['', [Validators.maxLength(40)]],
      uf_id: [''],
      cep: ['', [Validators.maxLength(10)]],
      telefone: ['', [Validators.maxLength(15)]],
      email: ['', [Validators.maxLength(50), Validators.email]],
      inscricao_municipal: ['', [Validators.maxLength(20)]],
      obs: ['', [Validators.maxLength(255)]],
      data_cadastro: [''],
      responsavel: ['', [Validators.maxLength(50)]],
      responsavel_cpf: ['', [Validators.maxLength(20)]],
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
      porte_empresa: ['', [Validators.required]],
    });
    

    // Tratamento para o relacionamento com a tabela <ESTADO>
    if (this.editarFornecedorForm.get('uf_id')!.value) {
      this.fornecedor.uf_id = this.editarFornecedorForm.get('uf_id')!.value;
    }

    // Tratamento para o relacionamento com a tabela <BANCO>
    if (this.editarFornecedorForm.get('banco_id')!.value) {
      this.fornecedor.banco_id = this.editarFornecedorForm.get('banco_id')!.value;
    }

    this.fornecedorService.consultarPorId(this.id).subscribe({
      next: (fornecedor) => {
        this.fornecedor = fornecedor;
        this.editarFornecedorForm.patchValue(fornecedor);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.validarPorteEmpresa()
  }

  validarPorteEmpresa() {
    const tipo_pessoa = this.editarFornecedorForm.get('tipo_pessoa')!.value;

    if (tipo_pessoa == 'F') {
      this.editarFornecedorForm.get('porte_empresa')?.clearValidators();
      this.editarFornecedorForm.get('porte_empresa')?.setValue('');
      this.validarPessoaFisica = false;
    } else {
      this.editarFornecedorForm.get('porte_empresa')?.setValidators([Validators.required]);
      this.validarPessoaFisica = true;
    }
  }

  setCNPJouCPFValidator() {
    const control = this.editarFornecedorForm.get('cnpj_cpf')!;
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
    const tipoPessoa = this.editarFornecedorForm.get('tipo_pessoa')!.value;

    return tipoPessoa === 'F' ? '000.000.000-00' : '00.000.000/0000-00';
  }

  editar() {
    Swal.showLoading();
    const fornecedor: Fornecedor = {
      id: this.id,
      razao_social: this.editarFornecedorForm.get('razao_social')!.value,
      tipo_pessoa: this.editarFornecedorForm.get('tipo_pessoa')!.value,
      fantasia: this.editarFornecedorForm.get('fantasia')!.value,
      cnpj_cpf: this.editarFornecedorForm.get('cnpj_cpf')!.value,
      inscricao_estadual: this.editarFornecedorForm.get('inscricao_estadual')!.value,
      endereco: this.editarFornecedorForm.get('endereco')!.value,
      cidade: this.editarFornecedorForm.get('cidade')!.value,
      bairro: this.editarFornecedorForm.get('bairro')!.value,
      cep: this.editarFornecedorForm.get('cep')!.value,
      telefone: this.editarFornecedorForm.get('telefone')!.value,
      email: this.editarFornecedorForm.get('email')!.value,
      inscricao_municipal: this.editarFornecedorForm.get('inscricao_municipal')!.value,
      obs: this.editarFornecedorForm.get('obs')!.value,
      data_cadastro: this.editarFornecedorForm.get('data_cadastro')!.value,
      responsavel: this.editarFornecedorForm.get('responsavel')!.value,
      responsavel_cpf: this.editarFornecedorForm.get('responsavel_cpf')!.value,
      registro_medico: this.editarFornecedorForm.get('registro_medico')!.value,
      tipo: this.editarFornecedorForm.get('tipo')!.value,
      codigo_gru: this.editarFornecedorForm.get('codigo_gru')!.value,
      agencia: this.editarFornecedorForm.get('agencia')!.value,
      conta_bancaria: this.editarFornecedorForm.get('conta_bancaria')!.value,
      tipo_conta: this.editarFornecedorForm.get('tipo_conta')!.value,
      pis_pasep_nit: this.editarFornecedorForm.get('pis_pasep_nit')!.value,
      registro_geral: this.editarFornecedorForm.get('registro_geral')!.value,
      orgao_exp: this.editarFornecedorForm.get('orgao_exp')!.value,
      atividade_principal: this.editarFornecedorForm.get('atividade_principal')!.value,
      atividade_secundaria: this.editarFornecedorForm.get('atividade_secundaria')!.value,
      porte_empresa: parseInt(this.editarFornecedorForm.get('porte_empresa')!.value, 10) || 0,
    };

    // Tratamento para o relacionamento com a tabela <ESTADO>
    if (this.editarFornecedorForm.get('uf_id')!.value) {
      fornecedor.uf_id = this.editarFornecedorForm.get('uf_id')!.value;
    }

    // Tratamento para o relacionamento com a tabela <BANCO>
    if (this.editarFornecedorForm.get('banco_id')!.value) {
      fornecedor.banco_id = this.editarFornecedorForm.get('banco_id')!.value;
    }

    if (this.editarFornecedorForm.get('porte_empresa')!.value == 1) {
      fornecedor.micro_empresa = '1';
    } else {
      fornecedor.micro_empresa = '0';
    }

    this.fornecedorService.editar(this.id, fornecedor).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Atualizado!', 'Fornecedor atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/fornecedor/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  consultarEmpresa(cpf_cnpj: string) {
    cpf_cnpj = cpf_cnpj.replace(/\.|-|\//g, '');
    if (cpf_cnpj.length == 14) {
      this.fornecedorService.consultarEmpresaPorCNPJ(cpf_cnpj).subscribe({
        next: (empresa) => {
          console.log(empresa);
          this.empresa = empresa;
          this.editarFornecedorForm.get('cep')?.setValue(empresa.cep);
          this.editarFornecedorForm.get('bairro')?.setValue(empresa.bairro);
          this.editarFornecedorForm.get('razao_social')?.setValue(empresa.nome);
          this.editarFornecedorForm.get('fantasia')?.setValue(empresa.fantasia);
          this.editarFornecedorForm.get('cidade')?.setValue(empresa.municipio);
          this.editarFornecedorForm.get('endereco')?.setValue(empresa.logradouro + ', ' + empresa.numero);
          this.editarFornecedorForm.get('email')?.setValue(empresa.email);

          this.editarFornecedorForm.get('uf_id')?.setValue(Estados[empresa.uf]);

          empresa.atividade_principal.forEach((element) => {
            this.atividade_principal = element.code + ' - ' + element.text + '\n' + this.atividade_principal + '\n';
          });
          this.editarFornecedorForm.get('atividade_principal')?.setValue(this.atividade_principal);

          empresa.atividades_secundarias.forEach((element) => {
            this.atividades_secundarias =
              element.code + ' - ' + element.text + '\n' + this.atividades_secundarias + '\n';
          });
          this.editarFornecedorForm.get('atividade_secundaria')?.setValue(this.atividades_secundarias);
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
          this.editarFornecedorForm.get('cep')?.setValue(empresa.cep);
          this.editarFornecedorForm.get('cad_bairro')?.setValue(empresa.bairro);
          this.editarFornecedorForm.get('cidade')?.setValue(empresa.localidade);
          this.editarFornecedorForm.get('endereco')?.setValue(empresa.logradouro);
          this.editarFornecedorForm.get('ufid')?.setValue(empresa.uf);
          this.editarFornecedorForm.get('ufid')?.setValue(Estados[empresa.uf]);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  /**
   * Valida se o CPF é valido. Deve-se ser informado o cpf sem máscara.
   */
  isValidCpf() {
    return (control: AbstractControl): Validators => {
      const cpf = control.value;
      if (cpf) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
          return 0;
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { cpfNotValid: true };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { cpfNotValid: true };
          }
          return 0;
        } else {
          return { cpfNotValid: true };
        }
      }
      return 0;
    };
  }
}
