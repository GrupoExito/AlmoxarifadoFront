import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Almoxarifado } from '../_models/almoxarifado.model';
import { AlmoxarifadoService } from '../_services/almoxarifado.service';
import { dtOptions } from '@shared/globals';
import { Subject, takeUntil, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '@pages/pessoa/_models/usuario.model';
import { DataTableDirective } from 'angular-datatables';
import { UsuarioService } from '@pages/usuario/_services/usuario.service';

@Component({
  selector: 'app-almoxarifado-listar',
  templateUrl: './almoxarifado-listar.component.html',
  styleUrls: ['./almoxarifado-listar.component.scss'],
})
export class AlmoxarifadoListarComponent implements OnInit, OnDestroy {
  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private route: Router,
    private usuarioService: UsuarioService
  ) {}

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  almoxarifados: Almoxarifado[] = [];
  usuarios: Usuario[] = [];
  usuarioSelecionado = '';

  private isDestroyed = false;
  dtTrigger = new Subject<any>();
  dtOptions: any = {};

  filtroAccordion = false;
  filtroButton = false;

  private destroyed$ = new Subject<void>();
  private dtInitialized = false;

  ngOnInit(): void {
    this.dtOptions = { ...dtOptions, order: [2, 'asc'] };
    this.loadAlmoxarifados(false);
  }

ngOnDestroy(): void {
  // impede rodar duas vezes
  if (this.isDestroyed) return;
  this.isDestroyed = true;

  // encerra streams do takeUntil (isso é seguro)
  if (!this.destroyed$.closed) {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  // tenta destruir o datatable sem deixar promise estourar
  if (this.dtElement) {
    this.dtElement.dtInstance
      .then((dtInstance: DataTables.Api) => {
        try { dtInstance.destroy(true); } catch {}
      })
      .catch(() => {});
  }

  // IMPORTANTE:
  // não complete/unsubscribe o dtTrigger aqui, pois o angular-datatables pode ter feito isso antes.
}


  trackItem(index: number, item: Almoxarifado) {
    return item.id;
  }

  doubleClickRedicionar(almoxarifado: Almoxarifado) {
    this.route.navigate(['/almoxarifado/view', almoxarifado.id, 'editar']);
  }

  editar(id: number = 0): void {
    this.route.navigate(['/almoxarifado', 'editar', id]);
  }

  openAccordion(): void {
    this.filtroButton = !this.filtroButton;

    // Se já abriu uma vez e agora está fechando:
    if (this.filtroAccordion) {
      if (!this.filtroButton) {
        this.limparFiltros();
      }
      return;
    }

    // Primeira vez abrindo: carrega usuários uma vez só
    this.filtroAccordion = true;
    this.usuarioService
      .listarTodos()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (usuarios) => (this.usuarios = usuarios),
        error: () => Swal.fire('Algo deu errado!', 'Não foi possível carregar usuários.', 'error'),
      });
  }

  filtrar(): void {
    Swal.showLoading();

    const parameters = { usuario: this.usuarioSelecionado || '' };

    this.almoxarifadoService
      .filtrar(parameters)
      .pipe(
        takeUntil(this.destroyed$),
        finalize(() => Swal.close())
      )
      .subscribe({
        next: (almoxarifadosFiltrados) => {
          this.almoxarifados = almoxarifadosFiltrados;
          this.refreshTable();
        },
        error: () =>
          Swal.fire('Algo deu errado!', 'Não foi possivel filtrar Usuários do Almoxarifado!', 'error'),
      });
  }

  limparFiltros(): void {
    this.usuarioSelecionado = '';
    this.loadAlmoxarifados(true);
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
      if (!result.value) {
        if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelado!', 'A informação está segura!', 'error');
        }
        return;
      }

      this.almoxarifadoService
        .deletar(id)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.almoxarifados = this.almoxarifados.filter((a) => a.id !== id);
            this.refreshTable(); // garante consistência na tabela
            Swal.fire('Excluído!', 'Almoxarifado excluído!', 'success');
          },
          error: (err) => Swal.fire('Algo deu errado!', err?.error?.message ?? 'Erro ao excluir.', 'error'),
        });
    });
  }

  reativar(id: number = 0): void {
    Swal.fire({
      title: 'Reativar almoxarifado?',
      text: 'Ele voltará a ficar disponível no sistema.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#23b349',
      cancelButtonColor: '#eb2067',
    }).then((result) => {
      if (!result.value) return;

      Swal.showLoading();

      this.almoxarifadoService
        .reativar(id)
        .pipe(
          takeUntil(this.destroyed$),
          finalize(() => Swal.close())
        )
        .subscribe({
          next: () => {
            const item = this.almoxarifados.find((a) => a.id === id);
            if (item) item.ativo = true;

            this.refreshTable();
            Swal.fire('Reativado!', 'Almoxarifado reativado com sucesso.', 'success');
          },
          error: (err) =>
            Swal.fire('Algo deu errado!', err?.error?.message ?? 'Não foi possível reativar.', 'error'),
        });
    });
  }

  private loadAlmoxarifados(refresh: boolean): void {
    this.almoxarifadoService
      .listarAll()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (almoxarifados) => {
          this.almoxarifados = almoxarifados;

          if (refresh) this.refreshTable();
          else this.initOrRefresh();
        },
        error: () => Swal.fire('Algo deu errado!', 'Não foi possível carregar almoxarifados.', 'error'),
      });
  }

private initOrRefresh(): void {
  if (!this.dtInitialized) {
    this.dtInitialized = true;
    if (!this.dtTrigger.closed) this.dtTrigger.next(null);
    return;
  }
  this.refreshTable();
}

private refreshTable(): void {
  if (this.isDestroyed) return;

  if (!this.dtElement) {
    if (!this.dtTrigger.closed) this.dtTrigger.next(null);
    return;
  }

  this.dtElement.dtInstance
    .then((dtInstance: DataTables.Api) => {
      if (this.isDestroyed) return;

      dtInstance.destroy();
      if (!this.dtTrigger.closed) this.dtTrigger.next(null);
    })
    .catch(() => {});
}

}