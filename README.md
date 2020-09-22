<p align="center">
  <h1 align="center">Book Rental 📖</h1>
</p>

## Um pouco sobre a api 📜

Api feita com o intuito de ser um sistema de controle de aluguel de livros em uma biblioteca.

## Exigências  📋

✔️  Cadastro de Pessoa (Nome, CPF, Data nascimento, Endereço completo) </br>
✔️  Cadastro de Livro (Titulo, Autor, ISBN, Código cópia) </br>

### Funcionalidades 📝

✔️ Pessoa:CRUD </br>
✔️ Livro:CRUD </br>
✔️ Copia:CRUD </br>
✔️ Controle de aluguel </br>
✔️ Authenticação com JWT </br>
✔️ Se pessoa atrasou devolução mais de 2x ela não pode alugar mais </br>
❌ Listar o titulo dos 3 livros que mais tiveram atraso na devolução por mês durante o ano (mostrar todos os meses do ano) </br>
❌ Listar o titulo dos 3 livros mais alugados por cidade durante o ano (mostrar todos os meses do ano) </br>
✔️ Criar README do projeto </br>


## Inicializando a aplicação 🏁

obs: Quem tiver utilizando npm pode seguir usando os comandos inicializados com npx, banco de dados utilizado foi o MySQL.
Caso estejam utilizando outro banco de dados é só alterar a configuração como segue a documentação do <a href="http://knexjs.org/">knex</a>.
Se você não possuir um banco de dados sugiro instalar o <a href="https://www.mysql.com/">Mysql</a> ou subir um container utilizando docker como esse exemplo 
<a href="https://github.com/mysql/mysql-docker">Docker com Mysql</a>

1° Crie um arquivo .env, copie todas as informações do arquivo .env.example para o .env e preecha-o antes de iniciar.

2° Crie um novo banco chamado book_rental ou se desejar escolha outro nome mais não esqueça de alterar no .env

### Instalação de dependências do projeto
```
yarn || npm install
```

### Rodando migrations para criar tabelas
```
yarn knex migrate:latest || npx knex migrate:latest
```

### Rodando seed para que crie dois registros na tabela de role
```
yarn knex seed:run || npx knex seed:run
```

### Rodando projeto
```
yarn start || npm start
```

## Enpoints


### POST /role

Rota feita para criarmos funções para usuários 

#### Parametros

name: nome desejado da função

```
{
	"name":"role"
}
```

#### Respostas

##### OK ! 201

#### Falha no cadastro ! 400

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de cadastrado da requisição. Motivos: o campo name está sendo enviado nullo.

Exemplo de erro:

```
{
  "message": "the name field cannot be empty"
}

```

### GET /role

Esse endpoint é responsável por retornar a listagem de todas as roles cadastrados no banco de dados.

#### Parametros

Nenhum

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber a listagem de todos as roles.

Exemplo de resposta:

```
[
  {
    "id": 1,
    "name": "Admin",
    "created_at": "2020-09-19T21:31:45.000Z",
    "updated_at": "2020-09-19T21:31:45.000Z",
    "deleted_at": null
  },
  {
    "id": 2,
    "name": "Client",
    "created_at": "2020-09-19T21:31:45.000Z",
    "updated_at": "2020-09-19T21:31:45.000Z",
    "deleted_at": null
  }
]
```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}
```

### GET /role/id

Esse endpoint é responsável por retornar somente a rule representada pelo id passado pelo parametro.

#### Parametros

params: id

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber os dados representantes ao id passado por parametro.

Exemplo de resposta:

```
[
  {
    "id": 1,
    "name": "Admin",
    "created_at": "2020-09-19T21:31:45.000Z",
    "updated_at": "2020-09-19T21:31:45.000Z",
    "deleted_at": null
  },
  {
    "id": 2,
    "name": "Client",
    "created_at": "2020-09-19T21:31:45.000Z",
    "updated_at": "2020-09-19T21:31:45.000Z",
    "deleted_at": null
  }
]
```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}
```

### PUT /role/id

Esse endpoint é responsável por atualizar o dado referente ao id passado no parametro.

#### Parametros

parms: id
body: name

```
{
	"name":"role"
}
```

#### Respostas

##### OK ! 200


#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}

```


### DELETE /role/id

Esse endpoint é responsável por atualizar o campo deleted_at referente ao id passado no parametro.

#### Parametros

parms: id

#### Respostas

##### OK ! 200


#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}

```

