import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TceQualificacaoProfissional } from '@pages/tce-qualificacao-profissional/_models/tce-qualificacao-profissional.model';
import Swal from 'sweetalert2';
import { TceTipoObra } from '../_models/tce-tipo-obra.model';
import { TceTipoObraService } from '../_services/tce-tipo-obra.service';


@Component({
  selector: 'app-tce-tipo-obra-editar',
  templateUrl: './tce-tipo-obra-editar.component.html',
  styleUrls: ['./tce-tipo-obra-editar.component.scss'],
})
export class TceTipoObraEditarComponent implements OnInit {
  tceTipoObra: TceTipoObra;
  editarTceTipoObraForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private tceTipoObraService: TceTipoObraService,
    private routeActive: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarTceTipoObraForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.tceTipoObraService.consultarPorId(this.id).subscribe({
      next: (tceTipoObra) => {
        this.editarTceTipoObraForm.patchValue(this.tceTipoObra);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const tceTipoObra: TceTipoObra = {
      id: this.id,
      descricao: this.editarTceTipoObraForm.get('descricao')!.value,
    };
    this.tceTipoObraService.editar(this.id, tceTipoObra).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Setor atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/tceTipoObra/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
