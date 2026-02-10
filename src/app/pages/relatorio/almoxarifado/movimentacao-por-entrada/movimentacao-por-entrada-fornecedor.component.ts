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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-movimentacao-por-entrada-fornecedor',
  templateUrl: './movimentacao-por-entrada-fornecedor.component.html',
  styleUrls: ['../almoxarifado.component.scss'],
})
export class RelatorioMovimentacaoPorEntradaFornecedorComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoServicoService,
    private secretariaFundoService: SecretariaFundoService,
    private relatorioAlmoxarifado: RelatorioAlmoxarifadoService,
    private baseService: BaseService
  ) {}

  statusFluxo: StatusFluxo[];
  selectedExercicio: number = 0;
  secretariaFundos: SecretariaFundo[];
  almoxarifados: Almoxarifado[];
  fornecedores: Fornecedor[];
  produtos: ProdutoServico[];
  optionSecretariaFundo = 0;
  selectedSecretariaFundo: number[];
  optionAlmoxarifado = 0;
  selectedAlmoxarifado: number[];
  optionFornecedor = 0;
  selectedFornecedor: number[];
  optionProdutos = 0;
  selectedProdutos: number[];
  dataInicialSelecionada: string;
  dataFinalSelecionada: string;

  ngOnInit(): void {
    console.log('Relatorio de Movimentação por entrada');

    this.secretariaFundoService.listarTodos().subscribe({
      next: (secretariaFundos) => {
        this.secretariaFundos = secretariaFundos;
      },
      error: (error) => {
        console.log(error);
      },
    });

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

    this.fornecedorService.listarTodos().subscribe({
      next: (fornecedores) => {
        this.fornecedores = fornecedores;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filtrar() {
    Swal.showLoading();
    const relatorioMovimentacaoEntrada: FiltroRelatorioDTO = {
      secretaria: this.optionSecretariaFundo,
      secretaria_selecionadas: this.selectedSecretariaFundo,
      almoxarifado: this.optionAlmoxarifado,
      almoxarifado_selecionado: this.selectedAlmoxarifado,
      fornecedor: this.optionFornecedor,
      fornecedor_selecionado: this.selectedFornecedor,
      produtoServico: this.optionProdutos,
      produtoServico_selecionado: this.selectedProdutos,
      data_inicial: this.dataInicialSelecionada,
      data_final: this.dataFinalSelecionada,
    };
    this.relatorioAlmoxarifado.movimentacaoEntradaMaterialFornecedor(relatorioMovimentacaoEntrada).subscribe({
      next: (res) => {
        this.baseService.relatorioMensagemModoImpressao(res, 'RelatorioMovimentacaoEntradaPorFornecedor');
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
