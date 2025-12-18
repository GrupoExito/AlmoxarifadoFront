import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@shared/services/base.service';
import Swal from 'sweetalert2';
import { LocalProdutoServico } from '../_models/localprodutoservico.model';
import { LocalProdutoServicoService } from '../_services/localprodutoservico.service';

@Component({
  selector: 'app-local-produto-servico-editar',
  templateUrl: './local-produto-servico-editar.component.html',
  styleUrls: ['./local-produto-servico-editar.component.scss'],
})
export class LocalProdutoServicoEditarComponent implements OnInit {
  localprodutoservico: LocalProdutoServico;
  editarLocalProdutoServicoForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private localprodutoservicoService: LocalProdutoServicoService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarLocalProdutoServicoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      endereco: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.localprodutoservicoService.consultarPorId(this.id).subscribe({
      next: (localprodutoservico) => {
        this.localprodutoservico = localprodutoservico;
        this.editarLocalProdutoServicoForm.patchValue(localprodutoservico);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const localprodutoservico: LocalProdutoServico = {
      id: this.id,
      descricao: this.editarLocalProdutoServicoForm.get('descricao')!.value,
      endereco: this.editarLocalProdutoServicoForm.get('endereco')!.value,
    };
    this.localprodutoservicoService.editar(this.id, localprodutoservico).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Local de Produto e Serviço atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/localprodutoservico/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
