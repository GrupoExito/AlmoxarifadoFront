import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MunicipioService } from '@pages/municipio/_services/municipio.service';
import { Estado } from '@pages/municipio/_models/estado.model';
import { BaseService } from '@shared/services/base.service';
import Swal from 'sweetalert2';
import { Almoxarifado } from '../_models/almoxarifado.model';
import { AlmoxarifadoService } from '../_services/almoxarifado.service';
import { Estados } from '@pages/shared/models/estados.enum';
import { Almoxarifadocep } from '@pages/shared/models/almoxarifadocep.model';

@Component({
  selector: 'app-almoxarifado-editar',
  templateUrl: './almoxarifado-editar.component.html',
  styleUrls: ['./almoxarifado-editar.component.scss'],
})
export class AlmoxarifadoEditarComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private almoxarifadoService: AlmoxarifadoService,
    private router: Router,
    private route: ActivatedRoute,
    private municipioService: MunicipioService,
    private baseService: BaseService
  ) {}

  almoxarifado: Almoxarifado;
  editarAlmoxarifadoForm: FormGroup;
  id: number | null;
  estados: Estado[];
  almoxarifadocep: Almoxarifadocep;

  ngOnInit(): void {
    //this.id = this.almoxarifadoService.getRouteId();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.editarAlmoxarifadoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      logradouro: ['', [Validators.maxLength(100)]],
      numero_logradouro: ['', [Validators.maxLength(10)]],
      logradouro_complemento: ['', [Validators.maxLength(50)]],
      bairro: ['', [Validators.maxLength(80)]],
      municipio: ['', [Validators.maxLength(80)]],
      uf: [''],
      cep: ['', [Validators.maxLength(10)]],
      telefone: ['', [Validators.maxLength(15)]],
    });

    this.almoxarifadoService.consultarPorId(this.id!).subscribe({
      next: (almoxarifado) => {
        this.almoxarifado = almoxarifado;
        this.editarAlmoxarifadoForm.patchValue(this.almoxarifado);
      },
    });

    this.municipioService.listarEstados().subscribe({
      next: (estados) => {
        this.estados = estados;
      },
      error: (error) => {
        console.log(error);
      },
    });

    // Tratamento para o relacionamento com a tabela <ESTADO>
    if (this.editarAlmoxarifadoForm.get('uf')!.value) {
      this.almoxarifado.uf = this.editarAlmoxarifadoForm.get('uf')!.value;
    }
  }

  salvar() {
    Swal.showLoading();
    const almoxarifado: Almoxarifado = {
      id: this.id!,
      descricao: this.editarAlmoxarifadoForm.get('descricao')!.value,
      logradouro: this.editarAlmoxarifadoForm.get('logradouro')!.value,
      numero_logradouro: this.editarAlmoxarifadoForm.get('numero_logradouro')!.value,
      logradouro_complemento: this.editarAlmoxarifadoForm.get('logradouro_complemento')!.value,
      bairro: this.editarAlmoxarifadoForm.get('bairro')!.value,
      municipio: this.editarAlmoxarifadoForm.get('municipio')!.value,
      cep: this.editarAlmoxarifadoForm.get('cep')!.value,
      telefone: this.editarAlmoxarifadoForm.get('telefone')!.value,
    };

    // Tratamento para o relacionamento com a tabela <ESTADO>
    if (this.editarAlmoxarifadoForm.get('uf')!.value) {
      almoxarifado.uf = this.editarAlmoxarifadoForm.get('uf')!.value;
    }

    this.almoxarifadoService.editar(this.id!, almoxarifado).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Almoxarifado atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.router.navigate(['/almoxarifado/listar']);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  consultarCep(cep: string) {
    cep = cep.replace(/\.|-|\//g, '');
    if (cep.length == 8) {
      this.almoxarifadoService.consultarEnderecoPorCEP(cep).subscribe({
        next: (almoxarifadocep) => {
          this.almoxarifadocep = almoxarifadocep;
          this.editarAlmoxarifadoForm.get('cep')?.setValue(almoxarifadocep.cep);
          this.editarAlmoxarifadoForm.get('cad_bairro')?.setValue(almoxarifadocep.bairro);
          this.editarAlmoxarifadoForm.get('cidade')?.setValue(almoxarifadocep.localidade);
          this.editarAlmoxarifadoForm.get('endereco')?.setValue(almoxarifadocep.logradouro);
          this.editarAlmoxarifadoForm.get('ufid')?.setValue(almoxarifadocep.uf);
          this.editarAlmoxarifadoForm.get('ufid')?.setValue(Estados[almoxarifadocep.uf]);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
