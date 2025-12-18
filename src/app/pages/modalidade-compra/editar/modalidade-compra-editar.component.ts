import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalidadeCompra } from '../_models/modalidade-compra.model';
import { ModalidadeCompraService } from '../_service/modalidade-compra.service';

@Component({
  selector: 'app-modalidade-compra-editar',
  templateUrl: './modalidade-compra-editar.component.html',
  styleUrls: ['./modalidade-compra-editar.component.scss'],
})
export class ModalidadeCompraEditarComponent implements OnInit {
  modalidadeCompra: ModalidadeCompra;
  editarModalidadeCompraForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private modalidadeCompraService: ModalidadeCompraService,
    private routeActive: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarModalidadeCompraForm = this.fb.group({
      gmodalidade_tcm: ['', [Validators.maxLength(5)]],
      gmodalidade_tce: ['', [Validators.maxLength(5)]],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.modalidadeCompraService.consultarPorId(this.id).subscribe({
      next: (modalidadecompra) => {
        this.editarModalidadeCompraForm.patchValue(modalidadecompra);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const modalidadeCompra: ModalidadeCompra = {
      id: this.id,
      descricao: this.editarModalidadeCompraForm.get('descricao')!.value,
      gmodalidade_tcm: this.editarModalidadeCompraForm.get('gmodalidade_tcm')!.value,
      gmodalidade_tce: this.editarModalidadeCompraForm.get('gmodalidade_tce')!.value,
    };
    this.modalidadeCompraService.editar(this.id, modalidadeCompra).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Funcao de governo atualizada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/modalidadecompra/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
