import { Component, OnInit } from '@angular/core';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { Fornecedor } from '@pages/fornecedor/_models/fornecedor.model';
import { FornecedorService } from '@pages/fornecedor/_services/fornecedor.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { ProdutoServicoService } from '@pages/produto-servico/_services/produto-servico.service';
import { FiltroRelatorioDTO } from '@pages/relatorio/_models/relatorio-entrada-material.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { StatusFluxo } from '@pages/shared/models/fluxo.model';
import { BaseService } from '@pages/shared/services/base.service';
import { TipoProduto } from '@pages/tipo-produto/_models/tipoproduto.model';
import { TipoProdutoService } from '@pages/tipo-produto/_services/tipoproduto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-movimentacao-por-entrada-item',
  templateUrl: './movimentacao-por-entrada-item.component.html',
  styleUrls: ['../almoxarifado.component.scss'],
})
export class RelatorioMovimentacaoPorEntradaItemComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private tipoProdutoService: TipoProdutoService,
    private produtoService: ProdutoServicoService,
    private relatorioAlmoxarifado: RelatorioAlmoxarifadoService,
    private baseService: BaseService
  ) { }

  dataInicialSelecionada: string;
  dataFinalSelecionada: string;
  almoxarifados: Almoxarifado[];
  produtos: ProdutoServico[];
  optionAlmoxarifado = 0;
  selectedAlmoxarifado: number[];
  optionProdutos = 0;
  selectedProdutos: number[];
  selectedTipoProdutos: number[];
  optionTipoProduto = 0;
  tiposProduto: TipoProduto[];


  ngOnInit(): void {
    console.log('Relatorio de Movimentação por entrada item');

    this.almoxarifadoService.listarTodos().subscribe({
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
    const relatorioMovimentacaoEntrada: FiltroRelatorioDTO = {
        data_inicial: this.dataInicialSelecionada,
      data_final: this.dataFinalSelecionada,
      almoxarifado: this.optionAlmoxarifado,
      almoxarifado_selecionado: this.selectedAlmoxarifado,
      produtoServico: this.optionProdutos,
      produtoServico_selecionado: this.selectedProdutos,
      tipo_produto: this.optionTipoProduto,
      tipo_produto_selecionado: this.selectedTipoProdutos,
    };
    this.relatorioAlmoxarifado.movimentacaoEntradaMaterialPorTipoItem(relatorioMovimentacaoEntrada).subscribe({
      next: (res) => {
        this.baseService.relatorioMensagemModoImpressao(res, 'RelatorioMovimentacaoEntrada');
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
