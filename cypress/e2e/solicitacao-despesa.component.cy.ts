
describe('Teste de SD', () => {

  let secretariaTeste = {
    id: 1,
    descricao: "SECRETARIA DE TESTE UNITÁRIO",
    descricaoresumida: "STU",
    sigla: "AL",
    fundo: true,
    cep: "string",
    logradouro: "string",
    complemento: "string",
    municipio_id: 1,
    bairro: "string",
    cnpj: "string",
    secretaria_fundo_id: 1,
    grupo_secretaria_id: 1,
    orgao_id: 1,
    ativo: true,
    usuario_exclusao_id: 0,
    data_exclusao: null,
    codigo_tcm: 0
  };

  let setorTeste = {
    id: 1,
    nome: "SETOR DE TESTE UNITÁRIO",
    secretaria_id: 1,
    secretaria_descricao: "SECRETARIA DE TESTE UNITÁRIO",
    secretaria_descricao_resumida: "STU",
    secretaria_sigla: "AL"
  }

  let pessoaTeste = {
    id: 1,
    data_cadastro: "2001-12-01T00:00:00",
    cpf: "21312313213",
    rg: "321231321",
    telefone: "7121321231",
    celular: "7121231231",
    orgao_expeditor_rg: "Incidunt voluptate ",
    nome: "Pessoa de teste Unitário",
    nascimento: "2016-12-25T00:00:00",
    usuario_id: 1,
    foto: "",
    assinatura: "asdfaf",
    sexo_id: 1,
    responsavel: null,
    tipo: null
  }

  before(()=> {
    cy.request('https://localhost:44343/api/SecretariaFundo/1')
    .its('body')
    .should('deep.equal', secretariaTeste)

    cy.request('https://localhost:44343/api/setor/1')
    .its('body')
    .should('deep.equal', setorTeste)

    cy.request('https://localhost:44343/api/pessoa/1')
    .its('body')
    .should('deep.equal', pessoaTeste)

  })

  it('Criar SD', () => {
    console.log('criar sd')

    cy.visit('http://localhost:4200')
    cy.visit('solicitacaodespesa/listar')
    cy.get('h3').contains('Solicitações de Despesa')
    cy.get('a').contains('Nova SD').click({force:true})

    cy.get('[formControlName="gsecretaria_fundo_id"] > div > div > div > input')
    .type('Secretaria de Teste Unitario{enter}', {force: true, delay: 300})

    cy.get('[formControlName="gsetor_id"] > div > div > div > input')
    .type('Setor de teste unitario{enter}', {force: true, delay: 300})

    cy.get('[formControlName="gpessoa_responsavel_id"] > div > div > div > input')
    .type('pessoa de teste unitario{enter}', {force: true, delay: 300})

    cy.get('[formControlName="gexercicio_id"]')
    .select('2022', {force: true})

    cy.get('[formControlName="tipo_demanda_id"]')
    .select('4', {force: true})

    cy.get('[formControlName="prioridade"]')
    .select('1', {force: true})

    cy.get('[formControlName="usa_tr"]').then((usatr) => {
      let radio = usatr[1]
      radio.click()
    })

    cy.get('[formControlName="usa_dfd"]').then((usatr) => {
      let radio = usatr[1]
      radio.click()
    })

    cy.get('[formControlName="numero_processo_sd"]')
    .type('123456', {force: true})

    cy.get('[formControlName="numero_tcm"]')
    .type('123456', {force: true})

    cy.get('[formControlName="justificativa"]')
    .type('Justificativa de Teste Unitário', {force: true})

    cy.get('[formControlName="objeto"]')
    .type('Objeto de Teste Unitário', {force: true})

    cy.get('[formControlName="observacao"]')
    .type('Observação de Teste Unitário', {force: true})

    cy.intercept('POST', 'https://localhost:44343/api/solicitacaodespesa').as('criarSD')

    cy.get('button.btn.btn-success').should('not.be.disabled').then((button) => {
      button[0].click()
    })

    cy.wait('@criarSD').then((interceptions) => {
      expect(interceptions.response?.statusCode).eql(200)
      // cy.intercept('DELETE', `https://localhost:44343/api/solicitacaodespesa/${sd_id}`).as('deletarSD')
    })

    cy.get('div.swal2-popup').should('have.class', 'swal2-icon-success');

    cy.get('button.swal2-confirm.swal2-styled').should('not.be.disabled').then((button) => {
      button[0].click()
    })

    cy.visit('solicitacaodespesa/listar')

    cy.get('div.table-responsive > div > div > div > div > label > input')
    .type('1 - Secretaria de Teste Unitário', {force: true, delay: 200})

    cy.get('table.table').find('tr').then((rows) => {
      expect(rows.length).to.be.greaterThan(1)
    })
    /*
    DELETAR SD
    cy.get('button.btn.btn-icon.btn-active-color-danger.btn-md > span.svg-icon.svg-icon-3').should('not.be.disabled').then((button) => {
      button[0].click()
    })

    cy.get('button.swal2-confirm.swal2-styled.swal2-default-outline').should('not.be.disabled').then((button) => {
      button[0].click()
    })

    cy.wait('@deletarSD').then((interceptions) => {
      expect(interceptions.response?.statusCode).eql(200)
    })

    cy.get('button.swal2-confirm.swal2-styled').should('not.be.disabled').then((button) => {
      button[0].click()
    })
    */
  })

  it('Inserir itens na SD', () => {

    cy.get('td').contains('SECRETARIA DE TESTE UNITÁRIO')

    cy.get('button.btn.btn-icon.btn-active-color-primary.btn-md > span > i.fa-solid.fa-eye').should('not.be.disabled').then((button) => {
      button[0].click()
    })

    cy.get('[ng-reflect-router-link="itens"]').should('not.be.disabled').then((button) => {
      button[0].click()
    })

    AddProdutoServico('1', '1')
    AddProdutoServico('1', '10')
    AddProdutoServico('2', '2')
    AddProdutoServico('3', '3')

    cy.get('table.table').find('tr').then((rows) => {
      expect(rows.length).to.be.equal(4)
      expect(rows[1].childNodes[4].textContent).contains('11')
      expect(rows[2].childNodes[4].textContent).contains('2')
      expect(rows[3].childNodes[4].textContent).contains('3')
    })


  })

  it('Inserir dotação na SD', () => {
    cy.get('td').contains('SECRETARIA DE TESTE UNITÁRIO')

    cy.get('[ng-reflect-router-link="dotacao"]').should('not.be.disabled').then((button) => {
      button[0].click()
    })

    cy.get('[ng-reflect-bind-value="orgao_id"] > div > div > div > input')
    .type('Prefeitura{enter}', {force: true, delay: 300})

    cy.get('[ng-reflect-bind-value="projeto_atividade_id"] > div > div > div > input')
    .type('Projeto de teste unitario{enter}', {force: true, delay: 300})

    cy.get('[ng-reflect-bind-value="item_despesa_id"] > div > div > div > input')
    .type('Item de teste unitario{enter}', {force: true, delay: 300})

    cy.get('input[name="dotacao"]').check()

    cy.intercept('POST', 'https://localhost:44343/api/solicitacaodespesadotacao').as('inserirDotacao')

    cy.get('button.btn.btn-sm.btn-primary').should('not.be.disabled').then((button) => {
      button[0].click()
    })

    cy.wait('@inserirDotacao').then((interceptions) => {
      expect(interceptions.response?.statusCode).eql(200)
    })

    cy.get('button.swal2-confirm.swal2-styled').should('not.be.disabled').then((button) => {
      button[0].click()
    })

    cy.wait(1000)

    cy.get('table.table').find('tr').then((rows) => {
      expect(rows[2].childNodes[0].textContent).contains('PREFEITURA')
      expect(rows[2].childNodes[1].textContent).contains('PROJETO DE TESTE UNITÁRIO')
      expect(rows[2].childNodes[2].textContent).contains('ITEM DE TESTE UNITÁRIO')
      expect(rows[2].childNodes[3].textContent).contains('FONTE R 0')
    })

  })

  function AddProdutoServico(id: string, quantidade: string) {

    cy.intercept('POST', 'https://localhost:44343/api/solicitacaodespesaitem').as('adicionarItemSD')

    cy.get('[formControlName="produto_servico_id"] > div > div > div > input')
    .type(`produto de teste unitario ${id}{enter}`, {force: true, delay: 300})

    cy.get('[formControlName="quantidade"]')
    .type(`${quantidade}{enter}`, {force: true, delay: 500})

    cy.get('button.btn.btn-success').then((button) => {
      button[0].click()
    })

    cy.wait('@adicionarItemSD').then((interceptions) => {
      expect(interceptions.response?.statusCode).eql(200)
    })

    cy.get('div.swal2-popup').should('have.class', 'swal2-icon-success');

    cy.get('button.swal2-confirm.swal2-styled').should('not.be.disabled').then((button) => {
      button[0].click()
    })

    cy.wait(3000)
  }
});
