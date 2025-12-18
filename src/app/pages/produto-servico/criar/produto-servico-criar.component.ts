import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoProduto } from '@pages/tipo-produto/_models/tipoproduto.model';
import { TipoProdutoService } from '@pages/tipo-produto/_services/tipoproduto.service';
import { UnidadeMedida } from '@pages/unidade-medida/_models/unidademedida.model';
import { UnidadeMedidaService } from '@pages/unidade-medida/_services/unidademedida.service';
import Swal from 'sweetalert2';
import { ProdutoServico } from '../_models/produto-servico.model';
import { ProdutoServicoService } from '../_services/produto-servico.service';

@Component({
  selector: 'app-produto-servico-criar',
  templateUrl: './produto-servico-criar.component.html',
  styleUrls: ['./produto-servico-criar.component.scss'],
})
export class ProdutoServicoCriarComponent implements OnInit {
  produtoServico: ProdutoServico;
  criarProdutoServicoForm: FormGroup;
  unidadesMedida: UnidadeMedida[];
  tiposProduto: TipoProduto[];
  ativoAlmoxarifado: number = 0;
  confirmado: number = 0;
  dataValidade: number = 0;
  dataLote: number = 0;

  constructor(
    private fb: FormBuilder,
    private produtoServicoService: ProdutoServicoService,
    private route: Router,
    private unidadeMedidaService: UnidadeMedidaService,
    private tipoProdutoService: TipoProdutoService
  ) {}

  ngOnInit(): void {
    this.unidadeMedidaService.listarTodos().subscribe({
      next: (unidadesMedida) => {
        this.unidadesMedida = unidadesMedida;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.tipoProdutoService.listarTodos().subscribe({
      next: (tiposProduto) => {
        this.tiposProduto = tiposProduto;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.criarProdutoServicoForm = this.fb.group({
      descricao: ['', [Validators.required]],
      unidade_medida_id: ['', [Validators.maxLength(30), Validators.required]],
      valor_referencia: ['', [Validators.required]],
      qtd_casas_decimais_quantidade: ['2', [Validators.maxLength(30), Validators.required]],
      qtd_casas_decimais_valor: ['2', [Validators.maxLength(30), Validators.required]],
      tipo_de_produto_servico_id: ['', [Validators.maxLength(30), Validators.required]],
      ativo_almoxarifado: [''],
      descricao_almoxarifado: ['', Validators.maxLength(2000)],
      unidade_medida_almoxarifado_id: [''],
      qtde_do_principal: [''],
      confirmado: [''],
      usadataValidade: [''],
      codigobb: [''],
      mercadoriabb: [''],
      usalotefabricacao: [''],
      codigo_barra: [''],
    });
  }

  validarAlmoxarifado(ev: number) {
    this.ativoAlmoxarifado = ev;
    if (ev) {
      this.criarProdutoServicoForm.get('descricao_almoxarifado')!.setValidators([Validators.required]);
      this.criarProdutoServicoForm.get('descricao_almoxarifado')!.updateValueAndValidity();
      this.criarProdutoServicoForm.get('unidade_medida_almoxarifado_id')!.setValidators([Validators.required]);
      this.criarProdutoServicoForm.get('unidade_medida_almoxarifado_id')!.updateValueAndValidity();
      this.criarProdutoServicoForm.get('qtde_do_principal')!.setValidators([Validators.required]);
      this.criarProdutoServicoForm.get('qtde_do_principal')!.updateValueAndValidity();
    } else {
      this.criarProdutoServicoForm.controls.unidade_medida_almoxarifado_id.setValue('');
      this.criarProdutoServicoForm.controls.qtde_do_principal.setValue('');
      this.criarProdutoServicoForm.controls.usadataValidade.setValue(0);
      this.criarProdutoServicoForm.controls.usalotefabricacao.setValue(0);
      this.criarProdutoServicoForm.controls.descricao_almoxarifado.setValue('');
      this.criarProdutoServicoForm.get('descricao_almoxarifado')!.clearValidators();
      this.criarProdutoServicoForm.get('descricao_almoxarifado')!.updateValueAndValidity();
      this.criarProdutoServicoForm.get('unidade_medida_almoxarifado_id')!.clearValidators();
      this.criarProdutoServicoForm.get('unidade_medida_almoxarifado_id')!.updateValueAndValidity();
      this.criarProdutoServicoForm.get('qtde_do_principal')!.clearValidators();
      this.criarProdutoServicoForm.get('qtde_do_principal')!.updateValueAndValidity();
    }
  }

  criar() {
    Swal.showLoading();
    const produtoServico: ProdutoServico = {
      descricao: this.criarProdutoServicoForm.get('descricao')!.value,
      unidade_medida_id: this.criarProdutoServicoForm.get('unidade_medida_id')!.value,
      valor_referencia: this.criarProdutoServicoForm.get('valor_referencia')!.value,
      qtd_casas_decimais_quantidade: this.criarProdutoServicoForm.get('qtd_casas_decimais_quantidade')!.value,
      qtd_casas_decimais_valor: this.criarProdutoServicoForm.get('qtd_casas_decimais_valor')!.value,
      tipo_de_produto_servico_id: this.criarProdutoServicoForm.get('tipo_de_produto_servico_id')!.value,
      ativo_almoxarifado: !!+this.criarProdutoServicoForm.get('ativo_almoxarifado')!.value,
      descricao_almoxarifado: this.criarProdutoServicoForm.get('descricao_almoxarifado')!.value,
      confirmado: !!+this.criarProdutoServicoForm.get('confirmado')!.value,
      usadataValidade: !!+this.criarProdutoServicoForm.get('usadataValidade')!.value,
      usalotefabricacao: !!+this.criarProdutoServicoForm.get('usalotefabricacao')!.value,
      codigo_barra: this.criarProdutoServicoForm.get('codigo_barra')!.value,
    };

    if (this.criarProdutoServicoForm.get('unidade_medida_almoxarifado_id')!.value != '') {
      produtoServico.unidade_medida_almoxarifado_id = this.criarProdutoServicoForm.get(
        'unidade_medida_almoxarifado_id'
      )!.value;
    }

    if (this.criarProdutoServicoForm.get('qtde_do_principal')!.value != '') {
      produtoServico.qtde_do_principal = this.criarProdutoServicoForm.get('qtde_do_principal')!.value;
    }

    if (this.criarProdutoServicoForm.get('codigobb')!.value != '') {
      produtoServico.codigobb = this.criarProdutoServicoForm.get('codigobb')!.value;
    }

    if (this.criarProdutoServicoForm.get('mercadoriabb')!.value != '') {
      produtoServico.mercadoriabb = this.criarProdutoServicoForm.get('mercadoriabb')!.value;
    }

    this.produtoServicoService.criar(produtoServico).subscribe({
      next: () => {
        Swal.fire('Criado!', 'Produto ou serviço criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/produtoservico']);
          }
        });
      },
      error: (err) => {
        console.log(err);
        if (err.error.error_unique_descricao) {
          Swal.fire('Erro', err.error.message, 'error');
        }
      },
    });
  }
}
