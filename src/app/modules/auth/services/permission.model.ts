import { Injectable } from '@angular/core';
import { ControleAcesso } from '../models/auth.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  controleAcesso: ControleAcesso[] | null = [];
  constructor(private authService: AuthService) {}

  setPermissao() {
    this.controleAcesso = this.authService.getPermissionTokenParse();
  }

  validarPermissao(tela: string, acao: string): boolean {
    if (this.controleAcesso?.length == 0) {
      this.setPermissao();
    }

    var permissao = this.controleAcesso
      ?.filter((acesso: ControleAcesso) => acesso.pagina_nome === tela)
      .find((permissao: ControleAcesso) => permissao.permissao_nome == acao);

    if (permissao) {
      return true;
    }
    return false;
  }
}
