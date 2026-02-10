import { Component, OnInit } from '@angular/core';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { ProdutoServicoService } from '@pages/produto-servico/_services/produto-servico.service';
import {
  RelatorioMaterialEstoque,
  RelatorioTransferenciaMaterial,
} from '@pages/relatorio/_models/relatorio-almoxarifado.model';
import { FiltroRelatorioDTO } from '@pages/relatorio/_models/relatorio-entrada-material.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { BaseService } from '@pages/shared/services/base.service';
import { TipoProduto } from '@pages/tipo-produto/_models/tipoproduto.model';
import { TipoProdutoService } from '@pages/tipo-produto/_services/tipoproduto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-material-estoque',
  templateUrl: './material-estoque.component.html',
  styleUrls: ['../almoxarifado.component.scss'],
})
export class RelatorioMaterialEstoqueComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private produtoService: ProdutoServicoService,
    private relatorioAlmoxarifado: RelatorioAlmoxarifadoService,
    private tipoProdutoService: TipoProdutoService,
    private baseService: BaseService
  ) {}

  almoxarifados: Almoxarifado[];
  produtos: ProdutoServico[];
  optionAlmoxarifado = 0;
  selectedAlmoxarifado: number[];
  optionProdutos = 0;
  selectedProdutos: number[];
  dataInicialSelecionada: string;
  dataFinalSelecionada: string;
  filtroHabilitado: boolean = false;
  selectedTipoProdutos: number[];
  optionTipoProduto = 0;
  tiposProduto: TipoProduto[];
  

  ngOnInit(): void {
    console.log('Relatorio de Material Estoque');

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

    this.tipoProdutoService.listarTodos().subscribe({
      next: (tiposProduto) => {
        this.tiposProduto = tiposProduto;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filtrar() {
    Swal.showLoading();
    const relatorioMaterialEstoque: FiltroRelatorioDTO = {
      almoxarifado: this.optionAlmoxarifado,
      almoxarifado_selecionado: this.selectedAlmoxarifado,
      produtoServico: this.optionProdutos,
      produtoServico_selecionado: this.selectedProdutos,
      data_inicial: this.dataInicialSelecionada,
      data_final: this.dataFinalSelecionada,
      tipo_produto: this.optionTipoProduto,
      tipo_produto_selecionado: this.selectedTipoProdutos,
    };
    console.log(relatorioMaterialEstoque, 'envios');
    this.relatorioAlmoxarifado.MaterialEstoque(relatorioMaterialEstoque).subscribe({
      next: (res) => {
        this.baseService.relatorioMensagemModoImpressao(res, 'RelatorioMaterialEstoque');
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
