import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoDocumentoService } from '@pages/shared/services/tipoDocumento';
import { TipoDocumento } from '@pages/shared/models/tipoDocumento';
import { EntradaMaterialAnexoService } from '../_services/entrada-material-anexo.service';
import { EntradaMaterialService } from '../_services/entrada-material.service';
import { EntradaMaterial } from '../_models/entrada-material.model';
import { EntradaMaterialAnexo } from '../_models/entrada-material-anexo.model';
import { BaseService } from '@pages/shared/services/base.service';

@Component({
  selector: 'app-entrada-material-anexo',
  templateUrl: './entrada-material-anexo.component.html',
})
export class EntradaMaterialAnexoComponent implements OnInit {
  constructor(
    private entradaMaterialAnexoService: EntradaMaterialAnexoService,
    private entradaMaterialService: EntradaMaterialService,
    private authService: AuthService,
    private tipoDocumentoService: TipoDocumentoService,
    protected modalService: NgbModal,
    private baseService: BaseService
  ) {}

  entradaMaterial: EntradaMaterial[];
  entradaMaterialAnexo: EntradaMaterialAnexo[];
  tipoDocumentos: TipoDocumento[];
  @ViewChild('anexo') anexo: ElementRef;
  token: AuthToken | null;
  usuario_id: number = 1;
  closeResult = '';
  selectedTipo: string;
  file: any;
  entrada: EntradaMaterial | undefined;

  ngOnInit(): void {
    console.log('Anexos');

    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }
    this.entrada = this.entradaMaterialService.eMData.getValue()?.entradaMaterial;

    this.entradaMaterialAnexoService.listarTodos(this.entradaMaterialService.getRouteId()!).subscribe({
      next: (anexos) => {
        this.entradaMaterialAnexo = anexos;
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

        formData.append('entrada_id', this.entradaMaterialService.getRouteId()?.toString()!);
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

        this.entradaMaterialAnexoService.salvarAnexo(formData).subscribe({
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

  download(entradaAnexo: EntradaMaterialAnexo): void {
    Swal.showLoading();
    this.entradaMaterialAnexoService.download(entradaAnexo.id).subscribe({
      next: (res) => {
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', entradaAnexo.nome_arquivo);
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

  public trackItem(index: number, item: EntradaMaterialAnexo) {
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
        this.entradaMaterialAnexoService.deletar(id).subscribe({
          next: () => {
            this.entradaMaterial = this.entradaMaterial.filter((entradaMaterial) => entradaMaterial.id != id);
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
