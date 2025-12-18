import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@shared/services/base.service';
import Swal from 'sweetalert2';
import { Banco } from '../_models/banco.model';
import { BancoService } from '../_services/banco.service';

@Component({
  selector: 'app-banco-editar',
  templateUrl: './banco-editar.component.html',
  styleUrls: ['./banco-editar.component.scss'],
})
export class BancoEditarComponent implements OnInit {
  banco: Banco;
  editarBancoForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private bancoService: BancoService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarBancoForm = this.fb.group({
      numero: ['', [Validators.required, Validators.maxLength(5)]],
      nome: ['', [Validators.required, Validators.maxLength(80)]],
    });

    this.bancoService.consultarPorId(this.id).subscribe({
      next: (banco) => {
        this.banco = banco;
        this.editarBancoForm.patchValue(banco);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const banco: Banco = {
      id: this.id,
      numero: this.editarBancoForm.get('numero')!.value,
      nome: this.editarBancoForm.get('nome')!.value,
    };
    this.bancoService.editar(this.id, banco).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Banco atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/banco/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
