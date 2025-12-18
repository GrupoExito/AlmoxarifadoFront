import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CotacaoItem } from '@pages/cotacao/_models/cotacao-item.model';
import { Cotacao } from '@pages/cotacao/_models/cotacao.model';
import { CotacaoItemService } from '@pages/cotacao/_services/cotacao-item-service';
import { CotacaoService } from '@pages/cotacao/_services/cotacao-service';
import { dtOptions } from '@pages/shared/globals';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CotacaoAutomatizada } from '../_models/cotacao-automatizada.model';
import { CotacaoAutomatizadaService } from '../_services/cotacao-automatizada.service';

@Component({
  selector: 'app-cotacao-automatizada',
  templateUrl: './cotacao-automatizada.component.html',
})
export class CotacaoAutomatizadaComponent implements OnInit {
  constructor(
    private cotacaoService: CotacaoService,
    private cotacaoItemService: CotacaoItemService,
    private cotacaoAutomatizadaService: CotacaoAutomatizadaService,
    private routeActive: ActivatedRoute
  ) {}

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  id: string;
  nome_responsavel: string = '';
  cpf_responsavel: string = '';

  cotacaoAutomatizada: CotacaoAutomatizada[];
  cotacaoAutomatizadaFiltradas: CotacaoAutomatizada[];
  cotacaoSelecionada: number = 0;
  cotacoes: Cotacao[];
  cotacaoItens: CotacaoItem[];
  itemSelecionado: number = 0;
  validado = true;
  statusCotacao = false;
  cnpj_fornecedor: string;
  email_fornecedor: string;
  selectedItens: any[] = [];
  ngOnInit(): void {
    console.log('Cotacao Automatizada');
    this.dtOptions = dtOptions;
    this.id = this.routeActive.snapshot.paramMap.get('id')!;
    this.cotacaoAutomatizadaService.listarCotacoesAutomatizadas().subscribe({
      next: (cotacaoAutomatizada) => {
        console.log(cotacaoAutomatizada);
        this.cotacaoAutomatizada = cotacaoAutomatizada;
        this.dtTrigger.next(null);
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.cotacaoService.listarTodos().subscribe({
      next: (cotacoes) => {
        this.cotacoes = cotacoes;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  validarFornecedor() {
    console.log('validar');
    if ('emanuel' === this.email_fornecedor && '123' === this.cnpj_fornecedor) {
      Swal.fire('Sucesso!', 'Fornecedor Validado!', 'success');
      this.validado = true;
    } else {
      Swal.fire('Erro!', 'Dados do fornecedor inválido!', 'error');
      this.validado = false;
    }
  }

  validarItens() {
    this.cotacaoItemService.listarItensDaCotacao(this.cotacaoSelecionada).subscribe({
      next: (cotacaoItens) => {
        this.cotacaoItens = cotacaoItens;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filtrarItem() {
    this.cotacaoAutomatizadaFiltradas = this.cotacaoAutomatizada.filter(
      (item) => item.gproduto_servico_id == this.itemSelecionado
    );
    this.rerender();
  }

  selecionarItens(event: any) {
    const id = parseInt(event.target.value, 10);
    let item = this.selectedItens.find((item) => item.id == id);
    if (item) {
      this.selectedItens = this.selectedItens.filter((item) => item.id != id);
    } else {
      const addItem = {
        id: id,
      };
      this.selectedItens.push(addItem);
      console.log(this.selectedItens);
    }
  }

  marcarSelecionados() {
    this.cotacaoAutomatizadaService.marcarSelecionadosCotacoesAutomatizadas(this.selectedItens).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public trackItem(index: number, item: CotacaoAutomatizada) {
    return item.id;
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
}
