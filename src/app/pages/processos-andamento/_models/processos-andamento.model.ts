export class ProcessoAndamento {
  etapa_selecionado: number;
  processo_selecionado: number;
  registro_selecionado: number;
  alteracao_selecionado: number;

  nova_quantidade: number;
  novo_produto: number;
  excluir_produto: number;
  lote: number;

  constructor() {
    this.etapa_selecionado = 1;
    this.processo_selecionado = 0;
    this.registro_selecionado = 0;
    this.alteracao_selecionado = 0;
    this.nova_quantidade = 0;
    this.novo_produto = 0;
    this.excluir_produto = 0;
    this.lote = 0;
  }
}
