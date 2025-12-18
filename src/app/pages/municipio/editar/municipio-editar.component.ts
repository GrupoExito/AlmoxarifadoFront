import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@shared/services/base.service';
import Swal from 'sweetalert2';
import { Estado } from '../_models/estado.model';
import { Municipio } from '../_models/municipio.model';
import { MunicipioService } from '../_services/municipio.service';

@Component({
  selector: 'app-municipio-editar',
  templateUrl: './municipio-editar.component.html',
  styleUrls: ['./municipio-editar.component.scss'],
})
export class MunicipioEditarComponent implements OnInit {
  municipio: Municipio;
  editarMunicipioForm: FormGroup;
  id: number;
  estados: Estado[];

  constructor(
    private fb: FormBuilder,
    private municipioService: MunicipioService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.municipioService.listarEstados().subscribe({
      next: (estados) => {
        this.estados = estados;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.editarMunicipioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      cep: ['', [Validators.required, Validators.maxLength(8)]],
      estado_id: ['', Validators.required],
    });

    this.editarMunicipioForm.patchValue(this.municipio);

    this.municipioService.consultarPorId(this.id).subscribe({
      next: (municipio) => {
        this.editarMunicipioForm.patchValue(municipio);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const municipio: Municipio = {
      id: this.id,
      nome: this.editarMunicipioForm.get('nome')!.value,
      cep: this.editarMunicipioForm.get('cep')!.value,
      estado_id: this.editarMunicipioForm.get('estado_id')!.value,
    };
    this.municipioService.editar(this.id, municipio).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Município atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/municipio/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
