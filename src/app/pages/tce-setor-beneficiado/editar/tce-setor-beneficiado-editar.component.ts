import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TceQualificacaoProfissional } from '@pages/tce-qualificacao-profissional/_models/tce-qualificacao-profissional.model';
import Swal from 'sweetalert2';
import { TceSetorBeneficiadoService } from '../_services/tce-setor-beneficiado.service';
import { TceSetorBeneficiado } from '../_models/tce-setor-beneficiado.model';


@Component({
  selector: 'app-tce-setor-beneficiado-editar',
  templateUrl: './tce-setor-beneficiado-editar.component.html',
  styleUrls: ['./tce-setor-beneficiado-editar.component.scss'],
})
export class TceSetorBeneficiadoEditarComponent implements OnInit {
  tceSetorBeneficiado: TceSetorBeneficiado;
  editarTceSetorBeneficiadoForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private tceSetorBeneficiadoService: TceSetorBeneficiadoService,
    private routeActive: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarTceSetorBeneficiadoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.tceSetorBeneficiadoService.consultarPorId(this.id).subscribe({
      next: (tceSetorBeneficiado) => {
        this.editarTceSetorBeneficiadoForm.patchValue(this.tceSetorBeneficiado);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const tceSetorBeneficiado: TceSetorBeneficiado = {
      id: this.id,
      descricao: this.editarTceSetorBeneficiadoForm.get('descricao')!.value,
    };
    this.tceSetorBeneficiadoService.editar(this.id, tceSetorBeneficiado).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Setor atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/tceSetorBeneficiado/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
