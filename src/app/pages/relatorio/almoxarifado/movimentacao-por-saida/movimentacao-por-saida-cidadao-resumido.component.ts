import { Component, OnInit } from '@angular/core';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { Cidadao } from '@pages/cidadao/_models/cidadao.model';
import { CidadaoService } from '@pages/cidadao/_services/cidadao.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { ProdutoServicoService } from '@pages/produto-servico/_services/produto-servico.service';
import { FiltroRelatorioDTO } from '@pages/relatorio/_models/relatorio-entrada-material.model';
import { RelatorioMovimentacaoSaidaPorCidadao } from '@pages/relatorio/_models/relatorio-saida-material.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { StatusFluxo } from '@pages/shared/models/fluxo.model';
import { BaseService } from '@pages/shared/services/base.service';
import { TipoProduto } from '@pages/tipo-produto/_models/tipoproduto.model';
import { TipoProdutoService } from '@pages/tipo-produto/_services/tipoproduto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-movimentacao-por-saida-cidadao-resumido',
  templateUrl: './movimentacao-por-saida-cidadao-resumido.component.html',
  styleUrls: ['../almoxarifado.component.scss'],
})
export class RelatorioMovimentacaoPorSaidaCidadaoResumidoComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private cidadaoService: CidadaoService,
    private produtoService: ProdutoServicoService,
    private secretariaFundoService: SecretariaFundoService,
    private relatorioAlmoxarifado: RelatorioAlmoxarifadoService,
    private tipoProdutoService: TipoProdutoService,
    private baseService: BaseService
  ) {}

  statusFluxo: StatusFluxo[];
  selectedExercicio: number = 0;
  secretariaFundos: SecretariaFundo[];
  almoxarifados: Almoxarifado[];
  cidadoes: Cidadao[];
  produtos: ProdutoServico[];
  optionSecretariaFundo = 0;
  selectedSecretariaFundo: number[];
  optionAlmoxarifado = 0;
  selectedAlmoxarifado: number[];
  optionSetor = 0;
  selectedSetor: number[];
  optionCidadao = 0;
  selectedCidadao: number[];
  optionProdutos = 0;
  selectedProdutos: number[];
  dataInicialSelecionada: string;
  dataFinalSelecionada: string;
  selectedTipoProdutos: number[];
  optionTipoProduto = 0;
  tiposProduto: TipoProduto[];

  ngOnInit(): void {
    console.log('Relatorio de Movimentação por setor resumido');

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

    this.cidadaoService.listarTodos().subscribe({
      next: (cidadao) => {
        this.cidadoes = cidadao;
        console.log(cidadao)
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
    const relatorioMovimentacaoSaida: FiltroRelatorioDTO = {
      secretaria: this.optionSecretariaFundo,
      secretaria_selecionadas: this.selectedSecretariaFundo,
      almoxarifado: this.optionAlmoxarifado,
      almoxarifado_selecionado: this.selectedAlmoxarifado,
      //cidadao: this.optionCidadao,
      //cidadao_selecionado: this.selectedCidadao,
      produtoServico: this.optionProdutos,
      produtoServico_selecionado: this.selectedProdutos,
      data_inicial: this.dataInicialSelecionada,
      data_final: this.dataFinalSelecionada,
      tipo_produto: this.optionTipoProduto,
      tipo_produto_selecionado: this.selectedTipoProdutos,
    };
    this.relatorioAlmoxarifado.movimentacaoSaidaMaterialPorCidadao(relatorioMovimentacaoSaida).subscribe({
      next: (res) => {
        this.baseService.relatorioMensagemModoImpressao(res, 'RelatorioMovimentacaoSaidaPorCidadaoResumido');
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
