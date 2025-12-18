import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ProdutoServico, ProdutoServicoEstoqueAlmoxarifado } from '../_models/produto-servico.model';
import { ProdutoServicoService } from '../_services/produto-servico.service';
import { ProdutoEstoqueAlmoxarifadoService } from '../_services/produto-servico-estoque-almoxarifado.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';

@Component({
  selector: 'app-produto-estoque-almoxarifado',
  templateUrl: './produto-estoque-almoxarifado.component.html',
  styleUrls: ['./produto-estoque-almoxarifado.component.scss'],
})
export class ProdutoEstoqueAlmoxarifadoComponent implements OnInit {
  produtoServico: ProdutoServico;
  produtoEstoqueAlmoxarifado: ProdutoServicoEstoqueAlmoxarifado[];
  id: number | null;
  dtTrigger = new Subject<any>();
  dtOptions: any = {};
  ProdutoAlmoxarifadoForm: FormGroup;
  route: any;
  almoxarifados: Almoxarifado[];
  selectedAlmoxarifado: number;

  constructor(
    private fb: FormBuilder,
    private produtoEstoqueAlmoxarifadoService: ProdutoEstoqueAlmoxarifadoService,
    private produtoServicoService: ProdutoServicoService,
    private modalService: NgbModal,
    private routeActive: ActivatedRoute,
    private almoxarifadoService: AlmoxarifadoService
  ) {}

  ngOnInit(): void {
    console.log('estoque');
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));

    this.produtoEstoqueAlmoxarifadoService.listarPorId(this.id).subscribe({
      next: (produtoEstoqueAlmoxarifado) => {
        this.produtoEstoqueAlmoxarifado = produtoEstoqueAlmoxarifado;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.produtoServicoService.consultarPorId(this.id).subscribe({
      next: (produtoServico) => {
        this.produtoServico = produtoServico;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.ProdutoAlmoxarifadoForm = this.fb.group({
      almoxarifado_id: ['', [Validators.required]],
      estoque_minimo: ['', [Validators.required]],
    });

    this.carregarDropdownAlmoxarifado();
  }

  criar() {
    Swal.showLoading();
    const produtoServicoEstoqueAlmoxarifado: ProdutoServicoEstoqueAlmoxarifado = {
      almoxarifado_id: this.ProdutoAlmoxarifadoForm.get('almoxarifado_id')!.value,
      produto_servico_id: this.id!,
      estoque_minimo: this.ProdutoAlmoxarifadoForm.get('estoque_minimo')!.value,
    };

    this.produtoEstoqueAlmoxarifadoService.criar(produtoServicoEstoqueAlmoxarifado).subscribe({
      next: () => {
        Swal.fire('Criado!', 'Estoque mínimo adicionado com sucesso!', 'success').then(() => {
          this.ProdutoAlmoxarifadoForm.reset();
          this.produtoEstoqueAlmoxarifadoService.listarPorId(this.id!).subscribe({
            next: (produtoEstoqueAlmoxarifado) => {
              this.produtoEstoqueAlmoxarifado = produtoEstoqueAlmoxarifado;
            },
            error: (error) => {
              console.log(error);
            },
          });
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
        console.log(error);
      },
    });
  }

  openModalEstoque(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  public trackItem(index: number, item: ProdutoServicoEstoqueAlmoxarifado) {
    return item.id;
  }

  carregarDropdownAlmoxarifado(): void {
    this.almoxarifadoService.listarTodos().subscribe({
      next: (almoxarifados) => {
        this.almoxarifados = almoxarifados;
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
        this.produtoEstoqueAlmoxarifadoService.deletar(id).subscribe({
          next: () => {
            this.produtoEstoqueAlmoxarifadoService.listarPorId(this.id!).subscribe({
              next: (produtoEstoqueAlmoxarifado) => {
                this.produtoEstoqueAlmoxarifado = produtoEstoqueAlmoxarifado;
              },
              error: (error) => {
                console.log(error);
              },
            });
            Swal.fire('Excluído!', 'Estoque mínimo excluído!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  atualizarQuantidade(id: number = 0) {
    Swal.fire({
      title: 'Digite a nova quantidade',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Atualizar',
      showLoaderOnConfirm: true,
      preConfirm: (quantidade) => {
        Swal.isLoading();
        const item = {
          id: id,
          estoque_minimo: quantidade,
        };
        this.produtoEstoqueAlmoxarifadoService.editar(this.id!, item).subscribe({
          next: () => {
            this.produtoEstoqueAlmoxarifadoService.listarPorId(this.id!).subscribe({
              next: (produtoEstoqueAlmoxarifado) => {
                this.produtoEstoqueAlmoxarifado = produtoEstoqueAlmoxarifado;
              },
              error: (error) => {
                console.log(error);
              },
            });
            Swal.fire('Atualizado!', 'Item atualizado com sucesso!', 'success');
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      allowOutsideClick: false,
    });
  }
}
