import { Component, OnInit } from '@angular/core';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { RelatorioBalanceteEstoque } from '@pages/relatorio/_models/relatorio-almoxarifado.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-estoque-excel',
  templateUrl: './relatorio-estoque-excel.component.html',
})
export class RelatorioEstoqueExcelComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private relatorioAlmoxarifado: RelatorioAlmoxarifadoService
  ) {}

  almoxarifados: Almoxarifado[];
  produtos: ProdutoServico[];
  optionAlmoxarifado = '0';
  selectedAlmoxarifado: number[];
  optionProdutos = '0';
  selectedProdutos: number[];
  dataInicialSelecionada: string;
  dataFinalSelecionada: string;

  ngOnInit(): void {
    console.log('Relatorio de Estoque Excel');

    this.almoxarifadoService.listarTodos().subscribe({
      next: (almoxarifado) => {
        this.almoxarifados = almoxarifado;
      },
      error: (error) => {
        console.log(error);
      },
    });

    // this.produtoService.listarTodos().subscribe({
    //   next: (produtos) => {
    //     this.produtos = produtos;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
  }

  filtrar() {
    Swal.showLoading();
    const relatorioBalanceteEstoque: RelatorioBalanceteEstoque = {
      almoxarifado: this.optionAlmoxarifado,
      almoxarifado_selecionado: this.selectedAlmoxarifado,
    };

    this.relatorioAlmoxarifado.EstoqueExcel(relatorioBalanceteEstoque).subscribe({
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
  }
}
