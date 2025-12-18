import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ConfiguracaoOrganizacaoService } from '@pages/configuracao-organizacao/_services/configuracao-organizacao.service';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = environment.angularUrl;
  usaBI: boolean | undefined = false;

  constructor(private configuracaoOrganizacaoService: ConfiguracaoOrganizacaoService) {}

  ngOnInit(): void {
    this.consultarConfiguracaoBI();
  }

  async consultarConfiguracaoBI(): Promise<void> {
    const parameters = {
      nome_tela: 'bi',
    };
    return new Promise((resolve, reject) => {
      this.configuracaoOrganizacaoService.ListarConfiguracao(parameters).subscribe({
        next: (configuracao) => {
          this.usaBI = configuracao.find((config) => config.nome_campo == 'bi')?.valor_campo;
          resolve();
        },
        error: (error) => {
          console.log(error);
          reject(error);
        },
      });
    });
  }
}
