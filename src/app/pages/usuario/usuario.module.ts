import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxMaskModule } from 'ngx-mask';
import { DataTablesModule } from 'angular-datatables';
import { UsuarioRoutingModule } from './usuario.routing.module';
import { UsuarioCriarComponent } from './criar/usuario-criar.component';
import { UsuarioListarComponent } from './listar/usuario-listar.component';
import { UsuarioEditarComponent } from './editar/usuario-editar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsuarioEditarSenhaComponent } from './editar-senha/usuario-editarsenha.component';
import { PermissionModule } from '@pages/shared/permission/permission.module';

@NgModule({
  declarations: [UsuarioCriarComponent, UsuarioEditarComponent, UsuarioListarComponent, UsuarioEditarSenhaComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    DataTablesModule,
    NgSelectModule,
    PermissionModule
  ],
})
export class UsuarioModule {}
