# TaskFlow

## Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados em sua máquina. Você pode baixá-los em [nodejs.org](https://nodejs.org/).

## Instalação

1. Clone o repositório para sua máquina local:

   ```bash
   git clone https://github.com/seu-usuario/taskflow.git
   cd taskflow
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

## Executando a Aplicação

1. Inicie o JSON Server para simular a API REST:

   ```bash
   npx json-server --watch db.json --port 3001
   ```

2. Em uma nova aba do terminal, inicie a aplicação React:

   ```bash
   npm start
   ```

3. Abra seu navegador e acesse `http://localhost:3000` para ver a aplicação em execução.

## Estrutura do Projeto

- `src/`: Contém o código-fonte da aplicação React.
- `db.json`: Arquivo JSON usado pelo JSON Server para simular a API REST.

## Funcionalidades

- Adicionar novas tarefas com título, descrição e data de vencimento.
- Visualizar detalhes de uma tarefa.
- Marcar tarefas como completas ou incompletas.
- Remover tarefas.

## Contribuição

Se você quiser contribuir para o projeto, siga estas etapas:

1. Fork o repositório.
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`).
3. Faça suas alterações e commit (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie para o repositório remoto (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.