import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissaoUsuarioGuard } from 'src/app/modules/guards/permissao-usuario/permissao-usuario.guard';
import { PedidoCompraListarComponent } from './listar/pedido-compra-listar.component';
import { PedidoCompraViewComponent } from './view/pedido-compra-view.component';

const routes: Routes = [
  {
    path: '',
    component: PedidoCompraListarComponent,
  },
  {
    path: 'listar',
    component: PedidoCompraListarComponent,
  },
  {
    path: 'view/:id',
    component: PedidoCompraViewComponent,
  },
  { path: '', redirectTo: 'listar', pathMatch: 'full', component: PedidoCompraListarComponent },
  { path: '**', redirectTo: 'listar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoCompraRoutingModule {}

