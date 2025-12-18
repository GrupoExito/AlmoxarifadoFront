import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Estado } from '../_models/estado.model';
import { Municipio } from '../_models/municipio.model';
import { MunicipioService } from '../_services/municipio.service';

@Component({
  selector: 'app-municipio-criar',
  templateUrl: './municipio-criar.component.html',
  styleUrls: ['./municipio-criar.component.scss'],
})
export class MunicipioCriarComponent implements OnInit {
  municipio: Municipio;
  criarMunicipioForm: FormGroup;
  estados: Estado[];

  constructor(private fb: FormBuilder, private municipioService: MunicipioService, private route: Router) {}

  ngOnInit(): void {
    this.municipioService.listarEstados().subscribe({
      next: (estados) => {
        this.estados = estados;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.criarMunicipioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      cep: ['', [Validators.required, Validators.maxLength(8)]],
      estado_id: ['', Validators.required],
    });
  }

  criar() {
    Swal.showLoading();
    const municipio: Municipio = {
      nome: this.criarMunicipioForm.get('nome')!.value,
      cep: this.criarMunicipioForm.get('cep')!.value,
      estado_id: this.criarMunicipioForm.get('estado_id')!.value,
    };
    this.municipioService.criar(municipio).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Municipio criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/municipio/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
