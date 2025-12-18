import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Objeto } from '@pages/objeto/_models/objeto.model';
import { ObjetoService } from '@pages/objeto/_services/objeto.service';
import Swal from 'sweetalert2';
import { ModeloPlanejamento } from '../_models/modelo-planejamento.model';
import { ModeloPlanejamentoService } from '../_services/modelo-planejamento.service';

@Component({
  selector: 'app-modelo-planejamento-criar',
  templateUrl: './modelo-planejamento-criar.component.html',
  styleUrls: ['./modelo-planejamento-criar.component.scss'],
})
export class ModeloPlanejamentoCriarComponent implements OnInit {
  modeloPlanejamento: ModeloPlanejamento;
  criarModeloPlanejamentoForm: FormGroup;
  objetos: Objeto[];

  constructor(
    private fb: FormBuilder,
    private modeloPlanejamentoService: ModeloPlanejamentoService,
    private objetoService: ObjetoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.criarModeloPlanejamentoForm = this.fb.group({
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
  }

  criar() {
    Swal.showLoading();
    const modeloPlanejamento: ModeloPlanejamento = {
      descricao: this.criarModeloPlanejamentoForm.get('descricao')!.value,
      objeto_id: this.criarModeloPlanejamentoForm.get('objeto_id')!.value,
      populacao_aproximada: this.criarModeloPlanejamentoForm.get('populacao_aproximada')!.value,
    };
    this.modeloPlanejamentoService.criar(modeloPlanejamento).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Criado!', 'Modelo de planejamento criado com sucesso!', 'success').then((result) => {
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