### POST /users

Rota feita para criarmos um usuários

#### Parametros

body : name, birth_date, cpf, email, address, password

obs: para criar um usuários com permissões de administrador é só adicionar o campo role_id com o valor 1, pois por default se criar o usuario sem mandar o campo role o usuários será role_id com o valor 2 

```
{
	"name": "Paula Silva",
	"birth_date": "2020-09-15",
	"cpf": "854.365.748-36",
	"email": "paula@teste.com",
	"address": {
		"zip_code":"05333050",
		"district":"Jaguaré",
		"state":"SP",
		"city":"São Paulo",
		"complement":"Proximo a padaria da XI",
		"number":92
	},
	"password": "teste123"
	"role_id": 1
}
```

#### Respostas

##### OK ! 201

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}

```

### GET /users

Esse endpoint é responsável por retornar a listagem de todos os usuários cadastrados no banco de dados.

#### Parametros

Nenhum

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber a listagem de todos os users.

Exemplo de resposta:

```
[
  {
    "id": 1,
    "role_id": 2,
    "address_id": 1,
    "name": "Oliver Silva",
    "email": "oliver@teste.com",
    "birth_date": "2020-09-15T03:00:00.000Z",
    "cpf": "436.217.748-36",
    "penalties": 0,
    "created_at": "2020-09-19T22:04:06.000Z",
    "updated_at": "2020-09-19T22:04:06.000Z",
    "deleted_at": null,
    "role": "Client",
    "address_zip_code": "05333050",
    "address_district": "Jaguaré",
    "address_state": "SP",
    "address_city": "São Paulo",
    "address_complement": "Proximo a padaria da XI",
    "address_number": 92
  },
  {
    "id": 2,
    "role_id": 2,
    "address_id": 2,
    "name": "Paula Silva",
    "email": "paula@teste.com",
    "birth_date": "2020-09-15T03:00:00.000Z",
    "cpf": "854.365.748-36",
    "penalties": 0,
    "created_at": "2020-09-19T22:24:02.000Z",
    "updated_at": "2020-09-19T22:24:02.000Z",
    "deleted_at": null,
    "role": "Client",
    "address_zip_code": "05333050",
    "address_district": "Jaguaré",
    "address_state": "SP",
    "address_city": "São Paulo",
    "address_complement": "Proximo a padaria da XI",
    "address_number": 92
  }
]
```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}
```
### GET /users/id

Esse endpoint é responsável por retornar somente o user representado pelo id passado pelo parametro.

#### Parametros

params: id

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber os dados do user representado pelo id do parametro.

Exemplo de resposta:

```
[
  {
    "id": 1,
    "role_id": 2,
    "address_id": 1,
    "name": "Oliver Silva",
    "email": "oliver@teste.com",
    "birth_date": "2020-09-15T03:00:00.000Z",
    "cpf": "436.217.748-36",
    "penalties": 0,
    "created_at": "2020-09-19T22:04:06.000Z",
    "updated_at": "2020-09-19T22:04:06.000Z",
    "deleted_at": null,
    "role": "Client",
    "address_zip_code": "05333050",
    "address_district": "Jaguaré",
    "address_state": "SP",
    "address_city": "São Paulo",
    "address_complement": "Proximo a padaria da XI",
    "address_number": 92
  }
]
```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}
```

### PUT /users/id

Esse endpoint é responsável por atualizar o dado referente ao id passado no parametro.

#### Parametros

parms: id
body : name, birth_date, cpf, email, address, password

```
{
	"name": "Paula Silva",
	"birth_date": "2020-09-15",
	"cpf": "854.365.748-36",
	"email": "paula@teste.com",
	"address": {
    "id":1,
		"zip_code":"05333050",
		"district":"Jaguaré",
		"state":"SP",
		"city":"São Paulo",
		"complement":"Proximo a padaria da XI",
		"number":92
	},
	"password": "teste123"
}
```

#### Respostas

##### OK ! 200


#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}

```

### DELETE /users/id

Esse endpoint é responsável por atualizar o campo deleted_at referente ao id passado no parametro.

#### Parametros

parms: id

#### Respostas

##### OK ! 200


#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}

```

### POST /auth

Esse endpoint é responsável por fazer o processo de login.

#### Parametros

email: E-mail do usuário cadastrado no sistema

password: password do usuário cadastrado no sistema

```
{
	"email":"vitor@teste.com",
	"password":"teste123"
}

