import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { SignerComponent } from './signer.component';
import { SignerRoutingModule } from './signer.routing.module';

@NgModule({
  declarations: [SignerComponent],
  imports: [
    CommonModule,
    SignerRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule,
  ],
})
export class SignerModule {}
