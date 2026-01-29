import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadeMedida } from '@pages/unidade-medida/_models/unidademedida.model';
import { UnidadeMedidaService } from '@pages/unidade-medida/_services/unidademedida.service';
import Swal from 'sweetalert2';
import {
  ProdutoServico,
} from '../_models/produto-servico.model';
import { ProdutoServicoService } from '../_services/produto-servico.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-produto-servico-editar',
  templateUrl: './produto-servico-editar.component.html',
  styleUrls: ['./produto-servico-editar.component.scss'],
})
export class ProdutoServicoEditarComponent implements OnInit {
  produtoServico: ProdutoServico;
  unidadesMedida: UnidadeMedida[];
  editarProdutoServicoForm: FormGroup;
  id: number;
  ativoAlmoxarifado: number = 0;
  produtoServicoEdicao: ProdutoServico;

  constructor(
    private fb: FormBuilder,
    private produtoServicoService: ProdutoServicoService,
    private unidadeMedidaService: UnidadeMedidaService,
    private routeActive: ActivatedRoute,
    private modalService: NgbModal,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));

    this.unidadeMedidaService.listarTodos().subscribe({
      next: (unidadesMedida) => {
        this.unidadesMedida = unidadesMedida;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.editarProdutoServicoForm = this.fb.group({
      descricao: [{ value: '', disabled: true }, Validators.required],
      descricao_almoxarifado: [{ value: '' }, Validators.required],
      unidade_medida_id: [{ value: '', disabled: true }, [Validators.maxLength(30), Validators.required]],
      valor_referencia: [{ value: '', disabled: true }, Validators.required],
      unidade_medida_almoxarifado_id:  ['', [Validators.required]],
      qtde_do_principal:  ['', [Validators.required]],
      codigo_barra: ['', [Validators.pattern(/^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/)]],
    });

    this.produtoServicoService.consultarPorId(this.id).subscribe({
      next: (produtoServico) => {
        this.produtoServicoEdicao = produtoServico;
        this.editarProdutoServicoForm.patchValue({
        ...produtoServico, 
        descricao_almoxarifado: this.stripNewlines(
          produtoServico?.descricao_almoxarifado ?? '',' '
        ),
      });
        
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    this.produtoServicoEdicao.unidade_medida_almoxarifado_id = this.editarProdutoServicoForm.get('unidade_medida_almoxarifado_id')!.value;
    this.produtoServicoEdicao.qtde_do_principal = this.editarProdutoServicoForm.get('qtde_do_principal')!.value;
    this.produtoServicoEdicao.descricao_almoxarifado = this.editarProdutoServicoForm.get('descricao_almoxarifado')!.value;
    this.produtoServicoEdicao.codigo_barra = this.editarProdutoServicoForm.get('codigo_barra')?.value || null;

    this.produtoServicoService.editar(this.id, this.produtoServicoEdicao).subscribe({
      next: () => {
        Swal.fire('Atualizado!', 'Produto ou serviço atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/produtoservico/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  
  stripNewlines(s: string | null | undefined, replaceWith: string = ' '): string {
    return (s ?? '')
      .replace(/\r?\n|\r/g, replaceWith)   // remove \n e \r
      .replace(/\s{2,}/g, ' ')             // colapsa espaços múltiplos
      .trim();
  }

  onCodigoBarraInput(event: Event) {
  const input = event.target as HTMLInputElement;

  // remove tudo que não for número e limita a 14
  const somenteNumeros = input.value.replace(/\D/g, '').slice(0, 14);

  // atualiza input e formControl
  input.value = somenteNumeros;
  this.editarProdutoServicoForm
    .get('codigo_barra')
    ?.setValue(somenteNumeros, { emitEvent: false });
}

}
