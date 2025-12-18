import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoProduto } from '@pages/tipo-produto/_models/tipoproduto.model';
import { TipoProdutoService } from '@pages/tipo-produto/_services/tipoproduto.service';
import { UnidadeMedida } from '@pages/unidade-medida/_models/unidademedida.model';
import { UnidadeMedidaService } from '@pages/unidade-medida/_services/unidademedida.service';
import Swal from 'sweetalert2';
import { CatalogoProduto } from '../_models/catalogo-produto.model';
import { CatalogoProdutoService } from '../_services/catalogo-produto.service';

@Component({
  selector: 'app-catalogo-produto-criar',
  templateUrl: './catalogo-produto-criar.component.html',
  styleUrls: ['./catalogo-produto-criar.component.scss'],
})
export class CatalogoProdutoCriarComponent implements OnInit {
  catalogoProduto: CatalogoProduto;
  criarCatalogoProdutoForm: FormGroup;
  unidadesMedida: UnidadeMedida[];
  tiposProduto: TipoProduto[];
  files: File[] = [];
  confirmado: number = 0;
  dataValidade: number = 0;
  dataLote: number = 0;

  constructor(
    private fb: FormBuilder,
    private catalogoProdutoService: CatalogoProdutoService,
    private route: Router,
    private unidadeMedidaService: UnidadeMedidaService,
    private tipoProdutoService: TipoProdutoService
  ) {}

  ngOnInit(): void {
    this.unidadeMedidaService.listarTodosBancoBase().subscribe({
      next: (unidadesMedida) => {
        this.unidadesMedida = unidadesMedida;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.tipoProdutoService.listarTodosBancoBase().subscribe({
      next: (tiposProduto) => {
        this.tiposProduto = tiposProduto;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.criarCatalogoProdutoForm = this.fb.group({
      descricao: ['', [Validators.maxLength(2000), Validators.required]],
      unidade_medida_id: ['', [Validators.maxLength(30), Validators.required]],
      valor_referencia: ['', [Validators.required]],
      qtd_casas_decimais_quantidade: ['', [Validators.maxLength(30), Validators.required]],
      qtd_casas_decimais_valor: ['', [Validators.maxLength(30), Validators.required]],
      tipo_de_produto_servico_id: ['', [Validators.maxLength(30), Validators.required]],
      usadataValidade: [''],
    });
  }

  criar() {
    Swal.showLoading();
    const formDataCatalogo: FormData = new FormData();
    formDataCatalogo.append('descricao', this.criarCatalogoProdutoForm.get('descricao')!.value);
    formDataCatalogo.append('unidade_medida_id', this.criarCatalogoProdutoForm.get('unidade_medida_id')!.value);
    formDataCatalogo.append('valor_referencia', this.criarCatalogoProdutoForm.get('valor_referencia')!.value);
    formDataCatalogo.append(
      'qtd_casas_decimais_quantidade',
      this.criarCatalogoProdutoForm.get('qtd_casas_decimais_quantidade')!.value
    );
    formDataCatalogo.append(
      'qtd_casas_decimais_valor',
      this.criarCatalogoProdutoForm.get('qtd_casas_decimais_valor')!.value
    );
    formDataCatalogo.append(
      'tipo_de_produto_servico_id',
      this.criarCatalogoProdutoForm.get('tipo_de_produto_servico_id')!.value
    );
    formDataCatalogo.append('usadataValidade', 'false');

    this.files.forEach((file) => {
      formDataCatalogo.append('files[]', file);
    });

    this.catalogoProdutoService.criar(formDataCatalogo).subscribe({
      next: () => {
        Swal.fire('Criado!', 'Produto ou serviço criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/catalogo']);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
