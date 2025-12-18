import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TceQualificacaoProfissional } from '../_models/tce-qualificacao-profissional.model';
import { TceQualificacaoProfissionalService } from '../_services/tce-qualificacao-profissional.service';

@Component({
  selector: 'app-tce-qualificacao-profissional-editar',
  templateUrl: './tce-qualificacao-profissional-editar.component.html',
  styleUrls: ['./tce-qualificacao-profissional-editar.component.scss'],
})
export class TceQualificacaoProfissionalEditarComponent implements OnInit {
  TceQualificacaoProfissional: TceQualificacaoProfissional;
  editarTceQualificacaoProfissionalForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private tceQualificacaoProfissionalService: TceQualificacaoProfissionalService,
    private routeActive: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarTceQualificacaoProfissionalForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.tceQualificacaoProfissionalService.consultarPorId(this.id).subscribe({
      next: (TceQualificacaoProfissional) => {
        this.editarTceQualificacaoProfissionalForm.patchValue(TceQualificacaoProfissional);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const tipoCertidao: TipoCertidao = {
      id: this.id,
      descricao: this.editarTceQualificacaoProfissionalForm.get('descricao')!.value,
    };
    this.tceQualificacaoProfissionalService.editar(this.id, tipoCertidao).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Qualificação Profissional atualizada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/tceQualificacaoProfissional/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
