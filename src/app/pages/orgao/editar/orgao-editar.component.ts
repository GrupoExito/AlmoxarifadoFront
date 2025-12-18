import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@shared/services/base.service';
import Swal from 'sweetalert2';
import { Orgao } from '../_models/orgao.model';
import { OrgaoService } from '../_services/orgao.service';

@Component({
  selector: 'app-orgao-editar',
  templateUrl: './orgao-editar.component.html',
  styleUrls: ['./orgao-editar.component.scss'],
})
export class OrgaoEditarComponent implements OnInit {
  orgao: Orgao;
  editarOrgaoForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private orgaoService: OrgaoService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarOrgaoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(50)]],
      datainicio: [''],
      datafim: [''],
      tipopoder: ['', Validators.required],
      codigo_tcm: [''],
    });

    this.editarOrgaoForm.patchValue(this.orgao);

    this.orgaoService.consultarPorId(this.id).subscribe({
      next: (orgao) => {
        orgao.datainicio = this.baseService.formatDate(orgao.datainicio);
        orgao.datafim = this.baseService.formatDate(orgao.datafim);
        this.editarOrgaoForm.patchValue(orgao);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const orgao: Orgao = {
      id: this.id,
      descricao: this.editarOrgaoForm.get('descricao')!.value,
      tipopoder: this.editarOrgaoForm.get('tipopoder')!.value,
    };

    if (this.editarOrgaoForm.get('datainicio')!.value) {
      orgao.datainicio = this.editarOrgaoForm.get('datainicio')!.value;
    }

    if (this.editarOrgaoForm.get('datafim')!.value) {
      orgao.datafim = this.editarOrgaoForm.get('datafim')!.value;
    }

    if (this.editarOrgaoForm.get('codigo_tcm')!.value != '') {
      orgao.codigo_tcm = this.editarOrgaoForm.get('codigo_tcm')!.value;
    }

    this.orgaoService.editar(this.id, orgao).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Órgão atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/orgao/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
