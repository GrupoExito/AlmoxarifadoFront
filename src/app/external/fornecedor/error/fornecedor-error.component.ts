import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../_services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-error',
  templateUrl: './fornecedor-error.component.html',
})
export class FornecedorErrorComponent implements OnInit {
  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit(): void {
    console.log('fornecedor error');
  }
}
