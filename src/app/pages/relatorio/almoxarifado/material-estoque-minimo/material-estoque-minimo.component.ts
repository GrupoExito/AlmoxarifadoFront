import { Component, OnInit } from '@angular/core';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { ProdutoServicoService } from '@pages/produto-servico/_services/produto-servico.service';
import { RelatorioMaterialEstoque } from '@pages/relatorio/_models/relatorio-almoxarifado.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { BaseService } from '@pages/shared/services/base.service';
import { TipoProduto } from '@pages/tipo-produto/_models/tipoproduto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-material-minimo',
  templateUrl: './material-estoque-minimo.component.html',
  styleUrls: ['../almoxarifado.component.scss'],
})
export class RelatorioMaterialEstoqueMinimoComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private produtoService: ProdutoServicoService,
    private relatorioAlmoxarifado: RelatorioAlmoxarifadoService,
    private baseService: BaseService
  ) {}

  almoxarifados: Almoxarifado[];
  produtos: ProdutoServico[];
  optionAlmoxarifado = '0';
  selectedAlmoxarifado: number[];
  optionProdutos = '0';
  selectedProdutos: number[];
  dataInicialSelecionada: string;
  dataFinalSelecionada: string;
  filtroHabilitado: boolean = false;
  selectedTipoProdutos: number[];
  optionTipoProduto = '0';
  tiposProduto: TipoProduto[];

  ngOnInit(): void {
    console.log('Relatorio de Material Estoque Abaixo do Minimo');

    this.almoxarifadoService.listarAtivos().subscribe({
      next: (almoxarifado) => {
        this.almoxarifados = almoxarifado;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.produtoService.listarTodos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filtrar() {
    Swal.showLoading();
    const relatorioMaterialEstoque: RelatorioMaterialEstoque = {
      almoxarifado: this.optionAlmoxarifado,
      almoxarifado_selecionado: this.selectedAlmoxarifado,
      produto: this.optionProdutos,
      produto_selecionado: this.selectedProdutos,
      data_inicial: this.dataInicialSelecionada,
      data_final: this.dataFinalSelecionada,
      tipo_produto: this.optionTipoProduto,
      tipo_produto_selecionado: this.selectedTipoProdutos,
    };
    this.relatorioAlmoxarifado.MaterialEstoqueMinimo(relatorioMaterialEstoque).subscribe({
      next: (res) => {
        this.baseService.relatorioMensagemModoImpressao(res, 'RelatorioMaterialEstoqueAbaixoMinimo');
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
