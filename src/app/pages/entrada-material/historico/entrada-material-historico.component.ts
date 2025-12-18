import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { EntradaMaterialService } from '../_services/entrada-material.service';
import { SolicitacaoDespesaHistoricoService } from '@pages/solicitacao-despesa/_services/solicitacao-despesa-historico.service';
import { EntradaMaterialHistoricoService } from '../_services/entrada-material-historico.service';
import { EntradaMaterial } from '../_models/entrada-material.model';
import { SolicitacaoDespesaHistorico } from '@pages/solicitacao-despesa/_models/solicitacao-despesa-historico.model';
import { EntradaMaterialHistorico } from '../_models/entrada-material-historico.model';

@Component({
  selector: 'app-entrada-material-historico',
  templateUrl: './entrada-material-historico.component.html',
  styleUrls: ['./entrada-material-historico.component.scss'],
})
export class EntradaMaterialHistoricoComponent implements OnInit {
  constructor(
    private entradaMaterialService: EntradaMaterialService,
    private fb: FormBuilder,
    private entradaMaterialHistoricoService: EntradaMaterialHistoricoService,
    private authService: AuthService
  ) {}

  token: AuthToken | null;
  entradaMaterial: EntradaMaterial;
  entradaMaterialHistorico: EntradaMaterialHistorico[];
  historicoForm: FormGroup;
  id: number | null;
  usuario_id: number = 1;

  ngOnInit(): void {
    console.log('Histórico');
    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }

    this.id = this.entradaMaterialService.getRouteId();

    this.historicoForm = this.fb.group({
      historico: [''],
    });

    this.entradaMaterialService.consultarPorId(this.id!).subscribe({
      next: (entrada) => {
        this.entradaMaterial = entrada;
      },
    });

    this.entradaMaterialHistoricoService.listarTodos(this.id!).subscribe({
      next: (historico) => {
        console.log(historico);
        this.entradaMaterialHistorico = historico;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  criar() {
    Swal.showLoading();
    const eMHistorico: EntradaMaterialHistorico = {
      entrada_id: this.id!,
      historico: this.historicoForm.get('historico')!.value,
      gusuario_id: this.usuario_id,
      flstatus_id: this.entradaMaterial.status_id!,
    };

    this.entradaMaterialHistoricoService.salvarObservacao(eMHistorico).subscribe({
      next: () => {
        Swal.fire('Criado!', 'Observação adicionada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.entradaMaterialHistoricoService.listarTodos(this.id!).subscribe({
              next: (historico) => {
                this.historicoForm.controls.historico.setValue('');
                console.log(historico);
                this.entradaMaterialHistorico = historico;
              },
              error: (error) => {
                console.log(error);
              },
            });
          }
        });
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
