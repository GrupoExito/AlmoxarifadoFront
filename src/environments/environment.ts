// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// 'https://compraagilapi.sistemasgrupoexito.com.br/api',

export const environment = {
  production: false,
  appVersion: 'v8.0.38',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: false,
  apiLegacyUrl: 'https://compraagilapi.sistemasgrupoexito.com.br/api',
  apiUrl: 'https://localhost:7284/api',
  usuarioLogar: 'implantacaocompraagil@grupoexito.com.br',
  senhaLogar: '303030',
  apiRelatorioUrl: 'https://localhost:7034/api',
  angularUrl: 'http://localhost:4200',
  pncpUrl: 'https://treina.pncp.gov.br/app',
  siaficUrl: 'https://siaficapiweb.sistemasgrupoexito.com.br/api',
  appThemeName: 'Metronic',
  appPurchaseUrl: 'https://1.envato.market/EA4JP',
  appHTMLIntegration: 'https://preview.keenthemes.com/metronic8/demo6/documentation/base/helpers/flex-layouts.html',
  appPreviewUrl: 'https://preview.keenthemes.com/metronic8/angular/demo6/',
  appPreviewAngularUrl: 'https://preview.keenthemes.com/metronic8/angular/demo6',
  appPreviewDocsUrl: 'https://preview.keenthemes.com/metronic8/angular/docs',
  appPreviewChangelogUrl: 'https://preview.keenthemes.com/metronic8/angular/docs/changelog',
  appDemos: {
    demo1: {
      title: 'Almoxarifado',
      description: 'Default Dashboard',
      published: true,
      thumbnail: './assets/media/demos/demo1.png',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
