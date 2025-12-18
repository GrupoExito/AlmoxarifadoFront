import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CotacaoFornecedorItem,
  CotacaoFornecedorItemPreco,
  CotacaoFornecedorItemPrecoPorLink,
} from '@pages/cotacao/_models/cotacao-fornecedor-item.model';
import { CotacaoFornecedorService } from '@pages/cotacao/_services/cotacao-fornecedor.serivce';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Fornecedor } from '../_models/fornecedor.model';
import { FornecedorService } from '../_services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-link',
  templateUrl: './fornecedor-link.component.html',
})
export class FornecedorLinkComponent implements OnInit {
  constructor(
    private cotacaoFornecedorService: CotacaoFornecedorService,
    private fornecedorService: FornecedorService,
    private routeActive: ActivatedRoute
  ) {}

  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  id: string;
  nome_responsavel: string = '';
  cpf_responsavel: string = '';
  cotacaoFornecedorItens: CotacaoFornecedorItem[];
  fornecedor: Fornecedor;
  validado = false;
  statusCotacao = false;
  cnpj_fornecedor: string;
  email_fornecedor: string;
  ngOnInit(): void {
    console.log('fornecedor link');
    this.dtOptions = dtOptions;
    this.id = this.routeActive.snapshot.paramMap.get('id')!;
    this.cotacaoFornecedorService.listarFornecedorItensLotePorLink(this.id).subscribe({
      next: (cotacaoFornecedorItens) => {
        console.log(cotacaoFornecedorItens);
        this.cotacaoFornecedorItens = cotacaoFornecedorItens;
        if (this.cotacaoFornecedorItens[0].flstatus_id == 10) {
          this.statusCotacao = true;
        }
        this.dtTrigger.next(null);

        this.fornecedorService
          .consultarFornecedorCotacaoExterna(this.id, cotacaoFornecedorItens[0].gfornecedor_id)
          .subscribe({
            next: (fornecedor) => {
              this.fornecedor = fornecedor;
            },
            error: () => {},
          });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  atualizarPreco() {
    console.log(this.nome_responsavel, this.cpf_responsavel);
    if (this.nome_responsavel == '' || this.cpf_responsavel == '') {
      Swal.fire('Erro!', 'Digite o nome e o CPF do responsável pelo preenchimento', 'error');
      return;
    }
    let addCotacaoFornecedorItemPreco: CotacaoFornecedorItemPreco[] = [];
    Swal.showLoading();
    for (let i = 0; i < this.cotacaoFornecedorItens.length; i++) {
      var elementValor = <HTMLInputElement>document.getElementById('valor' + this.cotacaoFornecedorItens[i].id);
      var elementButtons = <HTMLInputElement>document.getElementById('marca' + this.cotacaoFornecedorItens[i].id);
      console.log(elementValor.value);
      let itemPreco: CotacaoFornecedorItemPreco = {
        id: this.cotacaoFornecedorItens[i].id,
        valor: elementValor.value ? elementValor.value.replace(',', '.') : '0',
        marca_item: elementButtons.value,
      };
      addCotacaoFornecedorItemPreco.push(itemPreco);
    }

    const cotacaoFornecedorItemPrecoPorLink: CotacaoFornecedorItemPrecoPorLink = {
      uuid: this.id,
      cpf_responsavel: this.cpf_responsavel,
      nome_responsavel: this.nome_responsavel,
      cotacaoFornecedorItemPreco: addCotacaoFornecedorItemPreco,
    };

    this.cotacaoFornecedorService.atualizarPrecoCotacaoFornecedorLink(cotacaoFornecedorItemPrecoPorLink).subscribe({
      next: () => {
        Swal.fire('Atualizado!', 'Preços dos itens atualizados', 'success');
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Erro!', 'Algo deu errado ao atualizar preços!', 'error');
      },
    });
  }

  validarFornecedor() {
    if (this.fornecedor.email === this.email_fornecedor && this.fornecedor.cnpj_cpf === this.cnpj_fornecedor) {
      Swal.fire('Sucesso!', 'Fornecedor Validado!', 'success');
      this.validado = true;
    } else {
      Swal.fire('Erro!', 'Dados do fornecedor inválido!', 'error');
      this.validado = false;
    }
  }

  public trackItem(index: number, item: CotacaoFornecedorItem) {
    return item.id;
  }
}
