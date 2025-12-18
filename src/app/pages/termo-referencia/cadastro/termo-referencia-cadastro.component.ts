import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { TermoReferenciaService } from '../_services/termo-referencia.service';
import { TermoReferencia } from '../_models/termo-referencia.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { TRData } from '../_models/termo-referencia-data.model';
import { SetorService } from '@pages/setor/_services/setor.service';
import { Setor } from '@pages/setor/_models/setor.model';
import { ModeloDocumento } from '@pages/modelo-documento/_models/modelo-documento.model';
import { ModeloDocumentoService } from '@pages/modelo-documento/_services/modelo-documento.service';

@Component({
  selector: 'app-termo-referencia-cadastro',
  templateUrl: './termo-referencia-cadastro.component.html',
  styleUrls: ['./termo-referencia-cadastro.component.scss'],
})
export class TermoReferenciaCadastroComponent implements OnInit {
  [x: string]: any;
  constructor(
    private termoReferenciaService: TermoReferenciaService,
    private setorService: SetorService,
    private modeloDocumentoService: ModeloDocumentoService,
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService
  ) {}

  token: AuthToken | null;
  visualizarTR: TRData | null;
  termosReferencia: TermoReferencia;
  exercicios: Exercicio[];
  selectedExercicio: number;
  setores: Setor[];
  selectedSetor: number;
  modeloDocumentos: ModeloDocumento[];
  selectedModeloDocumento: number;
  cadastroForm: FormGroup;
  id: number | null;
  usuario_id: number = 1;

  ngOnInit(): void {
    console.log('Cadastro');
    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }

    this.id = this.termoReferenciaService.getRouteId();

    this.cadastroForm = this.fb.group({
      gexercicio_id: ['', [Validators.required]],
      data_tr: ['', [Validators.required]],
      justificativa: ['', [Validators.required, Validators.maxLength(5000)]],
      objeto: ['', [Validators.maxLength(5000)]],
      // prazo_entrega_dias: ['', [Validators.required]],
      // forma_pagamento: ['', [Validators.maxLength(50)]],
      // prazo_pagamento: ['', [Validators.maxLength(50)]],
      // flsetor_id: ['', [Validators.required]],
      // termo_referencia: ['', [Validators.maxLength(2500)]],
      // modelo_tr_id: ['', [Validators.required]],
    });

    if (this.id) {
      this.termoReferenciaService.data$.subscribe({
        next: (res) => {
          this.visualizarTR = res;
          if (this.visualizarTR) {
            this.exercicios = this.visualizarTR.exercicios;
            this.setores = this.visualizarTR.setores;
            this.modeloDocumentos = this.visualizarTR.modelos;
            this.cadastroForm.patchValue(this.visualizarTR.termoReferencia);
            this.cadastroForm.disable();
          }
        },
      });
    } else {
      this.carregarDropdown();
    }
  }

  carregarDropdown(): void {
    this.termoReferenciaService.listarTodosExercicio().subscribe({
      next: (exercicios) => {
        this.exercicios = exercicios;
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

    this.modeloDocumentoService.listarTodos().subscribe({
      next: (modeloDocumentos) => {
        this.modeloDocumentos = modeloDocumentos;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  criar() {
    Swal.showLoading();
    const termoReferencia: TermoReferencia = {
      gexercicio_id: this.cadastroForm.get('gexercicio_id')!.value,
      data_tr: this.cadastroForm.get('data_tr')!.value,
      justificativa: this.cadastroForm.get('justificativa')!.value,
      objeto: this.cadastroForm.get('objeto')!.value,
      // prazo_entrega_dias: this.cadastroForm.get('prazo_entrega_dias')!.value,
      // forma_pagamento: this.cadastroForm.get('forma_pagamento')!.value,
      // prazo_pagamento: this.cadastroForm.get('prazo_pagamento')!.value,
      // modelo_tr_id: this.cadastroForm.get('modelo_tr_id')!.value,
      // termo_referencia: this.cadastroForm.get('termo_referencia')!.value,
      flstatus_id: 1,
      // flsetor_id: this.cadastroForm.get('flsetor_id')!.value,
    };
    this.termoReferenciaService.criar(termoReferencia).subscribe({
      next: (termosReferencia) => {
        this.termosReferencia = termosReferencia;
        Swal.fire('Criado!', 'Termo de referência criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/termoreferencial/view', termosReferencia.id, 'cadastro']);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
