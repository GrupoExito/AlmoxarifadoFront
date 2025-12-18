import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CotacaoFornecedorItem,
  CotacaoFornecedorItemPreco,
  CotacaoFornecedorItemPrecoPorLink,
} from '@pages/cotacao/_models/cotacao-fornecedor-item.model';
import { dtOptions } from '@pages/shared/globals';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { AutenticadorArquivo } from '../_models/autenticadorarquivo.model';
import { AutenticadorArquivoAssinatura } from '../_models/autenticadorarquivoassinatura.model';
import { ValidadorService } from '../_services/validador.service';

@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
})
export class ValidadorComponent implements OnInit {
  constructor(
    private validadorService: ValidadorService,
    private routeActive: ActivatedRoute
  ) {}

  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  id: string;

  documento: AutenticadorArquivo;
  assinaturas: AutenticadorArquivoAssinatura[];

  ngOnInit(): void {
    //this.dtOptions = dtOptions;
    this.id = this.routeActive.snapshot.paramMap.get('id')!;

    if(this.id){
        this.validadorService.getAssinaturas(this.id).subscribe(assinaturas => {
          if(assinaturas){
            this.validadorService.getDocumento(this.id).subscribe(documento => {
                this.documento=documento;
                this.assinaturas=assinaturas;

                console.log('documento',documento);
                console.log('assinaturas',assinaturas);
            });
          }else{
            console.log("Documento inválido!")
          }
        });
      }
  }

  atualizarPreco() {
    console.log("atualizar preço");
  }

  validarFornecedor() {
    console.log("validar fornecedor");
  }

  trackItem(index: number, item: AutenticadorArquivoAssinatura) {
    return item.id;
  }
}
