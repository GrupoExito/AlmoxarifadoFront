import { Component, OnInit } from '@angular/core';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { ProdutoServicoService } from '@pages/produto-servico/_services/produto-servico.service';
import {
  RelatorioMaterialEstoque,
  RelatorioMaterialEstoqueSecretaria,
  RelatorioTransferenciaMaterial,
} from '@pages/relatorio/_models/relatorio-almoxarifado.model';
import { FiltroRelatorioDTO } from '@pages/relatorio/_models/relatorio-entrada-material.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { BaseService } from '@pages/shared/services/base.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-material-estoque-secretaria',
  templateUrl: './material-estoque-secretaria.component.html',
  styleUrls: ['../almoxarifado.component.scss'],
})
export class RelatorioMaterialEstoqueSecretariaComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private produtoService: ProdutoServicoService,
    private relatorioAlmoxarifado: RelatorioAlmoxarifadoService,
    private secretariaFundoService: SecretariaFundoService,
    private baseService: BaseService
  ) {}

  secretariaFundos: SecretariaFundo[];
  produtos: ProdutoServico[];
  almoxarifados: Almoxarifado[];
  selectedAlmoxarifado: number[];
  optionAlmoxarifado = 0;
  optionSecretariaFundo = 0;
  selectedSecretariaFundo: number[];
  optionProdutos = 0;
  selectedProdutos: number[];
  dataInicialSelecionada: string;
  dataFinalSelecionada: string;
  filtroHabilitado: boolean = false;

  ngOnInit(): void {
    console.log('Relatorio de Material Estoque Por Secretaria');

    this.secretariaFundoService.listarTodos().subscribe({
      next: (secretariaFundos) => {
        this.secretariaFundos = secretariaFundos;
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

    this.almoxarifadoService.listarAtivos().subscribe({
      next: (almoxarifado) => {
        this.almoxarifados = almoxarifado;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  resetFiltros() {
    // Limpar os campos selecionados
    this.dataInicialSelecionada = '';
    this.dataFinalSelecionada = '';
    
    this.optionAlmoxarifado = 0;
    this.selectedAlmoxarifado = [];
  
    this.optionSecretariaFundo = 0;
    this.selectedSecretariaFundo = [];
  
    this.optionProdutos = 0;
    this.selectedProdutos = [];
  }
  
  filtrar() {
    Swal.showLoading();
    const relatorioMaterialEstoqueSecretaria: FiltroRelatorioDTO = {
      secretaria: this.optionSecretariaFundo,
      secretaria_selecionadas: this.selectedSecretariaFundo,
      produtoServico: this.optionProdutos,
      produtoServico_selecionado: this.selectedProdutos,
      data_inicial: this.dataInicialSelecionada,
      data_final: this.dataFinalSelecionada,
      almoxarifado: this.optionAlmoxarifado,
      almoxarifado_selecionado: this.selectedAlmoxarifado,
    };
    console.log(relatorioMaterialEstoqueSecretaria, 'envios');
    this.relatorioAlmoxarifado.MaterialEstoquePorSecretaria(relatorioMaterialEstoqueSecretaria).subscribe({
      next: (res) => {
        this.baseService.relatorioMensagemModoImpressao(res, 'RelatorioMaterialEstoqueSecretaria');
        this.resetFiltros();
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
