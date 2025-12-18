import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-satisfacao',
  templateUrl: './satisfacao.component.html',
})
export class SatisfacaoModalComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
