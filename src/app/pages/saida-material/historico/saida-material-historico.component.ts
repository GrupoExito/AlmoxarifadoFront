import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { SaidaMaterialService } from '../_services/saida-material.service';
import { SaidaMaterialHistorico } from '../_models/saida-material-historico.model';
import { SaidaMaterial } from '../_models/saida-material.model';
import { SaidaMaterialHistoricoService } from '../_services/saida-material-historico.service';

@Component({
  selector: 'app-saida-material-historico',
  templateUrl: './saida-material-historico.component.html',
  styleUrls: ['./saida-material-historico.component.scss'],
})
export class SaidaMaterialHistoricoComponent implements OnInit {
  constructor(
    private saidaMaterialService: SaidaMaterialService,
    private fb: FormBuilder,
    private saidaMaterialHistoricoService: SaidaMaterialHistoricoService,
    private authService: AuthService
  ) {}

  token: AuthToken | null;
  saidaMaterial: SaidaMaterial;
  saidaMaterialHistorico: SaidaMaterialHistorico[];
  historicoForm: FormGroup;
  id: number | null;
  usuario_id: number = 1;

  ngOnInit(): void {
    console.log('Histórico');
    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }

    this.id = this.saidaMaterialService.getRouteId();

    this.historicoForm = this.fb.group({
      historico: [''],
    });

    this.saidaMaterialService.data$.subscribe((emData) => {
      this.saidaMaterial = emData?.saidaMaterial!;
    });

    this.saidaMaterialHistoricoService.listarTodos(this.id!).subscribe({
      next: (historico) => {
        console.log(historico);
        this.saidaMaterialHistorico = historico;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  criar() {
    Swal.showLoading();
    const eMHistorico: SaidaMaterialHistorico = {
      saida_id: this.id!,
      historico: this.historicoForm.get('historico')!.value,
      gusuario_id: this.usuario_id,
      flstatus_id: this.saidaMaterial.status_id!,
    };

    this.saidaMaterialHistoricoService.salvarObservacao(eMHistorico).subscribe({
      next: () => {
        Swal.fire('Criado!', 'Observação adicionada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.saidaMaterialHistoricoService.listarTodos(this.id!).subscribe({
              next: (historico) => {
                this.historicoForm.controls.historico.setValue('');
                console.log(historico);
                this.saidaMaterialHistorico = historico;
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
