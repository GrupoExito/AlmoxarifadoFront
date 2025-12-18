import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Orgao } from '../_models/orgao.model';
import { OrgaoService } from '../_services/orgao.service';

@Component({
  selector: 'app-orgao-criar',
  templateUrl: './orgao-criar.component.html',
  styleUrls: ['./orgao-criar.component.scss'],
})
export class OrgaoCriarComponent implements OnInit {
  orgao: Orgao;
  criarOrgaoForm: FormGroup;

  constructor(private fb: FormBuilder, private orgaoService: OrgaoService, private route: Router) {}

  ngOnInit(): void {
    this.criarOrgaoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(50)]],
      datainicio: [''],
      datafim: [''],
      tipopoder: ['', Validators.required],
      codigo_tcm: [''],
    });
  }

  criar() {
    Swal.showLoading();
    const orgao: Orgao = {
      descricao: this.criarOrgaoForm.get('descricao')!.value,
      tipopoder: this.criarOrgaoForm.get('tipopoder')!.value,
    };

    if (this.criarOrgaoForm.get('datainicio')!.value) {
      orgao.datainicio = this.criarOrgaoForm.get('datainicio')!.value;
    }

    if (this.criarOrgaoForm.get('datafim')!.value) {
      orgao.datafim = this.criarOrgaoForm.get('datafim')!.value;
    }

    if (this.criarOrgaoForm.get('codigo_tcm')!.value != '') {
      orgao.codigo_tcm = this.criarOrgaoForm.get('codigo_tcm')!.value;
    }

    this.orgaoService.criar(orgao).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Órgão criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/orgao/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
