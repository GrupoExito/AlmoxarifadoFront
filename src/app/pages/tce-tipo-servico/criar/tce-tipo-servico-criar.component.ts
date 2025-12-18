import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TceTipoServico } from '../_models/tce-tipo-servico.model';
import { TceTipoServicoService } from '../_services/tce-tipo-servico.service';

@Component({
  selector: 'app-tce-tipo-servico-criar',
  templateUrl: './tce-tipo-servico-criar.component.html',
  styleUrls: ['tce-tipo-servico-criar.component.scss'],
})
export class TceTipoServicoCriarComponent implements OnInit {
  tceTipoServico: TceTipoServico;
  criarTceTipoServicoForm : FormGroup;

  constructor(private fb: FormBuilder, private tceTipoServicoService: TceTipoServicoService, private route: Router) {}

  ngOnInit(): void {
    this.criarTceTipoServicoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  criar() {
    Swal.showLoading();
    const tceTipoServico: TceTipoServico = {
      descricao: this.criarTceTipoServicoForm.get('descricao')!.value,
    };
    this.tceTipoServicoService.criar(tceTipoServico).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Tipo Serviço criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/TceTipoServico/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}


