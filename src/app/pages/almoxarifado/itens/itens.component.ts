import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { dtOptions } from '@pages/shared/globals';
import { AlmoxarifadoService } from '../_services/almoxarifado.service';
import { Almoxarifado } from '../_models/almoxarifado.model';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { RelatorioMaterialEstoque } from '@pages/relatorio/_models/relatorio-almoxarifado.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemAlmoxarifado } from '../_models/itemAlmoxarifado.model';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
})
export class AlmoxarifadoItemComponent implements OnInit {
  constructor(private almoxarifadoService: AlmoxarifadoService, private modalService: NgbModal) {}

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  almoxarifado: Almoxarifado;
  produtosServico: ProdutoServico;
  itens: ItemAlmoxarifado[];
  itensModal: ItemAlmoxarifado[];
  almoxarifado_id: number;
  itemSelecionado: number;
  dtOptions: any;
  dtTrigger = new Subject<any>();

  ngOnInit(): void {
    console.log('Itens');
    this.dtOptions = dtOptions;
    this.almoxarifado_id = this.almoxarifadoService.getRouteId()!;

    this.almoxarifadoService.GetMaterialEstoque(this.almoxarifado_id).subscribe({
      next: (item) => {
        console.log(item);
        this.itens = item;
        this.dtTrigger.next(null);
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  public trackItem(index: number, item: RelatorioMaterialEstoque) {
    return item.almoxarifado;
  }

  exibirModal(modal_content: any, item_id: number) {
    this.itemSelecionado = item_id;
    this.itensModal = [];
    this.modalService.open(modal_content, { ariaLabelledBy: 'modal-basic-title' });
    this.almoxarifadoService.GetMaterialEstoqueItem(this.almoxarifado_id, this.itemSelecionado).subscribe({
      next: (item) => {
        console.log(item, 'movimentações do item');
        this.itensModal = item;
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
