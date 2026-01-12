import { Component, OnInit } from '@angular/core';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { ProdutoServicoService } from '@pages/produto-servico/_services/produto-servico.service';
import { RelatorioBalanceteEstoque } from '@pages/relatorio/_models/relatorio-almoxarifado.model';
import { FiltroRelatorioDTO } from '@pages/relatorio/_models/relatorio-entrada-material.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { BaseService } from '@pages/shared/services/base.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-balancete-material-estoque',
  templateUrl: './balancete-estoque.component.html',
})
export class RelatorioBalanceteEstoqueComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private produtoService: ProdutoServicoService,
    private relatorioAlmoxarifado: RelatorioAlmoxarifadoService,
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
  }

  filtrar() {
    Swal.showLoading();
    if (this.dataInicialSelecionada && this.dataFinalSelecionada) {
        this.filtroHabilitado = true;

        const relatorioBalanceteEstoque: FiltroRelatorioDTO = {
            almoxarifado: this.optionAlmoxarifado,
            almoxarifado_selecionado: this.selectedAlmoxarifado,
            produtoServico: this.optionProdutos,
            produtoServico_selecionado: this.selectedProdutos,
            data_inicial: this.dataInicialSelecionada,
            data_final: this.dataFinalSelecionada,
        };

        console.log(relatorioBalanceteEstoque, 'dados filtro');

        this.relatorioAlmoxarifado.BalanceteEstoque(relatorioBalanceteEstoque).subscribe({
            next: (res) => {
                this.baseService.relatorioMensagemModoImpressao(res, 'RelatorioBalanceteEstoque');
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
