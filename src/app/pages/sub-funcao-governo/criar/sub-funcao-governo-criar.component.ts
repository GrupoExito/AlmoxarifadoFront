import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubFuncaoGoverno } from '../_models/subfuncaogoverno.model';
import { SubFuncaoGovernoService } from '../_services/subfuncaogoverno.service';

@Component({
  selector: 'app-sub-funcao-governo-criar',
  templateUrl: './sub-funcao-governo-criar.component.html',
  styleUrls: ['./sub-funcao-governo-criar.component.scss'],
})
export class SubFuncaoGovernoCriarComponent implements OnInit {
  subfuncaoGoverno: SubFuncaoGoverno;
  criarSubFuncaoGovernoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subfuncaoGovernoService: SubFuncaoGovernoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.criarSubFuncaoGovernoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  criar() {
    Swal.showLoading();
    const subfuncaoGoverno: SubFuncaoGoverno = {
      descricao: this.criarSubFuncaoGovernoForm.get('descricao')!.value,
      codigo: this.criarSubFuncaoGovernoForm.get('codigo')!.value,
    };
    this.subfuncaoGovernoService.criar(subfuncaoGoverno).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Subfunção de governo criada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/subfuncaogoverno/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
