import { Component, OnInit } from '@angular/core';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { ProdutoServicoService } from '@pages/produto-servico/_services/produto-servico.service';
import { RelatorioBalanceteEstoque } from '@pages/relatorio/_models/relatorio-almoxarifado.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { BaseService } from '@pages/shared/services/base.service';
import { TipoProduto } from '@pages/tipo-produto/_models/tipoproduto.model';
import { TipoProdutoService } from '@pages/tipo-produto/_services/tipoproduto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-balancete-material-estoque-excel',
  templateUrl: './balancete-estoque-excel.component.html',
})
export class RelatorioBalanceteEstoqueExcelComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private produtoService: ProdutoServicoService,
    private tipoProdutoService: TipoProdutoService,
    private relatorioAlmoxarifado: RelatorioAlmoxarifadoService,
    private baseService: BaseService
  ) {}

  almoxarifados: Almoxarifado[];
  produtos: ProdutoServico[];
  tipoProdutos: TipoProduto[];
  optionAlmoxarifado = '0';
  selectedAlmoxarifado: number[];
  optionProdutos = '0';
  selectedProdutos: number[];
  optionTipoProdutos = '0';
  selectedTipoProdutos: number[];
  dataInicialSelecionada: string;
  dataFinalSelecionada: string;
  filtroHabilitado: boolean = false;

  ngOnInit(): void {
    console.log('Relatorio de Balancete Material Estoque');

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
      next: (tipoProdutos) => {
        this.tipoProdutos = tipoProdutos;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filtrar() {
    Swal.showLoading();
    if (this.dataInicialSelecionada && this.dataFinalSelecionada) {
      this.filtroHabilitado = true;

      const relatorioBalanceteEstoqueExcel: RelatorioBalanceteEstoque = {
        almoxarifado: this.optionAlmoxarifado,
        almoxarifado_selecionado: this.selectedAlmoxarifado,
        produto: this.optionProdutos,
        produto_selecionado: this.selectedProdutos,
        tipo_produto: this.optionTipoProdutos,
        tipo_produto_selecionado: this.selectedTipoProdutos,
        data_inicial: this.dataInicialSelecionada,
        data_final: this.dataFinalSelecionada,
      };

      console.log(relatorioBalanceteEstoqueExcel, 'dados filtro');

      this.relatorioAlmoxarifado.BalanceteEstoqueExcel(relatorioBalanceteEstoqueExcel).subscribe({
        next: (res) => {
          const url = window.URL.createObjectURL(new Blob([res]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'RelatórioExcel' + '.xlsx');
          document.body.appendChild(link);
          link.click();
          link.remove();
          Swal.fire('Sucesso!', 'Relatório Gerado', 'success');
        },
        error: (error) => {
          Swal.fire('Erro!', error.error.message, 'error');
        },
      });
    } else {
      this.filtroHabilitado = false;
      Swal.fire('Aviso!', 'Data inicial e final são obrigatórias.', 'warning');
    }
  }
}
