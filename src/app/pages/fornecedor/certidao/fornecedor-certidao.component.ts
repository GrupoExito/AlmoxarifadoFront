import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TipoCertidao } from '@pages/tipo-certidao/_models/tipocertidao.model';
import { TipoCertidaoService } from '@pages/tipo-certidao/_services/tipocertidao.service';
import Swal from 'sweetalert2';
import { FornecedorCertidao } from '../_models/certidao.model';
import { Fornecedor } from '../_models/fornecedor.model';
import { FornecedorService } from '../_services/fornecedor.service';
import { RelatorioSDService } from '@pages/relatorio/_services/relatorio-sd.service';
import { ImpressaoDocumentoFornecedor, ImpressaoDocumentoSD } from '@pages/relatorio/_models/relatorio.model';
import { BaseService } from '@pages/shared/services/base.service';

@Component({
  selector: 'app-fornecedor-certidao',
  templateUrl: './fornecedor-certidao.component.html',
  styleUrls: ['./fornecedor-certidao.component.scss'],
})
export class FornecedorCertidaoComponent implements OnInit {
  selectedImpressao: number;

  constructor(
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private tipoCertidaoService: TipoCertidaoService,
    private routeActive: ActivatedRoute,
    private relatorioService: RelatorioSDService,
    private baseService: BaseService
  ) {}

  id: number;
  fornecedor: Fornecedor;
  tipoCertidao: TipoCertidao;
  tiposCertidao: TipoCertidao[];
  fornecedorCertidoes: FornecedorCertidao[];
  selectedFornecedorCertidao: number;
  fornecedorCertidaoForm: FormGroup;
  addFornecedorCertidaoForm: FormGroup;
  file: File | null;

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));

    this.fornecedorCertidaoForm = this.fb.group({
      id: [''],
      cnpj_cpf: [''],
      razao_social: [''],
    });

    this.addFornecedorCertidaoForm = this.fb.group({
      tipo_certidao_id: ['', [Validators.required]],
      numero: [''],
      data_emissao: [''],
      data_validade: [''],
    });

    this.fornecedorCertidaoForm.disable();

    this.fornecedorService.consultarPorId(this.id).subscribe({
      next: (fornecedor) => {
        this.fornecedor = fornecedor;
        this.fornecedorCertidaoForm.patchValue(fornecedor);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.tipoCertidaoService.listarTodos().subscribe({
      next: (tiposCertidao) => {
        this.tiposCertidao = tiposCertidao;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.fornecedorService.listarFornecedorCertidao(this.id).subscribe({
      next: (fornecedorCertidoes) => {
        this.fornecedorCertidoes = fornecedorCertidoes;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public trackItem(index: number, item: FornecedorCertidao) {
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
        this.fornecedorService.deletarFornecedorCertidao(id).subscribe({
          next: () => {
            this.fornecedorCertidoes = this.fornecedorCertidoes.filter((Certidao) => Certidao.id != id);
            Swal.fire('Excluído!', 'Certidão removida desse fornecedor!', 'success');
          },
          error: (err) => {
            Swal.fire('Algo deu errado!', err.error.message, 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  adicionar(): void {
    Swal.showLoading();
    this.tipoCertidao = this.tiposCertidao.find(
      (tipoCertidao) => tipoCertidao.id == this.addFornecedorCertidaoForm.get('tipo_certidao_id')!.value
    )!;

    let formData = new FormData();
    formData.append('fornecedor_id', this.id.toString());
    formData.append('numero', this.addFornecedorCertidaoForm.get('numero')!.value);
    formData.append('tipo_certidao_id', this.addFornecedorCertidaoForm.get('tipo_certidao_id')!.value);
    formData.append('data_emissao', this.addFornecedorCertidaoForm.get('data_emissao')!.value);
    formData.append('data_validade', this.addFornecedorCertidaoForm.get('data_validade')!.value);
    formData.append('tipo_certidao_descricao', this.tipoCertidao.descricao);
    formData.append('file', this.file!);

    this.fornecedorService.criarFornecedorCertidao(formData).subscribe({
      next: () => {
        this.fornecedorService.listarFornecedorCertidao(this.id).subscribe({
          next: (fornecedorCertidoes) => {
            this.fornecedorCertidoes = fornecedorCertidoes;
          },
          error: (error) => {
            console.log(error);
          },
        });

        Swal.fire('Criado!', 'Certidão adicionada com sucesso!', 'success');
        this.addFornecedorCertidaoForm.reset();
        this.file = null;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  download(anexo: FornecedorCertidao): void {
    Swal.showLoading();
    this.fornecedorService.downloadCertidao(anexo.id!).subscribe({
      next: (res) => {
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', anexo.nome_arquivo!);
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

  escolherAnexo(event: any): void {
    if (event.target.files && event.target.files.length) {
      if (event.target.files[0]?.size > 3080173) {
        Swal.fire('Erro', 'Tamanho ultrapassa o valor de 3mbs', 'error');
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        this.file = event.target.files[0];
        Swal.fire('Sucesso', 'Anexado com sucesso', 'success');
      }
    }
  }

  imprimir() {
    Swal.showLoading();
    let documento: ImpressaoDocumentoFornecedor = {
      fornecedor_id: this.id!,
    };
    this.fornecedorService.impressaoCRC(documento).subscribe({
      next: (res) => {
        console.log(res, 'retorno');
        this.baseService.relatorioMensagemModoImpressao(res, 'Default');
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
