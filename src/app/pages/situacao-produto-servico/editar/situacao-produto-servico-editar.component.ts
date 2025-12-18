import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SituacaoProdutoServico } from '../_models/situacaoprodutoservico.model';
import { SituacaoProdutoServicoService } from '../_services/situacaoprodutoservico.service';

@Component({
  selector: 'app-situacao-produto-servico-editar',
  templateUrl: './situacao-produto-servico-editar.component.html',
  styleUrls: ['./situacao-produto-servico-editar.component.scss'],
})
export class SituacaoProdutoServicoEditarComponent implements OnInit {
  situacaoProdutoServico: SituacaoProdutoServico;
  editarSituacaoProdutoServicoForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private situacaoProdutoServicoService: SituacaoProdutoServicoService,
    private routeActive: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarSituacaoProdutoServicoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.situacaoProdutoServicoService.consultarPorId(this.id).subscribe({
      next: (situacaoProdutoServico) => {
        this.editarSituacaoProdutoServicoForm.patchValue(situacaoProdutoServico);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const situacaoProdutoServico: SituacaoProdutoServico = {
      id: this.id,
      descricao: this.editarSituacaoProdutoServicoForm.get('descricao')!.value,
    };
    this.situacaoProdutoServicoService.editar(this.id, situacaoProdutoServico).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Situação de Produto/Serviço atualizada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/situacaoprodutoservico/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
