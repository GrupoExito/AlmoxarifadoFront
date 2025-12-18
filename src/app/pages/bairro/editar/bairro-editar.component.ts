import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipio } from '@pages/municipio/_models/municipio.model';
import { MunicipioService } from '@pages/municipio/_services/municipio.service';
import Swal from 'sweetalert2';
import { Bairro } from '../_models/bairro.model';
import { BairroService } from '../_services/bairro.service';

@Component({
  selector: 'app-bairro-editar',
  templateUrl: './bairro-editar.component.html',
  styleUrls: ['./bairro-editar.component.scss'],
})
export class BairroEditarComponent implements OnInit {
  bairro: Bairro;
  editarBairroForm: FormGroup;
  id: number;
  municipios: Municipio[];

  constructor(
    private fb: FormBuilder,
    private bairroService: BairroService,
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
    this.editarBairroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      municipio_id: ['', Validators.required],
    });

    this.editarBairroForm.patchValue(this.bairro);

    this.bairroService.consultarPorId(this.id).subscribe({
      next: (bairro) => {
        this.editarBairroForm.patchValue(bairro);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const bairro: Bairro = {
      id: this.id,
      nome: this.editarBairroForm.get('nome')!.value,
      municipio_id: this.editarBairroForm.get('municipio_id')!.value,
    };
    this.bairroService.editar(this.id, bairro).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Município atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/bairro']);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
