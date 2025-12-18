import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoDocumentoService } from '@pages/shared/services/tipoDocumento';
import { TipoDocumento } from '@pages/shared/models/tipoDocumento';
import { SaidaMaterialAnexoService } from '../_services/saida-material-anexo.service';
import { SaidaMaterialService } from '../_services/saida-material.service';
import { SaidaMaterial } from '../_models/saida-material.model';
import { SaidaMaterialAnexo } from '../_models/saida-material-anexo.model';
import { BaseService } from '@pages/shared/services/base.service';

@Component({
  selector: 'app-saida-material-anexo',
  templateUrl: './saida-material-anexo.component.html',
})
export class SaidaMaterialAnexoComponent implements OnInit {
  constructor(
    private saidaMaterialAnexoService: SaidaMaterialAnexoService,
    private saidaMaterialService: SaidaMaterialService,
    private authService: AuthService,
    private tipoDocumentoService: TipoDocumentoService,
    protected modalService: NgbModal,
    private baseService: BaseService
  ) {}

  saidaMaterial: SaidaMaterial[];
  saidaMaterialAnexo: SaidaMaterialAnexo[];
  tipoDocumentos: TipoDocumento[];
  @ViewChild('anexo') anexo: ElementRef;
  token: AuthToken | null;
  usuario_id: number = 1;
  closeResult = '';
  selectedTipo: string;
  file: any;
  saida: SaidaMaterial | undefined;

  ngOnInit(): void {
    console.log('Anexos');

    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }
    this.saida = this.saidaMaterialService.sMData.getValue()?.saidaMaterial;

    this.saidaMaterialAnexoService.listarTodos(this.saidaMaterialService.getRouteId()!).subscribe({
      next: (anexos) => {
        this.saidaMaterialAnexo = anexos;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.carregarDropdownTipoDocumento();
  }

  escolherAnexo(event: Event): void {
    this.file = event.target as HTMLInputElement;
  }

  uploadAnexo() {
    let formData = new FormData();

    Swal.fire({
      title: 'Deseja salvar o arquivo com um novo nome?',
      icon: 'question',
      input: 'text',
      inputPlaceholder: 'Digite um nome para o arquivo',
      inputAttributes: { autocapitalize: 'off' },
      showDenyButton: true,
      denyButtonText: 'Manter nome original',
      denyButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Salvar com novo nome',
      confirmButtonColor: '#008000',
      cancelButtonColor: '#FF0000',
    }).then((result) => {
      if (result.isConfirmed || result.isDenied) {
        let fileName = result.value + this.baseService.retornarExtensaoArquivo(result.value);

        if (result.isDenied || !fileName) {
          fileName = this.file.files![0].name;
        }

        if (!this.selectedTipo) {
          return Swal.fire('Erro', 'Selecione um tipo de documento ou anexo', 'error');
        }

        formData.append('saida_id', this.saidaMaterialService.getRouteId()?.toString()!);
        formData.append('file', this.file.files![0]);
        formData.append('nome_arquivo', fileName);
        formData.append('cod_cliente', this.token!.cliente_id.toString());
        formData.append('tipo_documento_id', this.selectedTipo.toString());

        Swal.fire({
          title: 'Enviando arquivo...',
          html: '<div class="custom-spinner"></div>',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
          customClass: {
            popup: 'swal-wide',
          },
        });

        this.saidaMaterialAnexoService.salvarAnexo(formData).subscribe({
          next: () => {
            Swal.close();
            Swal.fire('Salvo!', 'Arquivo gravado com sucesso!', 'success').then(() => {
              window.location.reload();
            });
          },
          error: (err) => {
            Swal.close();
            Swal.fire('Erro', 'Falha ao salvar o arquivo!', 'error');
            console.error(err);
          },
        });
      }
    });
  }

  download(saidaAnexo: SaidaMaterialAnexo): void {
    Swal.showLoading();
    this.saidaMaterialAnexoService.download(saidaAnexo.id).subscribe({
      next: (res) => {
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', saidaAnexo.nome_arquivo);
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

  public trackItem(index: number, item: SaidaMaterialAnexo) {
    return item.id;
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  carregarDropdownTipoDocumento(): void {
    this.tipoDocumentoService.listarTodos().subscribe({
      next: (tipoDocumentos) => {
        this.tipoDocumentos = tipoDocumentos;
        console.log(tipoDocumentos);
      },
      error: (error) => {
        console.log(error);
      },
    });
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
        this.saidaMaterialAnexoService.deletar(id).subscribe({
          next: () => {
            this.saidaMaterial = this.saidaMaterial.filter((saidaMaterial) => saidaMaterial.id != id);
            this.carregarDropdownTipoDocumento();
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
