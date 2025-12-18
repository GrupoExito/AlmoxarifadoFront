import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { SignerService } from './_services/signer.service';

@Component({
  selector: 'app-signer',
  templateUrl: './signer.component.html',
  styleUrls: ['./signer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignerComponent implements OnInit, OnDestroy {
  @ViewChild('paginasTumb', { static: true }) paginasTumb: ElementRef;
  @ViewChild('pagina', { static: true }) pagina: ElementRef<HTMLImageElement>;
  @ViewChild('container', { static: true }) container: ElementRef;

  @ViewChild('divRetangular') divRetangular: ElementRef;

  retanguloWidth: number = 208;
  retanguloHeight: number = 50;

  idDocumento: string;

  private isDragging: boolean = false;
  offsetX: number = 0;
  offsetY: number = 0;

  pageOffsetX: number = 0;
  pageOffsetY: number = 0;

  pageNumber: number = 1; //numero da pagina
  numberPage = 0; //total de paginas
  private subscription: Subscription;

  constructor(private service: SignerService, private fb: FormBuilder, private routeActive: ActivatedRoute) {}

  exportarForm: FormGroup;

  ngOnInit(): void {
    this.idDocumento = this.routeActive.snapshot.paramMap.get('id')!;

    this.service.getFileInfo(this.idDocumento).subscribe((x) => {
      this.numberPage = x;
      this.subscription = this.pegarTodasPaginas(this.idDocumento).subscribe({
        next: (arrayPaginas: any[]) => {
          for (let index = 0; index < arrayPaginas.length; index++) {
            const imageUrl: string = URL.createObjectURL(arrayPaginas[index]);

            // Cria uma nova tag <img> e define o atributo src
            const imgTag = document.createElement('img');
            imgTag.src = imageUrl;
            imgTag.alt = 'Pagina';
            imgTag.className = 'imgTumb';
            console.log('i', index);
            imgTag.addEventListener('click', () => this.viewPage(imgTag, index));

            // Adiciona a nova tag <img> à div
            this.paginasTumb.nativeElement.appendChild(imgTag);

            if (index == 1) {
              this.pagina.nativeElement.src = imageUrl;
              this.pageNumber = 1;
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  validarForm() {
    if (this.exportarForm.valid) {
      return true;
    } else {
      return false;
    }
  }

  viewPage(item: HTMLImageElement, numero: number) {
    this.pagina.nativeElement.src = item.src;
    this.pageNumber = numero;
  }

  download() {
    Swal.showLoading();
    this.service.getFile(this.idDocumento).subscribe({
      next: (res) => {
        const url = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.idDocumento + '.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        Swal.fire('Sucesso!', 'Download com sucesso!', 'success');
      },
      error: (err) => {
        Swal.fire('Erro', 'Algo deu errado ao realizar download', 'error');
        console.log(err);
      },
    });
  }

  assinar(item: any) {
    console.log(item);

    Swal.fire({
      title: 'Informe a senha',
      icon: 'question',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Assinar',
      confirmButtonColor: '#008000',
      cancelButtonColor: '#FF0000',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed && result.value != '') {
        this.service
          .assinar(this.idDocumento, {
            x: this.offsetX - this.pagina.nativeElement.offsetLeft,
            y: this.offsetY - this.pagina.nativeElement.offsetTop,
            height: 68,
            width: 108,
            page: this.pageNumber + 1,
            pageHeight: this.pagina.nativeElement.height,
            pageWidth: this.pagina.nativeElement.width,
            password: result.value,
          })
          .subscribe(() => {
            Swal.fire('Salvo!', 'Documento assinado com sucesso!', 'success').then((result) => {
              if (result.value) {
                window.location.reload();
              }
            });
          });
      }
    });
  }

  async gerarImagemDoPDF(fileName: string) {
    // Carrega o PDF a partir do Blob

    for (let index = 1; index <= this.numberPage; index++) {
      this.service.getFileThumbnail(fileName, index).subscribe((page) => {
        const imageUrl: string = URL.createObjectURL(page);

        // Cria uma nova tag <img> e define o atributo src
        const imgTag = document.createElement('img');
        imgTag.src = imageUrl;
        imgTag.alt = 'Pagina';
        imgTag.className = 'imgTumb';

        imgTag.addEventListener('click', () => this.viewPage(imgTag, index));

        // Adiciona a nova tag <img> à div
        this.paginasTumb.nativeElement.appendChild(imgTag);

        if (index == 1) {
          this.pagina.nativeElement.src = imageUrl;
          this.pageNumber = 1;
        }
      });
    }
  }

  pegarTodasPaginas(fileName: string): Observable<any[]> {
    const requests: Observable<any>[] = [];
    for (let index = 1; index <= this.numberPage; index++) {
      requests.push(this.service.getFileThumbnail(fileName, index));
    }
    return forkJoin(requests);
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.offsetX = event.offsetX + this.pagina.nativeElement.offsetLeft;
    this.offsetY = event.offsetY + this.pagina.nativeElement.offsetTop;
  }

  onMouseMove(event: MouseEvent) {}

  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
  }
}
