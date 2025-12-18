import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaidaMateriaListarComponent } from './listar/saida-material-listar.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '@pages/shared/shared.module';
import { DropdownMenusModule } from 'src/app/_metronic/partials';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { SaidaMaterialEditarComponent } from './editar/saida-material-editar.component';
import { SaidaMaterialCriarComponent } from './criar/saida-material-criar.component';
import { SaidaMaterialVisualizarComponent } from './visualizar/saida-material-visualizar.component';
import { SaidaMaterialEtapaComponent } from './etapas/saida-material-etapa.component';
import { SaidaMaterialComponent } from './saida-material.component';
import { SaidaMateriaRoutingModule } from './saida-material.routing.module';
import { SaidaMaterialItemComponent } from './itens/saida-material-itens.component';
import { SaidaMaterialHistoricoComponent } from './historico/saida-material-historico.component';
import { PermissionModule } from '@pages/shared/permission/permission.module';
import { SaidaMateriaListarPorCidadaoComponent } from './listar-por-cidadao/saida-material-listar-por-cidadao.component';
import { SaidaMaterialAnexoComponent } from './anexo/saida-material-anexo.component';
import { SaidaMateriaListarAutorizadorComponent } from './listar-por-autorizador/saida-material-listar-autorizador.component';
import { SaidaMaterialItemAutorizarComponent } from './autorizar/saida-material-itens-autorizar.component';

@NgModule({
  declarations: [
    SaidaMateriaListarComponent,
    SaidaMaterialEditarComponent,
    SaidaMaterialCriarComponent,
    SaidaMaterialVisualizarComponent,
    SaidaMaterialEtapaComponent,
    SaidaMaterialComponent,
    SaidaMaterialItemComponent,
    SaidaMaterialHistoricoComponent,
    SaidaMateriaListarPorCidadaoComponent,
    SaidaMateriaListarAutorizadorComponent,
    SaidaMaterialAnexoComponent,
    SaidaMaterialItemAutorizarComponent,
  ],
  imports: [
    CommonModule,
    SaidaMateriaRoutingModule,
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
export class SaidaMateriaModule {}
