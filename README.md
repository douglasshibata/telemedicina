# Telemedicina

Aplicativo de Telemedicina desenvolvido com Ionic e Angular para o Trabalho de Conclusão de Curso (TCC), acompanhado de um servidor Node.js/Socket.io para chat em tempo real.

## Visualização Geral & Arquitetura

O projeto é dividido em duas partes principais:

1. **Frontend / Mobile (Ionic / Angular):**
   - **Framework:** Ionic 4 com Angular 8.
   - **Autenticação e Armazenamento:** Firebase Authentication e Google Cloud Firestore.
   - **Estrutura:**
     - `src/app/componentes/login`: Tela de login do usuário.
     - `src/app/componentes/registro`: Cadastro de novos usuários com validação de senha.
     - `src/app/componentes/chat`: Interface modal para envio e recebimento de mensagens.
     - `src/app/guards`: `AuthGuard` e `NologinGuard` para proteção de rotas.
     - `src/app/service`: `AuthService` para autenticação Firebase e `ChatsService` para sincronização com Firestore.

2. **Backend Chat Server (Node.js / Express / Socket.io):**
   - **Localização:** diretório `/chat`.
   - **Servidor:** Express.js com WebSockets via `socket.io`.
   - **Cliente de Exemplo:** `/chat/public/index.html` e `style.css`.

---

## Configuração & Instalação

### Pré-requisitos
- Node.js (v18, v20 ou v22)
- npm

### Passos de Instalação

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd telemedicina
   ```

2. **Instale as dependências da aplicação principal (Ionic/Angular):**
   ```bash
   npm install --legacy-peer-deps --ignore-scripts
   ```

3. **Instale as dependências do servidor de chat em tempo real:**
   ```bash
   cd chat
   npm install
   cd ..
   ```

---

## Variáveis de Ambiente e Configurações

A configuração do Firebase para o frontend está centralizada em `src/environments/environment.ts` e `src/environments/environment.prod.ts`.

Exemplo de objeto de configuração em `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false
};

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "SUA_API_KEY",
  authDomain: "seu-app.firebaseapp.com",
  databaseURL: "https://seu-app.firebaseio.com",
  projectId: "seu-app-id",
  storageBucket: "seu-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

Para o servidor de chat Node.js (`chat/server.js`), é utilizada a variável de ambiente:
- `PORT`: Porta do servidor (padrão: `3000`).

---

## Como Executar a Aplicação

### Executando o Frontend Ionic/Angular
```bash
npm start
# Ou:
npx ng serve
```

Acesse no navegador: `http://localhost:8100`

### Executando o Servidor de Chat Node.js
```bash
cd chat
npm start
```

Acesse no navegador: `http://localhost:3000`

---

## Como Executar a Suíte de Testes

A suíte de testes unitários foi implementada utilizando **Jasmine** e **Karma**.

Para executar os testes no ambiente em modo headless:

```bash
NODE_OPTIONS=--openssl-legacy-provider ./node_modules/.bin/ng test --watch=false --browsers=ChromeHeadless
```

---

## Considerações de Segurança & Vulnerabilidades Corrigidas

Durante a auditoria de código e refatoração, as seguintes vulnerabilidades e problemas críticos foram corrigidos:

1. **Vulnerabilidade XSS (Cross-Site Scripting) no Chat HTML:**
   - **Problema:** O arquivo `chat/public/index.html` utilizava interpolação direta no DOM com `.append('<div...>'+ message.author + '...' + message.message + '</div>')`, permitindo a execução de códigos JavaScript maliciosos em mensagens.
   - **Correção:** Atualizado para construir nós de texto de forma segura utilizando `document.createTextNode` e jQuery `.text()`.

2. **Bugs de Lógica e Referência:**
   - **`AuthService.register`:** Corrigida a tentativa de escrita no Firestore que utilizava a variável indefinida `name` em vez do parâmetro `nome`.
   - **`ChatComponent.ngOnInit`:** Ajustada a ordem de execução para recuperar `navparams.get('chat')` antes de tentar acessar `this.chat.id`.
   - **`AuthGuard` e `NologinGuard`:** Removido o módulo legado/depreciado `util.isNullOrUndefined` em favor de checagens puras do JavaScript (`!auth`).

3. **Validação de Entrada e Confirmação de Senha:**
   - **`RegistroPage`:** Adicionada validação do campo "Confirmar Senha" no formulário e no componente TypeScript para garantir o preenchimento obrigatório e a correspondência das senhas antes de criar a conta.
