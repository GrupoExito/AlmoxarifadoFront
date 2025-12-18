import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoCertidao } from '../_models/tipocertidao.model';
import { TipoCertidaoService } from '../_services/tipocertidao.service';

@Component({
  selector: 'app-tipo-certidao-editar',
  templateUrl: './tipo-certidao-editar.component.html',
  styleUrls: ['./tipo-certidao-editar.component.scss'],
})
export class TipoCertidaoEditarComponent implements OnInit {
  tipoCertidao: TipoCertidao;
  editarTipoCertidaoForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private tipoCertidaoService: TipoCertidaoService,
    private routeActive: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarTipoCertidaoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.tipoCertidaoService.consultarPorId(this.id).subscribe({
      next: (tipoCertidao) => {
        this.editarTipoCertidaoForm.patchValue(tipoCertidao);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const tipoCertidao: TipoCertidao = {
      id: this.id,
      descricao: this.editarTipoCertidaoForm.get('descricao')!.value,
    };
    this.tipoCertidaoService.editar(this.id, tipoCertidao).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Tipo de certidão atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/tipocertidao/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
