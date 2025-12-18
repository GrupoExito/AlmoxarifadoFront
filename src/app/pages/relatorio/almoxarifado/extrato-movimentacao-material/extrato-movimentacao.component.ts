import { Component, OnInit } from '@angular/core';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { ProdutoServicoService } from '@pages/produto-servico/_services/produto-servico.service';
import { ExtratoMovimentacao } from '@pages/relatorio/_models/relatorio-almoxarifado.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { BaseService } from '@pages/shared/services/base.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-extrato-movimentacao',
  templateUrl: './extrato-movimentacao.component.html',
  styleUrls: ['../almoxarifado.component.scss'],
})
export class RelatorioExtratoMovimentacaoComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private produtoService: ProdutoServicoService,
    private relatorioAlmoxarifado: RelatorioAlmoxarifadoService,
    private baseService: BaseService
  ) {}

  almoxarifados: Almoxarifado[];
  almoxarifado_selecionado: number;
  produtos: ProdutoServico[];
  produto_selecionado: number;
  dataInicialSelecionada: string;
  dataFinalSelecionada: string;

  ngOnInit(): void {
    console.log('Relatorio Extrato movimentacao');

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
        console.log(produtos);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filtrar() {
    Swal.showLoading();
    if (!this.dataInicialSelecionada || !this.dataFinalSelecionada) {
      Swal.fire('Aviso!', 'Data inicial e final são obrigatórias.', 'warning');
      return;
    }

    if (!this.almoxarifado_selecionado || !this.produto_selecionado) {
      Swal.fire('Aviso!', 'Almoxarifado e Produto são obrigatórios.', 'warning');
      return;
    }

    console.log('almoxarifado_selecionado:', this.almoxarifado_selecionado);
    console.log('produto_selecionado:', this.produto_selecionado);

    const relatorioMaterialEstoque: ExtratoMovimentacao = {
      almoxarifado_id: this.almoxarifado_selecionado,
      produto_id: this.produto_selecionado,
      data_inicial: this.dataInicialSelecionada,
      data_final: this.dataFinalSelecionada,
    };
    console.log(relatorioMaterialEstoque, 'envio');
    this.relatorioAlmoxarifado.EstoqueMovimentacao(relatorioMaterialEstoque).subscribe({
      next: (res) => {
        this.baseService.relatorioMensagemModoImpressao(res, 'RelatorioMaterialEstoque');
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
