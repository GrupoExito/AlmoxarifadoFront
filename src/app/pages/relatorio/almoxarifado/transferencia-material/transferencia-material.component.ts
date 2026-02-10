import { Component, OnInit } from '@angular/core';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { ProdutoServicoService } from '@pages/produto-servico/_services/produto-servico.service';
import { RelatorioTransferenciaMaterial } from '@pages/relatorio/_models/relatorio-almoxarifado.model';
import { FiltroRelatorioDTO } from '@pages/relatorio/_models/relatorio-entrada-material.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { Setor } from '@pages/setor/_models/setor.model';
import { SetorService } from '@pages/setor/_services/setor.service';
import { StatusFluxo } from '@pages/shared/models/fluxo.model';
import { BaseService } from '@pages/shared/services/base.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-transferencia-material',
  templateUrl: './transferencia-material.component.html',
  styleUrls: ['../almoxarifado.component.scss'],
})
export class RelatorioTransferenciamaterialComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private setorService: SetorService,
    private produtoService: ProdutoServicoService,
    private secretariaFundoService: SecretariaFundoService,
    private relatorioAlmoxarifado: RelatorioAlmoxarifadoService,
    private baseService: BaseService
  ) {}

  statusFluxo: StatusFluxo[];
  selectedExercicio: number = 0;
  secretariaFundos: SecretariaFundo[];
  almoxarifados: Almoxarifado[];
  setores: Setor[];
  produtos: ProdutoServico[];
  optionSecretariaFundo = 0;
  selectedSecretariaFundo: number[];
  optionAlmoxarifado = 0;
  selectedAlmoxarifado: number[];
  optionSetor = 0;
  selectedSetor: number[];
  optionProdutos = 0;
  selectedProdutos: number[];
  dataInicialSelecionada: string;
  dataFinalSelecionada: string;

  ngOnInit(): void {
    console.log('Relatorio de transferência material');

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

    this.setorService.listarTodos().subscribe({
      next: (setores) => {
        this.setores = setores;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filtrar() {
    Swal.showLoading();
    const relatorioTransferenciaMaterial: FiltroRelatorioDTO = {
      secretaria: this.optionSecretariaFundo,
      secretaria_selecionadas: this.selectedSecretariaFundo,
      almoxarifado: this.optionAlmoxarifado,
      almoxarifado_selecionado: this.selectedAlmoxarifado,
      setor: this.optionSetor,
      setor_selecionado: this.selectedSetor,
      produtoServico: this.optionProdutos,
      produtoServico_selecionado: this.selectedProdutos,
      data_inicial: this.dataInicialSelecionada,
      data_final: this.dataFinalSelecionada,
    };
    this.relatorioAlmoxarifado.transferenciaMaterial(relatorioTransferenciaMaterial).subscribe({
      next: (res) => {
        this.baseService.relatorioMensagemModoImpressao(res, 'RelatorioTransferenciaMaterial');
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
