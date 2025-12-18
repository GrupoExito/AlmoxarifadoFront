import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@shared/services/base.service';
import Swal from 'sweetalert2';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { Setor } from '../_models/setor.model';
import { SetorService } from '../_services/setor.service';

@Component({
  selector: 'app-setor-editar',
  templateUrl: './setor-editar.component.html',
  styleUrls: ['./setor-editar.component.scss'],
})
export class SetorEditarComponent implements OnInit {
  setor: Setor;
  editarSetorForm: FormGroup;
  id: number;
  secretarias: SecretariaFundo[];

  constructor(
    private fb: FormBuilder,
    private setorService: SetorService,
    private secretariaFundoService: SecretariaFundoService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.secretariaFundoService.listarTodos().subscribe({
      next: (secretarias) => {
        this.secretarias = secretarias;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.editarSetorForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      secretaria_id: ['', Validators.required],
    });

    this.editarSetorForm.patchValue(this.setor);

    this.setorService.consultarPorId(this.id).subscribe({
      next: (setor) => {
        this.editarSetorForm.patchValue(setor);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const setor: Setor = {
      id: this.id,
      nome: this.editarSetorForm.get('nome')!.value.trim(),
      secretaria_id: this.editarSetorForm.get('secretaria_id')!.value,
    };
    this.setorService.editar(this.id, setor).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Setor atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/setor/editar', this.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
