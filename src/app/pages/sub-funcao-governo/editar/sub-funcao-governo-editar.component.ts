import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubFuncaoGoverno } from '../_models/subfuncaogoverno.model';
import { SubFuncaoGovernoService } from '../_services/subfuncaogoverno.service';

@Component({
  selector: 'app-sub-funcao-governo-editar',
  templateUrl: './sub-funcao-governo-editar.component.html',
  styleUrls: ['./sub-funcao-governo-editar.component.scss'],
})
export class SubFuncaoGovernoEditarComponent implements OnInit {
  subfuncaoGoverno: SubFuncaoGoverno;
  editarSubFuncaoGovernoForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private subfuncaoGovernoService: SubFuncaoGovernoService,
    private routeActive: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarSubFuncaoGovernoForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.subfuncaoGovernoService.consultarPorId(this.id).subscribe({
      next: (subfuncaogoverno) => {
        this.editarSubFuncaoGovernoForm.patchValue(subfuncaogoverno);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const subfuncaoGoverno: SubFuncaoGoverno = {
      id: this.id,
      codigo: this.editarSubFuncaoGovernoForm.get('codigo')!.value,
      descricao: this.editarSubFuncaoGovernoForm.get('descricao')!.value,
    };
    this.subfuncaoGovernoService.editar(this.id, subfuncaoGoverno).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Subfunção de governo atualizada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/subfuncaogoverno/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
