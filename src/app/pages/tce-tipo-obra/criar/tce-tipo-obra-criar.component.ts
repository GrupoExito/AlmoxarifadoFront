import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TceTipoObra } from '../_models/tce-tipo-obra.model';
import { TceTipoObraService } from '../_services/tce-tipo-obra.service';



@Component({
  selector: 'app-tce-tipo-obra-criar',
  templateUrl: './tce-tipo-obra-criar.component.html',
  styleUrls: ['tce-tipo-obra-criar.component.scss'],
})
export class TceTipoObraCriarComponent implements OnInit {
  TceTipoObra: TceTipoObra;
  criarTceTipoObraForm : FormGroup;

  constructor(private fb: FormBuilder, private tceTipoObraService: TceTipoObraService, private route: Router) {}

  ngOnInit(): void {
    this.criarTceTipoObraForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  criar() {
    Swal.showLoading();
    const tceTipoObra: TceTipoObra = {
      descricao: this.criarTceTipoObraForm.get('descricao')!.value,
    };
    this.tceTipoObraService.criar(tceTipoObra).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Setor criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/TceTipoObra/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}


