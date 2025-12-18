import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipio } from '@pages/municipio/_models/municipio.model';
import { MunicipioService } from '@pages/municipio/_services/municipio.service';
import Swal from 'sweetalert2';
import { Cidadao } from '../_models/cidadao.model';
import { CidadaoService } from '../_services/cidadao.service';
import { validarCPF } from '@pages/shared/directives/cpf.validator';

@Component({
  selector: 'app-cidadao-editar',
  templateUrl: './cidadao-editar.component.html',
  styleUrls: ['./cidadao-editar.component.scss'],
})
export class CidadaoEditarComponent implements OnInit {
  cidadao: Cidadao;
  editarCidadaoForm: FormGroup;
  id: number;
  municipios: Municipio[];

  constructor(
    private fb: FormBuilder,
    private cidadaoService: CidadaoService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private municipioService: MunicipioService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.municipioService.listarTodos().subscribe({
      next: (municipios) => {
        this.municipios = municipios;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.editarCidadaoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      cpf: ['', [Validators.required, Validators.maxLength(14)]],
      gmunicipio_id: ['', Validators.required],
      numero_sus: ['', [Validators.maxLength(15)]],
    });

    this.editarCidadaoForm.patchValue(this.cidadao);

    this.cidadaoService.consultarPorId(this.id).subscribe({
      next: (cidadao) => {
        this.editarCidadaoForm.patchValue(cidadao);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const cidadao: Cidadao = {
      id: this.id,
      nome: this.editarCidadaoForm.get('nome')!.value,
      cpf: this.editarCidadaoForm.get('cpf')!.value,
      gmunicipio_id: this.editarCidadaoForm.get('gmunicipio_id')!.value,
      numero_sus: this.editarCidadaoForm.get('numero_sus')!.value,
    };
    this.cidadaoService.editar(this.id, cidadao).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Cidadão atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/cidadao']);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setCPFValidator() {
    const cpfControl = this.editarCidadaoForm.get('cpf')!;
    if (cpfControl.value.length > 0) {
      cpfControl.setValidators([Validators.maxLength(14), validarCPF()]);
    } else {
      cpfControl.clearValidators();
    }
    cpfControl.updateValueAndValidity();
  }
}
