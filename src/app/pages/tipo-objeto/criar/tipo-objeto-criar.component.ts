import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoObjetoService } from '../_services/tipo-objeto.service';
import { TipoObjetoDTO } from '../_models/tipo-objeto.model';

@Component({
  selector: 'app-tipo-objeto-criar',
  templateUrl: './tipo-objeto-criar.component.html',
  styleUrls: ['./tipo-objeto-criar.component.scss'],
})
export class TipoObjetoCriarComponent implements OnInit {
  tipoObjeto: TipoObjetoDTO;
  criarTipoObjetoForm: FormGroup;

  constructor(private fb: FormBuilder, private tipoObjetoService: TipoObjetoService, private route: Router) {}

  ngOnInit(): void {
    this.criarTipoObjetoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  criar() {
    Swal.showLoading();
    const tipoObjeto: TipoObjetoDTO = {
      descricao: this.criarTipoObjetoForm.get('descricao')!.value,
    };
    this.tipoObjetoService.criar(tipoObjeto).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Tipo Objeto criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/tipoobjeto']);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
