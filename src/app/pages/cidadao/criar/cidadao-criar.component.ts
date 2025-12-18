import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CidadaoService } from '../_services/cidadao.service';
import { Cidadao } from '../_models/cidadao.model';
import { validarCPF } from '@pages/shared/directives/cpf.validator';
import { MunicipioService } from '@pages/municipio/_services/municipio.service';
import { Municipio } from '@pages/municipio/_models/municipio.model';

@Component({
  selector: 'app-cidadao-criar',
  templateUrl: './cidadao-criar.component.html',
  styleUrls: ['./cidadao-criar.component.scss'],
})
export class CidadaoCriarComponent implements OnInit {
  cidadao: Cidadao;
  criarCidadaoForm: FormGroup;
  municipios: Municipio[];

  constructor(
    private fb: FormBuilder,
    private cidadeService: CidadaoService,
    private route: Router,
    private municipioService: MunicipioService
  ) {}

  ngOnInit(): void {
    this.municipioService.listarTodos().subscribe({
      next: (municipios) => {
        this.municipios = municipios;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.criarCidadaoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      cpf: ['', [Validators.required, Validators.maxLength(14)]],
      gmunicipio_id: ['', Validators.required],
      numero_sus: ['', [Validators.maxLength(15)]],
    });
  }

  criar() {
    Swal.showLoading();
    const cidadao: Cidadao = {
      nome: this.criarCidadaoForm.get('nome')!.value,
      cpf: this.criarCidadaoForm.get('cpf')!.value,
      gmunicipio_id: this.criarCidadaoForm.get('gmunicipio_id')!.value,
      numero_sus: this.criarCidadaoForm.get('numero_sus')!.value,
    };
    this.cidadeService.criar(cidadao).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Criado!', 'Cidadao criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/cidadao']);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  setCPFValidator() {
    const cpfControl = this.criarCidadaoForm.get('cpf')!;
    if (cpfControl.value.length > 0) {
      cpfControl.setValidators([Validators.maxLength(14), validarCPF()]);
    } else {
      cpfControl.clearValidators();
    }
    cpfControl.updateValueAndValidity();
  }
}
