import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntradaMateriaListarComponent } from './listar/entrada-material-listar.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '@pages/shared/shared.module';
import { EntradaMateriaRoutingModule } from './entrada-material.routing.module';
import { EntradaMaterialCriarComponent } from './criar/entrada-material-criar.component';
import { EntradaMaterialEditarComponent } from './editar/entrada-material-editar.component';
import { DropdownMenusModule } from 'src/app/_metronic/partials';
import { NgSelectModule } from '@ng-select/ng-select';
import { EntradaMaterialVisualizarComponent } from './visualizar/entrada-material-visualizar.component';
import { NgxMaskModule } from 'ngx-mask';
import { EntradaMaterialEtapaComponent } from './etapas/entrada-material-etapa.component';
import { EntradaMaterialComponent } from './entrada-material.component';
import { EntradaMaterialItemComponent } from './itens/entrada-material-itens.component';
import { EnderecoModule } from '@pages/endereco/endereco.module';
import { EntradaMaterialHistoricoComponent } from './historico/entrada-material-historico.component';
import { PermissionModule } from '@pages/shared/permission/permission.module';
import { EntradaMaterialAnexoComponent } from './anexo/entrada-material-anexo.component';

@NgModule({
  declarations: [
    EntradaMateriaListarComponent,
    EntradaMaterialEditarComponent,
    EntradaMaterialCriarComponent,
    EntradaMaterialVisualizarComponent,
    EntradaMaterialEtapaComponent,
    EntradaMaterialComponent,
    EntradaMaterialAnexoComponent,
    EntradaMaterialItemComponent,
    EntradaMaterialHistoricoComponent,
    
    
  ],
  imports: [
    CommonModule,
    EntradaMateriaRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
    NgbModule,
    DropdownMenusModule,
    NgbDropdownModule,
    FormsModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    EnderecoModule,
    PermissionModule,
  ],
})
export class EntradaMateriaModule {}
