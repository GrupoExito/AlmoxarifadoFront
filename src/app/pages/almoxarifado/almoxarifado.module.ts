import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmoxarifadoListarComponent } from './listar/almoxarifado-listar.component';
import { AlmoxarifadoRoutingModule } from './almoxarifado.routing.module';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { AlmoxarifadoCriarComponent } from './criar/almoxarifado-criar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlmoxarifadoEditarComponent } from './editar/almoxarifado-editar.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { AlmoxarifadoEtapaComponent } from './etapas/almoxarifado-etapa.component';
import { SharedModule } from '@pages/shared/shared.module';
import { AlmoxarifadoVisualizarComponent } from './visualizar/almoxarifado-visualizar.component';
import { AlmoxarifadoItemComponent } from './itens/itens.component';
import { PermissionModule } from '@pages/shared/permission/permission.module';
import { AlmoxarifadoUsuarioComponent } from './usuario/almoxarifado-usuario.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AlmoxarifadoCriarComponent,
    AlmoxarifadoEditarComponent,
    AlmoxarifadoListarComponent,
    AlmoxarifadoEtapaComponent,
    AlmoxarifadoVisualizarComponent,
    AlmoxarifadoItemComponent,
    AlmoxarifadoUsuarioComponent,
  ],
  imports: [
    CommonModule,
    AlmoxarifadoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    FormsModule,
    PermissionModule,
    NgSelectModule,
    ],
})
export class AlmoxarifadoModule {}
