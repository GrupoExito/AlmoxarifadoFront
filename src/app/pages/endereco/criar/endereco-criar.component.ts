import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipio } from '@pages/municipio/_models/municipio.model';
import { MunicipioService } from '@pages/municipio/_services/municipio.service';
import Swal from 'sweetalert2';
import { Endereco } from '../_models/endereco.model';
import { EnderecoService } from '../_services/endereco.service';

@Component({
  selector: 'app-endereco-criar',
  templateUrl: './endereco-criar.component.html',
})
export class EnderecoCriarComponent implements OnInit {
  @Output() rotaAtiva = new EventEmitter<string>();

  endereco: Endereco;
  criarEnderecoForm: FormGroup;
  municipios: Municipio[];
  modalAdicionar: any;
  DFD: string;
  constructor(
    private fb: FormBuilder,
    private enderecoservice: EnderecoService,
    private route: Router,
    private municipioService: MunicipioService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.DFD = this.activateRoute.snapshot.url[0].path;
    console.log(this.activateRoute.snapshot.url[0].path);
    this.municipioService.listarTodos().subscribe({
      next: (municipios) => {
        this.municipios = municipios;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.criarEnderecoForm = this.fb.group({
      endereco: ['', [Validators.required, Validators.maxLength(150)]],
      nrologradouro: ['', [Validators.required, Validators.maxLength(20)]],
      complemento: ['', [Validators.required, Validators.maxLength(80)]],
      bairro: ['', [Validators.required, Validators.maxLength(30)]],
      municipio_id: ['', Validators.required],
      cep: ['', [Validators.required, Validators.maxLength(8)]],
    });
  }

  criar() {
    Swal.showLoading();
    const endereco: Endereco = {
      endereco: this.criarEnderecoForm.get('endereco')!.value,
      logradouro: this.criarEnderecoForm.get('logradouro')!.value,
      nrologradouro: this.criarEnderecoForm.get('nrologradouro')!.value,
      complemento: this.criarEnderecoForm.get('complemento')!.value,
      bairro: this.criarEnderecoForm.get('bairro')!.value,
      municipio_id: this.criarEnderecoForm.get('municipio_id')!.value,
      cep: this.criarEnderecoForm.get('cep')!.value,
    };
    this.enderecoservice.criar(endereco).subscribe({
      next: () => {
        Swal.fire('Criado!', 'Endereço criado com sucesso!', 'success').then((result) => {
          this.criarEnderecoForm.reset();
          this.rotaAtiva.emit(this.activateRoute.snapshot.url[0].path);
          if (result.value && this.activateRoute.snapshot.url[0].path != 'dfd') {
            this.route.navigate(['/endereco/view', endereco.id, 'cadastro']);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  consultarCep(cep: string) {
    cep = cep.replace(/\.|-|\//g, '');
    if (cep.length == 8) {
      this.enderecoservice.consultarEnderecoPorCEP(cep).subscribe({
        next: (endereco) => {
          this.endereco = endereco;
          this.criarEnderecoForm.get('cep')?.setValue(endereco.cep);
          this.criarEnderecoForm.get('bairro')?.setValue(endereco.bairro);
          //this.criarEnderecoForm.get('cidade')?.setValue(endereco.municipio_id);
          this.criarEnderecoForm.get('endereco')?.setValue(endereco.logradouro);
          console.log(endereco.endereco);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
