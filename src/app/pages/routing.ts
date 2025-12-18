import { Routes } from '@angular/router';
import { PermissaoUsuarioGuard } from '../modules/guards/permissao-usuario/permissao-usuario.guard';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'almoxarifado',
    loadChildren: () => import('./almoxarifado/almoxarifado.module').then((m) => m.AlmoxarifadoModule),
  },
  {
    path: 'localprodutoservico',
    loadChildren: () =>
      import('./local-produto-servico/local-produto-servico.module').then((m) => m.LocalProdutoServicoModule),
  },
  {
    path: 'banco',
    loadChildren: () => import('./banco/banco.module').then((m) => m.BancoModule),
  },
  {
    path: 'fornecedor',
    canActivate: [PermissaoUsuarioGuard],
    data: { permissao: { tela: 'Fornecedor', acao: 'acessar_fornecedor' } },
    loadChildren: () => import('./fornecedor/fornecedor.module').then((m) => m.FornecedorModule),
  },
  {
    path: 'unidademedida',
    loadChildren: () => import('./unidade-medida/unidade-medida.module').then((m) => m.UnidadeMedidaModule),
  },
  {
    path: 'secretariafundo',
    canActivate: [PermissaoUsuarioGuard],
    data: { permissao: { tela: 'Secretaria Fundo', acao: 'acessar_secretaria_fundo' } },
    loadChildren: () => import('./secretaria-fundo/secretaria-fundo.module').then((m) => m.SecretariaFundoModule),
  },
  {
    path: 'produtoservico',
    loadChildren: () => import('./produto-servico/produto-servico.module').then((m) => m.ProdutoServicoModule),
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  {
    path: 'setor',
    canActivate: [PermissaoUsuarioGuard],
    data: { permissao: { tela: 'Setor', acao: 'acessar_setor' } },
    loadChildren: () => import('./setor/setor.module').then((m) => m.SetorModule),
  },
  {
    path: 'pessoa',
    canActivate: [PermissaoUsuarioGuard],
    data: { permissao: { tela: 'Pessoa', acao: 'acessar_pessoa' } },
    loadChildren: () => import('./pessoa/pessoa.module').then((m) => m.PessoaModule),
  },
  {
    path: 'relatorio',
    loadChildren: () => import('./relatorio/relatorio.module').then((m) => m.RelatorioModule),
  },
  {
    path: 'endereco',
    loadChildren: () => import('./endereco/endereco.module').then((m) => m.EnderecoModule),
  },
  {
    path: 'solicitante',
    loadChildren: () => import('./solicitante-material/solicitante-material.module').then((m) => m.SolicitanteModule),
  },
  {
    path: 'entradamaterial',
    canActivate: [PermissaoUsuarioGuard],
    data: { permissao: { tela: 'Almoxarifado', acao: 'acessar_entrada' } },
    loadChildren: () => import('./entrada-material/entrada-material.module').then((m) => m.EntradaMateriaModule),
  },
  {
    path: 'saidamaterial',
    canActivate: [PermissaoUsuarioGuard],
    data: { permissao: { tela: 'Almoxarifado', acao: 'acessar_saida' } },
    loadChildren: () => import('./saida-material/saida-material.module').then((m) => m.SaidaMateriaModule),
  },
  {
    path: 'assinar',
    loadChildren: () => import('./signer/signer.module').then((m) => m.SignerModule),
  },
  {
    path: 'cidadao',
    loadChildren: () => import('./cidadao/cidadao.module').then((m) => m.CidadaoModule),
  },
  {
    path: 'bi',
    loadChildren: () => import('./bi/bi.module').then((m) => m.BiModule),
  },
  {
    path: 'notificacaofornecedor',
    loadChildren: () => import('./notificacaofornecedor/notificacao-fornecedor.module').then((m) => m.NotificacaoFornecedorModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
