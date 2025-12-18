import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { TermoReferenciaAnexoService } from '../_services/termo-referencia-anexo.service';
import { TermoReferenciaService } from '../_services/termo-referencia.service';
import { TermoReferenciaAnexo } from '../_models/termo-referencia-anexo.model';

@Component({
  selector: 'app-termo-referencia-anexo',
  templateUrl: './termo-referencia-anexo.component.html',
})
export class TermoReferenciaAnexoComponent implements OnInit {
  constructor(
    private termoReferenciaAnexoService: TermoReferenciaAnexoService,
    private termoReferenciaService: TermoReferenciaService
  ) {}

  termoReferenciaAnexo: TermoReferenciaAnexo[];
  @ViewChild('anexo') anexo: ElementRef;

  ngOnInit(): void {
    console.log('Anexos');
    this.termoReferenciaAnexoService.listarTodos(this.termoReferenciaService.getRouteId()!).subscribe({
      next: (trAnexo) => {
        this.termoReferenciaAnexo = trAnexo;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  uploadAnexo(event: Event): void {
    let formData = new FormData();
    let file = event.target as HTMLInputElement;

    Swal.fire({
      title: 'Deseja salvar arquivo com novo nome?',
      icon: 'question',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showDenyButton: true,
      denyButtonText: `Usar nome do arquivo`,
      denyButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Salvar com novo nome',
      confirmButtonColor: '#008000',
      cancelButtonColor: '#FF0000',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        formData.append('termo_referencia_id', this.termoReferenciaService.getRouteId()?.toString()!);
        formData.append('file', file.files![0]);
        const file_upload = result.value + '.' + file.files![0].name.split('.').pop();
        formData.append('nome_arquivo', file_upload);
        // cod: 200 - Pegar código cliente da sessão
        formData.append('cod_cliente', '1');

        this.termoReferenciaAnexoService.salvarAnexo(formData).subscribe({
          next: () => {
            this.anexo.nativeElement.value = '';
            Swal.fire('Salvo!', 'Arquivo gravado com sucesso!', 'success').then((result) => {
              if (result.value) {
                window.location.reload();
              }
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else if (result.isDenied) {
        formData.append('termo_referencia_id', this.termoReferenciaService.getRouteId()?.toString()!);
        formData.append('file', file.files![0]);
        formData.append('cod_cliente', '1');

        this.termoReferenciaAnexoService.salvarAnexo(formData).subscribe({
          next: () => {
            this.anexo.nativeElement.value = '';
            Swal.fire('Salvo!', 'Arquivo gravado com sucesso!', 'success').then((result) => {
              if (result.value) {
                window.location.reload();
              }
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else if (result.isDismissed) {
        this.anexo.nativeElement.value = '';
        Swal.fire('Cancelado!', 'Operação cancelada!', 'warning');
      }
    });
  }

  download(termoReferencia: TermoReferenciaAnexo): void {
    Swal.showLoading();
    this.termoReferenciaAnexoService.download(termoReferencia.id).subscribe({
      next: (res) => {
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', termoReferencia.nome_arquivo);
        document.body.appendChild(link);
        link.click();
        link.remove();
        Swal.close();
        Swal.fire('Sucesso!', 'Download com sucesso!', 'success');
      },
      error: (err) => {
        Swal.fire('Erro', 'Algo deu errado ao realizar download', 'error');
        console.log(err);
      },
    });
  }

  public trackItem(index: number, item: TermoReferenciaAnexo) {
    return item.id;
  }

  deletar(id: number = 0): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não será capaz de recuperar esta informação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#23b349',
      cancelButtonColor: '#eb2067',
    }).then((result) => {
      if (result.value) {
        this.termoReferenciaAnexoService.deletar(id).subscribe({
          next: () => {
            this.termoReferenciaAnexo = this.termoReferenciaAnexo.filter((termoReferenciaAnexo) => termoReferenciaAnexo.id != id);
            Swal.fire('Excluído!', 'Anexo removido!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possível remover esse anexo', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }
}
