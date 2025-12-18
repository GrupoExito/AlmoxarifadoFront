import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Almoxarifado } from '../_models/almoxarifado.model';
import { AlmoxarifadoService } from '../_services/almoxarifado.service';
import { dtOptions } from '@shared/globals';
import { Subject } from 'rxjs';
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
  ) { }

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  almoxarifados: Almoxarifado[];
  dtTrigger = new Subject<any>();
  dtOptions: any = {};
  usuarioSelecionado: string = '';
  filtroAccordion: boolean = false;
  filtroButton: boolean = false;
  usuariosAlmoxarifadoFiltrados: Usuario[];
  usuarios: Usuario[];


  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.dtOptions.order = [2, 'asc'];
    this.almoxarifadoService.listarTodos().subscribe({
      next: (almoxarifado) => {
        this.almoxarifados = almoxarifado;
        this.dtTrigger.next(null);
        console.log(almoxarifado, 'saidas');
      },
      error: (error) => {
        console.log(error);
      },
    });
    console.log(this.almoxarifados);
  }

  doubleClickRedicionar(almoxarifado: Almoxarifado) {
    this.route.navigate(['/almoxarifado/view', almoxarifado.id, 'editar']);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public trackItem(index: number, item: Almoxarifado) {
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
        this.almoxarifadoService.deletar(id).subscribe({
          next: () => {
            this.almoxarifados = this.almoxarifados.filter((almoxarifado) => almoxarifado.id != id);
            Swal.fire('Excluído!', 'Almoxarifado excluído!', 'success');
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

editar(id: number = 0): void {
  console.log('editar almoxarifado id:', id);
  //this.almoxarifadoService.setRouteId(id); // se ainda precisar disso
  this.route.navigate(['/almoxarifado', 'editar', id])
    .then(ok => console.log('navigate result:', ok))
    .catch(err => console.error('navigate error:', err));
}

  carregarAlmoxarifados(): void {
    this.almoxarifadoService.listarTodos().subscribe({
      next: async (almoxarifado) => {
        this.almoxarifados = almoxarifado;

        if (this.dtElement && await this.dtElement.dtInstance) {
          this.rerender();
        } else {

          this.dtTrigger.next(null);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openAccordion() {
    this.filtroButton = !this.filtroButton;
    if (this.filtroAccordion) {
      if (!this.filtroButton) {
        this.limparFiltros();
        this.carregarAlmoxarifados();
      }
      return;
    }
    this.filtroAccordion = true;
    this.usuarioService.listarTodos().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filtrar() {
    Swal.showLoading();
    const parameters = {
      usuario: this.usuarioSelecionado,
    };

    this.almoxarifadoService.filtrar(parameters).subscribe({
      next: (almoxarifadosFiltrados) => {
        this.almoxarifados = almoxarifadosFiltrados;
        this.rerender();
        Swal.close();
      },
      error: () => {
        Swal.fire('Algo deu errado!', 'Não foi possivel filtrar Usuários do Almoxarifado!', 'error');
      },
    });
  }

  limparFiltros() {
    this.usuarioSelecionado = '';
    this.carregarAlmoxarifados();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
}