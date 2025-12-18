import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { DataRow } from '../models/dataRow.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor() {}

  formatDate(date?: string): string {
    if (!date || date === '0001-01-01T00:00:00') {
      return '';
    }
    let newDate = new Date(date);
    return newDate.toJSON().split('T')[0];
  }

  formatDateTime(date?: string): string {
    if (!date || date === '0001-01-01T00:00:00') {
      return '';
    }
    let newDate = new Date(date);

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  generateJsonFromExcel(evt: any, columns: Array<string>): Promise<DataRow[]> {
    let data: DataRow[];
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const ab: ArrayBuffer = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(ab);

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      data = XLSX.utils.sheet_to_json(ws, { header: columns });
    };

    reader.readAsArrayBuffer(target.files[0]);

    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(data);
      };
    });
  }

  verificarNulosInterface(objetoInterface: any) {
    Object.keys(objetoInterface).forEach((element) => {
      const key = element as keyof typeof objetoInterface;
      if (typeof objetoInterface[key] === 'string' && objetoInterface[key] == '') {
        delete objetoInterface[key];
      }
    });
  }

  removerNulosEValoresVazios(objeto: any) {
    Object.keys(objeto).forEach((key) => {
      const propriedade = key as keyof typeof objeto;
      if (objeto[propriedade] === null || objeto[propriedade] === undefined || objeto[propriedade] === '') {
        delete objeto[propriedade];
      }
    });
  }

  relatorioMensagemModoImpressao(bytes: ArrayBuffer, impressao_nome: string = 'Default') {
    Swal.fire({
      title: 'Sucesso!',
      icon: 'success',
      html: 'Impressão gerada com sucesso!',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Abrir em nova página',
      confirmButtonColor: '#198754',
      showDenyButton: true,
      denyButtonText: 'Imprimir',
      denyButtonColor: '#0d6efd',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#dc3545',
    }).then((result: any) => {
      console.log(result);
      if (result.isConfirmed) {
        this.mostrarArquivoNovaAba(bytes);
        return;
      } else if (result.isDenied) {
        this.imprimirArquivo(bytes, impressao_nome);
        return;
      }
      Swal.fire('Cancelado', 'impressão cancelada', 'info');
    });
  }

  private mostrarArquivoNovaAba(bytes: ArrayBuffer) {
    const url = window.URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
    window.open(url, '_blank');
  }

  private imprimirArquivo(bytes: ArrayBuffer, impressao_nome: string) {
    const url = window.URL.createObjectURL(new Blob([bytes]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', impressao_nome + '.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  retornarExtensaoArquivo(name: string, options?: { full?: boolean }): string | null {
    if (!name) return null;

    const clean = name.split(/[?#]/)[0];
    const base = clean.split(/[\\/]/).pop() ?? '';

    if (!base || base.startsWith('.')) return null;

    if (options?.full) {
      const firstDot = base.indexOf('.');
      if (firstDot > 0 && firstDot < base.length - 1) {
        return base.slice(firstDot).toLowerCase(); // já inclui o ponto
      }
    } else {
      const lastDot = base.lastIndexOf('.');
      if (lastDot > 0 && lastDot < base.length - 1) {
        return base.slice(lastDot).toLowerCase(); // já inclui o ponto
      }
    }

    return null;
  }
}