```

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na api.

Exemplo de resposta:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZlckB0ZXN0ZS5jb20iLCJyb2xlIjoyLCJpYXQiOjE2MDA1NTMwNTYsImV4cCI6MTYwMDU5NjI1Nn0.0F3doia95zPM1OT_ZceLCH45VO_WO6c52k_a-P6NF1E",
  "name": "Oliver Silva",
  "email": "oliver@teste.com"
}

```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Senha ou e-mail incorretos.

Exemplo de erro:
```
{
  "error": "Not found"
}

```

### POST /books

Rota feita para criarmos um livros

#### Parametros

body : title, author

```
{
	"title":"Frankenstein",
	"author":"Stephen King"
}
```

#### Respostas

##### OK ! 201

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}

```

### GET /books

Esse endpoint é responsável por retornar a listagem de todos os livros cadastrados no banco de dados.

#### Parametros

Nenhum

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber a listagem de todos os books.

Exemplo de resposta:

```
[
  {
    "id": 1,
    "title": "Fortaleza Digital",
    "author": "Dan Brown",
    "created_at": "2020-09-19T05:51:41.000Z",
    "updated_at": "2020-09-19T05:51:41.000Z",
    "deleted_at": null
  },
  {
    "id": 2,
    "title": "Frankenstein",
    "author": "Stephen King",
    "created_at": "2020-09-19T14:23:32.000Z",
    "updated_at": "2020-09-19T14:23:32.000Z",
    "deleted_at": null
  },
  {
    "id": 3,
    "title": "Código Limpo",
    "author": "Martin",
    "created_at": "2020-09-19T14:24:03.000Z",
    "updated_at": "2020-09-19T14:24:03.000Z",
    "deleted_at": null
  },
  {
    "id": 4,
    "title": "A Estratégia do olho de tigre",
    "author": "Renato Grinberg",
    "created_at": "2020-09-19T14:24:29.000Z",
    "updated_at": "2020-09-19T14:24:29.000Z",
    "deleted_at": null
  }
]
```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}
```

### GET /books/id

Esse endpoint é responsável por retornar somente o user representado pelo id passado pelo parametro.

#### Parametros

params: id

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber os dados do books representado pelo id do parametro.

Exemplo de resposta:

```
[
  {
    "id": 2,
    "title": "Estrutura de dados",
    "author": "Loiane Groner",
    "created_at": "2020-09-19T22:43:21.000Z",
    "updated_at": "2020-09-19T22:43:21.000Z",
    "deleted_at": null
  }
]
```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}
```


### PUT /books/id

Esse endpoint é responsável por atualizar o dado referente ao id passado no parametro.

#### Parametros

parms: id
body : title, author

```
{
	"title":"Fortaleza Digital",
	"author":"Dan Brown"
}
```

#### Respostas

##### OK ! 200


#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}

```

### DELETE /books/id

Esse endpoint é responsável por atualizar o campo deleted_at referente ao id passado no parametro.

#### Parametros

parms: id

#### Respostas

##### OK ! 200


#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}

```

### POST /copies

Rota feita para criarmos uma copia

#### Parametros

body : book_id, isbn

```
{
	"book_id": 4,
	"isbn": "6331639789446"
}
```

#### Respostas

##### OK ! 201

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}

```

### GET /copies

Esse endpoint é responsável por retornar a listagem de todos os livros cadastrados no banco de dados.

#### Parametros

Nenhum

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber a listagem de todas as copies.

Exemplo de resposta:

```
[
  {
    "id": 1,
    "book_id": 1,
    "isbn": "6331639789446",
    "status": "available",
    "created_at": "2020-09-19T22:54:18.000Z",
    "updated_at": "2020-09-19T22:54:18.000Z",
    "deleted_at": null,
    "book_title": "Frankenstein",
    "book_author": "Stephen King"
  },
  {
    "id": 2,
    "book_id": 1,
    "isbn": "6331639789365",
    "status": "available",
    "created_at": "2020-09-19T22:54:29.000Z",
    "updated_at": "2020-09-19T22:54:29.000Z",
    "deleted_at": null,
    "book_title": "Frankenstein",
    "book_author": "Stephen King"
  }
]
```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}
```

### GET /copies/id

Esse endpoint é responsável por retornar somente o user representado pelo id passado pelo parametro.

#### Parametros

params: id

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber os dados da copie representado pelo id do parametro.

Exemplo de resposta:

```
[
  {
    "id": 1,
    "book_id": 1,
    "isbn": "6331639789446",
    "status": "available",
    "created_at": "2020-09-19T22:54:18.000Z",
    "updated_at": "2020-09-19T22:54:18.000Z",
    "deleted_at": null,
    "book_title": "Frankenstein",
    "book_author": "Stephen King"
  }
]
```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}
```

