import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Objeto } from '@pages/objeto/_models/objeto.model';
import { ObjetoService } from '@pages/objeto/_services/objeto.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { ProdutoServicoService } from '@pages/produto-servico/_services/produto-servico.service';
import Swal from 'sweetalert2';
import { ModeloPlanejamentoProduto } from '../_models/modelo-planejamento-produto.model';
import { ModeloPlanejamento } from '../_models/modelo-planejamento.model';
import { ModeloPlanejamentoService } from '../_services/modelo-planejamento.service';
import { BaseService } from '@pages/shared/services/base.service';
import { DataRow } from '@pages/shared/models/dataRow.model';

@Component({
  selector: 'app-modelo-planejamento-produto',
  templateUrl: './modelo-planejamento-produto.component.html',
  styleUrls: ['./modelo-planejamento-produto.component.scss'],
})
export class ModeloPlanejamentoProdutoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private modeloPlanejamentoService: ModeloPlanejamentoService,
    private produtoServicoService: ProdutoServicoService,
    private objetoService: ObjetoService,
    private routeActive: ActivatedRoute,
    private baseService: BaseService
  ) {}

  id: number;
  modeloPlanejamento: ModeloPlanejamento;
  produtosServico: ProdutoServico[];
  modelosPlanejamentoProduto: ModeloPlanejamentoProduto[];
  modelosPlanejamentoProdutoImportado: ModeloPlanejamentoProduto[] = [];
  objetos: Objeto[];
  produtoModeloPlanejamentoForm: FormGroup;
  addProdutoModeloPlanejamentoForm: FormGroup;
  produtoServico: ProdutoServico;
  selectedProdutoServico: number;
  @ViewChild('importFile') importFile: ElementRef;

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));

    this.produtoModeloPlanejamentoForm = this.fb.group({
      descricao: [''],
      objeto_id: [''],
      populacao_aproximada: [''],
    });

    this.addProdutoModeloPlanejamentoForm = this.fb.group({
      quantidade: ['', [Validators.required]],
      produto_servico_id: ['', [Validators.required]],
    });

    this.produtoModeloPlanejamentoForm.controls['descricao'].disable();
    this.produtoModeloPlanejamentoForm.controls['objeto_id'].disable();
    this.produtoModeloPlanejamentoForm.controls['populacao_aproximada'].disable();

    this.modeloPlanejamentoService.consultarPorId(this.id).subscribe({
      next: (modeloPlanejamento) => {
        this.produtoModeloPlanejamentoForm.patchValue(modeloPlanejamento);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.modeloPlanejamentoService.listarModeloPlanejamentoProduto(this.id).subscribe({
      next: (modelosPlanejamentoProduto) => {
        this.modelosPlanejamentoProduto = modelosPlanejamentoProduto;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.objetoService.listarTodos().subscribe({
      next: (objetos) => {
        this.objetos = objetos;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.produtoServicoService.listarTodos().subscribe({
      next: (produtosServico) => {
        this.produtosServico = produtosServico;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public trackItem(index: number, item: ModeloPlanejamentoProduto) {
    return item.id;
  }

  deletar(id: number = 0): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não será capaz de recuperar esta informação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#23b349',
      cancelButtonColor: '#eb2067',
    }).then((result) => {
      if (result.value) {
        this.modeloPlanejamentoService.deletarModeloPlanejamentoProduto(id).subscribe({
          next: () => {
            this.modelosPlanejamentoProduto = this.modelosPlanejamentoProduto.filter(
              (modeloPlanejamentoProduto) => modeloPlanejamentoProduto.id != id
            );
            Swal.fire('Excluído!', 'Produto excluído do modelo planejamento excluído!', 'success');
          },
          error: (err) => {
            Swal.fire('Algo deu errado!', err.error.message, 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  adicionar(): void {
    Swal.showLoading();
    this.produtoServico = this.produtosServico.find(
      (produtoServico) => produtoServico.id == this.addProdutoModeloPlanejamentoForm.get('produto_servico_id')!.value
    )!;

    const modeloPlanejamentoProduto: ModeloPlanejamentoProduto = {
      quantidade: this.addProdutoModeloPlanejamentoForm.get('quantidade')!.value,
      modelo_planejamento_id: this.id,
      produto_servico_id: this.addProdutoModeloPlanejamentoForm.get('produto_servico_id')!.value,
      produto_servico_descricao: this.produtoServico!.descricao,
      unidade_medida: this.produtoServico!.unidade_medida_descricao,
    };
    this.modeloPlanejamentoService.criarModeloPlanejamentoProduto(modeloPlanejamentoProduto).subscribe({
      next: () => {
        this.modelosPlanejamentoProduto.push(modeloPlanejamentoProduto);
        Swal.close();
        Swal.fire('Criado!', 'Produto adicionado com sucesso!', 'success');
        this.addProdutoModeloPlanejamentoForm.reset();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  async importarExcel(evt: any) {
    if (!evt.target.files[0]) {
      return;
    }
    Swal.showLoading();
    const CellB1 = 'PLANILHA PADRÃO DE IMPORTAÇÃO DE DADOS PARA O SISTEMA COMPRA ÁGIL - MODELO';
    const CellA2 = 'CODIGO';
    const CellB2 = 'DESCRIÇÃO DETALHADA DO ITEM';
    const CellC2 = 'UNID';
    const CellD2 = 'QUANTIDADE';

    let convertedExcel = await this.baseService.generateJsonFromExcel(evt, ['A', 'B', 'C', 'D']);

    if (
      convertedExcel[0].B != CellB1 ||
      convertedExcel[1].A != CellA2 ||
      convertedExcel[1].B != CellB2 ||
      convertedExcel[1].C != CellC2 ||
      convertedExcel[1].D != CellD2
    ) {
      Swal.fire('Erro ao importar arquivo!', 'As colunas de cabeçalho não estão seguindo o modelo', 'error');
      this.importFile.nativeElement.value = '';
      return;
    }
    convertedExcel.shift();
    convertedExcel.shift();

    let produtosServicosFiltradosId = this.produtosServico.map((produto) => produto.id);
    let convertedExcelFiltradosId = convertedExcel.map((produto) => produto.A);

    var linhaErrada: DataRow;
    let validateAll = convertedExcel.every((element) => {
      linhaErrada = element;

      let erroDescricao = element.B == '' ? true : false;
      let erroCodigoBanco = !produtosServicosFiltradosId.includes(parseInt(element.A));
      let erroCodigoExcel =
        convertedExcelFiltradosId.filter((excelId) => excelId == element.A).length > 1 ? true : false;
      let erroUnidade =
        element.C != this.produtosServico.find((produto) => produto.id?.toString() == element.A)?.unidade_medida_sigla;
      if (erroCodigoBanco) {
        Swal.fire(
          'Erro ao importar arquivo!',
          `Erro na coluna código, código não cadastrado na base. Erro na linha: ${linhaErrada!.__rowNum__ + 1} `,
          'error'
        );
        return false;
      } else if (erroUnidade) {
        Swal.fire(
          'Erro ao importar arquivo!',
          `Erro na coluna unidade medida, informação difere da cadastrada nesse produto ou serviço. Erro na linha: ${
            linhaErrada!.__rowNum__ + 1
          } `,
          'error'
        );
        return false;
      } else if (erroCodigoExcel) {
        Swal.fire(
          'Erro ao importar arquivo!',
          `Erro na coluna código, existe(m) código(s) repetido(s) no arquivo. Erro na linha: ${
            linhaErrada!.__rowNum__ + 1
          } `,
          'error'
        );
        return false;
      } else if (erroDescricao) {
        Swal.fire(
          'Erro ao importar arquivo!',
          `Erro na coluna descrição, coluna vazia. Erro na linha: ${linhaErrada!.__rowNum__ + 1} `,
          'error'
        );
        return false;
      }
      return true;
    });

    validateAll = convertedExcel.length > 0 ? validateAll : false;
    if (validateAll) {
      Swal.fire({
        title: 'Arquivo validado com sucesso!',
        text: 'Deseja realizar a importação?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'Aguarde um momento...',
            text: 'Importando produtos...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          convertedExcel.forEach((produto) => {
            let produtoImportado: ModeloPlanejamentoProduto = {
              modelo_planejamento_id: this.id,
              produto_servico_id: parseInt(produto.A, 10),
              quantidade: parseInt(produto.D, 10),
            };
            if (parseInt(produto.D, 10) > 0) {
              this.modelosPlanejamentoProdutoImportado.push(produtoImportado);
            }
          });

          this.modeloPlanejamentoService
            .importarModeloPlanejamentoProduto(this.modelosPlanejamentoProdutoImportado)
            .subscribe({
              next: () => {},
              error: (error) => {
                this.importFile.nativeElement.value = '';
                console.log(error);
              },
              complete: () => {
                Swal.close();
                Swal.fire({
                  title: 'Importado!',
                  text: 'Produtos importados com sucesso!',
                  icon: 'success',
                  showConfirmButton: true,
                }).then(() => {
                  window.location.reload();
                });
              },
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.importFile.nativeElement.value = '';
          Swal.fire('Cancelado!', 'Importação cancelada', 'error');
        }
      });
    } else {
      Swal.fire('Erro!', 'Arquivo não contém registros', 'error');
      this.importFile.nativeElement.value = '';
    }
  }
}
