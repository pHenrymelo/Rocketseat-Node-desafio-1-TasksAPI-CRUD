
# Desafio 01 Rocketseat Node - Tasks API 🚀💜

Este é o primeiro projeto desafio da trilha de Node da Rocketseat, para a construção deste eu revisei conceitos vistos nas aulas aplicando em um projeto pratico de API de CRUD de task e também permitindo a importação de registros de um arquivo .csv conforme as intruções do desafio.


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/pHenrymelo/Rocketseat-Node-desafio-1-TasksAPI-CRUD.git
```

Entre no diretório do projeto

```bash
  cd Rocketseat-Node-desafio-1-TasksAPI-CRUD
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Funcionalidades

- Criar uma task
```bash
    "Enviar uma requisição post para /tasks passando obrigatoriamente um title e uma description"
    http POST http://localhost:3333/tasks 
```
- Listar as tasks criadas e filtrar procurando palavras chave no titulo e na descrição
```bash
    "Enviar uma requisição get para /tasks podendo passar como query parameter um search para filtrar no titulo e na descrição"
    http POST http://localhost:3333/tasks 
```
- Remover uma task pelo ID
```bash
    "Enviar uma requisição DELETE para /tasks/:id passando obrigatoriamente um id como route parameter"
    http POST http://localhost:3333/tasks/:id
```
- Atualizar pedo ID o status de conclusão de uma task para concluído e retornar ao estado origina de não concluído
```bash
    "Enviar uma requisição PATCH para /tasks/:id/complete passando obrigatoriamente um id como route parameter"
    http POST http://localhost:3333/tasks 
```
- Atualizar as informações de titulo e descrição de uma task pelo ID
```bash
    "Enviar uma requisição PUT para /tasks/:id passando obrigatoriamente um id como route parameter e um title e uma description no corpo da requisição"
    http POST http://localhost:3333/tasks 
```
- Criar tasks em massa importanto um arquivo CSV
```bash
    "Enviar uma requisição POST para /tasks/import passando a url do arquivo no corpo da requisição"
    http POST http://localhost:3333/tasks/import
```

## Conceitos Revisados

- Criação de Servidor HTTP com node
- Roteamento
- Streams
- InMemory Database
- Regular Expressions
- Criação de Middlewares
- Criação de CRUD
