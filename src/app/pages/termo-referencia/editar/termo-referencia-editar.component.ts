import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { BaseService } from '@pages/shared/services/base.service';
import { forkJoin, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { TermoReferencia } from '../_models/termo-referencia.model';
import { TermoReferenciaService } from '../_services/termo-referencia.service';
import { TRData } from '../_models/termo-referencia-data.model';
import { Setor } from '@pages/setor/_models/setor.model';
import { ModeloDocumento } from '@pages/modelo-documento/_models/modelo-documento.model';
import { ModeloDocumentoService } from '@pages/modelo-documento/_services/modelo-documento.service';
import { SetorService } from '@pages/setor/_services/setor.service';

@Component({
  selector: 'app-termo-referencia-editar',
  templateUrl: './termo-referencia-editar.component.html',
  styleUrls: ['./termo-referencia-editar.component.scss'],
})
export class TermoReferenciaEditarComponent implements OnInit {
  constructor(
    private termoReferenciaService: TermoReferenciaService,
    private fb: FormBuilder,
    private baseService: BaseService,
    private setorService: SetorService,
    private modeloDocumentoService: ModeloDocumentoService,
    private route: Router,
    private authService: AuthService
  ) {}

  token: AuthToken | null;
  visualizarTR: TRData | null;
  termoReferencia: TermoReferencia;
  exercicios: Exercicio[];
  selectedExercicio: number;
  setores: Setor[];
  selectedSetor: number;
  modeloDocumentos: ModeloDocumento[];
  selectedModeloDocumento: number;
  editarForm: FormGroup;
  id: number | null;
  subscription1: Subscription;
  usuario_id: number = 1;

  ngOnInit(): void {
    console.log('Editar');
    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }

    this.id = this.termoReferenciaService.getRouteId();
    this.editarForm = this.fb.group({
      gexercicio_id: ['', [Validators.required]],
      data_tr: ['', [Validators.required]],
      justificativa: ['', [Validators.required, Validators.maxLength(5000)]],
      objeto: ['', [Validators.maxLength(5000)]],
      modelo_tr_id: ['', [Validators.required]],
      flsetor_id: ['', [Validators.required]],
    });

    const tr$ = this.termoReferenciaService.consultarTermoReferencia(this.id!);
    const exercicio$ = this.termoReferenciaService.listarTodosExercicio();
    const setor$ = this.setorService.listarTodos();
    const modelo$ = this.modeloDocumentoService.listarTodos();

    this.subscription1 = forkJoin({ tr$, exercicio$, setor$, modelo$ }).subscribe((response) => {
      this.termoReferencia = response.tr$;
      this.exercicios = response.exercicio$;
      this.setores = response.setor$;
      this.modeloDocumentos = response.modelo$;
      this.editarForm.patchValue(this.termoReferencia);
      this.editarForm.get('data_tr')?.setValue(this.baseService.formatDate(response.tr$.data_tr));
    });
  }

  atualizar() {
    Swal.showLoading();
    const termoReferencia: TermoReferencia = {
      id: this.id!,
      gexercicio_id: this.editarForm.get('gexercicio_id')!.value,
      data_tr: this.editarForm.get('data_tr')!.value,
      justificativa: this.editarForm.get('justificativa')!.value,
      objeto: this.editarForm.get('objeto')!.value,
      modelo_tr_id: this.editarForm.get('modelo_tr_id')!.value,
      flsetor_id: this.editarForm.get('flsetor_id')!.value,
    };

    this.baseService.verificarNulosInterface(termoReferencia);

    this.termoReferenciaService.editar(this.id!, termoReferencia).subscribe({
      next: (termosReferencia) => {
        this.termoReferencia = termosReferencia;
        Swal.fire('Atualizado!', 'Termo Referência atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/termoreferencial/view', termoReferencia.id, 'editar']);
          }
        });
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
