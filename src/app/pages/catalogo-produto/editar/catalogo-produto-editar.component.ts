import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TipoProduto } from '@pages/tipo-produto/_models/tipoproduto.model';
import { TipoProdutoService } from '@pages/tipo-produto/_services/tipoproduto.service';
import { UnidadeMedida } from '@pages/unidade-medida/_models/unidademedida.model';
import { UnidadeMedidaService } from '@pages/unidade-medida/_services/unidademedida.service';
import Swal from 'sweetalert2';
import { CatalogoProduto } from '../_models/catalogo-produto.model';
import { CatalogoProdutoService } from '../_services/catalogo-produto.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-catalogo-produto-editar',
  templateUrl: './catalogo-produto-editar.component.html',
  styleUrls: ['./catalogo-produto-editar.component.scss'],
})
export class CatalogoProdutoEditarComponent implements OnInit {
  catalogoProduto: CatalogoProduto;
  unidadesMedida: UnidadeMedida[];
  tiposProduto: TipoProduto[];
  editarCatalogoProdutoForm: FormGroup;
  id: number;
  files: File[] = [];
  images: any[] = [];

  constructor(
    private fb: FormBuilder,
    private catalogoProdutoService: CatalogoProdutoService,
    private unidadeMedidaService: UnidadeMedidaService,
    private tipoProdutoService: TipoProdutoService,
    private routeActive: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));

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

    this.editarCatalogoProdutoForm = this.fb.group({
      descricao: ['', [Validators.maxLength(2000), Validators.required]],
      unidade_medida_id: ['', [Validators.maxLength(30), Validators.required]],
      valor_referencia: ['', [Validators.required]],
      qtd_casas_decimais_quantidade: ['', [Validators.maxLength(30), Validators.required]],
      qtd_casas_decimais_valor: ['', [Validators.maxLength(30), Validators.required]],
      tipo_de_produto_servico_id: ['', [Validators.maxLength(30), Validators.required]],
      usadataValidade: [''],
    });

    this.catalogoProdutoService.consultarPorId(this.id).subscribe({
      next: (catalogoProduto) => {
        this.editarCatalogoProdutoForm.patchValue(catalogoProduto);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.catalogoProdutoService.listarImagemCatalogoProduto(this.id).subscribe({
      next: (res) => {
        this.images = res.imagem;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();

    const formDataCatalogo: FormData = new FormData();
    formDataCatalogo.append('id', this.id.toString());
    formDataCatalogo.append('descricao', this.editarCatalogoProdutoForm.get('descricao')!.value);
    formDataCatalogo.append('unidade_medida_id', this.editarCatalogoProdutoForm.get('unidade_medida_id')!.value);
    formDataCatalogo.append('valor_referencia', this.editarCatalogoProdutoForm.get('valor_referencia')!.value);
    formDataCatalogo.append(
      'qtd_casas_decimais_quantidade',
      this.editarCatalogoProdutoForm.get('qtd_casas_decimais_quantidade')!.value
    );
    formDataCatalogo.append(
      'qtd_casas_decimais_valor',
      this.editarCatalogoProdutoForm.get('qtd_casas_decimais_valor')!.value
    );
    formDataCatalogo.append(
      'tipo_de_produto_servico_id',
      this.editarCatalogoProdutoForm.get('tipo_de_produto_servico_id')!.value
    );
    formDataCatalogo.append('usadataValidade', 'false');

    this.files.forEach((file) => {
      formDataCatalogo.append('files[]', file);
    });

    this.catalogoProdutoService.editar(this.id, formDataCatalogo).subscribe({
      next: () => {
        Swal.fire('Atualizado!', 'Produto ou serviço atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            document.location.reload();
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  getImageUrl(bytes: any, mimeType: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:' + mimeType + ';base64,' + bytes);
  }

  excluirImagem(id: number) {
    Swal.showLoading();
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja excluir permanentemente essa imagem?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#23b349',
      cancelButtonColor: '#eb2067',
    }).then((result) => {
      if (result.value) {
        this.catalogoProdutoService.deletarImagem(id).subscribe({
          next: () => {
            Swal.fire('Sucesso!', 'Imagem excluída!', 'success').then(() => {
              document.location.reload();
            });
          },
          error: () => {
            Swal.fire('Erro!', 'Algo deu errado ao tentar excluir imagem!', 'error');
          },
        });
      }
    });
  }

  downloadImagem(bytes: any, mimeType: string, name: string): void {
    Swal.showLoading();
    const src = `data:${mimeType};base64,${bytes}`;
    const link = document.createElement('a');
    link.href = src;
    link.download = name;
    link.click();
    link.remove();
    Swal.fire('Sucesso!', 'Download com sucesso!', 'success');
  }
}
