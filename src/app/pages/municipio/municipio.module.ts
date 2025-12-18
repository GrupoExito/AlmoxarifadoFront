import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MunicipioCriarComponent } from './criar/municipio-criar.component';
import { MunicipioEditarComponent } from './editar/municipio-editar.component';
import { MunicipioListarComponent } from './listar/municipio-listar.component';
import { MunicipioRoutingModule } from './municipio.routing.module';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [MunicipioCriarComponent, MunicipioEditarComponent, MunicipioListarComponent],
  imports: [
    CommonModule,
    MunicipioRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
  ],
})
export class MunicipioModule {}
