import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoProduto } from '../_models/tipoproduto.model';
import { TipoProdutoService } from '../_services/tipoproduto.service';

@Component({
  selector: 'app-tipo-produto-editar',
  templateUrl: './tipo-produto-editar.component.html',
  styleUrls: ['./tipo-produto-editar.component.scss'],
})
export class TipoProdutoEditarComponent implements OnInit {
  tipoProduto: TipoProduto;
  editarTipoProdutoForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private tipoProdutoService: TipoProdutoService,
    private routeActive: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarTipoProdutoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      servicoMaterial: ['', [Validators.required, Validators.maxLength(1)]],
    });

    this.tipoProdutoService.consultarPorId(this.id).subscribe({
      next: (tipoProduto) => {
        this.editarTipoProdutoForm.patchValue(tipoProduto);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const tipoProduto: TipoProduto = {
      id: this.id,
      descricao: this.editarTipoProdutoForm.get('descricao')!.value,
      servicoMaterial: this.editarTipoProdutoForm.get('servicoMaterial')!.value,
    };
    this.tipoProdutoService.editar(this.id, tipoProduto).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Tipos Produtos/Servições atualizada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/tipoproduto/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
