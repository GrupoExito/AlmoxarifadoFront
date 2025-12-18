import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContratacaoAnexo } from '@pages/contratacao/_models/contratacao-anexo.model';
import Swal from 'sweetalert2';
import { ClienteCotacao } from '../_models/cliente-cotacao.model';
import { CotacaoPostGreeSQL } from '../_models/cotacao-postgrees.model';
import { CotacaoRealizadaService } from '../_services/cotacao-realizada.service';

@Component({
  selector: 'app-cotacao-realizada',
  templateUrl: './cotacao-realizada.component.html',
})
export class CotacaoRealizadaComponent implements OnInit {
  constructor(private cotacaoService: CotacaoRealizadaService) {}

  cotacoesAberto: CotacaoPostGreeSQL[];
  clientes: ClienteCotacao[];
  arquivoCotacao: File;
  selectedMunicipio: string = '';
  selectedCotacao: string = '';
  selectedExercicio: string = '';
  @ViewChild('file') file: ElementRef;

  ngOnInit(): void {
    console.log('Itens Cotados');
    this.cotacaoService.listarClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  selecionarFile(event: Event): void {
    let selecionar = event.target as HTMLInputElement;
    this.arquivoCotacao = selecionar.files![0];
  }

  listarCotacoes() {
    const cliente = this.clientes.find((cliente) => cliente.id == parseInt(this.selectedMunicipio));
    this.cotacaoService.listarCotacoesPorMunicipio(cliente!).subscribe({
      next: (cotacoesAberto) => {
        this.cotacoesAberto = cotacoesAberto;
      },
      error: () => {},
    });
  }

  enviarCotacao() {
    Swal.showLoading();
    const cliente = this.clientes.find((cliente) => cliente.id.toString() == this.selectedMunicipio);

    let formData = new FormData();
    formData.append('cotacao_id', this.selectedCotacao);
    formData.append('municipio_id', this.selectedMunicipio);
    formData.append('exercicio', this.selectedExercicio);
    formData.append('banco', cliente!.banco);
    formData.append('ipservidor', cliente!.ipservidor);
    formData.append('file', this.arquivoCotacao);

    this.cotacaoService.verificarItensCotacao(formData).subscribe({
      next: (res) => {
        this.file.nativeElement.value = '';

        if (res == 0) {
          Swal.fire(
            'Erro!',
            'Não foi identificado nenhum item desse arquivo dentro da cotação e exercício selecionado',
            'error'
          );
          return;
        }

        Swal.fire({
          title: 'Confima?',
          text: `Foram encontrados ${res} itens no arquivo, deseja enviar cotação?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não',
        }).then((result) => {
          if (result.value) {
            Swal.fire({
              title: 'Aguarde um momento...',
              text: 'Importando cotações...',
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });
            this.cotacaoService.enviarCotacao(formData).subscribe({
              next: () => {
                this.file.nativeElement.value = '';
                this.selectedCotacao = '';
                this.selectedExercicio = '';
                Swal.fire('Sucesso!', 'Cotação registrada com sucesso', 'success');
              },
              error: () => {
                Swal.fire('Erro!', 'Algo deu errado ao enviar cotação', 'error');
              },
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelado!', 'Cotação não enviada', 'warning');
          }
        });
      },
      error: () => {
        Swal.fire('Erro!', 'Algo deu errado ao enviar cotação', 'error');
      },
    });
  }

  public trackItem(index: number, item: ContratacaoAnexo) {
    return item.id;
  }
}
