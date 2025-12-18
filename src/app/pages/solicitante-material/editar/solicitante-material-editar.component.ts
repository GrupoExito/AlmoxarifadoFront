import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SolicitanteMaterial } from '../_models/solicitante-material.model';
import { SolicitanteService } from '../_services/solicitante-material.service';
import { Setor } from '@pages/setor/_models/setor.model';
import { SetorService } from '@pages/setor/_services/setor.service';

@Component({
  selector: 'app-solicitante-material-editar',
  templateUrl: './solicitante-material-editar.component.html',
  styleUrls: ['./solicitante-material-editar.component.scss'],
})
export class SolicitanteEditarComponent implements OnInit {
  solicitantes: SolicitanteMaterial;
  editarSolicitanteForm: FormGroup;
  id: number;

  setores: Setor[];
  selectedSetores: number[];

  constructor(
    private fb: FormBuilder,
    private solicitanteService: SolicitanteService,
    private routeActive: ActivatedRoute,
    private setorService: SetorService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarSolicitanteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      cpf: ['', [Validators.required, Validators.maxLength(15)]],
      rg: ['', [Validators.maxLength(15)]],
      telefone: ['', [Validators.maxLength(15)]],
      setor: [[], Validators.required],
    });

    this.solicitanteService.consultarPorId(this.id).subscribe({
      next: (solicitante) => {
        this.editarSolicitanteForm.patchValue(solicitante);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.setorService.listarTodos().subscribe({
      next: (setores) => {
        this.setores = setores;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.solicitanteService.ListarSetorPorSolicitante(this.id).subscribe({
      next: (x) => {
        this.selectedSetores = x.map((y) => y.id!);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  selecionarTodosSetores() {
    const setores = this.setores.map((x) => x.id);
    console.log('Setores selecionados:', setores);
    this.editarSolicitanteForm.get('setor')?.patchValue(setores);
  }

  editar() {
    Swal.showLoading();
    const solicitante: SolicitanteMaterial = {
      id: this.id,
      nome: this.editarSolicitanteForm.get('nome')!.value,
      cpf: this.editarSolicitanteForm.get('cpf')!.value,
      rg: this.editarSolicitanteForm.get('rg')!.value,
      telefone: this.editarSolicitanteForm.get('telefone')!.value,
      setores: this.editarSolicitanteForm.get('setor')!.value,
      ativo: 1,
    };
    this.solicitanteService.editar(this.id, solicitante).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Solicitante atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/solicitante/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
