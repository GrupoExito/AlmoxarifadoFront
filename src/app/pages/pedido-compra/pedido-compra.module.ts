import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '@pages/shared/shared.module';
import { DropdownMenusModule } from 'src/app/_metronic/partials';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { PermissionModule } from '@pages/shared/permission/permission.module';
import { PedidoCompraRoutingModule } from './pedido-compra.routing.module';
import { PedidoCompraListarComponent } from './listar/pedido-compra-listar.component';
import { PedidoCompraViewComponent } from './view/pedido-compra-view.component';


@NgModule({
  declarations: [
    PedidoCompraListarComponent,
    PedidoCompraViewComponent
  ],
  imports: [
    CommonModule,
    PedidoCompraRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
    NgbModule,
    DropdownMenusModule,
    NgbDropdownModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    FormsModule,
    PermissionModule,
  ],
})
export class PedidoCompraModule {}
