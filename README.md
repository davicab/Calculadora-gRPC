# Calculadora gRPC

Este é um projeto que demonstra o uso do gRPC para implementar uma calculadora com operações de soma, subtração, multiplicação e divisão. Cada operação é executada por um servidor gRPC independente.

## Estrutura do Projeto

O projeto está organizado da seguinte maneira:

- `add-config/add.proto`: Arquivo .proto de configuração do serviço de soma.
- `subtract-config/subtract.proto`: Arquivo .proto de configuração do serviço de subtração.
- `multiply-config/multiply.proto`: Arquivo .proto de configuração do serviço de multiplicação.
- `divide-config/divide.proto`: Arquivo .proto de configuração do serviço de divisão.
- `./servers` : Pasta com todos os servidores e seus calculos.
- `client.js`: Cliente gRPC que se comunica com os quatro servidores.

## Requisitos

Certifique-se de ter o Node.js e as dependências do projeto instaladas. Você pode instalar as dependências executando:
- `npm install`

## Iniciar os servidores de calculo
- `node servers/add-server.js`
- `node servers/subtract-server.js`
- `node servers/multiply-server.js`
- `node servers/divide-server.js`

## Rodar o client
- `node client.js`
