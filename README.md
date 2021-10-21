# App de transações

## Requisitos

- Listagem de transações

  - Ao abrir o app, deverá ser feita uma requisição para a API (GET) solicitando os dados. Não poderão ser feitas novas requisições GET enquanto o app estiver aberto. Quando forem cadastradas novas transações usando a API (POST) os dados devolvido deverão ser inseridos no estado da aplicação, para serem mostrados na listagem.
  - Uma nova requisição para a API só ocorrerá quando o usuário fechar a página e abrí-la novamente.

- As requisições devem lidar tanto com sucesso quanto falha. O feedback disso fica a seu critério.
- O projeto deve consumir a API disposta para o mesmo. Para isso, execute o comando `yarn server`.

## Feito usando
- React
- Eslint
- Prettier
- Material-ui
- Husky
- React router
- Axios
- Notistack
- React Hook Form
- React Intl

## Results

- List screen

![GitHub Logo](/screenshots/list.png)

- New transaction screen

![GitHub Logo](/screenshots/new.png)

## Instalação

Execute o comando `yarn`.

## Rodando a aplicação

1. Renomeie o arquivo `db.example.json` para `db.json`;
1. Execute `yarn server` para executar a API;
1. Execute `yarn start` para rodar a aplicação React.

## Comandos

O produto deve ser construído na base provida aqui. Para conhecer os comandos disponíveis, visite o `package.json`, mas seguem alguns comandos abaixo:

- `yarn start`: executa o projeto
- `yarn build`: cria o build para produção
- `yarn test`: executa os testes
- `yarn lint`: executa as validações de lint na pasta `src`
- `yarn server`: executa a api para usar com o projeto
  - Precisa que o arquivo `db.example.json` seja renomeado para `db.json`.
