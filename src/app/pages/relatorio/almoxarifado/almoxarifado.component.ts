import { Component, OnInit } from '@angular/core';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { Fornecedor } from '@pages/fornecedor/_models/fornecedor.model';
import { FornecedorService } from '@pages/fornecedor/_services/fornecedor.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { ProdutoServicoService } from '@pages/produto-servico/_services/produto-servico.service';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { TipoProduto } from '@pages/tipo-produto/_models/tipoproduto.model';

@Component({
  selector: 'app-relatorio-almoxarifado',
  templateUrl: './almoxarifado.component.html',
  styleUrls: ['./almoxarifado.component.scss'],
})
export class RelatorioAlmoxarifadoComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoServicoService,
    private secretariaFundoService: SecretariaFundoService
  ) {}

  relatorioSelecionado = '0';
  tiposProduto: TipoProduto[];
  almoxarifados: Almoxarifado[];
  fornecedores: Fornecedor[];
  produtos: ProdutoServico[];
  optionTipoItem = '1';
  selectedTipoItem: number;
  secretariaFundos: SecretariaFundo[];
  optionSecretariaFundo = '1';
  selectedSecretariaFundo: number;
  selectedAlmoxarifado: number;
  selectedFornecedor: number;
  selectedProduto: number;
  optionSetor = '1';
  ngOnInit(): void {
    console.log('Almoxarifado');

    this.almoxarifadoService.listarTodos().subscribe({
      next: (almoxarifado) => {
        this.almoxarifados = almoxarifado;
      },
      error: (error) => {
        console.log(error);
      },
    });

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

    this.fornecedorService.listarTodos().subscribe({
      next: (fornecedores) => {
        this.fornecedores = fornecedores;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  carregarTipoProduto() {
    console.log('change');
  }
}
