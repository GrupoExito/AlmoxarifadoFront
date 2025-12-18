import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Estado } from '@pages/municipio/_models/estado.model';
import { MunicipioService } from '@pages/municipio/_services/municipio.service';
import { Almoxarifadocep } from '@pages/shared/models/almoxarifadocep.model';
import { Estados } from '@pages/shared/models/estados.enum';
import Swal from 'sweetalert2';
import { AData, Almoxarifado } from '../_models/almoxarifado.model';
import { AlmoxarifadoService } from '../_services/almoxarifado.service';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';

@Component({
  selector: 'app-almoxarifado-criar',
  templateUrl: './almoxarifado-criar.component.html',
  styleUrls: ['./almoxarifado-criar.component.scss'],
})
export class AlmoxarifadoCriarComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private almoxarifadoService: AlmoxarifadoService,
    private municipioService: MunicipioService,
    private route: Router,
    private authService: AuthService
  ) {}

  almoxarifado: Almoxarifado;
  criarAlmoxarifadoForm: FormGroup;
  estados: Estado[];
  almoxarifadocep: Almoxarifadocep;
  token: AuthToken | null;
  usuario_id: number = 1;
  id: number | null;
  visualizarAlmoxarifado: AData | null;
  selectedAlmoxarifado: number;

  ngOnInit(): void {
    console.log('Cadastro');
    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }

    this.id = this.almoxarifadoService.getRouteId();
    this.criarAlmoxarifadoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      logradouro: ['', Validators.maxLength(100)],
      numero_logradouro: ['', Validators.maxLength(10)],
      logradouro_complemento: ['', Validators.maxLength(50)],
      bairro: ['', Validators.maxLength(80)],
      municipio: ['', Validators.maxLength(80)],
      uf: [''],
      cep: ['', Validators.maxLength(10)],
      telefone: ['', Validators.maxLength(15)],
    });
/*
    if (this.id) {
      this.almoxarifadoService.data$.subscribe({
        next: (res) => {
          this.visualizarAlmoxarifado = res;
          if (this.visualizarAlmoxarifado) {
            this.almoxarifado = this.visualizarAlmoxarifado.almoxarifados;
            this.criarAlmoxarifadoForm.patchValue(res?.almoxarifados!);
            this.selectedAlmoxarifado = res?.almoxarifados.id!;
            this.criarAlmoxarifadoForm.disable();
          }
        },
      });
    }*/ 

    this.municipioService.listarEstados().subscribe({
      next: (estados) => {
        this.estados = estados;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  criar() {
    Swal.showLoading();
    const almoxarifado: Almoxarifado = {
      descricao: this.criarAlmoxarifadoForm.get('descricao')!.value,
      logradouro: this.criarAlmoxarifadoForm.get('logradouro')!.value,
      bairro: this.criarAlmoxarifadoForm.get('bairro')!.value,
      municipio: this.criarAlmoxarifadoForm.get('municipio')!.value,
      cep: this.criarAlmoxarifadoForm.get('cep')!.value,
      telefone: this.criarAlmoxarifadoForm.get('telefone')!.value,
      numero_logradouro: this.criarAlmoxarifadoForm.get('numero_logradouro')!.value,
      logradouro_complemento: this.criarAlmoxarifadoForm.get('logradouro_complemento')!.value,
    };

    // Tratamento para o relacionamento com a tabela <ESTADO>
    if (this.criarAlmoxarifadoForm.get('uf')!.value) {
      almoxarifado.uf = this.criarAlmoxarifadoForm.get('uf')!.value;
    }

    this.almoxarifadoService.criar(almoxarifado).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Almoxarifado criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/almoxarifado/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  consultarCep(cep: string) {
    cep = cep.replace(/\.|-|\//g, '');
    if (cep.length == 8) {
      this.almoxarifadoService.consultarEnderecoPorCEP(cep).subscribe({
        next: (almoxarifadocep) => {
          this.almoxarifadocep = almoxarifadocep;
          this.criarAlmoxarifadoForm.get('cep')?.setValue(almoxarifadocep.cep);
          this.criarAlmoxarifadoForm.get('bairro')?.setValue(almoxarifadocep.bairro);
          this.criarAlmoxarifadoForm.get('cidade')?.setValue(almoxarifadocep.localidade);
          this.criarAlmoxarifadoForm.get('endereco')?.setValue(almoxarifadocep.logradouro);
          this.criarAlmoxarifadoForm.get('ufid')?.setValue(almoxarifadocep.uf);
          this.criarAlmoxarifadoForm.get('ufid')?.setValue(Estados[almoxarifadocep.uf]);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
