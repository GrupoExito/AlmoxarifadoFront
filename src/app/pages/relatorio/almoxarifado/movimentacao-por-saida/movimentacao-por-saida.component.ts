import { Component, OnInit } from '@angular/core';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { Fornecedor } from '@pages/fornecedor/_models/fornecedor.model';
import { FornecedorService } from '@pages/fornecedor/_services/fornecedor.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { ProdutoServicoService } from '@pages/produto-servico/_services/produto-servico.service';
import { RelatorioMovimentacaoEntrada } from '@pages/relatorio/_models/relatorio-entrada-material.model';
import { RelatorioMovimentacaoSaida } from '@pages/relatorio/_models/relatorio-saida-material.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { Setor } from '@pages/setor/_models/setor.model';
import { SetorService } from '@pages/setor/_services/setor.service';
import { StatusFluxo } from '@pages/shared/models/fluxo.model';
import { BaseService } from '@pages/shared/services/base.service';
import { TipoProduto } from '@pages/tipo-produto/_models/tipoproduto.model';
import { TipoProdutoService } from '@pages/tipo-produto/_services/tipoproduto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-movimentacao-por-saida',
  templateUrl: './movimentacao-por-saida.component.html',
  styleUrls: ['../almoxarifado.component.scss'],
})
export class RelatorioMovimentacaoPorSaidaComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private setorService: SetorService,
    private produtoService: ProdutoServicoService,
    private secretariaFundoService: SecretariaFundoService,
    private relatorioAlmoxarifado: RelatorioAlmoxarifadoService,
    private tipoProdutoService: TipoProdutoService,
    private baseService: BaseService
  ) {}

  statusFluxo: StatusFluxo[];
  secretariaFundos: SecretariaFundo[];
  almoxarifados: Almoxarifado[];
  setores: Setor[];
  produtos: ProdutoServico[];
  optionSecretariaFundo = '0';
  selectedSecretariaFundo: number[];
  optionAlmoxarifado = '0';
  selectedAlmoxarifado: number[];
  optionSetor = '0';
  selectedSetor: number[];
  optionProdutos = '0';
  selectedProdutos: number[];
  dataInicialSelecionada: string;
  dataFinalSelecionada: string;
  selectedTipoProdutos: number[];
  optionTipoProduto = '0';
  tiposProduto: TipoProduto[];

  ngOnInit(): void {
    console.log('Relatorio de Movimentação por saida');

    this.secretariaFundoService.listarTodos().subscribe({
      next: (secretariaFundos) => {
        this.secretariaFundos = secretariaFundos;
      },
      error: (error) => {
        console.log(error);
      },
    });

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

    this.setorService.listarTodos().subscribe({
      next: (setor) => {
        this.setores = setor;
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
    const relatorioMovimentacaoSaida: RelatorioMovimentacaoSaida = {
      secretaria: this.optionSecretariaFundo,
      secretaria_selecionadas: this.selectedSecretariaFundo,
      almoxarifado: this.optionAlmoxarifado,
      almoxarifado_selecionado: this.selectedAlmoxarifado,
      setor: this.optionSetor,
      setor_selecionado: this.selectedSetor,
      produto: this.optionProdutos,
      produto_selecionado: this.selectedProdutos,
      data_inicial: this.dataInicialSelecionada,
      data_final: this.dataFinalSelecionada,
      tipo_produto: this.optionTipoProduto,
      tipo_produto_selecionado: this.selectedTipoProdutos,
    };
    this.relatorioAlmoxarifado.movimentacaoSaidaMaterial(relatorioMovimentacaoSaida).subscribe({
      next: (res) => {
        this.baseService.relatorioMensagemModoImpressao(res, 'RelatorioMovimentacaoSaida');
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
