import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoCompraComponent } from './pedido-compra.component';
import { PedidoCompraContratoCadastroComponent } from './cadastro/porContrato/compra-contrato-cadastro.component';
import { PedidoCompraSDCadastroComponent } from './cadastro/porSD/compra-sd-cadastro.component';
import { PedidoCompraListarComponent } from './listar/pedido-compra-listar.component';
import { PedidoCompraVisualizarComponent } from './visualizar/pedido-compra-visualizar.component';
import { PedidoCompraItemComponent } from './itens/pedido-compra-itens.component';
import { PedidoCompraDotacaoComponent } from './dotacao/pedido-compra-dotacao.component';
import { PedidoCompraAnexoComponent } from './anexo/pedido-compra-anexo.component';
import { PedidoCompraContratoEditarComponent } from './editar/porContrato/compra-contrato-editar.component';
import { PedidoCompraHistoricoComponent } from './historico/pedido-compra-historico.component';
import { PedidoCompraSDEditarComponent } from './editar/porSD/compra-sd-editar.component';
import { ContratoVencidoGuard } from 'src/app/modules/guards/contrato/contrato-vencido.guard';
import { PermissaoUsuarioGuard } from 'src/app/modules/guards/permissao-usuario/permissao-usuario.guard';
import { PedidoCompraAtaCadastroComponent } from './cadastro/porAta/compra-ata-cadastro.component';
import { PedidoCompraSimplificadoCadastroComponent } from './cadastro/simplificado/compra-simplificado-cadastro.component';
import { PedidoCompraAtaEditarComponent } from './editar/porAta/compra-ata-editar.component';

const routes: Routes = [
  {
    path: '',
    component: PedidoCompraComponent,
    children: [
      {
        path: 'cadastro/porcontrato',
        canActivate: [PermissaoUsuarioGuard],
        data: { permissao: { tela: 'Pedido Compra', acao: 'novo_pedido_contrato' } },
        component: PedidoCompraContratoCadastroComponent,
      },
      {
        path: 'cadastro/porsd',
        canActivate: [PermissaoUsuarioGuard],
        data: { permissao: { tela: 'Pedido Compra', acao: 'novo_pedido_dfd' } },
        component: PedidoCompraSDCadastroComponent,
      },
      {
        path: 'cadastro/porata',
        // canActivate: [PermissaoUsuarioGuard],
        // data: { permissao: { tela: 'Pedido Compra', acao: 'novo_pedido_ata' } },
        component: PedidoCompraAtaCadastroComponent,
      },
      {
        path: 'cadastro/simplificado',
        // canActivate: [PermissaoUsuarioGuard],
        // data: { permissao: { tela: 'Pedido Compra', acao: 'novo_pedido_ata' } },
        component: PedidoCompraSimplificadoCadastroComponent,
      },
    ],
  },
  {
    path: 'view/:id',
    canActivate: [PermissaoUsuarioGuard],
    data: { permissao: { tela: 'Pedido Compra', acao: 'visualizar_pedido' } },
    component: PedidoCompraVisualizarComponent,
    children: [
      {
        path: 'cadastro/porcontrato',
        component: PedidoCompraContratoCadastroComponent,
        data: {
          origem: 'contrato',
        },
      },
      {
        path: 'cadastro/porsd',
        component: PedidoCompraSDCadastroComponent,
        data: {
          origem: 'sd',
        },
      },
      {
        path: 'cadastro/porata',
        component: PedidoCompraAtaCadastroComponent,
        data: {
          origem: 'ata',
        },
      },
      {
        path: 'cadastro/simplificado',
        component: PedidoCompraSimplificadoCadastroComponent,
        data: {
          origem: 'simplificado',
        },
      },
      {
        path: 'editar/porcontrato',
        component: PedidoCompraContratoEditarComponent,
      },
      {
        path: 'editar/porsd',
        component: PedidoCompraSDEditarComponent,
      },
      {
        path: 'editar/porata',
        component: PedidoCompraAtaEditarComponent,
      },
      {
        path: 'itens',
        component: PedidoCompraItemComponent,
        canActivate: [ContratoVencidoGuard],
      },
      {
        path: 'dotacao',
        component: PedidoCompraDotacaoComponent,
        canActivate: [ContratoVencidoGuard],
      },
      {
        path: 'anexo',
        component: PedidoCompraAnexoComponent,
      },
      {
        path: 'historico',
        component: PedidoCompraHistoricoComponent,
      },
    ],
  },
  {
    path: 'listar',
    component: PedidoCompraListarComponent,
  },
  { path: '', redirectTo: 'listar', pathMatch: 'full', component: PedidoCompraListarComponent },
  { path: '**', redirectTo: 'listar', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoCompraRoutingModule {}
