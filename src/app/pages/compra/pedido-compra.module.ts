import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule } from '../../_metronic/partials';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '@pages/shared/shared.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { PedidoCompraRoutingModule } from './pedido-compra-routing.module';
import { PedidoCompraComponent } from './pedido-compra.component';
import { PedidoCompraSDCadastroComponent } from './cadastro/porSD/compra-sd-cadastro.component';
import { PedidoCompraContratoCadastroComponent } from './cadastro/porContrato/compra-contrato-cadastro.component';
import { PedidoCompraListarComponent } from './listar/pedido-compra-listar.component';
import { PedidoCompraEtapaComponent } from './etapas/pedido-compra-etapa.component';
import { PedidoCompraVisualizarComponent } from './visualizar/pedido-compra-visualizar.component';
import { PedidoCompraItemComponent } from './itens/pedido-compra-itens.component';
import { PedidoCompraDotacaoComponent } from './dotacao/pedido-compra-dotacao.component';
import { PedidoCompraAnexoComponent } from './anexo/pedido-compra-anexo.component';
import { PedidoCompraContratoEditarComponent } from './editar/porContrato/compra-contrato-editar.component';
import { PedidoCompraHistoricoComponent } from './historico/pedido-compra-historico.component';
import { PedidoCompraSDEditarComponent } from './editar/porSD/compra-sd-editar.component';
import { ModalAdicionarItemSimplificadoComponent } from './modal-adicionar-item-simplificado/modal-adicionar-item-simplificado.component';
import { PermissionModule } from '@pages/shared/permission/permission.module';
import { PedidoCompraItensAdicionadosComponent } from './itens/componentes/itens-adicionados/compra-itens-adicionados.component';
import { PedidoCompraAdicionarContratoItemComponent } from './itens/componentes/adicionar-itens-contrato-item/adicionar-contrato-item.component';
import { PedidoCompraAdicionarDFDItemComponent } from './itens/componentes/adicionar-itens-compra-dfd/adicionar-compra-dfd.component';
import { PedidoCompraAdicionarContratoValorComponent } from './itens/componentes/adicionara-itens-contrato-valor/adicionar-contrato-valor.component';
import { PedidoCompraAdicionarContratoValorSemControleComponent } from './itens/componentes/adicionar-itens-contrato-valor-semcontrole/adicionar-itens-contrato-valor-semcontrole.component';
import { PedidoCompraAdicionarContratoValorAdicionaValorComponent } from './itens/componentes/adicionar-itens-contrato-valor-adiciona-valor/adicionar-itens-contrato-valor-adiciona-valor.component';
import { PedidoCompraAtaCadastroComponent } from './cadastro/porAta/compra-ata-cadastro.component';
import { PedidoCompraAdicionarAtaItemComponent } from './itens/componentes/adicionar-itens-compra-ata/adicionar-compra-ata.component';
import { PedidoCompraSimplificadoCadastroComponent } from './cadastro/simplificado/compra-simplificado-cadastro.component';
import { PedidoCompraAdicionarItemPedidoSimplificadoComponent } from './itens/componentes/adicionar-itens-pedido-simplificado/adicionar-itens-pedido-simplificado.component';
import { PedidoCompraAtaEditarComponent } from './editar/porAta/compra-ata-editar.component';

@NgModule({
  declarations: [
    PedidoCompraComponent,
    PedidoCompraListarComponent,
    PedidoCompraSDCadastroComponent,
    PedidoCompraContratoCadastroComponent,
    PedidoCompraEtapaComponent,
    PedidoCompraVisualizarComponent,
    PedidoCompraItemComponent,
    PedidoCompraDotacaoComponent,
    PedidoCompraAnexoComponent,
    PedidoCompraContratoEditarComponent,
    PedidoCompraSDEditarComponent,
    PedidoCompraHistoricoComponent,
    ModalAdicionarItemSimplificadoComponent,
    PedidoCompraItensAdicionadosComponent,
    PedidoCompraAdicionarContratoItemComponent,
    PedidoCompraAdicionarDFDItemComponent,
    PedidoCompraAdicionarContratoValorComponent,
    PedidoCompraAdicionarContratoValorSemControleComponent,
    PedidoCompraAdicionarContratoValorAdicionaValorComponent,
    PedidoCompraAdicionarItemPedidoSimplificadoComponent,
    PedidoCompraAtaCadastroComponent,
    PedidoCompraAdicionarAtaItemComponent,
    PedidoCompraSimplificadoCadastroComponent,
    PedidoCompraAtaEditarComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    PedidoCompraRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    NgxCurrencyModule,
    PermissionModule,
  ],
})
export class PedidoCompraModule {}
