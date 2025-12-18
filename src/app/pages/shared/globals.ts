import * as $ from 'jquery';
export const dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 10,
  responsive: true,
  destroy: true,
  order: [
    [0, 'desc'],
    [1, 'desc'],
  ],
  initComplete: function () {
    $('.dt-button').addClass('btn btn-outline-primary btn-sm bi');
    $('.dt-buttons').css({ float: 'right' });
    $('.dataTables_filter').css('text-align', 'left');
    $('.dataTables_filter label').addClass('bi bi-search');
    var input = $('.dataTables_filter label input');
    $('.dataTables_filter label').html('');
    $('.dataTables_filter label').append(input);
    $('.dataTables_filter label input').attr('placeholder', 'Pesquisar');
    $('button').removeClass('dt-button');
  },
  dom:
    "<'#firstrow.row mb-0'<'col-sm-12 col-md-4'f><'col-sm-12 col-md-2'><'col-sm-12 col-md-6'B>>" +
    "<'row'<'col-sm-12'tr>>" +
    "<'row mb-2 justify-content-between'<'col-md-auto'l><'col-md-auto'p><'col-md-auto'i>>",
  language: {
    search: 'Buscar',
    emptyTable: 'Não existem registros',
    lengthMenu: 'Exibindo _MENU_ registros',
    info: 'Registros de _START_ até _END_ de _TOTAL_',
    loadingRecords: 'Carregando registros...',
    zeroRecords: 'Não existem registros',
    infoEmpty: '',
    paginate: {
      first: 'Primeiro',
      last: 'Último',
      next: '>',
      previous: '<',
    },
  },
  buttons: [
    {
      extend: 'copyHtml5',
      exportOptions: {
        columns: ':not(:last-child)',
      },
    },
    {
      extend: 'excelHtml5',
      exportOptions: {
        columns: ':not(:last-child)',
        // format: {
        //   body: (data: any, row: any, column: number, node: any) => {
        //     if (column > 3) {
        //       const txt = (node as HTMLElement)?.innerText ?? '';
        //       const valor = String(txt).replace(/\./g, '').replace(',', '.');
        //       return isNaN(Number(valor)) ? txt.trim() : parseFloat(valor);
        //     } else {
        //       return (node as HTMLElement)?.innerText;
        //     }
        //   },
        // },
      },
    },
    {
      extend: 'print',
      exportOptions: {
        columns: ':not(:last-child)',
      },
      customize: function (doc: any) {
        $(doc.document.body).find('table').addClass('compact').css('color', 'black');
      },
    },
    {
      extend: 'pdf',
      exportOptions: {
        columns: ':not(:last-child)',
      },
      customize: function (doc: any) {
        // Create a footer
        doc['footer'] = function (page: any, pages: any) {
          return {
            columns: [
              'Gerado pelo Compra Ágil em ' + new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
              {
                // This is the right column
                alignment: 'right',
                text: ['página ', { text: page.toString() }, ' de ', { text: pages.toString() }],
              },
            ],
            margin: [10, 0],
          };
        };
      },
    },
  ],
};
