const fs = require('fs');
const path = require('path');

// Lê a versão atual do package.json
const packageJson = require('./package.json');
const version = packageJson.version;

// Define o caminho do arquivo a ser gerado
const versionFilePath = path.join(__dirname, 'src/environments/version.ts');

// Conteúdo do arquivo gerado
const versionFileContent = `// Este arquivo é gerado automaticamente durante o build
export const VERSION = '${version}';
`;

// Grava o arquivo na pasta environments
fs.writeFileSync(versionFilePath, versionFileContent, { encoding: 'utf8' });

// Mensagem de sucesso no console
console.log(`Arquivo de versão criado em: ${versionFilePath}`);