### PUT /books/id

Esse endpoint é responsável por atualizar o dado referente ao id passado no parametro.

#### Parametros

parms: id
body : book_id, isbn

```
{
	"book_id": 1,
	"isbn": "6331639789365"
}
```

#### Respostas

##### OK ! 200


#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}

```


### DELETE /copies/id

Esse endpoint é responsável por atualizar o campo deleted_at referente ao id passado no parametro.

#### Parametros

parms: id

#### Respostas

##### OK ! 200


#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}

```


### POST /rent_control

Rota feita para criarmos uma copia

#### Parametros

body : user_id, copie_id,pick_up_date

```
{
	"user_id":5,
	"copie_id":4, 
	"pick_up_date":"2020-08-20"
}
```

#### Respostas

##### OK ! 201

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}
```

#### Falha na autenticação ! 404


```
{
  "message": "copy not available"
}
```

### GET /rent_control

Esse endpoint é responsável por retornar a listagem de todos os registro de aluguel de livros.

#### Parametros

Nenhum

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber a listagem de todos os rent_control.

Exemplo de resposta:

```
[
  {
    "id": 1,
    "user_id": 1,
    "copie_id": 2,
    "pick_up_date": "2020-08-20T03:00:00.000Z",
    "return_date": "2020-09-03T03:00:00.000Z",
    "delivery_date": null,
    "created_at": "2020-09-19T23:01:51.000Z",
    "updated_at": "2020-09-19T23:01:51.000Z",
    "deleted_at": null,
    "user_name": "Oliver Silva",
    "user_email": "oliver@teste.com",
    "user_cpf": "436.217.748-36",
    "copie_isbn": "6331639789365",
    "copie_status": "unavailable",
    "book_title": "Frankenstein",
    "book_author": "Stephen King"
  },
  {
    "id": 2,
    "user_id": 2,
    "copie_id": 1,
    "pick_up_date": "2020-08-20T03:00:00.000Z",
    "return_date": "2020-09-03T03:00:00.000Z",
    "delivery_date": null,
    "created_at": "2020-09-19T23:02:03.000Z",
    "updated_at": "2020-09-19T23:02:03.000Z",
    "deleted_at": null,
    "user_name": "Paula Silva",
    "user_email": "paula@teste.com",
    "user_cpf": "854.365.748-36",
    "copie_isbn": "6331639789446",
    "copie_status": "unavailable",
    "book_title": "Frankenstein",
    "book_author": "Stephen King"
  }
]
```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}
```

### GET /rent_control/id

Esse endpoint é responsável por retornar somente o user representado pelo id passado pelo parametro.

#### Parametros

params: id

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber os dados do rent_control representado pelo id do parametro.

Exemplo de resposta:

```
[
  {
    "id": 1,
    "user_id": 1,
    "copie_id": 2,
    "pick_up_date": "2020-08-20T03:00:00.000Z",
    "return_date": "2020-09-03T03:00:00.000Z",
    "delivery_date": null,
    "created_at": "2020-09-19T23:01:51.000Z",
    "updated_at": "2020-09-19T23:01:51.000Z",
    "deleted_at": null,
    "user_name": "Oliver Silva",
    "user_email": "oliver@teste.com",
    "user_cpf": "436.217.748-36",
    "copie_isbn": "6331639789365",
    "copie_status": "unavailable",
    "book_title": "Frankenstein",
    "book_author": "Stephen King"
  }
]
```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}
```


### PUT /rent_control/id

Esse endpoint é responsável por atualizar o dado referente ao id passado no parametro.

#### Parametros

parms: id
body : user_id, copie_id, pick_up_date

```
{
	"user_id":2,
	"copie_id":1, 
	"pick_up_date":"2020-08-25"
}
```

#### Respostas

##### OK ! 200


#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}

```

### DELETE /rent_control/id

Esse endpoint é responsável por atualizar o campo deleted_at referente ao id passado no parametro.

#### Parametros

parms: id

#### Respostas

##### OK ! 200


#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}

