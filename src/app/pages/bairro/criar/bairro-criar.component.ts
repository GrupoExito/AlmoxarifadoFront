import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Municipio } from '@pages/municipio/_models/municipio.model';
import { MunicipioService } from '@pages/municipio/_services/municipio.service';
import Swal from 'sweetalert2';
import { Bairro } from '../_models/bairro.model';
import { BairroService } from '../_services/bairro.service';

@Component({
  selector: 'app-bairro-criar',
  templateUrl: './bairro-criar.component.html',
  styleUrls: ['./bairro-criar.component.scss'],
})
export class BairroCriarComponent implements OnInit {
  bairro: Bairro;
  criarBairroForm: FormGroup;
  municipios: Municipio[];

  constructor(
    private fb: FormBuilder,
    private bairroService: BairroService,
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
    this.criarBairroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      municipio_id: ['', Validators.required],
    });
  }

  criar() {
    Swal.showLoading();
    const bairro: Bairro = {
      nome: this.criarBairroForm.get('nome')!.value,
      municipio_id: this.criarBairroForm.get('municipio_id')!.value,
    };
    this.bairroService.criar(bairro).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Criado!', 'Bairro criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/bairro']);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
