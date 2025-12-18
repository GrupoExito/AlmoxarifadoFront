import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Objeto } from '@pages/objeto/_models/objeto.model';
import { ObjetoService } from '@pages/objeto/_services/objeto.service';
import Swal from 'sweetalert2';
import { ModeloPlanejamento } from '../_models/modelo-planejamento.model';
import { ModeloPlanejamentoService } from '../_services/modelo-planejamento.service';

@Component({
  selector: 'app-modelo-planejamento-editar',
  templateUrl: './modelo-planejamento-editar.component.html',
  styleUrls: ['./modelo-planejamento-editar.component.scss'],
})
export class ModeloPlanejamentoEditarComponent implements OnInit {
  modeloPlanejamento: ModeloPlanejamento;
  editarModeloPlanejamentoForm: FormGroup;
  objetos: Objeto[];
  id: number;

  constructor(
    private fb: FormBuilder,
    private modeloPlanejamentoService: ModeloPlanejamentoService,
    private objetoService: ObjetoService,
    private routeActive: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarModeloPlanejamentoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(80)]],
      objeto_id: ['', [Validators.required]],
      populacao_aproximada: ['', [Validators.required]],
    });

    this.objetoService.listarTodos().subscribe({
      next: (objetos) => {
        this.objetos = objetos;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.modeloPlanejamentoService.consultarPorId(this.id).subscribe({
      next: (modeloPlanejamento) => {
        this.editarModeloPlanejamentoForm.patchValue(modeloPlanejamento);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const modeloPlanejamento: ModeloPlanejamento = {
      id: this.id,
      descricao: this.editarModeloPlanejamentoForm.get('descricao')!.value,
      objeto_id: this.editarModeloPlanejamentoForm.get('objeto_id')!.value,
      populacao_aproximada: this.editarModeloPlanejamentoForm.get('populacao_aproximada')!.value,
    };
    this.modeloPlanejamentoService.editar(this.id, modeloPlanejamento).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Modelo planejamento atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/modeloplanejamento']);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