```

### POST /delivery

Rota feita para criarmos uma copia

#### Parametros

body : user_id, copie_id,delivery_date

```
{
	"user_id":5,
	"copie_id":2,
	"delivery_date":"2020-10-03"
}
```

#### Respostas

##### OK ! 201

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autorização da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}
```

### GET /latest_books

Esse endpoint é responsável por retornar a listagem de todos os registro de aluguel de livros.

#### Parametros

Nenhum

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber a listagem de todos os latest_books.

Exemplo de resposta:

```
{
  "months": [
    {
      "name": "January",
      "latest": []
    },
    {
      "name": "February",
      "latest": []
    },
    {
      "name": "March",
      "latest": []
    },
    {
      "name": "April",
      "latest": []
    },
    {
      "name": "May",
      "latest": []
    },
    {
      "name": "June",
      "latest": []
    },
    {
      "name": "July",
      "latest": []
    },
    {
      "name": "August",
      "latest": []
    },
    {
      "name": "September",
      "latest": [
        {
          "id": 2,
          "user_id": 2,
          "copie_id": 1,
          "pick_up_date": "2020-08-20T03:00:00.000Z",
          "return_date": "2020-09-04T03:00:00.000Z",
          "delivery_date": "2020-10-03T03:00:00.000Z",
          "created_at": "2020-09-19T06:45:31.000Z",
          "updated_at": "2020-09-19T06:45:31.000Z",
          "deleted_at": null
        },
        {
          "id": 3,
          "user_id": 4,
          "copie_id": 2,
          "pick_up_date": "2020-08-20T03:00:00.000Z",
          "return_date": "2020-09-03T03:00:00.000Z",
          "delivery_date": "2020-10-03T03:00:00.000Z",
          "created_at": "2020-09-19T14:33:25.000Z",
          "updated_at": "2020-09-19T14:33:25.000Z",
          "deleted_at": null
        },
        {
          "id": 4,
          "user_id": 4,
          "copie_id": 3,
          "pick_up_date": "2020-08-20T03:00:00.000Z",
          "return_date": "2020-09-03T03:00:00.000Z",
          "delivery_date": "2020-10-03T03:00:00.000Z",
          "created_at": "2020-09-19T14:33:28.000Z",
          "updated_at": "2020-09-19T14:33:28.000Z",
          "deleted_at": null
        },
        {
          "id": 5,
          "user_id": 4,
          "copie_id": 4,
          "pick_up_date": "2020-08-20T03:00:00.000Z",
          "return_date": "2020-09-03T03:00:00.000Z",
          "delivery_date": "2020-10-03T03:00:00.000Z",
          "created_at": "2020-09-19T14:33:30.000Z",
          "updated_at": "2020-09-19T14:33:30.000Z",
          "deleted_at": null
        },
        {
          "id": 6,
          "user_id": 5,
          "copie_id": 3,
          "pick_up_date": "2020-08-20T03:00:00.000Z",
          "return_date": "2020-09-03T03:00:00.000Z",
          "delivery_date": "",
          "created_at": "2020-09-19T14:38:11.000Z",
          "updated_at": "2020-09-19T14:38:11.000Z",
          "deleted_at": null
        },
        {
          "id": 7,
          "user_id": 5,
          "copie_id": 2,
          "pick_up_date": "2020-08-20T03:00:00.000Z",
          "return_date": "2020-09-03T03:00:00.000Z",
          "delivery_date": "",
          "created_at": "2020-09-19T14:38:13.000Z",
          "updated_at": "2020-09-19T14:38:13.000Z",
          "deleted_at": null
        }
      ],
      "copies": [
        1,
        2,
        3,
        4,
        3,
        2
      ]
    },
    {
      "name": "October",
      "latest": [
        {
          "id": 8,
          "user_id": 5,
          "copie_id": 4,
          "pick_up_date": "2020-08-20T03:00:00.000Z",
          "return_date": "2020-10-03T03:00:00.000Z",
          "delivery_date": "2020-10-04T03:00:00.000Z",
          "created_at": "2020-09-19T14:39:03.000Z",
          "updated_at": "2020-09-19T14:39:03.000Z",
          "deleted_at": null
        }
      ],
      "copies": [
        4
      ]
    },
    {
      "name": "November",
      "latest": []
    },
    {
      "name": "December",
      "latest": []
    }
  ]
}
```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```
{
  "message": "You are not allowed to see this data"
}
```

