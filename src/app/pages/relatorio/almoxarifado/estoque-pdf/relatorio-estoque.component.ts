import { Component, OnInit } from '@angular/core';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { RelatorioBalanceteEstoque } from '@pages/relatorio/_models/relatorio-almoxarifado.model';
import { RelatorioAlmoxarifadoService } from '@pages/relatorio/_services/relatorio-movimentacao-almoxarifado.service';
import { BaseService } from '@pages/shared/services/base.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-estoque',
  templateUrl: './relatorio-estoque.component.html',
})
export class RelatorioEstoqueComponent implements OnInit {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private relatorioAlmoxarifado: RelatorioAlmoxarifadoService,
    private baseService: BaseService
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
    console.log('Relatorio de Estoque PDF');

    this.almoxarifadoService.listarAtivos().subscribe({
      next: (almoxarifado) => {
        this.almoxarifados = almoxarifado;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filtrar() {
    Swal.showLoading();
    const relatorioBalanceteEstoque: RelatorioBalanceteEstoque = {
      almoxarifado: this.optionAlmoxarifado,
      almoxarifado_selecionado: this.selectedAlmoxarifado,
    };

    this.relatorioAlmoxarifado.Estoque(relatorioBalanceteEstoque).subscribe({
      next: (res) => {
        this.baseService.relatorioMensagemModoImpressao(res, 'RelatorioEstoque');
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}