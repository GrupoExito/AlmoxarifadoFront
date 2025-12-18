import { Component, OnInit } from '@angular/core';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import { TermoReferenciaItens } from '../_models/termo-referencia.model';
import { TermoReferenciaService } from '../_services/termo-referencia.service';

@Component({
  selector: 'app-preco-referencial',
  templateUrl: './preco-referencial.component.html',
})
export class PrecoReferencialComponent implements OnInit {
  constructor(private termoReferenciaService: TermoReferenciaService) {}

  itens: TermoReferenciaItens[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    console.log('Preço Referencial');
    this.dtOptions = dtOptions;
    this.termoReferenciaService.consultartrPrecoReferencial(this.termoReferenciaService.getRouteId()!).subscribe({
      next: (itens) => {
        this.itens = itens;
        this.dtTrigger.next(null);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public trackItem(index: number, item: TermoReferenciaItens) {
    return item.gproduto_servico_id;
  }
}
