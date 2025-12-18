import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import Swal from 'sweetalert2';
import { SigaForm } from '../_model/siga.model';
import { SigaService } from '../_services/siga.service';

@Component({
  selector: 'app-siga-exportar',
  templateUrl: './siga-exportar.component.html',
  styleUrls: ['./siga-exportar.component.scss'],
})
export class SigaExportarComponent implements OnInit, OnDestroy {
  constructor(private service: SigaService, private fb: FormBuilder) {}

  anos: number[] = [2025, 2024, 2023, 2022, 2021];
  meses: any[] = [
    { codigo: 1, valor: 'Janeiro' },
    { codigo: 2, valor: 'Fevereiro' },
    { codigo: 3, valor: 'Março' },
    { codigo: 4, valor: 'Abril' },
    { codigo: 5, valor: 'Maio' },
    { codigo: 6, valor: 'Junho' },
    { codigo: 7, valor: 'Julho' },
    { codigo: 8, valor: 'Agosto' },
    { codigo: 9, valor: 'Setembro' },
    { codigo: 10, valor: 'Outubro' },
    { codigo: 11, valor: 'Novembro' },
    { codigo: 12, valor: 'Dezembro' },
  ];

  tipos: any[] = [
    { codigo: 1, valor: 'Licitacao' },
    { codigo: 2, valor: 'Publicacao' },
    { codigo: 4, valor: 'Item' },
    { codigo: 8, valor: 'Participante' },
    { codigo: 16, valor: 'Cotacao' },
    { codigo: 32, valor: 'Certidao' },
    { codigo: 64, valor: 'Dispensa' },
    { codigo: 128, valor: 'EditalCadastro' },
    { codigo: 256, valor: 'EditalDotacao' },
    { codigo: 512, valor: 'EditalEndereco' },
    { codigo: 1024, valor: 'Contrato' },
    { codigo: 2048, valor: 'CertidaoContrato' },
    { codigo: 4096, valor: 'CertidaoAditivoContrato' },
    { codigo: 8192, valor: 'AditivoContrato' },
    { codigo: 16384, valor: 'RescisaoContrato' },
    { codigo: 32768, valor: 'DotacaoContrato' },
  ];

  tiposInt: number[] = [];
  exportarForm: FormGroup;

  ngOnInit(): void {
    this.exportarForm = this.fb.group({
      ano: ['', [Validators.required]],
      mes: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    //this.dtTrigger.unsubscribe();
  }

  public trackItem(index: number, item: any) {
    return item.id;
  }

  validarForm() {
    if (this.exportarForm.valid && this.tiposInt.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  exportar(form: SigaForm): void {
    if (this.validarForm()) {
      const soma: number = this.tiposInt.reduce((acumulador, numero) => acumulador + numero, 0);

      Swal.fire({
        title: 'Tem certeza?',
        text: 'Gerar os arquivos de exportação!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        confirmButtonColor: '#23b349',
        cancelButtonColor: '#eb2067',
      }).then((result) => {
        if (result.value) {
          this.service.exportar(form.ano, form.mes, soma).subscribe({
            next: (data) => {
              const blob = new Blob([data], { type: 'application/zip' });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'siga.zip');
              document.body.appendChild(link);
              link.click();
              link.remove();

              Swal.fire('Gerado!', 'Arquivos gerados!', 'success');
            },
            error: () => {
              Swal.fire('Algo deu errado!', 'Não foi possivel gerar arquivos!', 'error');
            },
          });
        }
      });
    }
  }
}
