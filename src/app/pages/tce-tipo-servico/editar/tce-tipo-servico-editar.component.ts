import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TceQualificacaoProfissional } from '@pages/tce-qualificacao-profissional/_models/tce-qualificacao-profissional.model';
import Swal from 'sweetalert2';
import { TceTipoServico } from '../_models/tce-tipo-servico.model';
import { TceTipoServicoService } from '../_services/tce-tipo-servico.service';


@Component({
  selector: 'app-tce-tipo-servico-editar',
  templateUrl: './tce-tipo-servico-editar.component.html',
  styleUrls: ['./tce-tipo-servico-editar.component.scss'],
})
export class TceTipoServicoEditarComponent implements OnInit {
  tceTipoServico: TceTipoServico;
  editarTceTipoServicoForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private tceTipoServicoService: TceTipoServicoService,
    private routeActive: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarTceTipoServicoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.tceTipoServicoService.consultarPorId(this.id).subscribe({
      next: (tceTipoServico) => {
        this.editarTceTipoServicoForm.patchValue(this.tceTipoServico);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const tceTipoObra: TceTipoServico = {
      id: this.id,
      descricao: this.editarTceTipoServicoForm.get('descricao')!.value,
    };
    this.tceTipoServicoService.editar(this.id, tceTipoObra).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Tipo Serviço atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/tceTipoServico/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
